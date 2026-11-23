---
name: kinetic-text-animation-reels
description: Create 9:16 kinetic typography and motion-graphics text animation reels (1080x1920 MP4) in Python using Pillow, NumPy, and FFmpeg. Use when the user asks to create kinetic text animations, animated quote reels, high-contrast social media explainers, numbered listicle reels, or voiceover-synced typographic videos with blur-in reveals, word-by-word highlights, pill badges, and clean screen-shift transitions.
---

# Kinetic Text Animation Reels

Generate 9:16 vertical kinetic typography videos (1080x1920, 30fps, H.264 + AAC) modeled after high-retention social media text animation reels, tutorials, and quote videos.

## When to Use

- The user wants a kinetic typography or text-driven motion graphics video (MP4) for Reels, Shorts, or TikTok.
- The user provides a script or voiceover MP3 and wants word-by-word or phrase-by-phrase animated text synced to speech.
- The user asks for animated quotes, numbered listicle explainers, before/after contrast reels, or step-by-step tutorial text animations.

## Visual Style & Animation Primitives

1. **High-Contrast Canvas & Clean Framing**:

   - Alternate scenes between deep dark (`#08080B`) and warm cream (`#F5F2EB`) or pure white (`#FFFFFF`) with subtle 90px architectural grids, radial vignette, and 1-3px film dust particles.
   - Keep the canvas clean - omit corner micro-stamps like `HOOK // 01` or `STEP 01`.

2. **Typography & Hierarchy**:

   - Use `Inter Display` (`Black`, `Bold`, `BoldItalic`) for headlines and `Inter Medium` or `DejaVu Sans Mono` for supporting callouts and numbers.
   - Apply tight line-height (`0.90` to `1.05`) so stacked words lock together into a cohesive visual block.

3. **Core Text Animation Effects**:

   - **Blur-to-Sharp Reveal**: Animate hero words from Gaussian blur (`radius=14`) down to sharp focus (`radius=0`) over `0.18s - 0.25s` with `ease_out_expo`.
   - **Word-by-Word Cadence Pop**: Reveal phrases word-by-word synced to timestamps, scaling active words slightly (`ease_out_back`) and highlighting key terms in accent colors (`#E50914` red, `#00B4B4` teal, `#FFE600` yellow).
   - **Directional Slide & Mask**: Slide lines upward or horizontally into place with `ease_out_cubic` so motion feels crisp and intentional.
   - **Outer-Glow & Pill Badges**: Add soft Gaussian outer glow on dark scenes for hero words, and wrap key phrases or step numbers in rounded pill badges or dashed callout boxes.
   - **Strikethrough Contrast**: Animate a horizontal strike line across "old/wrong" statements before revealing the glowing "new/right" takeaway.

4. **Sound Design & Pacing**:

   - Use clean screen-shift whoosh transitions only on major scene cuts - avoid extra pops, clicks, glitches, or distracting synthetic drum beats.
   - When a voiceover MP3 is provided, align scene cuts and phrase reveals to the exact spoken timestamps.

## Workflow Steps

1. **Plan the Storyboard**:

   - Break the script into 6 to 10 scenes, alternating `dark` and `cream` polarity on major topic shifts.
   - Assign each scene a layout preset from `references/animation-presets.md` (`quote-glow`, `word-flow`, `stat-callout`, `step-card`, `before-after`, or `cta-cursor`).

2. **Configure & Run the Renderer**:

   - Copy or adapt `scripts/render_kinetic_text.py` into `artifacts/file_generation/ttl=63d/intermediate/`.
   - Define the scene list with exact timestamps, text tokens, highlight words, and animation primitives.
   - Execute the script to stream raw RGB24 frames directly to `ffmpeg` and output the final MP4 to `artifacts/file_generation/ttl=63d/output/`.

3. **Inspect & Verify**:

   - Extract sample frames (`ffmpeg -vf "fps=1/4"`) into `artifacts/file_generation/ttl=63d/intermediate/` and inspect them with `view_file` to confirm zero text clipping, overlaps, or contrast issues.

## Gotchas

- **Keyword Font Argument**: Always pass `font=` as a keyword argument in Pillow's `ImageDraw.text()` so Pillow does not treat the font object as `fill`.
- **Hard Cuts Over Cross-Dissolves**: Never cross-fade between dark and cream backgrounds, which creates muddy gray frames. Use crisp 1-frame polarity cuts paired with a subtle transition whoosh.
- **No Fake Speech**: Never synthesize speech with `espeak` or tones. If no voiceover MP3 is supplied, deliver clean on-screen kinetic typography with transition whoosh SFX only.
- **Stream Frames to FFmpeg**: Pipe `img.tobytes()` directly into `ffmpeg` stdin instead of writing hundreds of temporary PNG files to disk.
