# Video Style Catalog

This catalog registers and isolates video production types in this workspace so that each style remains distinct, reproducible, and protected from configuration conflicts.

---

## 🟢 Type 1: GrowKaz Stickman 2.5D Explainer

- **Status:** Fully Installed, Configured & Verified
- **Studio Directory:** `E:\video try3\growkaz-stickman-studio\`
- **Output Directory:** [`output_videos/video type 1/`](file:///E:/video%20try3/output_videos/video%20type%201/)
- **Reference Output:** [`The_Floating_Arm_Trick.mp4`](file:///E:/video%20try3/output_videos/video%20type%201/The_Floating_Arm_Trick.mp4)
- **Key Characteristics:**
  - **Characters:** Pure black stick figures (`S().ink`) with glowing colored rim lights (`#34d399` emerald, `#f2c21a` gold) and signature colored garments.
  - **Environments & Depth:** 2.5D multi-layered vector sets with parallax camera drift.
  - **Shot Vocabulary:** Establishing wides, medium action, `bigFace` giant emotional close-ups, and blueprint diagrams.
  - **Engine:** Deterministic code-rendered frames via HTML Canvas + Three.js in headless Chromium (`render.mjs`).
  - **Captions:** Kinetic word-by-word synchronized captions with real-time active word highlighting.

---

## 🔵 Type 2: Motion Graphics Explainer (Rick's Clips & Explainer Skills Suite)

- **Status:** Installed, Configured & Isolated
- **Studio Directory:** `E:\video try3\type2-cyber-studio\`
- **Output Directory:** [`output_videos/video type 2/`](file:///E:/video%20try3/output_videos/video%20type%202/)
- **Skills Suite:**
  - [`explainer-video`](file:///E:/video%20try3/.agents/skills/explainer-video/SKILL.md) (Script → Storyboard → Scene Build → VO/Caption Sync → Edit → Polish)
  - [`diagram-animation`](file:///E:/video%20try3/.agents/skills/diagram-animation/SKILL.md) (Progressive disclosure: nodes → edges → labels, flowing connectors, growing charts)
  - [`isometric-animation`](file:///E:/video%20try3/.agents/skills/isometric-animation/SKILL.md) (2.5D stacked layers, extruded blocks, exploded diagrams)
  - [`whiteboard-animation`](file:///E:/video%20try3/.agents/skills/whiteboard-animation/SKILL.md) (Draw-on strokes & sketches)
  - [`wrapped-video`](file:///E:/video%20try3/.agents/skills/wrapped-video/SKILL.md) (Dynamic 9:16 data cards & recap templates)
- **Studio Directory:** `E:\video try3\type2-cyber-studio\`
- **Reference Input:** YouTube `-9LkYvTGu4A` and uploaded fast-cut reference
- **Key Characteristics:**
  - **Dynamic Progression:** Progressive disclosure (nodes → edges → flowing connectors → labels). Every beat introduces genuine visual change, avoiding static cards or repetitive animations.
  - **Environment & Style:** Sleek glassmorphism / cyber UI or high-contrast 2.5D diagrams with isometric perspective, spring physics, and kinetic keywords.
  - **Pacing Rule:** Fast-paced micro-cuts, changing visual elements every 0.5s–1.0s with continuous transformations.
  - **Strict Pipeline Isolation:** Completely separate from Type 1 (`growkaz-stickman-studio`). Protects Type 1 configs, scripts, and assets from any conflicts.

---

## 🟡 Type 3: Cinematic Stickman 2.5D Explainer (AI Open Studio)

- **Status:** Installed, Configured & Fully Verified
- **Studio Directory:** `E:\video try3\new skill and information\`
- **Output Directory:** [`output_videos/video type 3/`](file:///E:/video%20try3/output_videos/video%20type%203/)
- **Project Benchmark:** [`accounting_story_final.mp4`](file:///E:/video%20try3/output_videos/video%20type%203/accounting_story_final.mp4)
- **Skills Suite:**
  - [`type3-cinematic-stickman`](file:///E:/video%20try3/.agents/skills/type3-cinematic-stickman/SKILL.md) (Theatrical spotlight stage, stickman character acting, 3D mechanical widgets, Hind Siliguri kinetic captions)
  - [`ai-video-studio`](file:///E:/video%20try3/.agents/skills/ai-video-studio/SKILL.md) (Master pipeline runner, fast `--fix` scene patching, multi-process rendering)
  - [`creative-director`](file:///E:/video%20try3/.agents/skills/creative-director/SKILL.md) (Reference analysis & variety rules)
- **Key Characteristics:**
  - **Environment & Lighting:** Obsidian slate stage (`#0C1014`) with conical overhead spotlight beam, horizontal contact floor, and warm floor reflection.
  - **Characters & Props:** Minimalist vector stick figures with glowing circular heads, anchored contact shadows, and glowing antique gold props (`#E5B842`, e.g., glowing "SKILL" briefcase, ledgers).
  - **3D Mechanical Widgets:** Dynamic mechanical diagrams (pivoting balance scale for Debit/Credit, date rewind odometer, structured accounting ledger cards, surging profit counters).
  - **Captions:** Kinetic word-by-word Bengali typography (`Hind Siliguri`) in rounded dark pill badges with gold active-word highlighting.
  - **Fast Incremental Scene Repairs:** Instant 15-second partial re-renders via `python tools/build.py projects/<name> --fix <start>-<end>`.
  - **Audio:** Pure procedural DSP sound effects (whoosh, pop, tick, ding, boom, thud) + ducked acoustic BGM.
  - **Strict Pipeline Isolation:** Lives within `E:\video try3\new skill and information\`, completely protecting Type 1 and Type 2.

---

## 🟣 Type 4: AI Open Studio Motion Explainer

- **Status:** Installed, Configured & Isolated
- **Studio Directory:** `E:\video try3\new skill and information\` (or `video-studio/`)
- **Output Directory:** [`output_videos/video type 4/`](file:///E:/video%20try3/output_videos/video%20type%204/)
- **Skills Suite:**
  - [`ai-video-studio`](file:///E:/video%20try3/.agents/skills/ai-video-studio/SKILL.md) (Master Studio Pipeline, fast scene repairs, multi-process builds)
  - [`creative-director`](file:///E:/video%20try3/.agents/skills/creative-director/SKILL.md) (Reference analysis, 20+ psychological beat types, variety rules)
  - [`web-assets`](file:///E:/video%20try3/.agents/skills/web-assets/SKILL.md) (Headless real-world proof & article headline capture)
- **Key Characteristics:**
  - **Reference-Driven Styling:** The user provides 1–3 reference videos; `tools/analyze_refs.py` extracts pace, palette, and typography to generate a matching `theme.css`.
  - **Fast Incremental Scene Patching:** Modify any scene and re-render only that time slice in ~15 seconds (`python tools/build.py --fix <start>-<end>`).
  - **Pre-Render QC Stills:** Captures contact sheets of the busiest frame of each scene to verify text margins, Bengali conjuncts, and contrast before rendering.
  - **Procedural Sound Design:** Pure numpy/scipy DSP synthesis of dynamic UI sounds, whooshes, booms, and risers via `tools/sfx.py`.
  - **Aspect Ratios:** 16:9 widescreen or 9:16 vertical (Shorts/Reels) driven by `config.json`.
  - **Strict Pipeline Isolation:** Self-contained within its studio directory, protecting all other video types.

---

## 🔴 Type 5: Autonomous Reel Studio (65 Visual Styles, Camera Rig & Analytical Springs)

- **Status:** Fully Installed, Configured & Integrated
- **Studio Directory:** `E:\video try3\.agents\skills\reel-skill-chat\` & `E:\video try3\new skill and information\engine\`
- **Output Directory:** [`output_videos/video type 5/`](file:///E:/video%20try3/output_videos/video%20type%205/)
- **Skills Suite:**
  - [`reel-skill-chat`](file:///E:/video%20try3/.agents/skills/reel-skill-chat/SKILL.md) (Autonomous Reel & Carousel Production System)
  - **65 Visual Style Blueprints:** (`references/styles/`: `art-deco-foil`, `blueprint`, `chalkboard-lesson`, `cinematic`, `cyanotype`, `deep-sea-glow`, `dot-ledger`, `frosted-glass`, `isometric-pastel`, `low-poly`, `papercraft-kit`, `rim-light-stick`, `voxel-diorama`, `watercolour-bloom`, `wireframe-terrain`, etc.)
  - **20 Prompt Recipes:** (`references/style-prompts/` for generative visual textures and elements)
  - **Virtual Parallax Camera Rig:** ([`camera.js`](file:///E:/video%20try3/new%20skill%20and%20information/engine/camera.js) - push, pan, whip pan with directional motion blur, crane, seeded shake, orbit, creep 0.14%/frame, punch +22%, smootherstep easing)
  - **Analytical Spring Physics:** ([`motion.js`](file:///E:/video%20try3/new%20skill%20and%20information/engine/motion.js) - zero-state deterministic closed-form damped springs: `spring(t, zeta, f)`, multi-target `track()`, follow-through secondary motion `follow()`, virtual frame zoom `frameOn()`)
  - **20 Modular Kinetic Screen Generators:** (`engine/screens/`: `type-motion.js`, `transitions.js`, `card-grid.js`, `dot-grid.js`, `counter-lock.js`, `timeline-bar.js`, `scale-zoom.js`, `bar-race.js`, `orbit-rings.js`, `polygon-draw.js`, etc.)
  - **2D Character Rigging & Kinematics:** ([`stick-rig.js`](file:///E:/video%20try3/new%20skill%20and%20information/engine/stick-rig.js) - rim-lit stick figures with planted walk cycles, facial expression on cue, moods, props, and modular accessories)
  - **Automated QC Suite:** ([`hookscore.py`](file:///E:/video%20try3/new%20skill%20and%20information/tools/reel_tools/hookscore.py), [`pacing_check.py`](file:///E:/video%20try3/new%20skill%20and%20information/tools/reel_tools/pacing_check.py), [`caption_check.py`](file:///E:/video%20try3/new%20skill%20and%20information/tools/reel_tools/caption_check.py), [`readcheck.mjs`](file:///E:/video%20try3/new%20skill%20and%20information/tools/reel_tools/readcheck.mjs), [`voice_check.py`](file:///E:/video%20try3/new%20skill%20and%20information/tools/reel_tools/voice_check.py))
  - **Cinema Sound Library:** 35 pre-mixed sound effects (bell, glass, wood, soft impacts, drops, keypress, thunder, card slides) in `new skill and information/engine/sfx/`.
- **Key Characteristics:**
  - **End-to-End Automation:** Script writing, hook scoring, pacing optimization, storyboard generation, and multi-layered rendering.
  - **Multi-Slide Carousel Capability:** Generates complementary Instagram/LinkedIn swipe carousels (`mg-carousel`) directly from video scripts.
  - **Strict Determinism:** Pure mathematical functions of time `t` with zero reliance on wall-clock time or unbounded randoms.

