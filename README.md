# Land In Thailand — website

Next.js (static export) + TypeScript + Tailwind CSS + shadcn/ui. Hebrew (right-to-left) at `/`, English (left-to-right) at `/en/`.

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
```

## Publish

```bash
npm run build      # writes the finished site to out/
```

Upload the contents of `out/` to any static host (Netlify drag-and-drop, Vercel, Cloudflare Pages, GitHub Pages).

## Where things are

| What | File |
|---|---|
| All page copy, in Hebrew and English (prices, cities, FAQ…) | `lib/content.ts` |
| Phone, email, WhatsApp number, domain, social links | `lib/site.ts` |
| About + Legal page copy (privacy, terms, accessibility statement) | `lib/pages-content.ts` |
| Pages | `/` and `/en/` (home), `/about/`, `/legal/` (+ `/en/…`) |
| Hebrew / English root layouts | `app/(he)/`, `app/(en)/en/` (shared shell in `app/document.tsx`) |
| Opening scroll scene (photo collage zooms into the lagoon video) | `components/site/opening-hero.tsx` |
| The reusable zoom-parallax component | `components/ui/zoom-parallax.tsx` |
| Page sections | `components/site/*.tsx`, assembled in `components/site/site-page.tsx` |
| Brand colours, fonts, page styles | `app/globals.css` (shadcn tokens), `app/site.css` |
| Hero video + posters | `public/media/` |
| Every still photo (swap Unsplash → your own here) | `lib/photos.ts` |
| Prompts for generating matching photos | `docs/image-prompts.md` |
