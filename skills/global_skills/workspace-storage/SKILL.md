---
name: workspace-storage
description: Mandatory invariant to ensure all project files, media assets, voice tracks, video compositions, and temporary files are strictly located and stored within E:\video try3. Use on every operation involving file creation, downloads, media generation, or video rendering.
---

# Workspace Storage & Path Invariants

This workspace enforces strict data locality: **all files, assets, and outputs must live strictly inside `E:\video try3\`**.

## Core Invariants

1. **Root Confinement**:
   - Every file created, downloaded, generated, or modified MUST reside inside `E:\video try3\`.
   - Never write to desktop, root drives, user profiles, or external temp directories unless explicitly reading installed global tool binaries.

2. **Directory Structure Convention**:
   - `assets/audio/` - Voiceovers (TTS WAV/MP3), background music, sound effects.
   - `assets/images/` - Visual assets, logos, and textures.
   - `assets/video/` - Video clips, B-roll, and cutouts.
   - `assets/fonts/` - Custom font files (`.woff2`, `.ttf`).
   - `compositions/` - Modular HTML scene compositions.
   - `output/` - Final rendered MP4/WebM videos, snapshots, and review sheets.

3. **Tool & Command Execution Rules**:
   - Always supply explicit output flags directing output into `E:\video try3\` (e.g. `hyperframes tts "<text>" -o "E:\video try3\assets\audio\speech.wav"`).
   - Render outputs must target local paths: `hyperframes render -o "E:\video try3\output\final.mp4"`.
   - All relative asset paths in HTML must resolve to local project assets (e.g. `assets/...`).
