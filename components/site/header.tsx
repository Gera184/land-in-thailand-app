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
  const [menuOpen, setMenuOpen] = React.useState(false);
  // Switching language from inside the menu reloads into the other page. It reads like a
  // departures board refreshing: items slide out here, the navy panel is painted on the new
  // page's first frame (head script → html.menu-restore), and the new-language items rise in.
  const [menuInstant, setMenuInstant] = React.useState(false);
  const [menuLeaving, setMenuLeaving] = React.useState(false);
  const menuButton = React.useRef<HTMLButtonElement>(null);
  const menuPanel = React.useRef<HTMLDivElement>(null);
  // Reopened after a tap on the menu's language link: focus the panel itself rather than its
  // first link, so touch users don't get a keyboard focus ring
  const quietFocus = React.useRef(false);
  const hrefFor = (h: string) => (inner ? `${home}${h}` : h);
  const langHref = switchHref ?? c.header.switchHref;

  // Mobile menu: lock page scroll, move focus in, Esc / Tab handling, focus back on close
  React.useEffect(() => {
    if (!menuOpen) return;
    const root = document.documentElement;
    const prevOverflow = root.style.overflow;
    root.style.overflow = "hidden";
    const panel = menuPanel.current;
    const focusables = () =>
      [...(panel?.querySelectorAll<HTMLElement>("a[href], button") ?? [])].filter((el) => !el.hasAttribute("disabled"));
    // The page behind the menu leaves the tab order and the screen-reader cursor while it's open
    const behind = [...document.querySelectorAll<HTMLElement>("#main, .site-footer, .mobile-cta, .skip")].filter(
      (el) => !el.inert,
    );
    behind.forEach((el) => (el.inert = true));
    const t = window.setTimeout(() => {
      if (quietFocus.current) {
        quietFocus.current = false;
        panel?.focus({ preventScroll: true });
      } else focusables()[0]?.focus();
    }, 60);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
      if (e.key === "Tab") {
        // The visible header controls (logo, language, WhatsApp, close) plus the panel's links
        const headerEls = [...document.querySelectorAll<HTMLElement>(".site-header a[href], .site-header button")].filter(
          (el) => el.getClientRects().length > 0,
        );
        const els = [...headerEls, ...focusables()];
        const i = els.indexOf(document.activeElement as HTMLElement);
        const next = e.shiftKey ? (i <= 0 ? els.length - 1 : i - 1) : i === els.length - 1 ? 0 : i + 1;
        e.preventDefault();
        els[next]?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    const button = menuButton.current;
    return () => {
      window.clearTimeout(t);
      // A cross-page curtain may have taken over (it keeps the page inert while covered)
      if (!root.classList.contains("lit-covered")) behind.forEach((el) => (el.inert = false));
      root.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
      const active = document.activeElement;
      if (!active || active === document.body || panel?.contains(active)) button?.focus({ preventScroll: true });
    };
  }, [menuOpen]);

  React.useEffect(() => {
    let reopen = false;
    let quiet = false;
    try {
      // "1": the switch was tapped or clicked; "k": activated from the keyboard
      const flag = sessionStorage.getItem("lit-menu-open");
      reopen = flag === "1" || flag === "k";
      quiet = flag === "1";
    } catch {
      /* storage blocked: the menu simply starts closed */
    }
    if (reopen && window.matchMedia("(min-width: 960px)").matches) {
      try {
        sessionStorage.removeItem("lit-menu-open");
      } catch {}
    }
    if (!reopen || window.matchMedia("(min-width: 960px)").matches) return;
    const root = document.documentElement;
    const t = window.setTimeout(() => {
      // Clear the flag only once we've acted on it (dev StrictMode runs effects twice)
      try {
        sessionStorage.removeItem("lit-menu-open");
      } catch {}
      quietFocus.current = quiet;
      setMenuInstant(true); // panel is already on screen: no wipe
      setMenuOpen(true);
    }, 0);
    // Once React owns the open state, drop the pre-paint class so the items rise in
    const t2 = window.setTimeout(() => root.classList.remove("menu-restore"), 40);
    // Re-enable the normal wipe for later open/close
    const t3 = window.setTimeout(() => setMenuInstant(false), 900);
    return () => {
      window.clearTimeout(t);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
    };
  }, []);

  const switchLanguageFromMenu = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    try {
      sessionStorage.setItem("lit-menu-open", e.detail === 0 ? "k" : "1");
    } catch {
      return; // storage blocked: plain navigation, the new page opens with the menu closed
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    e.preventDefault();
    const href = e.currentTarget.href;
    setMenuLeaving(true); // items slide out; the panel stays
    window.setTimeout(() => window.location.assign(href), 230);
  };

  // Back/forward cache: a page restored after switching language from the menu comes back
  // mid-departure (items faded out). Bring the items back and drop the stale reopen flag.
  React.useEffect(() => {
    const onPageShow = (e: PageTransitionEvent) => {
      if (!e.persisted) return;
      setMenuLeaving(false);
      setMenuInstant(false);
      try {
        sessionStorage.removeItem("lit-menu-open");
      } catch {}
    };
    window.addEventListener("pageshow", onPageShow);
    return () => window.removeEventListener("pageshow", onPageShow);
  }, []);

  // Close the menu if the screen grows to desktop width
  React.useEffect(() => {
    const mq = window.matchMedia("(min-width: 960px)");
    const onChange = () => mq.matches && setMenuOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

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
      // Solid only once the hero has left the area under the header (not while its last frame is on screen)
      setSolid(!hero || y > Math.max(40, hero.offsetHeight - 80));
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
    <>
    <header
      className={cn("site-header", solid && "is-scrolled", (hidden && !menuOpen) && "is-hidden", menuOpen && "is-menu-open")}
      // A keyboard user tabbing back into the header brings it back into view
      onFocus={() => setHidden(false)}
    >
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
              href={hrefFor(n.href)}
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
            href={langHref}
            hrefLang={c.header.switchLang}
            lang={c.header.switchLang}
            // Starts with the visible text, so voice control can target it by what it shows
            aria-label={`${c.header.switchLabel} · ${c.header.switchAria}`}
          >
            {c.header.switchLabel}
          </a>
          {/* aria-label keeps a name when the text is hidden on narrow phones */}
          <a
            className="btn btn-small btn-ghost-light header-cta"
            href={waLink(c.waDefault)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={c.header.whatsapp}
          >
            <WhatsAppIcon />
            <span>{c.header.whatsapp}</span>
          </a>
          <button
            ref={menuButton}
            type="button"
            className={cn("menu-btn", menuOpen && "is-open")}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? c.header.closeMenu : c.header.menu}
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </button>
        </div>
      </div>
    </header>

    {/* Mobile menu: a departures board of the sections */}
    <div
      id="mobile-menu"
      ref={menuPanel}
      className={cn("mobile-menu", menuOpen && "is-open", menuInstant && "is-instant", menuLeaving && "is-leaving")}
      aria-hidden={!menuOpen}
      inert={!menuOpen}
      tabIndex={-1}
    >
      <nav className="wrap mobile-menu-inner" aria-label={c.header.navAria}>
        <ol className="mobile-menu-list" role="list">
          {c.header.nav.map((n, i) => (
            <li key={n.href} style={{ "--i": i } as React.CSSProperties}>
              <a href={hrefFor(n.href)} onClick={() => setMenuOpen(false)}>
                <span className="gate" lang="en" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="mobile-menu-label">{n.label}</span>
              </a>
            </li>
          ))}
        </ol>
        <div className="mobile-menu-foot" style={{ "--i": c.header.nav.length } as React.CSSProperties}>
          <a className="btn btn-primary btn-large" href={waLink(c.waDefault)} target="_blank" rel="noopener noreferrer">
            <WhatsAppIcon />
            {c.header.whatsapp}
          </a>
          <a
            className="mobile-menu-lang"
            href={langHref}
            hrefLang={c.header.switchLang}
            lang={c.header.switchLang}
            onClick={switchLanguageFromMenu}
          >
            {c.header.languageLabel}
          </a>
        </div>
      </nav>
    </div>
    </>
  );
}
