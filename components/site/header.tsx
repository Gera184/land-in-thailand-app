"use client";
import * as React from "react";

import { cn } from "@/lib/utils";
import type { Content } from "@/lib/content";
import { waLink } from "@/lib/site";
import { BrandMark, WhatsAppIcon } from "./icons";

/**
 * Transparent over the opening scene; solid after it. Hides on scroll-down, returns on scroll-up.
 * On inner pages (About, Legal) pass `home` (this locale's home path) so section links point back
 * to the home page, and `switchHref` for the matching page in the other language. Inner pages
 * have no hero, so the header is solid from the start.
 */
export function Header({
  c,
  home,
  switchHref,
}: {
  c: Pick<Content, "header" | "waDefault">;
  home?: string;
  switchHref?: string;
}) {
  const inner = home !== undefined;
  const [solid, setSolid] = React.useState(inner);
  const [hidden, setHidden] = React.useState(false);
  const [current, setCurrent] = React.useState<string | null>(null);

  // Follow the section being read: a thin underline sits under its nav item
  React.useEffect(() => {
    const ids = c.header.nav.map((n) => n.href.slice(1));
    const sections = ids.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => !!el);
    if (!sections.length || !("IntersectionObserver" in window)) return;
    const visible = new Map<string, number>();
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => visible.set(e.target.id, e.isIntersecting ? e.intersectionRatio : 0));
        // The section crossing the reading line (35% down the screen) wins
        const best = [...visible.entries()].filter(([, r]) => r > 0).map(([id]) => id);
        setCurrent(best.length ? `#${best[best.length - 1]}` : null);
      },
      { rootMargin: "-35% 0px -60% 0px", threshold: [0, 0.01] },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [c.header.nav]);

  React.useEffect(() => {
    const hero = document.querySelector<HTMLElement>("[data-hero]");
    let lastY = window.scrollY;
    let ticking = false;
    let navJumpAt = -Infinity;

    const update = () => {
      ticking = false;
      const y = window.scrollY;
      const heroEnd = hero ? hero.offsetHeight - window.innerHeight : 40;
      setSolid(!hero || y > Math.max(40, heroEnd));
      // A nav jump isn't the visitor scrolling down: keep the header shown and re-baseline,
      // so it only hides again on a real scroll down from the new position
      if (performance.now() - navJumpAt < 600) {
        setHidden(false);
        lastY = y;
        return;
      }
      if (y > heroEnd + window.innerHeight * 0.5 && y > lastY + 4) setHidden(true);
      else if (y < lastY - 4 || y <= heroEnd) setHidden(false);
      lastY = y;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    const onNavJump = () => {
      navJumpAt = performance.now();
      setHidden(false);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    window.addEventListener("site:navjump", onNavJump);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("site:navjump", onNavJump);
    };
  }, []);

  return (
    <header className={cn("site-header", solid && "is-scrolled", hidden && "is-hidden")}>
      <div className="wrap header-row">
        <a href={inner ? home : "#top"} className="brand" aria-label={c.header.homeAria}>
          <BrandMark />
          <span className="brand-word" lang="en">
            Land <em>in</em> Thailand
          </span>
        </a>
        <nav className="nav" aria-label={c.header.navAria}>
          {c.header.nav.map((n) => (
            <a
              key={n.href}
              href={inner ? `${home}${n.href}` : n.href}
              className={cn(current === n.href && "is-current")}
              aria-current={current === n.href ? "location" : undefined}
            >
              {n.label}
            </a>
          ))}
        </nav>
        <div className="header-actions">
          <a
            className="lang-switch"
            href={switchHref ?? c.header.switchHref}
            hrefLang={c.header.switchLang}
            lang={c.header.switchLang}
            aria-label={c.header.switchAria}
          >
            {c.header.switchLabel}
          </a>
          {/* aria-label keeps a name when the text is hidden on narrow phones */}
          <a
            className="btn btn-small btn-ghost-light header-cta"
            href={waLink(c.waDefault)}
            target="_blank"
            rel="noopener"
            aria-label={c.header.whatsapp}
          >
            <WhatsAppIcon />
            <span>{c.header.whatsapp}</span>
          </a>
        </div>
      </div>
    </header>
  );
}
