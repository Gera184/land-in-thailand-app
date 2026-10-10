/*
 * Every still photo on the site, in one place.
 *
 * Today they are Unsplash stand-ins. To use your own generated image, save it as
 * public/media/photos/<name>.jpg (about 1600px on the long side) and change that
 * entry to { local: "<name>.jpg" }. Prompts for each shot: docs/image-prompts.md
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

type Source = { unsplash: string } | { local: string };

const SOURCES: Record<PhotoKey, Source> = {
  bangkok: { unsplash: "1531169628939-e84f860fa5d6" },
  chiangmai: { unsplash: "1512553353614-82a7370096dc" },
  phuket: { unsplash: "1605045544284-d13c6d6a60a6" },
  monks: { unsplash: "1576073880470-702df70825fc" },
  samui: { unsplash: "1572529593091-6c05c37cacc7" },
  phangan: { unsplash: "1537956965359-7573183d1f57" },
  pool: { unsplash: "1543489822-c49534f3271f" },
  boats: { unsplash: "1598255055837-723370293a03" },
};

type Size = { w: number; h?: number; q?: number };

/** URL for a photo at (roughly) the given size. Local files are served as-is. */
export function photo(key: PhotoKey, { w, h, q = 60 }: Size): string {
  const src = SOURCES[key];
  if ("local" in src) return `/media/photos/${src.local}`;
  return `https://images.unsplash.com/photo-${src.unsplash}?auto=format&fit=crop&w=${w}${h ? `&h=${h}` : ""}&q=${q}`;
}

/** srcSet for responsive photos (local files have a single size, so none is needed). */
export function photoSet(key: PhotoKey, widths: number[], q = 60): string | undefined {
  if ("local" in SOURCES[key]) return undefined;
  return widths.map((w) => `${photo(key, { w, q })} ${w}w`).join(", ");
}
