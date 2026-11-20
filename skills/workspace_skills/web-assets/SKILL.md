---
name: web-assets
description: Find and collect visual material from the web for a video — article headlines, official statements, report pages, charts, icons, and textures — as clean PNG/SVG files with source attribution logs. Use when a storyboard beat needs real-world proof or external assets.
---

# Web Assets Skill

Headless capture and asset sourcing for investigative, financial, documentary, and educational videos.

## Core Tools
- `tools/web_capture.js`: Headless Playwright screenshot capture for web proof.
- `tools/fetch_asset.py`: Direct file downloader with license logging.

---

## Capture Recipes

### 1. Capturing News Headlines & Articles
```bash
# Capture an article header with headline and date
node tools/web_capture.js <url> assets/web/<filename>.png --selector "article header" --hide-media

# Capture a specific quote or statistic in the article text
node tools/web_capture.js <url> assets/web/<filename>.png --text "200,000 people"

# Capture a fixed pixel area on a dark-themed site
node tools/web_capture.js <url> assets/web/<filename>.png --clip 0,200,1280,500 --dark
```

### 2. Mandatory Rules
1. **No Photos of Real People**: Always use `--hide-media` on public articles to avoid showing faces without permission.
2. **Attribution**: Every captured article/report shown on screen must include an on-screen source tag (`SOURCE: <Site Name>, <Date>`).
3. **Card Framing**: Display screenshots inside styled 3D tilted cards with subtle push-in rather than flat full-screen image dumps.
4. **License Logging**: Log every downloaded asset into `assets/web/assets_sources.md` (filename, URL, license/source, date).
