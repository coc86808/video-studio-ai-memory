---
name: video-type-selector
description: >
  Mandatory skill: Whenever the user requests to make, edit, animate, or produce a video,
  ALWAYS ask the user first to select which Video Type (style) they want to use
  (e.g., Type 1: GrowKaz Stickman 2.5D Explainer, Type 2, etc.) from the Video Style Catalog,
  rather than assuming or mixing pipelines.
metadata:
  version: "1.0.0"
  author: Antigravity
---

# Video Type Selector & Intake Invariant

This skill enforces a mandatory intake checkpoint for all video creation requests in this workspace.

## Core Rule
Whenever the user says:
- "make a video", "create a video", "make this video", "animate this", "make a reel", "generate a short", or provides a script/voiceover/audio for video creation:

**DO NOT ASSUME THE STYLE OR JUMP DIRECTLY INTO RENDERING.**

Instead, **ALWAYS prompt the user first** with `ask_question` or a clear choice prompt covering BOTH:
1. **Video Type**: Present the available Video Types from `E:\video try3\VIDEO_TYPES.md`:
   - **Type 1:** GrowKaz Stickman 2.5D Explainer (`growkaz-stickman-studio` — pure black stick figures, glowing colored rim light, 2.5D sets, kinetic captions, procedural audio).
   - **Type 2:** Cyber Motion Graphics Explainer (`type2-cyber-studio` — rapid micro-cuts, cyber UI, flowchart nodes & progressive disclosure).
   - **Type 3:** Cinematic Stickman 2.5D Explainer (`new skill and information` — theatrical spotlight stage, vector stickman actors with glowing props, 3D mechanical widgets, Hind Siliguri kinetic captions, procedural DSP SFX, 15s `--fix` patching).
   - Option to study a new reference video first using `yt-dlp` + `ffmpeg` + `analyze_refs.py`.
2. **Voiceover Source**: Ask whether the user will provide/make the voiceover themselves OR whether I should generate/make the voiceover for them.
3. Wait for the user's selection on BOTH before generating audio, choosing the engine/directory structure, or rendering.

## Pipeline Isolation Invariant
- **Type 1** lives strictly in `E:\video try3\growkaz-stickman-studio\` and follows `make-2d-video`, `new-video`, `render-video`, `video-sound`, `video-styles`. Never modify its core architecture when building other types.
- Subsequent Video Types (e.g. Type 2, Type 3) must be established in their own dedicated folders and registered in `E:\video try3\VIDEO_TYPES.md`.
