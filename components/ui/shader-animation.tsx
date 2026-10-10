"use client"

import { useEffect, useRef } from "react"

import { cn } from "@/lib/utils"

/*
 * Based on the 21st.dev "shader-animation" component — same fragment shader, same output.
 * The original drew one full-screen quad through three.js (~130 KB gzipped); this version
 * talks to WebGL directly (~2 KB), so it is always ready instead of loading late.
 * With no props it renders exactly as the original (RGB rings on black). Additions:
 *   - `palette`: recolour the three ring channels and the background
 *   - `active`: only run the render loop while true (the canvas stays mounted, paused)
 *   - `maxPixelRatio`: cap the render resolution (fragment shaders are per-pixel)
 *   - `restartAt`: when given, every resume starts from this time value (the rings loop every
 *     ~7 s and are off-screen for much of it, so short bursts need a known starting phase)
 *   - `speed`: time units per second (original: 0.05 per frame ≈ 3 per second at 60 fps);
 *     time is clock-based so 60 Hz and 120 Hz screens look the same
 *   - `className` for sizing
 * Without WebGL it falls back to the plain background colour.
 */

type RGB = [number, number, number]

export type ShaderPalette = {
  /** Background colour (0–1 RGB) */
  base: RGB
  /** Colours for the three ring channels (0–1 RGB) */
  channels: [RGB, RGB, RGB]
}

const ORIGINAL: ShaderPalette = {
  base: [0, 0, 0],
  channels: [
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 1],
  ],
}

const VERTEX = `
  attribute vec2 position;
  void main() {
    gl_Position = vec4(position, 0.0, 1.0);
  }
`

// Original ring maths; output mapped through the palette
const FRAGMENT = `
  #define TWO_PI 6.2831853072
  #define PI 3.14159265359

  precision highp float;
  uniform vec2 resolution;
  uniform float time;
  uniform vec3 base;
  uniform vec3 channel0;
  uniform vec3 channel1;
  uniform vec3 channel2;

  void main(void) {
    vec2 uv = (gl_FragCoord.xy * 2.0 - resolution.xy) / min(resolution.x, resolution.y);
    float t = time*0.05;
    float lineWidth = 0.002;

    vec3 color = vec3(0.0);
    for(int j = 0; j < 3; j++){
      for(int i=0; i < 5; i++){
        color[j] += lineWidth*float(i*i) / abs(fract(t - 0.01*float(j)+float(i)*0.01)*5.0 - length(uv) + mod(uv.x+uv.y, 0.2));
      }
    }

    vec3 tinted = base + color[0]*channel0 + color[1]*channel1 + color[2]*channel2;
    gl_FragColor = vec4(tinted, 1.0);
  }
`

function compile(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type)!
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  return shader
}

export function ShaderAnimation({
  className,
  palette = ORIGINAL,
  active = true,
  maxPixelRatio = Infinity,
  restartAt,
  speed = 3,
}: {
  className?: string
  palette?: ShaderPalette
  active?: boolean
  maxPixelRatio?: number
  restartAt?: number
  speed?: number
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const activeRef = useRef(active)
  const startRef = useRef<(() => void) | null>(null)
  const paletteRef = useRef(palette)
  const timingRef = useRef({ restartAt, speed })

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const canvas = document.createElement("canvas")
    canvas.style.display = "block"
    canvas.style.width = "100%"
    canvas.style.height = "100%"
    container.appendChild(canvas)

    const gl = canvas.getContext("webgl", { antialias: false, alpha: false, powerPreference: "low-power" })
    if (!gl) {
      // No WebGL: the container's background colour is the fallback
      container.removeChild(canvas)
      return
    }

    const program = gl.createProgram()!
    const vs = compile(gl, gl.VERTEX_SHADER, VERTEX)
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAGMENT)
    gl.attachShader(program, vs)
    gl.attachShader(program, fs)
    gl.linkProgram(program)
    gl.useProgram(program)

    // One triangle that covers the whole screen
    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
    const position = gl.getAttribLocation(program, "position")
    gl.enableVertexAttribArray(position)
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0)

    const u = (name: string) => gl.getUniformLocation(program, name)
    const uResolution = u("resolution")
    const uTime = u("time")
    const p = paletteRef.current
    gl.uniform3fv(u("base"), p.base)
    gl.uniform3fv(u("channel0"), p.channels[0])
    gl.uniform3fv(u("channel1"), p.channels[1])
    gl.uniform3fv(u("channel2"), p.channels[2])

    let time = 1.0
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, maxPixelRatio)
      const w = Math.max(1, Math.round(container.clientWidth * dpr))
      const h = Math.max(1, Math.round(container.clientHeight * dpr))
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w
        canvas.height = h
        gl.viewport(0, 0, w, h)
      }
      gl.uniform2f(uResolution, w, h)
    }
    const draw = () => {
      gl.uniform1f(uTime, time)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
    }

    // Animation loop (stops itself when inactive; `start` resumes it)
    let frame = 0
    let running = false
    let last = 0
    const animate = (now: number) => {
      if (!activeRef.current) {
        running = false
        return
      }
      frame = requestAnimationFrame(animate)
      const dt = Math.min(now - last, 50) // ms; clamp so a stalled tab doesn't jump
      last = now
      time += (dt / 1000) * timingRef.current.speed
      draw()
    }
    const start = () => {
      if (running) return
      running = true
      const { restartAt } = timingRef.current
      if (restartAt !== undefined) time = restartAt
      resize()
      last = performance.now()
      draw()
      frame = requestAnimationFrame(animate)
    }
    startRef.current = start

    // Draw one frame so the canvas is never blank, then start if active
    resize()
    draw()
    if (activeRef.current) start()
    window.addEventListener("resize", resize)

    return () => {
      window.removeEventListener("resize", resize)
      startRef.current = null
      cancelAnimationFrame(frame)
      gl.deleteBuffer(buffer)
      gl.deleteProgram(program)
      gl.deleteShader(vs)
      gl.deleteShader(fs)
      gl.getExtension("WEBGL_lose_context")?.loseContext()
      container.removeChild(canvas)
    }
  }, [maxPixelRatio])

  // Keep timing options current (declared before the effect below, so it runs first)
  useEffect(() => {
    timingRef.current = { restartAt, speed }
  }, [restartAt, speed])

  // Pause / resume without tearing down the WebGL context
  useEffect(() => {
    activeRef.current = active
    if (active) startRef.current?.()
  }, [active])

  const [r, g, b] = palette.base
  return (
    <div
      ref={containerRef}
      className={cn("w-full h-screen", className)}
      style={{
        background: `rgb(${r * 255}, ${g * 255}, ${b * 255})`,
        overflow: "hidden",
      }}
    />
  )
}
