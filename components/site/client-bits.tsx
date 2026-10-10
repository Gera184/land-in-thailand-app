"use client";
import * as React from "react";

import { ShaderAnimation, type ShaderPalette } from "@/components/ui/shader-animation";

import { cn } from "@/lib/utils";
import type { Content } from "@/lib/content";
import { waLink } from "@/lib/site";
import { WhatsAppIcon } from "./icons";

/** Adds `.is-in` to [data-observe] elements as they enter the viewport (cost bars fill, boarding pass gets stamped). */
export function RevealObserver() {
  React.useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>("[data-observe]");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -15% 0px", threshold: 0.4 },
    );
    els.forEach((el) => io.observe(el));

    // Pause the marquee off-screen to save battery
    const marquee = document.querySelector<HTMLElement>(".marquee-track");
    const mio = marquee
      ? new IntersectionObserver(([e]) => {
          marquee.style.animationPlayState = e.isIntersecting ? "running" : "paused";
        })
      : null;
    if (marquee && mio) mio.observe(marquee);

    return () => {
      io.disconnect();
      mio?.disconnect();
    };
  }, []);
  return null;
}

/** Pause / play for the destinations marquee (WCAG 2.2.2). Hidden with reduced motion, where it doesn't move. */
export function MarqueeToggle({ pause, play }: { pause: string; play: string }) {
  const [paused, setPaused] = React.useState(false);
  const ref = React.useRef<HTMLButtonElement>(null);
  const toggle = () => {
    const marquee = ref.current?.parentElement?.querySelector(".marquee");
    marquee?.classList.toggle("is-paused", !paused);
    setPaused(!paused);
  };
  return (
    <button ref={ref} type="button" className="media-toggle marquee-toggle" onClick={toggle} aria-label={paused ? play : pause}>
      {paused ? (
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.5v13l10.5-6.5z" fill="currentColor" /></svg>
      ) : (
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" fill="currentColor" /></svg>
      )}
    </button>
  );
}

/** Sticky WhatsApp pill on phones: visible after the opening scene, hidden over the footer. */
export function MobileCta({ c }: { c: Pick<Content, "mobileCta" | "waDefault"> }) {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const hero = document.querySelector<HTMLElement>("[data-hero]");
    // Hidden over the footer, which has its own WhatsApp call to action
    const covers = [...document.querySelectorAll<HTMLElement>(".site-footer")];
    let ticking = false;
    const update = () => {
      ticking = false;
      const heroEnd = hero ? hero.offsetHeight - window.innerHeight * 0.3 : window.innerHeight;
      const overFinal = covers.some((el) => {
        const r = el.getBoundingClientRect();
        return r.top < window.innerHeight && r.bottom > 0;
      });
      setVisible(window.scrollY > heroEnd && !overFinal);
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      className={cn("mobile-cta", visible && "is-visible")}
      href={waLink(c.waDefault)}
      target="_blank"
      rel="noopener"
      // Hidden (off-screen) it's out of the tab order and, via CSS visibility, the accessibility tree
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
    >
      <WhatsAppIcon />
      <span>{c.mobileCta.label}</span>
    </a>
  );
}

type Curtain = { phase: "in" | "out"; gate?: string; label: string } | null;

/** Brand palette for the shader: deep-water navy with aqua / lagoon / soft-white rings */
const LAGOON_RINGS: ShaderPalette = {
  base: [0.043, 0.106, 0.133], // #0B1B22
  // Scaled well below full strength: the rings should glow behind the label, not swamp it
  channels: [
    [0.13, 0.32, 0.29], // aqua  (#5EEAD4 × 0.35)
    [0.02, 0.26, 0.26], // lagoon (#0EA5A4 × 0.4)
    [0.07, 0.08, 0.08], // faint white
  ],
};

/**
 * Create the shader's WebGL context once the page has loaded and the browser is idle, so it is
 * ready before the first click but never competes with the first paint. (~2 KB, no download.)
 */
function useShaderReady() {
  const [ready, setReady] = React.useState(false);
  React.useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let idleId: number | undefined;
    const schedule = () => {
      const ric = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 300));
      idleId = ric(() => setReady(true), { timeout: 2000 });
    };
    if (document.readyState === "complete") schedule();
    else window.addEventListener("load", schedule, { once: true });
    return () => {
      window.removeEventListener("load", schedule);
      if (idleId !== undefined) (window.cancelIdleCallback ?? window.clearTimeout)(idleId);
    };
  }, []);
  return ready;
}

/** Timings (ms) — keep in sync with the .nav-curtain keyframes in site.css */
const CURTAIN_IN = 560; // two layers sweep up (500ms + 60ms stagger)
const CURTAIN_HOLD = 160;
const CURTAIN_OUT = 620; // layers exit upward in reverse order
const ARRIVE = 900; // destination section settles into place

/**
 * In-page links (#services, #top…) move with a "gate change": two curved panels (aqua, then
 * navy) sweep up over the page, the destination's gate sign and name reveal behind a mask,
 * the page jumps underneath, the panels exit off the top and the section rises into place. Jumping (rather than smooth-scrolling) means the opening zoom never replays.
 * Reduced motion and the skip link get a plain instant jump. Keeps the URL hash in sync
 * and moves focus to the destination for keyboard users.
 */
export function AnchorNav({ homeLabel }: { homeLabel: string }) {
  const [curtain, setCurtain] = React.useState<Curtain>(null);
  const shaderReady = useShaderReady();
  const busy = React.useRef(false);

  React.useEffect(() => {
    const timers: number[] = [];

    const arrive = (target: HTMLElement, id: string) => {
      // Tell the header this move is navigation, not a scroll-down (so it stays visible)
      window.dispatchEvent(new Event("site:navjump"));
      target.scrollIntoView({ behavior: "instant", block: "start" });
      if (id === "top") history.replaceState(null, "", location.pathname);
      else history.pushState(null, "", `#${id}`);
      if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
    };

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const link = (e.target as Element).closest<HTMLAnchorElement>('a[href^="#"]');
      if (!link) return;
      const id = decodeURIComponent(link.hash.slice(1));
      const target = id ? document.getElementById(id) : null;
      if (!target) return;
      e.preventDefault();
      if (busy.current) return;

      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce || link.classList.contains("skip")) return arrive(target, id);

      // Label the curtain with the destination's gate sign and section name
      const eyebrow = target.querySelector(".eyebrow");
      const gate = eyebrow?.querySelector(".gate")?.textContent ?? undefined;
      const heading = target.matches("h1, h2") ? target : target.querySelector("h1, h2");
      const name = eyebrow
        ? (eyebrow.textContent ?? "").replace(gate ?? "", "").trim()
        : (heading?.textContent ?? "").trim();
      busy.current = true;
      setCurtain({ phase: "in", gate, label: name || homeLabel });

      timers.push(
        window.setTimeout(() => {
          arrive(target, id);
          timers.push(
            window.setTimeout(() => {
              setCurtain((c) => (c ? { ...c, phase: "out" } : c));
              // Let the destination section rise into place as the panels lift
              const section = id === "top" ? null : target;
              section?.classList.add("is-arriving");
              timers.push(window.setTimeout(() => section?.classList.remove("is-arriving"), ARRIVE));
              timers.push(
                window.setTimeout(() => {
                  setCurtain(null);
                  busy.current = false;
                }, CURTAIN_OUT),
              );
            }, CURTAIN_HOLD),
          );
        }, CURTAIN_IN),
      );
    };

    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("click", onClick);
      timers.forEach((t) => window.clearTimeout(t));
    };
  }, [homeLabel]);

  // Always mounted (hidden when idle) so the WebGL canvas is created once and reused
  return (
    <div
      className={cn("nav-curtain", curtain?.phase === "in" && "is-in", curtain?.phase === "out" && "is-out")}
      aria-hidden="true"
    >
      <span className="curtain-layer curtain-layer-1" />
      <span className="curtain-layer curtain-layer-2">
        {shaderReady && (
          <ShaderAnimation
            className="absolute inset-0 h-full w-full"
            palette={LAGOON_RINGS}
            active={!!curtain}
            maxPixelRatio={1.5}
            // Every transition starts from the same phase: rings near the centre, blooming out
            // and still on screen as the panels leave (ring radius ≈ fract(time × 0.05) × 5,
            // so 0.8 → 0.2 at the start, growing 0.75/s → ~1.2 after the ~1.3 s transition)
            restartAt={0.8}
            speed={3}
          />
        )}
      </span>
      {curtain && (
        <p className="curtain-label">
          {curtain.gate && (
            <span className="curtain-mask">
              <span className="gate">{curtain.gate}</span>
            </span>
          )}
          <span className="curtain-mask">
            <span>{curtain.label}</span>
          </span>
        </p>
      )}
    </div>
  );
}

/**
 * Elements marked [data-tilt="N"] (the boarding pass, the footer ticket) lean toward the cursor,
 * up to N degrees, with a soft glare that follows it. Mouse/trackpad only; skipped for touch and
 * reduced motion. Writes CSS variables, no re-renders.
 */
export function PassTilt() {
  React.useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;

    const cleanups = [...document.querySelectorAll<HTMLElement>("[data-tilt]")].map((el) => {
      const max = Number(el.dataset.tilt) || 5;
      let frame = 0;
      const onMove = (e: PointerEvent) => {
        cancelAnimationFrame(frame);
        frame = requestAnimationFrame(() => {
          const r = el.getBoundingClientRect();
          const x = (e.clientX - r.left) / r.width; // 0..1
          const y = (e.clientY - r.top) / r.height;
          el.style.setProperty("--ry", `${((x - 0.5) * 2 * max).toFixed(2)}deg`);
          el.style.setProperty("--rx", `${((0.5 - y) * 1.6 * max).toFixed(2)}deg`);
          el.style.setProperty("--gx", `${(x * 100).toFixed(1)}%`);
          el.style.setProperty("--gy", `${(y * 100).toFixed(1)}%`);
        });
      };
      const onEnter = () => el.classList.add("is-tilting");
      const onLeave = () => {
        cancelAnimationFrame(frame);
        el.classList.remove("is-tilting");
        el.style.setProperty("--rx", "0deg");
        el.style.setProperty("--ry", "0deg");
      };
      el.addEventListener("pointerenter", onEnter);
      el.addEventListener("pointermove", onMove);
      el.addEventListener("pointerleave", onLeave);
      return () => {
        cancelAnimationFrame(frame);
        el.removeEventListener("pointerenter", onEnter);
        el.removeEventListener("pointermove", onMove);
        el.removeEventListener("pointerleave", onLeave);
      };
    });
    return () => cleanups.forEach((fn) => fn());
  }, []);
  return null;
}
