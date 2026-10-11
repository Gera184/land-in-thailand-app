/*
 * Every still photo on the site, in one place. All are served from this site
 * (public/media/photos/), so no visitor data goes to a third party.
 *
 * Each photo exists in three widths: <name>-480.webp, -800.webp and -1200.webp. Today they are
 * Unsplash photos (Unsplash License) saved locally; to swap in your own generated image,
 * export it at those three widths with the same names. Prompts: docs/image-prompts.md
 */

export type PhotoKey =
  | "bangkok"
  | "chiangmai"
  | "phuket"
  | "monks"
  | "samui"
  | "phangan"
  | "pool"
  | "boats";

const WIDTHS = [480, 800, 1200] as const;

type Size = { w: number; h?: number };

/** URL for a photo at (roughly) the given width: the smallest stored width that covers it. */
export function photo(key: PhotoKey, { w }: Size): string {
  const width = WIDTHS.find((x) => x >= w) ?? WIDTHS[WIDTHS.length - 1];
  return `/media/photos/${key}-${width}.webp`;
}

/** srcSet with every stored width; the browser picks by the `sizes` attribute. */
export function photoSet(key: PhotoKey): string {
  return WIDTHS.map((w) => `/media/photos/${key}-${w}.webp ${w}w`).join(", ");
}
