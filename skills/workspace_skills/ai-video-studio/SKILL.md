---
name: ai-video-studio
description: Master orchestration for the AI Video Studio kit. Uses reference videos to determine style, transcribes voiceover for millisecond-level word timing, builds kinetic motion graphics with HTML/Chromium, provides 15-second incremental scene repairs (--fix), and renders broadcast-quality MP4s with procedural sound effects.
---

# AI Video Studio Master Skill

The AI Video Studio is an automated motion-graphics video production framework.
Studio Directory: `E:\video try3\new skill and information\` (or project workspace).

## Core Architecture
- **Inputs**:
  - `references/`: 1–3 reference videos determining color palette, pace (seconds per cut), fonts, and motion feel.
  - `inputs/<name>/`: Voiceover (`voice.mp3`), optional script (`script.txt`), word timestamps (`words.json`), and user images/clips.
- **Engine** (`engine/`):
  - `engine.js`: Pure timeline engine, frame-by-frame seeking, text and card animations.
  - `fx.js`: Camera punch, screen shake, chromatic glitch, counters, stamps, pills, mockups.
  - `captions.js`: Word-by-word dynamic captions highlighting active words.
  - `icons.js`: Built-in vector icons.
- **Tools** (`tools/`):
  - `doctor.py`: System diagnostic (ffmpeg, Chromium, Node.js, Python, fonts).
  - `analyze_refs.py`: Extracts visual change speed, dominant colors, and contrast sheets from references.
  - `make_theme.py`: Compiles extracted styles into `theme.css`.
  - `transcribe.py` / `words_to_js.py`: Builds millisecond word timing for kinetic synchronization.
  - `render.js`: High-performance headless Chromium renderer.
  - `build.py`: Full master render or 15-second partial scene patch (`--fix <start>-<end>`).
  - `check.py`: Automatic QC inspector (loudness, aspect ratio, silence check, contact sheet).
  - `sfx.py`: Algorithmic procedural sound effects synthesizer.

---

## Commands & Workflows

### 1. System Diagnostic
```bash
python tools/doctor.py
```
Checks all prerequisites (ffmpeg, ffprobe, Node.js, Playwright, Chromium, Pillow, Scipy, Numpy, and fonts).

### 2. New Video Pipeline
```bash
# 1. Analyze reference style
python tools/analyze_refs.py projects/<name>/plan/refs references/<ref_video.mp4>

# 2. Build theme
python tools/make_theme.py projects/<name> --font fonts/HindSiliguri-Bold.ttf

# 3. Transcribe & align word timings
python tools/transcribe.py inputs/<name>/voice.mp3 projects/<name>/plan/words.json auto
python tools/words_to_js.py projects/<name>/plan/words.json projects/<name>

# 4. Write scenes.js from storyboard

# 5. Pre-render Contact Sheet QC
node tools/render.js projects/<name> still <t1>,<t2>,<t3>
python tools/sheet.py projects/<name>

# 6. Master Video Render
python tools/build.py projects/<name> --parts 2
```

### 3. Fast Incremental Scene Fix (`--fix`)
When the user asks to modify a specific scene (e.g., change text, update an image, adjust layout):
```bash
# Edit only the target scene in scenes.js
# Then re-render ONLY that scene's time range (splices in 15 seconds!):
python tools/build.py projects/<name> --fix <start_sec>-<end_sec>
```
Output: `output/<name>_final_v2.mp4` (preserves all previous files).
