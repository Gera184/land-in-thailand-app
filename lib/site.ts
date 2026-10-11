/* Shared, language-independent details. Page copy lives in lib/content.ts. */

export const WA_NUMBER = "972542758427";
export const PHONE_DISPLAY = "054-275-8427";
export const PHONE_TEL = "+972542758427";
export const EMAIL = "support@landinthailand.studio";

/** Production domain (GitHub Pages custom domain, see public/CNAME) */
export const SITE_URL = "https://landinthailand.studio";

export const waLink = (msg: string) => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;

/**
 * Footer social links. TODO: add your Instagram / TikTok / Facebook page addresses —
 * until an `href` is set, that item shows (with its hover icon) but isn't a link.
 */
export type SocialName = "Instagram" | "TikTok" | "Facebook" | "WhatsApp" | "Email";

/** Social links; an entry without an href is not shown */
export const SOCIALS: { name: SocialName; href?: string }[] = [
  { name: "Instagram", href: undefined },
  { name: "TikTok", href: undefined },
  { name: "Facebook", href: undefined },
  { name: "WhatsApp", href: `https://wa.me/${WA_NUMBER}` },
  { name: "Email", href: `mailto:${EMAIL}` },
];
