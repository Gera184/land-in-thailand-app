import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans_Hebrew, Karantina, Noto_Sans_Thai } from "next/font/google";

import { CONTENT, type Locale } from "@/lib/content";
import { SITE_URL } from "@/lib/site";
import { PAGES, type PageKey } from "@/lib/pages-content";

// Display: condensed poster face for headlines, codes and prices
const karantina = Karantina({
  variable: "--font-karantina",
  subsets: ["hebrew", "latin"],
  weight: ["300", "700"],
  display: "swap",
  // Not preloaded: on the home page the headlines arrive after the opening zoom, and the
  // early bandwidth goes to the hero image and body face instead (size-adjusted fallback)
  preload: false,
});

// Body and small headings
const plex = IBM_Plex_Sans_Hebrew({
  variable: "--font-plex",
  subsets: ["hebrew", "latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

// Only used for the Thai city names; not preloaded
const notoThai = Noto_Sans_Thai({
  variable: "--font-noto-thai",
  subsets: ["thai"],
  weight: "500",
  display: "swap",
  preload: false,
});

const PATHS: Record<Locale, string> = { he: "/", en: "/en/" };

const PAGE_TITLES: Record<PageKey, Record<Locale, string>> = {
  about: { he: "עלינו · Land In Thailand", en: "About us · Land In Thailand" },
  legal: { he: "מידע משפטי · Land In Thailand", en: "Legal · Land In Thailand" },
};

export function buildMetadata(locale: Locale, page?: PageKey): Metadata {
  const c = CONTENT[locale];
  const path = (l: Locale) => `${PATHS[l]}${page ? `${page}/` : ""}`;
  return {
    metadataBase: new URL(SITE_URL),
    title: page ? PAGE_TITLES[page][locale] : c.meta.title,
    description: page ? PAGES[page][locale].description : c.meta.description,
    alternates: {
      canonical: path(locale),
      languages: { he: path("he"), en: path("en"), "x-default": path("he") },
    },
    openGraph: {
      type: "website",
      locale: c.meta.ogLocale,
      alternateLocale: locale === "he" ? ["en_US"] : ["he_IL"],
      url: path(locale),
      // Inner pages share their own title and summary, not the home page's
      title: page ? PAGE_TITLES[page][locale] : c.meta.title,
      description: page ? PAGES[page][locale].description : c.meta.ogDescription,
      images: [{ url: "/media/og.jpg", width: 1200, height: 630, alt: c.meta.title }],
    },
    // Real files (Google uses a crawlable icon, at least 48px); iOS uses the touch icon
    icons: {
      icon: [
        { url: "/icon.svg", type: "image/svg+xml" },
        { url: "/icon-48.png", sizes: "48x48", type: "image/png" },
        { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      ],
      apple: { url: "/apple-touch-icon.png", sizes: "180x180" },
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#0B1B22",
  viewportFit: "cover",
};

/** The <html> shell shared by both language root layouts. */
export function RootDocument({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  const c = CONTENT[locale];
  return (
    // suppressHydrationWarning: the head script below adds `js` (and may add `curtain-arriving` / `menu-restore`) before React hydrates
    <html
      lang={locale}
      dir={c.dir}
      className={`${karantina.variable} ${plex.variable} ${notoThai.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Arriving at a #section: no smooth scroll for the browser's jump to it (it would play the
            opening zoom on the way). Cross-page transition: if the previous page handed over the
            curtain, paint the cover before first paint (no flash); AnchorNav sweeps it away.
            Self-clears after 4s. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add("js");try{if(location.hash)document.documentElement.style.scrollBehavior="auto"}catch(e){}try{var d=JSON.parse(sessionStorage.getItem("lit:curtain"));if(d&&Date.now()-d.t<8000&&!matchMedia("(prefers-reduced-motion: reduce)").matches){var r=document.documentElement;r.classList.add("curtain-arriving");setTimeout(function(){r.classList.remove("curtain-arriving")},4000)}}catch(e){}try{if(/^[1k]$/.test(sessionStorage.getItem("lit-menu-open")||"")&&matchMedia("(max-width: 959px)").matches){document.documentElement.classList.add("menu-restore");setTimeout(function(){document.documentElement.classList.remove("menu-restore")},4000)}}catch(e){}`,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
