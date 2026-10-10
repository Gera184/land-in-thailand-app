# Image prompts — one art direction for the whole site

Goal (checklist #5, "imagery with intent"): every still should look like it came from the
same shoot as the lagoon hero video. Generate each with the **shared style line** appended.

## Shared style line (append to every prompt)

```text
Golden-hour light, warm low sun with soft haze, deep teal and turquoise water tones, sun-warmed limestone and jungle greens, a single saffron-orange accent where natural. Photorealistic travel documentary, shot on a full-frame camera, natural colour, gentle film grain, calm and unhurried. No text, no logos, no watermarks, no faces in close-up.
```

## Specs

- Size: at least **1600 px** on the long side (2400 px for `boats`, which runs full-width).
- Save as JPG, quality ~80.
- File name = the slot name below, e.g. `bangkok.jpg`, into `public/media/photos/`.
- Then in `lib/photos.ts` change that slot to `{ local: "bangkok.jpg" }`. That's the whole swap.

## Shots

| Slot | Used in | Ratio | Prompt |
|---|---|---|---|
| `bangkok` | Collage, Bangkok city card | 4:5 portrait | Bangkok from a high rooftop at dusk, the Chao Phraya river curving through the city, long-tail boats leaving light trails, skyscrapers glowing amber against a teal sky. |
| `chiangmai` | Collage, Chiang Mai card | 4:5 portrait | A golden pagoda on a forested ridge above Chiang Mai at sunrise, mist filling the valleys below, layered blue-green mountains fading into haze. |
| `phuket` | Collage, Phuket card | 4:5 portrait | Phang Nga Bay near Phuket at golden hour, towering limestone karsts rising from calm turquoise water, a single longtail boat with a saffron ribbon in the middle distance. |
| `monks` | Collage | 3:2 landscape | Three Buddhist monks in saffron robes walking along a quiet old-city lane in Chiang Mai at early morning, warm side light on a weathered temple wall, shot from a respectful distance. |
| `samui` | Collage, Koh Samui card | 4:5 portrait | Koh Samui coastline from a low drone angle at sunset, palm-fringed white beach, villas with pools tucked into the jungle hillside, glassy turquoise sea. |
| `phangan` | Collage, Koh Phangan card | 4:5 portrait | A hidden cove on Koh Phangan seen from above, jungle meeting a crescent of white sand, crystal-clear shallow water over pale reef, one small boat anchored. |
| `pool` | Services (visa tile) | 3:2 landscape | An infinity pool on a hillside villa in Koh Samui at golden hour, the pool edge merging with the sea and distant islands, a folded towel and an open passport on the deck. |
| `boats` | Timeline background (shown dimmed) | 4:5 portrait | Aerial top-down view of colourful longtail boats moored side by side on turquoise water, long shadows, wet sand at the edge of the frame. |

When all eight are in, remove the Unsplash credit line from the footer (`PHOTO_CREDITS` in `lib/site.ts`).
