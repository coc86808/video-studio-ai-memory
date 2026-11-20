# Vox Doc Setup Status

**Machine Profile**: Windows 11 Home (64-bit), 8 GB RAM, Intel Iris Xe GPU.
**Installation Directory**: E:\video (Transferred from C: drive)
**Python Command**: E:\video\python\python.exe (or python)
**FFmpeg Path**: E:\video\ffmpeg\bin\ffmpeg.exe
**Sound Library**: E:\video\skills\vox-doc-sound\ (1,053 files)
**Models & Cache**: E:\video\cache\ (Kokoro, Whisper, Puppeteer)

| Step | Tool / Component | Status | Version / Details |
| :--- | :--- | :--- | :--- |
| Step 1 | Node.js | ✅ | v24.16.0 |
| Step 1 | Flow Connector CLI | ✅ | v1.0.12 (global npm) |
| Step 1 | Flow MCP Server | ✅ | Configured in ~/.gemini/config/mcp_config.json |
| Step 2 | FFmpeg (full build) | ✅ | v8.1.1 (Gyan.dev build with libass & HarfBuzz) |
| Step 2 | Devanagari Text Shaping | ✅ | Verified with Nirmala UI on test frame |
| Step 3 | Python | ✅ | 3.12.10 |
| Step 3 | Core Packages | ✅ | numpy 2.5.4, pillow 13.0.0, scipy 1.18.1, soundfile 0.14.0 |
| Step 3 | faster-whisper | ✅ | 1.2.1 (tiny model transcription verified) |
| Step 4 | Kokoro Voiceover | ✅ | 0.9.4 (af_heart test audio generated) |
| Step 8a| Devanagari Font | ✅ | Nirmala UI |
| Step 8b| Sound Kit Catalog | ✅ | 1,053 files indexed in CATALOG.tsv |
| Step 7 | Kaggle GPU (Hindi VO) | ⏳ Pending | Only needed for Hindi / Indian language narration |
