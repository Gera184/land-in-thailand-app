import type * as React from "react";
import { ChevronDown, Plane } from "lucide-react";

import { cn } from "@/lib/utils";
import type { Content } from "@/lib/content";
import { EMAIL, PHONE_DISPLAY, SOCIALS, waLink } from "@/lib/site";
import { photo, photoSet } from "@/lib/photos";
import { SERVICE_ICONS, WhatsAppIcon } from "./icons";
import { Rich } from "./rich";
import { FooterClocks } from "./footer-bits";
import BeamWordmarkFooter, { type SocialIcon } from "@/components/ui/beam-wordmark-footer";
import { Eyebrow } from "./eyebrow";
import { MarqueeToggle } from "./client-bits";

type P = { c: Content };

export function Marquee({ c }: P) {
  const items = [...c.cities.items, ...c.cities.items];
  return (
    <div className="marquee-wrap">
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {items.map((city, i) => (
          <span key={i} className="contents">
            {!city.via && <b className="mq-code" lang="en">{city.code}</b>}
            <span>{city.name}</span>
            <i lang="th">{city.thai}</i>
          </span>
        ))}
      </div>
    </div>
    <MarqueeToggle pause={c.cities.marqueePause} play={c.cities.marqueePlay} />
    </div>
  );
}

function BoardingPass({ c }: P) {
  return (
    <aside className="pass" data-observe data-tilt="5" aria-label={c.pass.aria}>
      <div className="pass-main">
        <div className="pass-top">
          <span lang="en">BOARDING PASS</span>
          {c.locale !== "en" && <span>{c.pass.label}</span>}
        </div>
        <div className="pass-route">
          <div>
            <b lang="en">TLV</b>
            <small>{c.pass.from}</small>
          </div>
          <div className="pass-plane" aria-hidden="true">
            <span />
            <Plane className="i" />
            <span />
          </div>
          <div>
            <b lang="en">BKK</b>
            <small>{c.pass.to}</small>
          </div>
        </div>
        <dl className="pass-meta">
          {c.pass.meta.map(([dt, dd]) => (
            <div key={dt}>
              <dt>{dt}</dt>
              <dd>{dd}</dd>
            </div>
          ))}
        </dl>
      </div>
      <span className="pass-stamp" aria-hidden="true">{c.pass.stamp}</span>
      <div className="pass-stub" aria-hidden="true">
        <div className="barcode" />
        <span lang="en">LIT · 001</span>
      </div>
    </aside>
  );
}

export function Intro({ c }: P) {
  return (
    <section className="intro section" id="intro" aria-labelledby="intro-title">
      <div className="wrap intro-grid">
        <div>
          <Eyebrow gate={1}>{c.intro.eyebrow}</Eyebrow>
          <h2 id="intro-title" className="h2">
            <Rich text={c.intro.title} />
          </h2>
          <div className="intro-pass">
            <BoardingPass c={c} />
          </div>
        </div>
        <div className="intro-body">
          <p className="lead">{c.intro.lead}</p>
          <ul className="pains" role="list">
            {c.intro.pains.map((p) => (
              <li key={p}>
                <span className="pain-x" aria-hidden="true" />
                {p}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export function Services({ c }: P) {
  const [feature, ...rest] = c.services.items;
  const FeatureIcon = SERVICE_ICONS[feature.icon];
  return (
    <section className="services section" id="services" aria-labelledby="services-title">
      <div className="wrap">
        <header className="section-head">
          <Eyebrow gate={2}>{c.services.eyebrow}</Eyebrow>
          <h2 id="services-title" className="h2">
            <Rich text={c.services.title} />
          </h2>
        </header>
        <div className="bento">
          <article className="tile tile-feature">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photo("pool", { w: 900 })}
              srcSet={photoSet("pool", [600, 1100])}
              sizes="(min-width: 960px) 40vw, 100vw"
              width={1100}
              height={740}
              alt={c.services.featureAlt}
              loading="lazy"
              decoding="async"
            />
            <div className="tile-body">
              <FeatureIcon className="tile-icon" strokeWidth={1.6} aria-hidden="true" />
              <h3>{feature.title}</h3>
              <p>{feature.body}</p>
            </div>
          </article>
          {rest.map((s, i) => {
            const Icon = SERVICE_ICONS[s.icon];
            return (
              <article key={s.title} className={cn("tile", i === rest.length - 1 && "tile-dark")}>
                <Icon className="tile-icon" strokeWidth={1.6} aria-hidden="true" />
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function Cost({ c }: P) {
  const max = Math.max(...c.cost.items.map((i) => i.value));
  return (
    <section className="cost section" id="cost" aria-labelledby="cost-title">
      <div className="wrap cost-grid">
        <header>
          <Eyebrow gate={5}>{c.cost.eyebrow}</Eyebrow>
          <h2 id="cost-title" className="h2">
            <Rich text={c.cost.title} />
          </h2>
          <p className="lead">{c.cost.lead}</p>
        </header>
        <figure className="bars" data-observe>
          <figcaption className="sr-only">{c.cost.caption}</figcaption>
          <ul role="list">
            {c.cost.items.map((item, i) => (
              <li
                key={item.name}
                className={cn("bar", item.ref && "bar-ref")}
                style={{ ["--v" as string]: item.value, ["--max" as string]: max, ["--bd" as string]: `${200 + i * 110}ms` }}
              >
                <span className="bar-name">{item.name}</span>
                <span className="bar-track"><span className="bar-fill" /></span>
                <span className="bar-val">₪{item.value.toLocaleString("en-US")}</span>
              </li>
            ))}
          </ul>
          <p className="bars-note">{c.cost.note}</p>
        </figure>
      </div>
    </section>
  );
}

export function Pricing({ c }: P) {
  return (
    <section className="pricing section" id="pricing" aria-labelledby="pricing-title">
      <div className="wrap">
        <header className="section-head center">
          <Eyebrow gate={6}>{c.pricing.eyebrow}</Eyebrow>
          <h2 id="pricing-title" className="h2">
            <Rich text={c.pricing.title} />
          </h2>
        </header>
        <div className="plans">
          {c.pricing.plans.map((p) => (
            <article key={p.name} className={cn("plan", p.highlight && "plan-hl")}>
              {p.highlight && <p className="plan-badge">{c.pricing.badge}</p>}
              <h3>{p.name}</h3>
              <p className="plan-for">{p.for}</p>
              <p className="price"><span>₪</span>{p.price}</p>
              <ul role="list">
                {p.items.map((it) => <li key={it}>{it}</li>)}
              </ul>
              <div className="ticket-tear" aria-hidden="true" />
              <a
                className={cn("btn", p.highlight ? "btn-primary" : "btn-outline")}
                href={waLink(p.msg)}
                target="_blank"
                rel="noopener"
              >
                {p.highlight && <WhatsAppIcon />}
                {p.cta}
              </a>
            </article>
          ))}
        </div>
        <p className="plans-note">
          {c.pricing.note}{" "}
          <a href={waLink(c.pricing.noteMsg)} target="_blank" rel="noopener">{c.pricing.noteLink}</a>.
        </p>
      </div>
    </section>
  );
}

export function Visas({ c }: P) {
  return (
    <section className="visas section" id="visas" aria-labelledby="visas-title">
      <div className="wrap visas-grid">
        <header>
          <Eyebrow gate={7}>{c.visas.eyebrow}</Eyebrow>
          <h2 id="visas-title" className="h2">
            <Rich text={c.visas.title} />
          </h2>
          <p className="lead">{c.visas.lead}</p>
          <p className="disclaimer">{c.visas.disclaimer}</p>
        </header>
        <div className="visa-list">
          {c.visas.items.map((v, i) => (
            // `name` makes the group exclusive: opening one closes the others (native)
            <details key={v.code} className="visa" name="visa" open={i === 0}>
              <summary>
                <span lang="en">{v.code}</span> {v.title}
                <ChevronDown className="chev" aria-hidden="true" />
              </summary>
              <p>{v.body}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Promises({ c }: P) {
  return (
    <section className="promises section" aria-labelledby="promises-title">
      <div className="wrap">
        <header className="section-head center">
          <Eyebrow gate={8}>{c.promises.eyebrow}</Eyebrow>
          <h2 id="promises-title" className="h2">
            <Rich text={c.promises.title} />
          </h2>
        </header>
        <ul className="promise-grid" role="list">
          {c.promises.items.map((p) => (
            <li key={p.num}>
              <span className="promise-num" lang="en">{p.num}</span>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Faq({ c }: P) {
  return (
    <section className="faq section" id="faq" aria-labelledby="faq-title">
      <div className="wrap faq-grid">
        <header>
          <Eyebrow gate={9}>{c.faq.eyebrow}</Eyebrow>
          <h2 id="faq-title" className="h2">
            <Rich text={c.faq.title} />
          </h2>
          <p className="lead">
            {c.faq.leadBefore} <a href={waLink(c.waDefault)} target="_blank" rel="noopener">{c.faq.leadLink}</a>.
          </p>
        </header>
        <div className="faq-list">
          {c.faq.items.map((f) => (
            <details key={f.q} className="qa" name="faq">
              <summary>
                {f.q}
                <ChevronDown className="chev" aria-hidden="true" />
              </summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Line icons in the footer component's own style (24×24, 1.5 stroke) */
const SOCIAL_ICONS: Record<string, React.ReactNode> = {
  Instagram: "instagram",
  TikTok: (
    <path
      d="M14 3.5v10.6a3.6 3.6 0 1 1-3.6-3.6M14 3.5c.4 2.7 2.3 4.5 5.2 4.7"
      fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
    />
  ),
  Facebook: (
    <path
      d="M13.6 20.5v-7.4h2.6l.4-3h-3V8.4c0-.9.3-1.5 1.6-1.5h1.6V4.2c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2h-2.6v3h2.6v7.4"
      fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"
    />
  ),
  WhatsApp: (
    <g fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round">
      <path d="M4.4 19.6l1.2-3.7a8 8 0 1 1 2.9 2.8z" />
      <path d="M9.3 8.4c.3-.4.6-.4.9-.4h.4l.9 2.1-.7.9c.5.9 1.1 1.6 2.1 2.1l.9-.7 2.1.9v.4c0 .3-.1.7-.5.9-.6.3-1.7.4-3.1-.4a8 8 0 0 1-2.7-2.7c-.8-1.5-.6-2.6-.3-3.1z" />
    </g>
  ),
  Gmail: (
    <g fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round">
      <rect x="3.25" y="5.5" width="17.5" height="13" rx="2" />
      <path d="M3.8 7.2 12 13.2l8.2-6" />
    </g>
  ),
};

/**
 * The one footer: Beam Wordmark Footer (components/ui) with the closing line + CTA on top,
 * the departure-board clocks under the credits, Company / Legal columns, and the
 * "Land in Thailand" wordmark the light runs through.
 *   home:   this locale's home path ("/" or "/en/")
 *   onHome: true on the one-page home, where section links stay in-page (#journey)
 */
export function Footer({ c, home, onHome = true }: P & { home: string; onHome?: boolean }) {
  const f = c.footer;
  const section = (id: string) => (onHome ? `#${id}` : `${home}#${id}`);
  const legal = (id: string) => `${home}legal/#${id}`;
  return (
    <BeamWordmarkFooter
      className="site-footer"
      brand="Land In Thailand"
      wordmark="Land in Thailand"
      company="Land In Thailand"
      background="#08161C"
      ink="#F2F8F8"
      muted="#DCE8EB" // ≥4.5:1 even where the beam is brightest
      accent="#5EEAD4"
      wordTop="#1F5560"
      wordFoot="#08161C"
      fontSans='var(--font-plex), system-ui, sans-serif'
      fontWord='var(--font-karantina), "Arial Narrow", sans-serif'
      wordWeight={700}
      cut={0.1}
      // Only networks with a real URL (no dead links in the tab order)
      socials={SOCIALS.filter((s) => s.href).map((s) => ({
        label: s.name,
        href: s.href,
        icon: SOCIAL_ICONS[s.name] as SocialIcon | React.ReactNode,
      }))}
      credits={[
        { label: f.tag },
        { lead: "WhatsApp · ", label: PHONE_DISPLAY, href: waLink(c.waDefault) },
        { label: EMAIL, href: `mailto:${EMAIL}` },
      ]}
      columns={[
        {
          title: f.company,
          links: [
            { label: f.about, href: `${home}about/` },
            { label: f.process, href: section("journey") },
            { label: f.faq, href: section("faq") },
          ],
        },
        {
          title: f.legal_,
          links: [
            { label: f.privacy, href: legal("privacy") },
            { label: f.terms, href: legal("terms") },
            { label: f.accessibility, href: legal("accessibility") },
          ],
        },
      ]}
      intro={
        <div className="footer-head">
          <h2 className="footer-title">{c.final.title}</h2>
          <div className="footer-head-side">
            <p className="footer-lede">{c.final.lede}</p>
            <a className="btn btn-primary btn-large" href={waLink(c.waDefault)} target="_blank" rel="noopener">
              <WhatsAppIcon />
              {c.final.cta}
            </a>
          </div>
        </div>
      }
      aside={<FooterClocks label={f.clocksLabel} bangkok={f.bangkok} telAviv={f.telAviv} ahead={f.ahead} />}
    />
  );
}
