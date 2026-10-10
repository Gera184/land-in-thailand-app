/* Shared, language-independent details. Page copy lives in lib/content.ts. */

export const WA_NUMBER = "972542758427";
export const PHONE_DISPLAY = "054-275-8427";
export const PHONE_TEL = "+972542758427";
export const EMAIL = "support@landinthailand.studio";

/** Production domain (GitHub Pages custom domain, see public/CNAME) */
export const SITE_URL = "https://landinthailand.studio";

export const waLink = (msg: string) => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;

export const PHOTO_CREDITS =
  "Braden Jarvis, Bharath Mohan, Michael Schofield, Yavor Punchev, Max Böttinger, Rachael Annabelle, big.tiny.belly";

/**
 * Footer social links. TODO: add your Instagram / TikTok / Facebook page addresses —
 * until an `href` is set, that item shows (with its hover icon) but isn't a link.
 */
export const SOCIALS: { name: string; image: string; href?: string }[] = [
  { name: "Instagram", image: "/media/social/instagram.svg", href: undefined },
  { name: "TikTok", image: "/media/social/tiktok.svg", href: undefined },
  { name: "Facebook", image: "/media/social/facebook.svg", href: undefined },
  { name: "WhatsApp", image: "/media/social/whatsapp.svg", href: `https://wa.me/${WA_NUMBER}` },
  { name: "Gmail", image: "/media/social/gmail.svg", href: `mailto:${EMAIL}` },
];
