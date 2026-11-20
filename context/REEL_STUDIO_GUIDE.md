# Reel Studio & Advanced Motion Graphics System (Type 5)

This document provides a complete guide to the newly integrated **Reel Studio & Motion Graphics Kit** (`reel-skill-chat`), adapted and fully integrated into `E:\video try3`.

---

## 1. Overview & Capabilities

The Reel Studio is an end-to-end production pipeline for viral 9:16 Instagram Reels, YouTube Shorts, and TikTok explainer videos, alongside multi-slide swipe carousels.

### Key Additions to Workspace:
- **65 Visual Style Specifications**: Located in `.agents/skills/reel-skill-chat/references/styles/`
- **20 Visual Prompt Recipes**: Generative image/texture prompts in `.agents/skills/reel-skill-chat/references/style-prompts/`
- **Analytical Closed-Form Spring Physics**: `engine/motion.js` (Pure math function of time `t`, no simulation step state)
- **Parallax Virtual Camera Rig**: `engine/camera.js` (Push, pan, directional whip blur, crane, seeded shake, orbit, 0.14%/frame cinematic creep, +22% punch push)
- **20 Modular Screen Generators**: `engine/screens/` (Type motion, transitions, dial, counter-lock, bar-race, card-grid, dot-grid, etc.)
- **2D Character Rigging & Kinematics**: `engine/stick-rig.js` (Planted walk cycle, moods, expressions, props, and modular garments)
- **35 Cinema Sound Effects**: `engine/sfx/` (Bong, chips, drops, impact bell, glass, wood, soft hits, keypresses, thunder)
- **Automated QC & Validation Suite**: `tools/reel_tools/` (`hookscore.py`, `pacing_check.py`, `caption_check.py`, `readcheck.mjs`, `voice_check.py`)

---

## 2. 65 Visual Styles Catalog

The 65 production-tested styles provide instant art direction for any topic:

### A. Minimalist, Editorial & Swiss Grid
1. `swiss-grid-poster`: Clean brutalist typography, geometric layouts, high-contrast grids.
2. `editorial-spread`: Magazine layout with serif headlines, drop caps, and elegant margin notes.
3. `word-stack`: Bold full-frame stacked typography with sliding colored highlights.
4. `chapter-cards`: Minimalist dark cards with smooth numbered chapter transitions.
5. `minimal-geometry`: Pure circles, lines, and arcs revealing complex mathematical or abstract ideas.
6. `index`: Clean dictionary/encyclopedia index aesthetic.

### B. Technical, Scientific & Blueprint
7. `blueprint`: Technical CAD/architectural drafting with cyan grid, white measurement callouts.
8. `wireframe-terrain`: 3D topographical terrain grid with moving coordinate points.
9. `dot-ledger`: Clean accounting ledger with dotted leader lines and financial counters.
10. `retro-os`: Vintage 90s graphical interface with window dialogs and pixel buttons.
11. `star-chart`: Celestial navigation maps, glowing constellations, coordinate lines.
12. `time-road`: Visual timeline stretching toward a distant perspective vanishing point.

### C. Cinematic, Atmospheric & Theatrical
13. `cinematic`: Wide anamorphic framing, deep shadows, moody rim lights, organic film grain.
14. `rim-light-stick`: 2D stick figures with glowing rim light against moody flat-shaded sets.
15. `ember-room`: Warm atmospheric room with floating fire embers and glowing lanterns.
16. `deep-sea-glow`: Bioluminescent underwater aesthetic with drifting particles and light shafts.
17. `rain-and-light`: Rainy night windowpane with blurred neon streetlights and droplet streaks.
18. `iso-night`: Isometric nighttime cityscapes and architectural cross-sections.
19. `dreamy-aura`: Soft radiant glow gradients and ethereal color shifts.

### D. Tactile, Papercraft & Organic Art
20. `papercraft-kit`: Layered drop-shadow paper cutouts with realistic paper textures.
21. `paper-diorama`: 3D multi-layered cardboard stage with dimensional depth.
22. `linocut`: Hand-carved relief printing texture with organic edge imperfections.
23. `cyanotype`: Prussian blue solar print aesthetic with white silhouettes.
24. `botanical-plate`: Scientific botanical illustration with delicate ink lines and aged paper.
25. `watercolour-bloom`: Wet-on-wet paint bleeding into paper fibers.
26. `watercolour-sketchbook`: Loose gestural watercolor sketches with pencil underdrawings.
27. `graphite-sketchbook`: Fine graphite pencil shading on textured cream cartridge paper.
28. `napkin-sketch`: Rough spontaneous ballpoint pen sketch on crumpled paper.
29. `chalkboard-lesson`: White and pastel chalk diagrams on textured slate board with eraser smudges.
30. `origami`: Creased geometric folding animations with realistic paper creasing.
31. `matisse-cutouts`: Vibrant organic gouache paper cutouts inspired by Henri Matisse.
32. `riso-print`: Dual-color Risograph print with halftone dots and intentional misregistration.
33. `stained-glass`: Glowing leaded glass panels with radiant light refraction.

### E. 3D, Isometric & Digital
34. `voxel-diorama`: 3D voxel art diorama with isometric orthographic projection.
35. `low-poly`: Faceted geometric polygon surfaces with flat directional shading.
36. `isometric-pastel`: Soft pastel isometric blocks, floating platforms, and mechanical widgets.
37. `flow-field`: Dynamic generative particle trajectories following Perlin noise fields.
38. `frosted-glass`: Sleek Apple-style translucent glassmorphic cards with specular highlights.
39. `pixel-quest`: 16-bit retro game aesthetic with tile-based animation.

*(See full 65 style specifications in `.agents/skills/reel-skill-chat/references/styles/`)*

---

## 3. Pure Math Spring Physics (`engine/motion.js`)

Unlike traditional physics engines that maintain mutable step state, `motion.js` computes analytical closed-form equations directly from seek time `t`:

```javascript
// Damping ratio zeta: 1.0 = no bounce, 0.7-0.85 = weighty/cinematic, 0.4-0.6 = playful
// f = frequency in Hz (1.5 = slow/heavy, 2.0 = normal, 3.0 = snappy)
const progress = Motion.spring(t, 0.8, 2.0);

// Multi-target tracking (keys: [[time, value], ...])
const x = Motion.track(t, [[0, 0], [1.2, 500], [2.5, 300]], 0.8, 2.0);

// Secondary motion / follow-through with lag
const loosePart = Motion.follow(t, keys, 0.12, 0.5, 2.0);
```

---

## 4. Virtual Parallax Camera Rig (`engine/camera.js`)

The camera rig handles multi-layer parallax framing with smootherstep easing and automatic directional motion blur:

```javascript
const rig = Camera.rig([
  { el: document.getElementById('bg'), depth: 0.5 },    // Background moves less
  { el: document.getElementById('world'), depth: 1.0 }, // World plane
  { el: document.getElementById('fg'), depth: 1.3 }     // Foreground moves more
]);

rig.push(1.0, 0.9, 1.15);      // Zoom in to 1.15
rig.pan(2.5, 0.8, 800, 960);    // Pan camera to (800, 960)
rig.whip(240, 4.0, 0.5);        // Whip pan with automatic directional blur
rig.crane(5.0, 1.0, 600);       // Vertical crane move with vertical blur
rig.shake(6.5, 0.5, 12, 42);    // Seeded camera impact shake
rig.creep(3.2, 6.0);            // Viral slow push-in (0.14%/frame)
rig.punch(4.1);                 // Punch word impact push (+22%)
```

---

## 5. QC & Verification Scripts (`tools/reel_tools/`)

| Tool | Purpose |
|---|---|
| `python tools/reel_tools/hookscore.py <script>` | Scores script opening on 5 viral hook metrics. |
| `python tools/reel_tools/pacing_check.py <mp4>` | Scans rendered pixels to catch sub-0.3s flashes and verifies sound sync within 1-2 frames. |
| `python tools/reel_tools/caption_check.py <script>` | Validates caption line length, word breaks, and readability bounds. |
| `node tools/reel_tools/readcheck.mjs <html/js>` | Ensures on-screen text duration matches reading speed thresholds. |
| `python tools/reel_tools/voice_check.py <dir>` | Runs automated ASR (Whisper) to ensure voice take matches script verbatim. |

---

## 6. Audio Library (`engine/sfx/`)

35 clean cinematic sound effects ready for programmatic placement:
- `impactBell_heavy_000.ogg`, `impactBell_heavy_003.ogg`
- `impactGlass_light_000.ogg` to `004.ogg`
- `impactWood_light_000.ogg` to `004.ogg`
- `impactSoft_heavy_002.ogg`, `impactSoft_medium_001.ogg`
- `keypress-001.wav` to `006.wav`
- `thunder-1.m4a` to `6.m4a`
- `card-slide-1.ogg`, `chips-collide-1.ogg` to `4.ogg`, `bong_001.ogg`, `drop_001.ogg`, `002.ogg`
