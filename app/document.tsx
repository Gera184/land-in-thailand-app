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
    description: page ? PAGES[page][locale].intro : c.meta.description,
    alternates: {
      canonical: path(locale),
      languages: { he: path("he"), en: path("en"), "x-default": path("he") },
    },
    openGraph: {
      type: "website",
      locale: c.meta.ogLocale,
      alternateLocale: locale === "he" ? ["en_US"] : ["he_IL"],
      url: path(locale),
      title: c.meta.title,
      description: c.meta.ogDescription,
      images: [{ url: "/media/og.jpg", width: 1200, height: 630 }],
    },
    icons: {
      icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='14' fill='%230B1B22'/%3E%3Ccircle cx='32' cy='30' r='11' fill='%23F0502F'/%3E%3Cpath d='M10 44c7-4 14-4 22 0s15 4 22 0' stroke='%235EEAD4' stroke-width='4' fill='none' stroke-linecap='round'/%3E%3C/svg%3E",
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
    // suppressHydrationWarning: the head script below may add `curtain-arriving` / `menu-restore` before React hydrates
    <html
      lang={locale}
      dir={c.dir}
      className={`${karantina.variable} ${plex.variable} ${notoThai.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Cross-page transition: if the previous page handed over the curtain, paint the cover
            before first paint (no flash); AnchorNav sweeps it away. Self-clears after 4s. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var d=JSON.parse(sessionStorage.getItem("lit:curtain"));if(d&&Date.now()-d.t<8000&&!matchMedia("(prefers-reduced-motion: reduce)").matches){var r=document.documentElement;r.classList.add("curtain-arriving");setTimeout(function(){r.classList.remove("curtain-arriving")},4000)}}catch(e){}try{if(sessionStorage.getItem("lit-menu-open")==="1"&&matchMedia("(max-width: 959px)").matches){document.documentElement.classList.add("menu-restore");setTimeout(function(){document.documentElement.classList.remove("menu-restore")},4000)}}catch(e){}`,
          }}
        />
        <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="" />
        <link rel="preload" as="image" href="/media/hero-mobile.jpg" media="(max-aspect-ratio: 1/1)" fetchPriority="high" />
        <link rel="preload" as="image" href="/media/hero-desktop.jpg" media="(min-aspect-ratio: 1/1)" fetchPriority="high" />
      </head>
      <body>{children}</body>
    </html>
  );
}
