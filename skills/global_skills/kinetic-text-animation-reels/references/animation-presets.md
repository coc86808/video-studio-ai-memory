# Animation Presets & Reference Blueprints

Four core visual presets derived from the reference reels:

## 1. Cosmic / Minimalist Quote (`quote-glow`)

- **Best for**: Inspirational hooks, philosophical statements, brand manifestos.
- **Palette**: Deep dark (`#08080B`), pure white (`#FFFFFF`), electric teal (`#00B4B4`) or warm gold/yellow (`#FFE600`) accent glow.
- **Motion**: Slow, deliberate phrase reveals (`0.6s - 1.2s` per beat) using `blur_to_sharp_text()` and soft floating particles.

## 2. Profile / Audit Listicle (`stat-callout` + `step-card`)

- **Best for**: Marketing breakdowns, "5 things to fix", audit checklists.
- **Palette**: Alternating dark (`#08080B`) and warm cream (`#F5F2EB`) with crimson red (`#E50914`) for mistakes/warnings and teal/green for solutions.
- **Motion**: Fast word-by-word cadence (`word_by_word_flow()`), animated numeric counters (`4 seconds`, `8/10`), and numbered checklist cards sliding in sequentially.

## 3. High-Contrast Hype / Contrast (`before-after`)

- **Best for**: Punchy creator advice, myth-busting, short-form hooks.
- **Palette**: Stark black/white inversion with red strikethrough (`#E50914`) and glowing teal/yellow payoff.
- **Motion**: Rapid polarity cuts, animated strikethrough on the "wrong" premise, and `ease_out_back` pop-in on the "right" strategy.

## 4. Step-by-Step AI Tutorial (`step-card` + `cta-cursor`)

- **Best for**: Tool walkthroughs, "Step 1 -> Step 2 -> Final Step" tutorials.
- **Palette**: Clean cream (`#F5F2EB`) cards with dark ink (`#0C0C0F`) and pill-badged step numbers (`STEP 1`, `STEP 2`, `FINAL STEP`).
- **Motion**: Smooth vertical slide-ups for step cards, subtle progress indicators, and an animated pill CTA button with cursor click at the end.

## Typography Scale (1080x1920)

- **Hero Single Word**: `110px - 135px` (`InterDisplay-Black.otf`)
- **Primary Headline**: `68px - 88px` (`InterDisplay-Black.otf` / `InterDisplay-Bold.otf`)
- **Supporting Body / Subhead**: `38px - 48px` (`Inter-Medium.otf`)
- **Pill Badge / Callout Label**: `30px - 40px` (`DejaVuSansMono-Bold.ttf` or `InterDisplay-Black.otf`)
