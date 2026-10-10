"use client";
import * as React from "react";

import { cn } from "@/lib/utils";
import type { Content } from "@/lib/content";
import { photo } from "@/lib/photos";
import { Rich } from "./rich";
import { Eyebrow } from "./eyebrow";
import { SplitFlap } from "./split-flap";
import { Ship } from "lucide-react";

/**
 * Desktop: a list beside a sticky photo stage that cross-fades on hover/click.
 * Mobile: an accordion with the photo inside each open item.
 */
export function Cities({ c: content }: { c: Pick<Content, "cities"> }) {
  const CITIES = content.cities.items;
  const [active, setActive] = React.useState(CITIES[0].key);
  const [label, setLabel] = React.useState(CITIES[0].thai);
  const [code, setCode] = React.useState({ code: CITIES[0].code, via: CITIES[0].via });
  const [labelOn, setLabelOn] = React.useState(true);
  const stageRef = React.useRef<HTMLDivElement>(null);
  const [warm, setWarm] = React.useState(false);

  // Fetch all stage photos once the section is near, so swaps are instant
  React.useEffect(() => {
    const stage = stageRef.current;
    if (!stage || !("IntersectionObserver" in window)) return setWarm(true);
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setWarm(true);
          io.disconnect();
        }
      },
      { rootMargin: "600px 0px" },
    );
    io.observe(stage);
    return () => io.disconnect();
  }, []);

  const isDesktop = () => window.matchMedia("(min-width: 960px)").matches;

  const open = (key: string) => {
    if (key === active) return;
    const city = CITIES.find((c) => c.key === key)!;
    setActive(key);
    setCode({ code: city.code, via: city.via });
    setLabelOn(false);
    window.setTimeout(() => {
      setLabel(city.thai);
      setLabelOn(true);
    }, 220);
  };

  const onClick = (key: string) => {
    // On mobile, tapping the open city closes it; on desktop one is always open
    if (key === active && !isDesktop()) setActive("");
    else open(key);
  };

  return (
    <section className="cities section" id="cities" aria-labelledby="cities-title">
      <div className="wrap">
        <header className="section-head">
          <Eyebrow gate={4}>{content.cities.eyebrow}</Eyebrow>
          <h2 id="cities-title" className="h2">
            <Rich text={content.cities.title} />
          </h2>
          <p className="lead">
            {content.cities.lead}
          </p>
        </header>

        <div className="city-explorer">
          <div className="city-stage" aria-hidden="true" ref={stageRef}>
            {CITIES.map((c) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={c.key}
                className={cn(c.key === active && "is-active")}
                src={photo(c.photo, { w: 1100, h: 1300 })}
                width={1100}
                height={1300}
                alt=""
                loading={warm ? "eager" : "lazy"}
                decoding="async"
              />
            ))}
            <div className="city-board">
              <SplitFlap text={code.code} className="flaps" />
              {code.via && (
                <span className="city-via">
                  <Ship className="i" aria-hidden="true" />
                  {code.via}
                </span>
              )}
              <span className="city-stage-label" lang="th" style={{ opacity: labelOn ? 1 : 0 }}>
                {label}
              </span>
            </div>
          </div>

          <ul className="city-list" role="list">
            {CITIES.map((c) => {
              const isOpen = c.key === active;
              return (
                <li key={c.key} className={cn("city", isOpen && "is-active")}>
                  <button
                    className="city-btn"
                    aria-expanded={isOpen}
                    aria-controls={`city-${c.key}`}
                    onClick={() => onClick(c.key)}
                    onMouseEnter={() => isDesktop() && open(c.key)}
                  >
                    <span className="city-code" lang="en" aria-hidden="true">
                      {c.code}
                      {c.via && <Ship className="city-code-via" aria-hidden="true" />}
                    </span>
                    <span className="city-name">{c.name}</span>
                    <span className="city-tag">{c.tag}</span>
                  </button>
                  <div className="city-panel" id={`city-${c.key}`}>
                    <div className="city-panel-inner">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        className="city-img"
                        src={photo(c.photo, { w: 800, h: 500 })}
                        width={800}
                        height={500}
                        alt={c.alt}
                        loading="lazy"
                        decoding="async"
                      />
                      <p>{c.body}</p>
                      <dl className="city-facts">
                        {c.facts.map(([k, v]) => (
                          <div key={k}>
                            <dt>{k}</dt>
                            <dd>{v}</dd>
                          </div>
                        ))}
                      </dl>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
