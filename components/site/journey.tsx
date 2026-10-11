"use client";
import * as React from "react";
import { Plane } from "lucide-react";

import { cn } from "@/lib/utils";
import type { Content } from "@/lib/content";
import { waLink } from "@/lib/site";
import { photo, photoSet } from "@/lib/photos";
import { Rich } from "./rich";
import { Eyebrow } from "./eyebrow";
import { WhatsAppIcon } from "./icons";

/** Five-stop timeline; a plane travels the route with the reader's eye line. */
export function Journey({ c }: { c: Pick<Content, "journey" | "waDefault"> }) {
  const routeRef = React.useRef<HTMLOListElement>(null);
  const [active, setActive] = React.useState(-1);

  React.useEffect(() => {
    const route = routeRef.current;
    if (!route) return;
    const stops = [...route.querySelectorAll<HTMLElement>(".stop")];
    let ticking = false;

    const update = () => {
      ticking = false;
      const r = route.getBoundingClientRect();
      const eye = window.innerHeight * 0.55;
      const p = Math.min(1, Math.max(0, (eye - r.top) / r.height));
      route.style.setProperty("--p", p.toFixed(4));
      let last = -1;
      stops.forEach((s, i) => {
        if (s.getBoundingClientRect().top + 28 < eye) last = i;
      });
      setActive(last);
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section className="journey section" id="journey" aria-labelledby="journey-title">
      <div className="journey-bg" aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={photo("boats", { w: 1400 })}
          srcSet={photoSet("boats")}
          sizes="100vw"
          width={1600}
          height={1280}
          alt=""
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className="wrap journey-grid">
        <header className="journey-head">
          <Eyebrow gate={3}>{c.journey.eyebrow}</Eyebrow>
          <h2 id="journey-title" className="h2">
            <Rich text={c.journey.title} />
          </h2>
          <p className="lead">
            {c.journey.lead}
          </p>
          <a className="btn btn-primary" href={waLink(c.waDefault)} target="_blank" rel="noopener noreferrer">
            <WhatsAppIcon />
            {c.journey.cta}
          </a>
        </header>

        <ol className="route" role="list" ref={routeRef}>
          <li className="route-line" aria-hidden="true">
            <span className="route-fill" />
            <span className="route-plane">
              <Plane className="i" />
            </span>
          </li>
          {c.journey.steps.map((s, i) => (
            <li key={s.title} className={cn("stop", i <= active && "is-active")}>
              <span className="stop-num" lang="en">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <p className="stop-when">{s.when}</p>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
