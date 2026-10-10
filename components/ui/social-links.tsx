"use client";

import * as React from "react";
import { AnimatePresence, LazyMotion, domAnimation, m, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

/*
 * Based on the 21st.dev "social-links" component: hovering a name raises its icon above it
 * with a small random tilt, siblings dim, and clicking gives the icon a pop.
 * Additions for this site:
 *   - optional `href` per item: rendered as a real link (keyboard focus raises the icon too)
 *   - the click pop is scoped to this component (the original listened to every page click)
 *   - LazyMotion + `m` (smaller bundle); reduced motion shows the icon without movement
 *   - `iconsOnly`: show the icons themselves instead of names (names become accessible labels);
 *     hover lifts the icon with the same random tilt, dims siblings, and click pops it
 */

/** A small random tilt (±10°) for the raised icon, picked on each hover */
const randomTilt = () => Math.random() * 20 - 10;

interface Social {
  name: string;
  image: string;
  /** Optional link; without it the item behaves like the original (a non-link) */
  href?: string;
  /** Open in a new tab (default true for http links) */
  external?: boolean;
}

interface SocialLinksProps extends React.HTMLAttributes<HTMLDivElement> {
  socials: Social[];
  /** Show the icons as the items (no text); the name becomes the accessible label */
  iconsOnly?: boolean;
}

export function SocialLinks({ socials, className, iconsOnly = false, ...props }: SocialLinksProps) {
  const [hoveredSocial, setHoveredSocial] = React.useState<string | null>(null);
  const [rotation, setRotation] = React.useState<number>(0);
  const [clicked, setClicked] = React.useState<boolean>(false);
  const reduced = useReducedMotion();
  const clickTimer = React.useRef<number | undefined>(undefined);

  React.useEffect(() => () => window.clearTimeout(clickTimer.current), []);

  const animation = {
    scale: clicked && !reduced ? [1, 1.3, 1] : 1,
    transition: { duration: 0.3 },
  };

  const show = (name: string) => {
    setHoveredSocial(name);
    setRotation(reduced ? 0 : randomTilt());
  };
  const pop = () => {
    setClicked(true);
    window.clearTimeout(clickTimer.current);
    clickTimer.current = window.setTimeout(() => setClicked(false), 200);
  };

  return (
    <LazyMotion features={domAnimation} strict>
      <div className={cn("flex items-center justify-center gap-0", className)} {...props}>
        {socials.map((social, index) => {
          const external = social.external ?? /^https?:/.test(social.href ?? "");
          const label = <span className="block text-lg font-medium">{social.name}</span>;
          const itemClass = cn(
            "relative cursor-pointer px-5 py-2 transition-opacity duration-200",
            hoveredSocial && hoveredSocial !== social.name ? "opacity-50" : "opacity-100",
          );
          const handlers = {
            onMouseEnter: () => show(social.name),
            onMouseLeave: () => setHoveredSocial(null),
            onFocus: () => show(social.name),
            onBlur: () => setHoveredSocial(null),
            onClick: pop,
          };
          const icon = iconsOnly ? (
            <m.img
              src={social.image}
              alt=""
              className="block size-12"
              animate={
                hoveredSocial === social.name && !reduced
                  ? { y: -6, rotate: rotation, scale: clicked ? [1, 1.25, 1] : 1.06 }
                  : { y: 0, rotate: 0, scale: 1 }
              }
              transition={{ type: "spring", stiffness: 420, damping: 22, mass: 0.6 }}
            />
          ) : (
            <AnimatePresence>
              {hoveredSocial === social.name && (
                <m.div
                  className="pointer-events-none absolute bottom-0 left-0 right-0 flex h-full w-full items-center justify-center"
                  animate={animation}
                >
                  <m.img
                    key={social.name}
                    src={social.image}
                    alt=""
                    className="size-16"
                    initial={reduced ? { y: -50, opacity: 0 } : { y: -40, rotate: rotation, opacity: 0, filter: "blur(2px)" }}
                    animate={{ y: -50, opacity: 1, filter: "blur(0px)" }}
                    exit={reduced ? { opacity: 0 } : { y: -40, opacity: 0, filter: "blur(2px)" }}
                    transition={{ duration: reduced ? 0.1 : 0.2 }}
                  />
                </m.div>
              )}
            </AnimatePresence>
          );

          const a11y = iconsOnly ? { "aria-label": social.name, title: social.name } : {};
          return social.href ? (
            <a
              key={index}
              href={social.href}
              className={itemClass}
              {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              {...a11y}
              {...handlers}
            >
              {!iconsOnly && label}
              {icon}
            </a>
          ) : (
            <div key={index} className={itemClass} {...(iconsOnly ? { role: "img", ...a11y } : {})} {...handlers}>
              {!iconsOnly && label}
              {icon}
            </div>
          );
        })}
      </div>
    </LazyMotion>
  );
}

export default SocialLinks;
