# Type 3 Style Bible: Cinematic Stickman 2.5D Explainer

## 1. Visual DNA
Type 3 is a premium motion-graphics narrative style combining minimalist stick-figure character acting with broadcast-grade 3D lighting, glowing metallic accents, and kinetic typography.

### Core Environment
- **Aspect Ratio:** 9:16 Vertical (`1080x1920`) for Shorts/Reels/TikTok, or 16:9 (`1920x1080`) for YouTube Widescreen.
- **Stage Concept:** A theatrical dark stage illuminated by a conical overhead spotlight beam.
- **Atmosphere:** Deep obsidian slate background with subtle film grain (`--grain: 0.04`), dark vignette, and warm gold floor reflection.

---

## 2. Color System
| Role | Hex / Value | Usage |
|---|---|---|
| **Base Background** | `#0C1014` | Deep obsidian slate canvas |
| **Stage Radial Glow** | `#18222B` | Center stage glow at 50% 25% |
| **Vignette Falloff** | `#050709` | Outer canvas boundaries |
| **Primary Highlight** | `#E5B842` | Antique Gold (badges, cards, borders, scales) |
| **Text Gold Glow** | `#FFD255` | Saturated glowing gold for key numbers & names |
| **Success / Inflow** | `#32D74B` | Debit, profits, verified badges, level balance |
| **Danger / Outflow** | `#FF453A` | Expenses, mismatches, problem cards |
| **Professional Info** | `#0A84FF` | Role tags, licenses, corporate logos |
| **Muted Text** | `#8E99A4` | Subtitles, helper text, timestamps |
| **Cards** | `rgba(22, 28, 36, 0.90)` | Frosted glass cards with gold border |

---

## 3. Lighting & Stage Geometry (9:16 Canvas)

```css
/* Overhead Conical Spotlight */
.spotlight-beam {
  position: absolute;
  top: -40px;
  left: 50%;
  transform: translateX(-50%);
  width: 780px;
  height: 1250px;
  background: radial-gradient(ellipse at 50% 0%, rgba(229, 184, 66, 0.18) 0%, rgba(229, 184, 66, 0.05) 50%, transparent 75%);
  clip-path: polygon(40% 0%, 60% 0%, 96% 100%, 4% 100%);
  pointer-events: none;
  z-index: 2;
  mix-blend-mode: screen;
}

/* Floor Contact Line */
.stage-floor {
  position: absolute;
  bottom: 460px;
  left: 8%;
  width: 84%;
  height: 3px;
  background: linear-gradient(90deg, transparent 0%, rgba(229, 184, 66, 0.6) 30%, rgba(255, 255, 255, 0.8) 50%, rgba(229, 184, 66, 0.6) 70%, transparent 100%);
  box-shadow: 0 0 25px rgba(229, 184, 66, 0.5);
  z-index: 3;
}

/* Floor Reflection */
.stage-reflection {
  position: absolute;
  bottom: 370px;
  left: 15%;
  width: 70%;
  height: 90px;
  background: radial-gradient(ellipse at 50% 0%, rgba(229, 184, 66, 0.12) 0%, transparent 70%);
  pointer-events: none;
  z-index: 2;
}
```

---

## 4. Typography & Captions
- **Font:** `Hind Siliguri` (Regular 400, Bold 700) for Bengali script; `Montserrat` or `BrandFont` for English.
- **Captions:**
  - Placed at `top: 1420px; left: 60px; right: 60px;` (comfortably above mobile platform UI overlays).
  - Encapsulated in a rounded dark pill badge (`border-radius: 999px`) with gold border.
  - Chunk size: Strictly 2–3 words in 9:16 vertical.
  - Active words highlighted dynamically with `var(--highlight)` and momentary scale pulse (`1.2 -> 1.0`).
