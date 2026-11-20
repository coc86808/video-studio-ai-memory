---
name: creative-director
description: Plan a motion-graphics video like a creative director before building it — measure reference videos and turn them into a theme, analyze the voiceover word by word, categorize sentences into 20+ psychological beat types, arrange a paced storyboard, and enforce the Rule of Variety.
---

# Creative Director Skill

Plan first, build second. Every phase produces documented thinking in `projects/<name>/plan/`.

## Phase 1 — Reference Analysis → `theme.css` + `config.json`
1. Measure the user's reference videos:
   ```bash
   python tools/analyze_refs.py projects/<name>/plan/refs references/<video>
   ```
   Extracts: dimensions, brightness, base palette, accent colors, **seconds per visual change** (the real editing pace), and timestamped contact sheets.
2. Formulate `theme.css`:
   ```bash
   python tools/make_theme.py projects/<name> --font fonts/<font>
   ```
   - Bengali: `HindSiliguri-Bold.ttf`
   - Latin YouTube/Modern: `Montserrat.ttf`
3. Aspect Ratio:
   - 16:9 (`1920x1080`) or 9:16 (`1080x1920`) set in `config.json`.

---

## Phase 2 — Story Analysis & 20+ Psychological Beat Types
Analyze the narration sentence by sentence. Map every sentence to one of 20+ beat types:
- **HOOK**: Visual grab in first 0.5s, core promise by 3s.
- **PROBLEM**: Red accents, error sirens, jittery metrics.
- **QUESTION**: Floating bouncing question marks, searching beam.
- **CLAIM**: Authoritative bold kinetic typography with underlines.
- **NUMBER**: Rapid rolling counters, odometer animations, milestone sparkles.
- **COMPARISON**: Split-screen dual colors, balance scales, vs. badges.
- **LIST / STEPS**: Staggered cascading rows, numbered badges.
- **MAPPING**: Topographic maps, radar zoom, coordinates.
- **EXAMPLE / DEMO**: Concrete mockups, card reveals.
- **QUOTE**: Quotation marks, typing effects, glowing borders.
- **DATE / TIMELINE**: Fast rewind/forward counters, calendar flips.
- **SOLUTION**: Mint green / gold reveals, clean grids, checkmarks.
- **CTA / OUTRO**: Confetti, warm lighting, handshake emblems.

---

## Phase 3 — The Rule of Variety & Restraint
1. **Never repeat the same visual pattern 3 sentences in a row.**
2. **No single pattern exceeds 25% of the total video runtime.**
3. **Pacing target:** Change visual elements every 1.5–3.0 seconds (matching the reference video's pace).
4. **Consistency:** Same color always retains the same semantic meaning throughout the video (e.g. green = profit/inflow/success; red = cost/outflow/error).
