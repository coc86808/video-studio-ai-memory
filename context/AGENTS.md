# HyperFrames Video Production Rules

When authoring or modifying video projects in this workspace, follow these invariants:

## 1. Composition Structure & Timing
- **Root Duration**: The root composition element in `index.html` must define `data-duration` in seconds. Total video runtime is strictly bound to this duration.
- **Clip Invariants**: Every timed element must have `class="clip"`, `data-start="<seconds>"`, and `data-duration="<seconds>"`.
- **Z-Index & Tracks**: Use `z-index` for visible paint stacking order; `data-track-index` is reserved for timeline display in Studio.
- **Scene Modularity**: Keep scenes modular under `compositions/` and mount them from the root `index.html`.

## 2. Animation & Frame Determinism
- **Paused Timelines**: Each composition must create a paused GSAP timeline and register it:
  ```javascript
  window.__timelines["<data-composition-id>"] = tl;
  ```
- **Strict Clock Determinism**: Never use `Date.now()`, `performance.now()`, unseeded `Math.random()`, `setInterval`, `setTimeout`, or `requestAnimationFrame`. Everything rendered must be a pure function of timeline seek time.
- **No Infinite Animations**: Never use `repeat: -1`.
- **Transformations**: Always animate transforms via GSAP tweens on child elements rather than directly modifying CSS `left`/`top`/`width`/`height` or conflicting CSS transitions.

## 3. Audio & Video Elements
- **Audio IDs**: Every `<audio>` element must have an explicit `id` attribute to be mixed properly.
- **No Manual Playback**: Never call `.play()`, `.pause()`, or `.currentTime` on media elements; HyperFrames seek adapters control playback during render.
- **Video Tags**: Set `data-has-audio="true"` on `<video>` elements that include embedded sound; otherwise keep them `muted`. Separate BGM, voiceover, and sound effects into distinct `<audio>` elements.

## 4. Quality & Pre-Render Verification
- Always execute `hyperframes check --json` or `hyperframes lint` before rendering to MP4.
- Fix all warnings or errors flagged by the checker before running `hyperframes render`.

## 5. Storage & File Locality (Mandatory)
- **Local Storage Constraint**: Everything created, used, generated, or downloaded (including compositions, media assets, scripts, audio files, voiceovers, intermediate renders, and output files) MUST be stored strictly within `E:\video try3` (or its subdirectories like `assets/`, `compositions/`, `output/`).
- **Never Write Outside**: Never place project assets, media, or generated outputs outside `E:\video try3`.
- **Relative & Local Paths**: Reference all assets locally within the project structure (e.g., `assets/audio/...`, `assets/images/...`).

## 6. Video Type Selection Checkpoint (Mandatory)
- **Always Ask First**: Whenever the user assigns any video creation, editing, or animation task, NEVER assume the style. ALWAYS ask the user which Video Type they want to produce (referencing `E:\video try3\VIDEO_TYPES.md`, e.g., Type 1: GrowKaz Stickman 2.5D, Type 2, etc.) using `ask_question` or a direct prompt before creating or rendering scenes.
- **Pipeline Isolation**: Keep each video type strictly isolated in its respective studio folder to protect Type 1 from any configuration or dependency conflicts.

## 7. Reel Studio & Advanced Motion Graphics Invariants (Type 5 / Shared Engine)
- **Zero-State Pure Math Springs**: When using spring physics, utilize `motion.js` analytical functions (`Motion.spring(t, zeta, f)`) rather than mutable simulation state or step integrators.
- **Parallax Virtual Camera**: When panning or zooming, leverage `camera.js` (`Camera.rig()`) with depth layers (`far: 0.5`, `world: 1.0`, `near: 1.3`), smootherstep easing, and automated directional whip/crane motion blur.
- **Hook Scoring & Pacing Validation**: Run `hookscore.py` on script hooks and `pacing_check.py` on rendered media to prevent sub-0.3s visual flashes and ensure proper word-per-second pacing.
- **Sound Sync Precision**: SFX events (from `new skill and information/engine/sfx/` or procedural DSP) must land exactly on the frame of visual change or 1–2 frames after, never before.

## 8. GitHub Continuous Memory & Skills Synchronization (Mandatory)
- **Automatic Memory Backup**: Whenever a task, video production, skill creation, script edit, or major work milestone is completed, ALWAYS execute:
  ```bash
  python tools/git_sync.py "<Brief summary of work done>"
  ```
- **Live Memory Repository**: Pushes to `https://github.com/coc86808/video-studio-ai-memory.git` (authenticated via `.github_token`).
- **Scope**: Synchronizes all workspace skills (`.agents/skills/`), global configuration skills (`config/skills/`), built-in platform skills, context documents (`AGENTS.md`, `VIDEO_TYPES.md`, `REEL_STUDIO_GUIDE.md`), studio engines/tools, project source code, and appends the entry to `MEMORY_LEDGER.md`.


