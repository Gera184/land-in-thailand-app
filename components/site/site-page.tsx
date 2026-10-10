import { CONTENT, type Locale } from "@/lib/content";
import { EMAIL, PHONE_TEL } from "@/lib/site";
import { Header } from "./header";
import { OpeningHero } from "./opening-hero";
import { Journey } from "./journey";
import { Cities } from "./cities";
import { AnchorNav, MobileCta, PassTilt, RevealObserver } from "./client-bits";
import { Cost, Faq, Footer, Intro, Marquee, Pricing, Promises, Services, Visas } from "./sections";

/** The full one-page site in the given language. */
export function SitePage({ locale }: { locale: Locale }) {
  const c = CONTENT[locale];
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Land In Thailand",
    description: c.jsonLdDescription,
    email: EMAIL,
    telephone: PHONE_TEL,
    areaServed: ["Bangkok", "Phuket", "Chiang Mai", "Koh Samui", "Koh Phangan"],
    availableLanguage: ["he", "en"],
  };

  return (
    <>
      {/* Top-of-page target for the logo links (in normal flow, unlike the fixed header) */}
      <div id="top" />
      <a className="skip" href="#main">{c.skip}</a>
      {/* Client components get only their own slice of the copy, so it isn't serialised into the page five times */}
      <Header c={{ header: c.header, waDefault: c.waDefault }} />
      <main id="main">
        <OpeningHero c={{ hero: c.hero, waDefault: c.waDefault }} />
        <Marquee c={c} />
        <Intro c={c} />
        <Services c={c} />
        <Journey c={{ journey: c.journey, waDefault: c.waDefault }} />
        <Cities c={{ cities: c.cities }} />
        <Cost c={c} />
        <Pricing c={c} />
        <Visas c={c} />
        <Promises c={c} />
        <Faq c={c} />
      </main>
      <Footer c={c} home={locale === "he" ? "/" : "/en/"} />
      <MobileCta c={{ mobileCta: c.mobileCta, waDefault: c.waDefault }} />
      <RevealObserver />
      <PassTilt />
      <AnchorNav homeLabel="Land in Thailand" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
