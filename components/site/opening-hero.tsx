"use client";
import * as React from "react";
import { LazyMotion, domMin, m, useMotionValueEvent, useTransform, type MotionValue } from "framer-motion";

import { ZoomParallax } from "@/components/ui/zoom-parallax";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import type { Content } from "@/lib/content";
import { waLink } from "@/lib/site";
import { photo } from "@/lib/photos";
import { Rich } from "./rich";
import { WhatsAppIcon } from "./icons";

/* Centre tile (index 0) is the lagoon video; it zooms 4× to fill the screen. */
const TILE_SOURCES = [
  {
    src: "/media/hero-desktop.jpg",
    mobileSrc: "/media/hero-mobile.jpg",
    video: { desktop: "/media/hero-desktop.mp4", mobile: "/media/hero-mobile.mp4", startOn: "scroll" as const },
  },
  { src: photo("bangkok", { w: 700, q: 50 }) },
  { src: photo("chiangmai", { w: 700, q: 50 }) },
  { src: photo("phuket", { w: 700, q: 50 }) },
  { src: photo("monks", { w: 600, q: 50 }) },
  { src: photo("samui", { w: 800, q: 50 }) },
  { src: photo("phangan", { w: 500, q: 50 }) },
];

/**
 * Opening scene: a collage of Thailand around the lagoon video. Scrolling zooms
 * everything toward the reader until the lagoon fills the screen, then the pitch
 * and CTAs arrive.
 */
export function OpeningHero({ c }: { c: Pick<Content, "hero" | "waDefault"> }) {
  const tiles = TILE_SOURCES.map((t, i) => ({ ...t, alt: c.hero.tileAlts[i] }));
  return (
    <section data-hero aria-labelledby="hero-title">
      <LazyMotion features={domMin} strict>
        <ZoomParallax images={tiles} className="bg-[#0B1B22]" videoLabels={{ pause: c.hero.videoPause, play: c.hero.videoPlay }}>
          {(progress) => <OpeningOverlay progress={progress} c={c} />}
        </ZoomParallax>
      </LazyMotion>
    </section>
  );
}

function OpeningOverlay({ progress, c }: { progress: MotionValue<number>; c: Pick<Content, "hero" | "waDefault"> }) {
  // Reduced motion shows the final frame at once, and `progress` is then a fixed value that never
  // emits "change" — so read the media query directly. Not framer's useReducedMotion: that is
  // already true on the first client render, which mismatches the server HTML, and React keeps
  // the server's `inert` attribute (the CTAs stayed dead). This hook re-renders after hydration.
  const reduced = usePrefersReducedMotion();
  const [scrolledIn, setScrolledIn] = React.useState(false);
  const [hintGone, setHintGone] = React.useState(false);
  useMotionValueEvent(progress, "change", (p) => {
    setScrolledIn(p > 0.7);
    setHintGone(p > 0.08);
  });
  // CTAs stay out of the tab order until they're visible
  const revealed = reduced || scrolledIn;
  // The scroll hint leaves the tab order once it has faded out
  const hintHidden = reduced || hintGone;

  // First screen is photos only; the title arrives once the lagoon fills the screen
  // The shade is at full strength by the time the title is (readable over the video); final frame unchanged
  const shade = useTransform(progress, [0, 0.6, 0.85, 1], [0, 0, 1, 1]);
  const titleOpacity = useTransform(progress, [0, 0.65, 0.85], [0, 0, 1]);
  const titleY = useTransform(progress, [0.65, 0.85], [24, 0]);
  const detailsOpacity = useTransform(progress, [0.72, 0.95], [0, 1]);
  const detailsY = useTransform(progress, [0.72, 0.95], [28, 0]);
  const hintOpacity = useTransform(progress, [0, 0.08], [1, 0]);

  return (
    <>
      <m.div className="opening-shade" style={{ opacity: shade }} aria-hidden="true" />
      <div className="opening-copy">
        <m.div style={{ opacity: titleOpacity, y: titleY }} className="opening-title">
          <p className="eyebrow">{c.hero.eyebrow}</p>
          <h1 id="hero-title" className="hero-title">
            <Rich text={c.hero.title} />
          </h1>
        </m.div>

        <m.div className="opening-details" style={{ opacity: detailsOpacity, y: detailsY }}>
          <p className="hero-lede">
            {c.hero.lede}
          </p>
          {/* Out of the tab order until they are visible (the lede above is always announced) */}
          <div className="hero-actions" inert={!revealed}>
            <a className="btn btn-primary" href={waLink(c.waDefault)} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon />
              {c.hero.cta}
            </a>
            <a className="btn btn-ghost-light" href="#journey">
              {c.hero.secondary}
            </a>
          </div>
        </m.div>
      </div>

      <m.a
        href="#intro"
        className="scroll-hint"
        style={{ opacity: hintOpacity, visibility: hintHidden ? "hidden" : undefined }}
        // A pointer affordance only: tabbing onto it scrolled the hero and hid it under the focus
        tabIndex={-1}
        aria-hidden="true"
      >
        <i aria-hidden="true" />
      </m.a>
    </>
  );
}
