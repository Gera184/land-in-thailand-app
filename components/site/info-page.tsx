import { CONTENT, type Locale } from "@/lib/content";
import { PAGES, type PageKey } from "@/lib/pages-content";
import { Header } from "./header";
import { Footer } from "./sections";
import { AnchorNav, PassTilt, RevealObserver } from "./client-bits";
import { Eyebrow } from "./eyebrow";
import { Rich } from "./rich";

export const HOME: Record<Locale, string> = { he: "/", en: "/en/" };

/** About / Legal: same header and ticket footer as the home page, with an editorial article between. */
export function InfoPage({ locale, page }: { locale: Locale; page: PageKey }) {
  const c = CONTENT[locale];
  const p = PAGES[page][locale];
  const home = HOME[locale];
  const other: Locale = locale === "he" ? "en" : "he";

  return (
    <>
      <div id="top" />
      <a className="skip" href="#main">{c.skip}</a>
      <Header c={{ header: c.header, waDefault: c.waDefault }} home={home} switchHref={`${HOME[other]}${page}/`} />
      <main id="main" className="info-page">
        <header className="wrap info-head">
          <Eyebrow>{p.eyebrow}</Eyebrow>
          <h1 className="info-title">
            <Rich text={p.title} />
          </h1>
          <p className="info-intro">{p.intro}</p>
          {p.updated && <p className="info-updated">{p.updated}</p>}
        </header>

        {/* Legal: a small index of the three documents */}
        {page === "legal" && (
          <nav className="wrap info-index" aria-label={p.indexAria}>
            {p.sections
              .filter((s) => s.id)
              .map((s, i) => (
                <a key={s.id} href={`#${s.id}`}>
                  <span className="gate" lang="en" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {s.heading}
                </a>
              ))}
          </nav>
        )}

        <div className="wrap info-body">
          {p.sections.map((s) => (
            <section key={s.heading} id={s.id} className="info-section" aria-labelledby={s.id ? `${s.id}-h` : undefined}>
              <h2 id={s.id ? `${s.id}-h` : undefined} className="info-h2">
                {s.heading}
              </h2>
              <div className="info-text">
                {s.paragraphs.map((t) => (
                  <p key={t}>{t}</p>
                ))}
                {s.list && (
                  <ul role="list">
                    {s.list.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                )}
              </div>
            </section>
          ))}
        </div>
      </main>
      <Footer c={c} home={home} onHome={false} />
      <RevealObserver />
      <PassTilt />
      <AnchorNav homeLabel="Land in Thailand" />
    </>
  );
}
