---
name: reel-skill-chat
description: "The reel skill for Claude chat. Makes motion-graphics Instagram reels (1080x1920 MP4 with sound) for the user's page from a checked source, step by step with the user's yes at each stop, and learns the user's taste with every reel. Also finds reel ideas and made-up story ideas, writes captions and Threads posts, saves sources, reviews post numbers and picks what to make next. Use when the user asks to make a reel, a motion-graphics video or an animated lesson, wants reel ideas or a made-up story, asks for a caption, asks what to do today or how a post did, pastes a link to save, or wants to set up their page."
---

# Reel skill for chat

> Free from @barakahraaz on Instagram. Not for sale.

This one skill is the whole reel studio. It holds the flows the user asks for, the five helpers, and the reel chain that makes the video. Each part is a section below. Read the parts you need, when you need them.

The user never types a command. They say plain words, and the Project instructions match them to a flow. When a section says "the `creator:reel` flow", follow the section `## Flow: creator:reel`. When it says "the Coach", follow `## Helper: Coach`. When it says "go to the `mg-reel-style` section", follow that section of this skill.

## Find the skill folder

This SKILL.md sits in the skill folder. Find it once, at the start of the chat:

```text
find / -name SKILL.md -path "*reel-skill-chat*" 2>/dev/null | head -1
```

The folder of that file is the skill folder. It is read-only, so the setup below copies the engine to a folder you can write in.

## Setup

Code execution must be on (Settings, Capabilities). Run this once per chat, as one command, before any reel work:

```bash
SKILL="$(dirname "$(find / -name SKILL.md -path "*reel-skill-chat*" 2>/dev/null | head -1)")"
W=/home/claude/creator
E="$W/.engine"
mkdir -p "$E" "$W/03 - export" "$W/00 - notes/content"
cp -R "$SKILL/scripts" "$SKILL/references" "$E/"
tar xzf "$SKILL/assets.tar.gz" -C "$E"
[ -f "$W/00 - notes/ledger.md" ] || cp -R "$E/assets/vault/00 - notes/." "$W/00 - notes/"
REEL_CHROME="$(ls -d /opt/pw-browsers/chromium-*/chrome-linux*/chrome 2>/dev/null | head -1)"
G="$(npm root -g)"
if [ -d "$G/playwright" ]; then
  NODE_GLOBAL="$G"
else
  if [ ! -d "$G/playwright-core" ]; then
    V="$(python3 -c "import importlib.metadata as m; print(m.version('playwright'))" 2>/dev/null)"
    npm i -g "playwright-core${V:+@$V}" >/dev/null 2>&1 || npm i -g playwright-core >/dev/null 2>&1
  fi
  G="$(npm root -g)"
  mkdir -p "$W/.node"
  ln -sfn "$G/playwright-core" "$W/.node/playwright"
  NODE_GLOBAL="$W/.node"
fi
cat > "$E/env.sh" <<EOF
export REEL_CHROME="$REEL_CHROME"
export NODE_GLOBAL="$NODE_GLOBAL"
export REEL_OUT="$W/03 - export"
export REEL_TABS=2
EOF
. "$E/env.sh"
[ -f "$E/scripts/render.sh" ] && echo "engine ok" || echo "missing: engine"
[ -x "$REEL_CHROME" ] && echo "chromium ok" || echo "missing: chromium"
node -e "require(process.env.NODE_GLOBAL + '/playwright')" && echo "playwright ok" || echo "missing: playwright"
command -v ffmpeg >/dev/null && echo "ffmpeg ok" || echo "missing: ffmpeg"
python3 -c "import numpy, scipy, PIL" && echo "python ok" || echo "missing: numpy, scipy or pillow"
```

What it does:

1. **The engine.** It copies `scripts/` and `references/` to `/home/claude/creator/.engine/`, and unpacks `assets.tar.gz` there as `assets/`. That is the engine folder.
2. **The work folder.** `/home/claude/creator/` is a copy of the user's notes layout. Every notes path in this skill, such as `00 - notes/ideas/` or `03 - export/<YYYY-MM-DD>-<slug>/`, is inside it.
3. **Chromium.** `REEL_CHROME` is the first match of `/opt/pw-browsers/chromium-*/chrome-linux*/chrome`, the sandbox's own Chromium. Capture uses it instead of Google Chrome.
4. **Playwright.** `capture.mjs` loads `playwright` from `NODE_GLOBAL`, which comes from `npm root -g`. If only `playwright-core` is there, the setup links it as `playwright` in `/home/claude/creator/.node/`.
   If it has to install `playwright-core`, it picks the version of the sandbox's Python `playwright` package, because that one matches the sandbox Chromium; with no Python package it takes the latest.
5. **Python** needs numpy, scipy and pillow. The sandbox has them.

If a line says `missing:`, tell the user in one plain line and stop. If Chromium is missing or will not start, the backup page at the end of this skill still makes the video.

Run every engine command like this, so the settings are there each time:

```text
. /home/claude/creator/.engine/env.sh && cd /home/claude/creator && <command>
```

## The user's Project files

The Project holds four files, and a fifth one, `templates.md`, once the user saves a carousel template. They are the real copy of the user's page:

| Project file | Copy it to, in the work folder |
|---|---|
| `brand.md` | `00 - notes/context/declared/brand.md` |
| `taste.md` | `00 - notes/context/observed/taste.md` |
| `ideas.md` | one note per idea in `00 - notes/ideas/` |
| `ledger.md` | `00 - notes/ledger.md` |
| `templates.md` (optional) | `00 - notes/context/declared/templates.md` |

At the start of the chat, after Setup, copy each Project file over the empty one in the work folder. Find the files with `find / -name brand.md -not -path "*reel-skill-chat*" -not -path "/home/claude/*" 2>/dev/null` (the copies under `/home/claude/` are the empty ones from Setup). If they are not on disk, write them from the Project text. A file the Project does not have yet keeps the empty copy from the setup. `templates.md` is optional: with no `templates.md`, the user has no saved templates, and every flow still works.

`ideas.md` holds every idea note in one file: each idea starts with a `## <note name>` line, then the note exactly as it is, frontmatter included. Split it into `00 - notes/ideas/<note name>.md`. Join it back the same way when you save.

## Save back

The work folder is gone when the chat ends. Only the Project files stay. So:

1. **At the end of any flow that changed `brand.md`, `taste.md`, an idea note or `ledger.md`, hand back those files** as files the user can download. That is every reel, every carousel and every review, and also new ideas (`creator:ideas`, made-up story Scout), a saved source (`creator:save`), the brand interview, a post link added to the ledger, and any idea `status` change. `ideas.md` is all notes in `00 - notes/ideas/` joined (not `_template.md` or `_index.md`). After a reel, a carousel and a review, always hand back `taste.md`.
   After a carousel template is saved, also hand back `templates.md`, with every template in it (one `## <name>` section each).
2. Say in one line: "Replace these in your Project files, so the next chat knows what you like."
3. Also save the new lesson in chat memory as a backup, one short line that starts with "Reel skill lesson:". If memory is off, say so in one line and go on.
4. With a finished reel, also hand back its `script.md`, so the user can attach it later to redo the caption or the reel.
5. Raw sources in `00 - notes/sources/` are not kept in chat. What a source teaches lives on in the ideas and `taste.md` you hand back.

## Chat rules that win

These replace the desktop parts of the sections below. Where a section says otherwise, these win.

1. **Paths.** `/home/claude/creator/.engine/` is the engine folder. A path that starts with `scripts/`, `assets/` or `references/`, or a link with no folder in front, is inside the engine folder. The `S/` of the build section is `/home/claude/creator/.engine/scripts/`.
2. **Questions.** There are no buttons here. Where a section says buttons or AskUserQuestion, write the question with 2 to 4 numbered choices, mark the pick, and leave room for the user's own words.
3. **No boards, no Obsidian, no Zernio, no slash commands.** Skip any step about boards, the Idea Board, Obsidian, `index.md` or `log.md`. The user posts and pulls numbers themselves: for a review, ask for a screenshot of the reel's Insights.
4. **Sources.** Read sunnah.com and quran.com with your own web fetch, not `source.mjs`. Every other source is read with web fetch too.
5. **Reciter audio.** On an Islamic page the user attaches the reciter MP3, because the reciter site is blocked here. Ask for it before the storyboard. Never make a computer voice read the Qur'an.
6. **Voiceover is no** in this chat. Do not ask it. A voice key cannot be kept safe in a chat.
7. **Sounds.** The 34 hits in `assets/sfx/` are ready. SFX Kit sounds (`kit:<id>`) are fetched one by one from `raw.githubusercontent.com/wyzowl/sfx-kit/main/` and checked by sha256. Before each render run `python3 -I /home/claude/creator/.engine/scripts/get-sounds.py /home/claude/creator/.engine "00 - notes/content/<slug>"`. If a sound will not download, pick another one in the catalogue.
8. **Beds.** The 13 beds in `assets/sfx/beds/` are ready: name one in the reel's `bed.txt` as `references/sound.md` says, or write `none`. A bed made with ElevenLabs is not possible here, so pick one of these 13.
9. **Preview.** There is no live preview server and no browser pane. In the build, the contact sheet of stills (`sheet.mjs`) is the preview: show it as an image. Show the storyboard as a screenshot: `"$REEL_CHROME" --headless=new --no-sandbox --window-size=1200,2400 --screenshot=<folder>/storyboard.png "file://<folder>/storyboard.html"`.
10. **Render time.** The sandbox has 2 CPUs. A 10 s reel takes about a minute and a half, a 60 s reel about 8 minutes. Run it in the background (`nohup bash /home/claude/creator/.engine/scripts/render.sh "<folder>" > "<folder>/render.log" 2>&1 &`), check the log every minute or so, and tell the user it is working.
11. **The finished MP4.** Copy `reel.mp4` and `poster.jpg` from `03 - export/<YYYY-MM-DD>-<slug>/` to `/mnt/user-data/outputs/` if that folder exists, and give the user the file. If it does not exist, offer the MP4 as a file in the reply.
12. **One reel at a time.** No background helpers. Bulk prep runs the reels one after another.
13. **The backup page.** If the render cannot work here, follow the last section, "If the render fails here".

## Flow: creator:start

Brand interview, then your first reel. Run once after setup, or again to change your brand.

A short talk that fills in your page details, then makes your first reel right away as proof.

### 0. Check first

Read `00 - notes/context/declared/brand.md`.

- If `page_name` is empty: a fresh page. Go to step 1.
- If it is filled: ask one question with buttons: "Change my brand" (go to step 1, show the current answers as the picks), "Make a reel" (go to step 4), or "Show me the full tour" (go to step 3).

### 1. Core or full tour

Ask once, with buttons:

1. **Core, about 5 minutes** (recommended): your page details, then your first reel.
2. **Full tour**: the same, plus a walk through your boards, your notes and how Claude learns your taste.

### 2. The brand interview

Ask in small groups with AskUserQuestion: 2 to 4 numbered choices per question, the pick marked, and always room for "let me describe it" in the user's own words. Skip anything already said.

1. **Niche:** Islamic, faceless, business, personal, or other. Write the lowercase word (`islamic`, `faceless`, `business`, `personal`, `other`).
2. **Page name and handle.** Ask in plain words: "What is your page called, and your @handle?"
3. **Voice:** offer three short voices that fit the niche (for example warm and calm, bold and direct, playful and light).
4. **Colours:** offer three pairs (a main colour and an accent) that fit the niche, or "use my own".
5. **Comment word:** the one word you ask people to comment. Offer three that fit the niche.
6. **Hashtags:** suggest a fixed set of 5 to 8 for the niche. The user can edit it.
7. **Content kinds:** the kinds of reels you make. Suggest 3 to 5 for the niche, for example "lessons", "made-up stories", "tips", "myths". Each kind becomes a group on the boards. If the user wants made-up stories, save that kind as `parable` (call it "made-up stories" when you talk to the user). Save every other kind as a short lowercase word.

Then:

- Write the answers into the frontmatter of `00 - notes/context/declared/brand.md` (`page_name`, `handle`, `niche`, `voice`, `colours`, `comment_word`, `hashtags`, `content_kinds` as a list). Leave `voice_id` empty. Replace the body with two or three plain lines about the page.
- If the user said something about what they like or dislike, add it under `## Likes` or `## Dislikes` in `00 - notes/context/observed/taste.md`.
- One line in `log.md`: `YYYY-MM-DD | Brand set up | brand.md`.
- Read the brand back in five short lines and ask "Looks right?" with buttons.

### 3. Full tour only

Short and plain, one part per message, and the user can stop at any time:

1. **Your boards.** Open `01 - dashboards/Home.md` in Obsidian. Name the seven boards in one line each.
2. **Your notes.** Ideas live in `00 - notes/ideas/`, reels in `00 - notes/content/`, finished videos in `03 - export/`, and your posts and numbers in `00 - notes/ledger.md`.
3. **Saving things.** Paste a link or a note and say "save this". Claude files what it learned (`creator:save`).
4. **Taste.** After each reel Claude asks what worked and keeps one lesson in `taste.md`. After you post, `creator:review` turns your numbers into lessons.
5. **Your day.** `creator:today` shows what to make next, what is due and what to review.

### 4. Your first reel

1. Ask with buttons: "Give me 3 ideas" (recommended) or "I have a topic".
2. **3 ideas:** read the `## Helper: Idea scout` section and do its job here, for 3 ideas only. **Own topic:** write one idea note for it the same way.
3. The user picks one. Run `creator:reel` on it.

### 5. After the first reel

Hand back `brand.md` and `taste.md` (see Save back). End with one line: "Say what should I do today, any day, to see what to do next."

### Rules

- Plain, short sentences. Warm. No em dashes. No jargon.
- Never guess the user's page from any file in this folder. Only from what they tell you.

## Flow: creator:today

What to do today. The make-next pick, what is due to post, and what is ready to review.

A short daily view. Three lists, then one choice.

### Read

- `00 - notes/context/declared/brand.md` and `00 - notes/context/observed/taste.md`.
- The idea notes in `00 - notes/ideas/` (not `_archived/`).
- `00 - notes/ledger.md`. Carousels count the same as reels in every list below.

### Show

1. **Make next.** Read the `## Helper: Coach` section and do its make-next pick, steps 1 to 3 only: one idea and the runner-up, with one line on why. Do not ask its step 4 question; the one question below covers it.
2. **Due to post.** Idea notes with a `post_date` of today or earlier that are not `posted` or `dropped`, earliest first. Then the ones due in the next 7 days. Show the title, the `post_date`, the `status`, and whether the MP4 is ready in `03 - export/`. If a date has passed and the reel is not built, say so plainly.
3. **Ready to review.** Rows in `## Posts` that are at least 48 hours old with no row in `## Stats at 48 h`.

Show each list as a small table. Leave out a list that is empty, and say "Nothing due" or "Nothing to review" in one line.

### Then ask

One numbered question only, with buttons, the best one marked. Ask nothing else in this reply:

1. Make the pick now (`creator:reel`).
2. Review the waiting posts (`creator:review`).
3. New ideas (`creator:ideas`).
4. Nothing today.

Keep the whole reply short. No em dashes.

## Flow: creator:ideas

New reel ideas into your ideas folder, real lessons and made-up stories, with no repeats.

Finds new reel ideas and saves one note per idea in `00 - notes/ideas/`.

Input: what the user said (a number, a theme, or "made-up stories about X"; all optional).

Read the `## Helper: Idea scout` section and do its job with this input. In short:

1. It reads `brand.md`, `taste.md`, the ledger and the ideas already saved.
2. It mixes real lesson ideas with made-up story ideas (the `mg-reel-parable` skill in Scout mode). If the user asked only for made-up stories, all of them are stories.
3. It drops any idea already in `## Posts` in `00 - notes/ledger.md` or already in an idea note.
4. It writes every note from `00 - notes/ideas/_template.md` with every key filled, and adds a line to `log.md`.
5. It shows the list with a score and one pick.

End with a numbered choice: make the pick now (`creator:reel`), more ideas, or done.

## Flow: creator:save

Save a source (a link, an article, a video, a note or a file) and file what it teaches into your notes.

Saves a source as it is, talks it through with you, then files what it teaches into the right notes.

Input: what the user said (a link, a file path, or pasted text). If empty, ask the user to paste or drop it.

### 1. Read it

- A link: fetch the page. A YouTube link: get its transcript.
- A file: read it. A screenshot: read the text in the picture.
- Pasted text: use it as it is.

### 2. Keep the raw copy

Save it in `00 - notes/sources/` as `<YYYY-MM-DD>-<short-name>.md`: a small frontmatter (`type: source`, `url`, `saved` with today's date), then the content as it is. This file is never edited again, not by you and not later.

### 3. Talk it through first

Before filing anything, tell the user in 3 to 5 short lines what the source says and what it could become: reel ideas, a lesson for `taste.md`, a change to `brand.md`. Ask with buttons what to keep:

1. Turn it into reel ideas (recommended when it has a clear lesson).
2. Add a lesson or a like to my taste.
3. Just keep it for later.

Room for the user's own words.

### 4. File what was agreed

- **Reel ideas:** write idea notes from `00 - notes/ideas/_template.md` with every key filled. `source` and `source_url` point at this source. `source_status: verified` only if the source is the primary page; a repost or a summary stays `lead`. `found_by: save`.
- **Taste:** one short line under `## Lessons`, `## Likes` or `## Dislikes` in `00 - notes/context/observed/taste.md`. 30 lessons at most; merge old ones.
- **Brand:** only with the user's yes on the exact change.
- Link each new note back to the source with `[[<source file name>]]`.

### 5. Update the map

- Add a line to `index.md` for the source and for any new note.
- Add one line to `log.md`: `YYYY-MM-DD | Saved <source>, filed N notes | <files touched>`.

End with what was filed, one line per file.

### Rules

- Never edit a file in `00 - notes/sources/` after it is saved.
- Never invent what a source says. Quote it.
- Plain, short sentences. No em dashes.

## Flow: creator:review

Your 48 hour numbers into the ledger, then lessons into taste.md and a pick for what to make next.

Reads how your posts did two days later, saves the numbers, and turns them into lessons.

Input: what the user said (one post, optional). If empty, review every post that is waiting.

### 1. Find what is waiting

Read `00 - notes/ledger.md`. A post is waiting when its row in `## Posts` is at least 48 hours old and has no row in `## Stats at 48 h`. List them in one short table. A carousel counts the same as a reel. For a carousel, write `N/A` for skip rate and average watch, because it has no watch time. If none are waiting, say so, name the next one that will be ready, and stop.

### 2. Get the numbers

For each waiting post, get: views, skip rate, average watch time, shares, saves, comments.

- **With Zernio** (if the Zernio tools are connected): list the accounts, use the user's Instagram account, and read the post's numbers with the analytics tool. If more than one Instagram account is connected, ask which one.
- **Without Zernio:** ask the user for a screenshot of the post's Instagram Insights (open the reel or carousel, tap "View insights", take a screenshot, drop it here). Read the numbers from the picture. Read them back to the user in one line and ask "Right?" with buttons before saving.

If a number is not shown, leave it empty. Never guess one.

### 3. Save the numbers

For each post:

1. Add a row to `## Stats at 48 h` in the ledger: `| <idea note name> | views | skip rate | average watch | shares | saves | comments |`. Write average watch with the reel's length, for example `14 s of 30 s`. For a carousel, write `N/A` for skip rate and average watch.
2. In the idea note in `00 - notes/ideas/`, if there is one (the Stats id is its name; for a reel or carousel with no idea note, the id is its folder name and this step is skipped): set `views`, `shares` and `saves` to the same numbers. If `status` is not `posted` yet, set it to `posted`. If `post_url` is empty and you have the link, add it.
3. One line in `log.md`: `YYYY-MM-DD | 48 h numbers for <name> | 00 - notes/ledger.md, <idea note>`.

### 4. Lessons and the next pick

Read the `## Helper: Coach` section and do its job: the lessons in `taste.md` (30 at most, old ones merged), then the make-next pick.

End with the new lessons in plain words, and the pick.

## Flow: creator:reel

Idea to finished MP4, then the caption. Give an idea, a topic, or a made-up story to tell.

Makes one reel from start to finish: script, look, storyboard, build, render, then the caption.

Input: what the user said (an idea note name, a topic, a link, or "a made-up story about X"). If empty, ask with buttons: the Coach's make-next pick, another idea from the list, or "I have a topic".

Every helper below asks the user at each stop, so do each one here in the chat: read its file and do its job. Do not hand them to a background helper.

### Before you start

1. Read `00 - notes/context/observed/taste.md`. Keep its lessons, likes and dislikes in mind at every step.
2. Read `00 - notes/context/declared/brand.md`.
3. If `## Posts` in `00 - notes/ledger.md` has a post that is 48 hours old with no row in `## Stats at 48 h`, say so in one line and offer `creator:review` first. Carry on if the user says no.
4. **Resume.** If a reel folder for this idea already exists in `00 - notes/content/`, read the `status:` in its `script.md`. `topic done` or `blocked`: step 1. `story done`, `looks pitched`, `style done`, `storyboard done` or `delivered`: steps 2 to 5 (the Reel maker's status table says where).
5. **Voiceover.** If `voice_id` in brand.md is empty, the answer is `voiceover: no`, without asking.

Show this list in each reply and tick it off:

```text
Reel progress:
- [ ] 1 Script checked and approved
- [ ] 2 Look picked
- [ ] 3 Storyboard approved
- [ ] 4 Preview seen
- [ ] 5 MP4 rendered and checked
- [ ] Lesson saved
- [ ] Caption and Threads post written
```

### Step 1: the script

Read the `## Helper: Script writer` section and do its job.

- A **real lesson** goes through the `mg-reel-topic` skill, then the `mg-reel-story` skill.
- A **made-up story** goes through the `mg-reel-parable` skill in Script mode.

Done when the user said yes to the copy (`status: story done`). On that yes the skill moves to the look by itself. Do not stop it: that is step 2.

### Steps 2 to 5: the reel

These are the reel skills' own chain: the look (`mg-reel-style`), the storyboard (`mg-reel-storyboard`), the build, preview and render (`mg-reel-build`). Each hands to the next on the user's yes. Read the `## Helper: Reel maker` section and follow it from step 2: it keeps the idea note's status, picks up a half-done reel, and does the follow-through after the render.

The MP4 lands in `03 - export/<YYYY-MM-DD>-<slug>/reel.mp4`.

Then the Reel maker asks with buttons what worked, and writes one lesson in `taste.md` (30 at most, old ones merged).

### The end: caption

Read the `## Helper: Caption helper` section and do its job: the caption, the Threads post, the posting day and slot, and the ledger row once the user gives the post link.

End with the path to the MP4 and one line on what to do next.

## Flow: creator:carousel

Idea to finished carousel, then the caption. Give a topic, your own text, a finished reel, or a template name.

Makes one carousel from start to finish: the source check, the slides, the look, the PNG files, then the caption.

Input: what the user said (a topic, your own text in quotes, a reel folder name, or the name of a saved template). If empty, ask with buttons: a topic from the idea list, "I have my own text", "turn a finished reel into a carousel", or "use a template".

The skill asks the user at each stop, so do it here in the chat. Do not hand it to a background helper.

### Before you start

1. Read `00 - notes/context/observed/taste.md`. Keep its lessons, likes and dislikes in mind at every step.
2. Read `00 - notes/context/declared/brand.md`.
3. If `## Posts` in `00 - notes/ledger.md` has a post that is 48 hours old with no row in `## Stats at 48 h`, say so in one line and offer `creator:review` first. Carry on if the user says no.
4. If `00 - notes/context/declared/templates.md` has saved templates (one `## <name>` section each), list their names when the user has not picked a path.
5. **Resume.** If a carousel folder for this idea already exists in `00 - notes/content/` (the name ends in `-carousel`), read the `status:` in its `script.md` and carry on from the next step.

Show this list in each reply and tick it off:

```text
Carousel progress:
- [ ] 1 Folder made
- [ ] 2 Source checked (topic only)
- [ ] 3 Slides approved
- [ ] 4 Look and size picked
- [ ] 5 Rendered and checked
- [ ] 6 Slides and caption handed over
- [ ] 7 Template offered, lesson saved
```

### Make the carousel

Read the `mg-carousel` section of this skill and follow it. It does steps 1 to 7 and stops for the user's yes after the source, the slides and the look.

The work folder is `00 - notes/content/<YYYY-MM-DD>-<slug>-carousel/`. The PNG files and `caption.txt` land in `03 - export/<same folder name>/`.

### The end

Give the path to the PNG files and the caption to copy. Say in one line what was not checked, and what to do next.

When the user posts, do step 7 of the skill: add a row to `## Posts` in `00 - notes/ledger.md` with `carousel` in the `format` column, and set the idea note to `status: posted` with `post_url` and `post_date`. Carousels count the same as reels in `creator:review` and `creator:today`.

## Helper: Idea scout

You are the Idea scout for this reel studio. Your one job: find good reel ideas for the user's page and save each one as an idea note.

### When to invoke

- **The user asks for ideas.** "Give me 6 ideas", "ideas for Ramadan", "ideas about saving money". Write the notes, then show the list.
- **The user asks for a made-up story.** "A made-up story about patience". Story ideas come from the `mg-reel-parable` skill in Scout mode.
- **The start interview needs a first reel.** Give 3 ideas only, then hand the pick back.

### Read first

1. `00 - notes/context/declared/brand.md`: niche, page name, voice, content kinds.
2. `00 - notes/context/observed/taste.md`: lessons, likes and dislikes.
3. `00 - notes/ledger.md`, the `## Posts` table: what is already posted.
4. The notes in `00 - notes/ideas/`: what is already waiting.

### Steps

1. **How many.** Six ideas unless the user gave a number. The start interview asks for 3.
2. **Mix the kinds.** Spread the ideas over the user's `content_kinds`. Made-up story ideas have the kind `parable`. Add them only when `parable` is in `content_kinds` (then about one in three) or when the user asks for made-up stories.
3. **Made-up story ideas.** Go to the `mg-reel-parable` section in Scout mode, with the number you need and the theme. It reads its sources and writes its own notes. Do not write those notes again.
4. **Real lesson ideas.** For each one, find the source the lesson stands on. On an Islamic page this is an ayah or a hadith. On any other page it is a book, a study or an official page. If you read the source on its own page, set `source_status: verified`. If it is only a search result or memory, set `source_status: lead`. The reel's topic step checks it again later.
5. **No repeats.** Drop any idea whose topic or hook is already in the ledger or already in an idea note. Say which ones you dropped and why, in one line each.
6. **Score each idea** out of 10, one point per check passed:
   1. The hook stops the scroll in the first second.
   2. It has one clear lesson.
   3. The source is real and can be named.
   4. Motion can show it (an object, a place, an action, a change, a count).
   5. It fits the brand and one of its content kinds.
   6. It is not a repeat.
   7. It fits a like in `taste.md` and none of the dislikes.
   8. There is someone the viewer would send it to.
   9. The risk is low.
   10. It ends on a natural one-word comment ask.
7. **Write the notes.** One file per idea in `00 - notes/ideas/`, named after the idea in plain words. Copy `00 - notes/ideas/_template.md` and fill every key: `type: reel_idea`, `area` (one of the content kinds), `status: idea`, `score`, `hook`, `source`, `source_url`, `source_status`, `proof`, `proof_url`, `send_to`, `risk`, `season`, `slot` (leave empty), `post_date` (leave empty), `found_by: idea-scout`, `created` (today, YYYY-MM-DD). Leave `views`, `shares`, `saves` and `post_url` empty. Under the frontmatter: the title and one or two lines on the reel.
8. **File it.** Add a line to `index.md` if this is a new kind of note, and one line to `log.md`: `YYYY-MM-DD | Idea scout added N ideas | 00 - notes/ideas/`.
9. **Show the list.** One line per idea: title, kind, score, hook. Mark the one you would make first and say why in one line. End with a numbered choice: make one now, more ideas, or done.

### Rules

- Plain, short sentences. No em dashes.
- On an Islamic page, follow the reel rules for sources: sahih or hasan hadith only, never a prophet as a character.
- On any other page, never ask for a hadith or ayah.
- Never invent a source, a number or a quote. A lead stays a lead.

## Helper: Script writer

You are the Script writer for this reel studio. Your one job: turn one idea into a checked, approved script, written to the reel's `script.md`. You stop when the user has said yes to the copy.

This job needs the user's yes at each stop, so it runs in the main chat, never in the background.

### When to invoke

- **A real lesson.** The idea rests on a real source: a verse or saying on an Islamic page, a book, a study or an official page on any other page.
- **A made-up story.** The idea note has `area: parable`, or the user says "made-up story", "a story about", "fiction".
- **Redo the words.** "Redo the story", "change the copy" on an existing reel folder.

### Read first

1. `00 - notes/context/declared/brand.md` and `00 - notes/context/observed/taste.md`.
2. The idea note in `00 - notes/ideas/`, if there is one.
3. "Fixed for every reel" and "Question round" in the `mg-reel` section of this skill.

### Steps

1. **Resume first.** If the reel folder already exists, read `status:` in its `script.md`. `topic done`: go to the `mg-reel-story` section. `blocked`: tell the user why (under `## Open questions`) and offer another source. `story done` or later: your job is done. Follow the `## Helper: Reel maker` section, which picks up from that status.
2. **Pick the path.** Real lesson or made-up story (see above). If you cannot tell, ask one question with two buttons: "A real lesson" or "A made-up story", with the one that fits the idea marked as the pick.
3. **Set the idea note** to `status: picked`, if there is one.
4. **Voiceover.** If `voice_id` in brand.md is empty, the answer is `voiceover: no`. Do not ask it. Write it with the other answers, so the reel skills skip the question. Voice is offered after the first reel (`creator:start`, step 5).
5. **Write the script.**
   - **Real lesson.** Ask the question round from the `mg-reel` section of this skill in one go (source, mood, look, length, and voiceover only if `voice_id` is set), skipping anything already known. Make the folder `00 - notes/content/<YYYY-MM-DD>-<slug>/` and write the answers at the top of `script.md`. Then go to the `mg-reel-topic` section. It checks every source on its own page and stops for the user's yes. On yes it hands to `mg-reel-story`, which writes the copy and stops for a yes.
   - **Made-up story.** Go to the `mg-reel-parable` section in Script mode, with the idea or topic. If `voice_id` is empty, tell it "voiceover: no, already answered". It reads the lesson's source, makes the reel folder, writes `script.md` at `status: story done`, and stops for a yes.
6. **Hand over.** On the user's yes to the copy, the skill moves to the look on its own (`mg-reel-style`). That is the Reel maker's step 2: follow the `## Helper: Reel maker` section from there. Do not stop the skill or start the look again yourself.

### Rules

- Never skip a source check. A lead is never a source.
- On any page that is not Islamic, never ask for a hadith or ayah.
- If a source fails, offer another source for the same lesson. Never swap one in without asking.
- Plain, short sentences. No em dashes.

## Helper: Reel maker

You are the Reel maker for this reel studio. Your one job: take an approved script to a finished, checked MP4, and learn one lesson from the user at the end.

This job needs the user's eyes and yes at each stop, so it runs in the main chat, never in the background.

### When to invoke

- **After the Script writer.** The user said yes to the copy and `mg-reel-story` (or `mg-reel-parable`) has moved on to the look by itself.
- **Resume a reel.** The user says "carry on with my reel", or a reel folder is part way done (see the status table below).
- **Redo one step.** "Change the look", "redo the storyboard", "render it again".

### Read first

1. `00 - notes/context/observed/taste.md`. Use its lessons, likes and dislikes in every pick you pitch.
2. `00 - notes/context/declared/brand.md`: colours, handle, comment word.
3. The reel's `script.md` and its `status:`.

### Steps

The four steps the user sees. They are the reel skills' own chain: each one hands to the next on the user's yes, so you follow along and do not start them again.

2. **Look.** `mg-reel-style` pitches two or three looks with one still each. The user picks. When a look is picked, set the idea note to `status: building`, if there is one.
3. **Storyboard.** `mg-reel-style` hands to `mg-reel-storyboard`. It makes the voice take (only if `voiceover: yes`) and the storyboard. The user approves.
4. **Build and preview.** `mg-reel-storyboard` hands to `mg-reel-build`. It builds the reel and shows a live preview with sound. The user watches it.
5. **Render and deliver.** `mg-reel-build` renders and checks the MP4. It lands in `03 - export/<YYYY-MM-DD>-<slug>/reel.mp4`, with `poster.jpg` next to it.

**Resume.** When no skill is running, read `status:` in the reel's `script.md` and start here:

| `status:` | Start with |
|---|---|
| `topic done` | the Script writer (`mg-reel-story`), not you |
| `story done` | step 2: go to the `mg-reel-style` section |
| `looks pitched` | step 2: go to the `mg-reel-style` section, record the look the user picks |
| `style done` | step 3: go to the `mg-reel-storyboard` section |
| `storyboard done` | step 4: go to the `mg-reel-build` section |
| `delivered` | "After step 5" below (lesson, then caption) |
| `blocked` | tell the user why (under `## Open questions`) and go back to the Script writer |

If a step is redone, run every later step again.

After step 5:

1. **Set the idea note** to `status: built`, if there is one.
2. **Ask what worked.** One AskUserQuestion call with two questions, each with 3 or 4 buttons and room for the user's own words:
   - "What worked best?" (for example: the hook, the look, the sound, the story).
   - "What would you change next time?" (for example: slower, shorter, other colours, nothing).
3. **Write one lesson** in `taste.md`, under `## Lessons`, as one short line, newest first. Example: "Short warm hooks over a dark look felt right." If the answer is about a look, hook, sound or topic, also add a short line under `## Likes` or `## Dislikes`.
4. **Keep the list short.** If `## Lessons` now has more than 30 lines, merge two that say the same thing, or drop the weakest. Never more than 30.
5. **Log it.** One line in `log.md`: `YYYY-MM-DD | Reel <slug> built, one lesson saved | 03 - export/<YYYY-MM-DD>-<slug>/, taste.md`.
6. **Hand over** to the Caption helper (the `## Helper: Caption helper` section).

### Rules

- Never build before the user agreed the step before.
- Playback the user gave without asking for changes counts as a yes. Do not push for edits.
- Plain, short sentences. No em dashes.

## Helper: Caption helper

You are the Caption helper for this reel studio. Your one job: write the words that go out with a reel, and record the post once it is live.

### When to invoke

- **A reel is done.** The Reel maker hands over after the MP4 is delivered.
- **The user asks for post text.** "Write a caption", "a Threads post for this reel".
- **The user gives a post link.** "Here is my post", or a pasted Instagram link.

### Read first

1. `00 - notes/context/declared/brand.md`: voice, `comment_word`, `hashtags`, handle.
2. The reel's `script.md`: the copy and the comment ask on the last beat.
3. `00 - notes/context/observed/taste.md`.

### Steps

1. **The comment word.** Use the one-word ask the reel ends on. If the reel has none, suggest one that fits this reel, with `comment_word` from brand.md as the other choice, and ask the user to pick (two buttons, plus their own word).
2. **The caption,** in the brand voice:
   - A first line that works as a second hook.
   - Two to four short lines that carry the story, in full warm sentences.
   - The same one-word ask as the reel, as the last line before the tags. Example: "Comment YES if this is you."
   - A keyword line: 3 to 6 plain words people search for, in one line.
   - The fixed `hashtags` from brand.md, exactly as written there, as the very last line.
3. **The Threads post.** A shorter version: one hook line, one or two lines, the same ask. No hashtag block. It goes out with the video itself, never as a text chain.
4. **Show both** in two separate code blocks, so the user can copy each with one click.
5. **Save both** in the reel folder as `caption.md`, under `## Instagram` and `## Threads`.
6. **The idea note.** Find the idea note for this reel in `00 - notes/ideas/`. If there is none (the user's own topic), make one first: copy `00 - notes/ideas/_template.md`, name it after the reel in plain words, fill the keys from `script.md` (`area`, `hook`, `source`, `source_url`, `source_status`), set `status: built`, `found_by: own topic` and `created` to today.
7. **When will you post this?** Last step of this run. Ask with numbered choices: 1. Today, 2. Tomorrow, 3. Pick a date, 4. Not sure yet. Then in the idea note:
   - Set `post_date` to that day, as YYYY-MM-DD. For "Not sure yet", leave it empty.
   - Set `slot` to the next free slot: the highest `slot` in all idea notes, plus 1 (or 1 if none has a slot). Leave it if the note already has one.
   - If the Zernio tools are connected, offer to schedule it for that day: list the accounts, ask which one and what time, then make the post with the MP4 from `03 - export/<YYYY-MM-DD>-<slug>/reel.mp4` and the caption. Never post or schedule without the user's yes on the account, the time and the text. Otherwise the user posts it themselves.

### When the post is live

When the user gives the post link (now or in a later chat):

- Add a row to `## Posts` in `00 - notes/ledger.md`: `| YYYY-MM-DD | [[<idea note name>]] | reel | <link> | <one short note> |`.
- In the idea note, set `post_url` to the link, `post_date` to the day it went out, and `status: posted`.
- One line in `log.md`: `YYYY-MM-DD | Posted <slug> | 00 - notes/ledger.md, <idea note>`.
- Tell the user to run `creator:review` in two days for the numbers.

### Rules

- No em dashes. No guilt hooks. Plain, short sentences.
- Never change the hashtags in brand.md. Ask before adding any.
- If the user has no link yet, stop after step 7 and say: "Paste the link here when it is live, and I will add it to your ledger."

## Helper: Coach

You are the Coach for this reel studio. Your one job: read what happened, keep `taste.md` sharp, and pick the one reel to make next.

### When to invoke

- **After a review.** New rows were just added to `## Stats at 48 h` in the ledger.
- **For today.** `creator:today` needs the make-next pick.
- **The user asks.** "What should I make next", "what is working".

### Read first

1. `00 - notes/ledger.md`: `## Posts` and `## Stats at 48 h`.
2. `00 - notes/context/observed/taste.md`.
3. `00 - notes/context/declared/brand.md`.
4. The idea notes in `00 - notes/ideas/` (not the ones in `_archived/`).

### Lessons (after a review)

1. **Compare.** Put the new numbers next to the page's other posts. Look at views, skip rate, average watch against length, shares, saves and comments. Shares and saves count more than views.
2. **Find the reason.** Name what the best and the worst reels did differently: hook, length, look, kind, sound, topic. Read their `script.md` and `caption.md` if you need to.
3. **Write one or two lessons** under `## Lessons` in `taste.md`, one short line each, newest first. Say what to do, with the number behind it. Example: "Story reels kept people watching longer (62 percent against 41)."
4. **Likes and dislikes.** Add a short line under `## Likes` or `## Dislikes` when a look, hook, sound or topic clearly won or lost.
5. **Keep it to 30.** If `## Lessons` has more than 30 lines, merge the ones that say the same thing, or drop the weakest. Never more than 30. If a new lesson goes against an old one, keep the one with more posts behind it and say so.
6. **Log it.** One line in `log.md`: `YYYY-MM-DD | Coach saved N lessons | taste.md`.

### Make-next pick

1. **Candidates.** Idea notes with `status: idea`.
2. **Rank them** by `score`, then by fit with the lessons, likes and dislikes. Move an idea up if its `season` is close. Move it down if `source_status: lead` (it needs a source check first) or if it repeats a topic in `## Posts`.
3. **Pick one,** and say why in one line. Name the runner-up.
4. **Offer** to make it now with `creator:reel`, as a numbered choice: make the pick, make the runner-up, or not now. On a yes, set that note to `status: picked`.

### Rules

- Never invent a number. If a stat is missing, say so.
- A pick is a suggestion. The user decides.
- Plain, short sentences. No em dashes.

## The reel chain: `mg-reel`

The entry point of the reel chain. It makes a reel for the user's page, from a checked source. It asks the questions once, then runs each step skill in order. Every step ends at a stop where the user approves, because building before agreeing wasted whole renders. Only the way a reel is made is fixed: the story, the look and the motion are new for every reel, and every move, style or screen in this skill is a toolbox, never a limit.

Read the niche from 00 - notes/context/declared/brand.md.

The `niche:` key is islamic, faceless, business, personal or other. A rule marked "Islamic pages" applies only when `niche: islamic`; every other page uses the plain rule written next to it. For every niche, the handle, comment word, colours, hashtags and voice come from the same file.

### The chain

| Step | Skill | Ends when | Writes into the reel's `script.md` |
|---|---|---|---|
| 1 | `mg-reel-topic` | Sources recorded from the primary page | `## Sources`, `status: topic done` |
| 2 | `mg-reel-story` | The user approved the copy | `## Copy`, `status: story done` |
| 3 | `mg-reel-style` | The user picked a look | `## Look`, `status: style done` |
| 4 | `mg-reel-storyboard` | The user approved the storyboard (and the voice, if any) | `## Beat table`, `status: storyboard done` |
| 5 | `mg-reel-build` | The final MP4 is checked and delivered | `## Scores`, `status: delivered` |

How to run it. Copy this list into each reply and tick it off, so the user always sees where the reel is:

```text
Reel progress:
- [ ] Questions answered
- [ ] 1 mg-reel-topic: sources checked
- [ ] 2 mg-reel-story: copy approved
- [ ] 3 mg-reel-style: look picked
- [ ] 4 mg-reel-storyboard: storyboard approved
- [ ] 5 mg-reel-build: MP4 delivered
```


1. **New reel.** First pull the stats of any post 48 hours old that has no row in `## Stats at 48 h` (rules.md, After the user posts), and say in one line what the best and worst recent reels show. Then ask the question round below, make the folder `00 - notes/content/<YYYY-MM-DD>-<slug>/` in your folder, write the answers at the top of `script.md`, then go to the `mg-reel-topic` section.
2. **Next step.** When a step's stop is passed (the user said yes), invoke the next skill in the table. Never skip a step: each one makes the next cheaper.
3. **Redo one step** ("redo the story"). Read `status:` in the reel's `script.md`, invoke that step's skill, then run every later step again from its stop, because a new story changes the storyboard and the build.
4. **Resume.** A reel folder whose `script.md` has `status: <step> done` continues at the next step; `status: looks pitched` continues at mg-reel-style step 3 (record the look the user picked). Older reels with free-text `status:` start at the first step not yet in their `script.md`.
5. **Bulk prep** (`/mg-reel bulk` followed by a list of idea note names). Follow the section below.

### Bulk prep

The user names many ideas from the boards in `01 - dashboards/` and wants each one ready up to "script written, looks pitched" without being asked anything, so that later the user only picks a look, watches the preview and renders.

1. **Read the list.** An id like `deep-dive-spider-house-weakest` is the idea note `00 - notes/ideas/<id>.md`.
2. **No question round.** Mood and length come from the idea note. The look is "pitch me". Voiceover is asked when the look is picked.
3. **Per reel, run mg-reel-topic, mg-reel-story and mg-reel-style without their stops.** Make the folder as in "New reel", and set the idea note's `status: picked`. Every check in those steps still runs in full. Where a step would ask the user, take its recommended pick and write the question, the options and the pick under `## Open questions` in `script.md`. mg-reel-story records the other two shapes under `## Other shapes`. mg-reel-style draws one still per look for 3 looks.
4. **A failed source blocks only that reel.** If a source fails its check (on an Islamic page a weak hadith, on any other page a link that does not say what the reel claims), a number does not match, or the source is not showable, set `status: blocked`, write why under `## Open questions`, and go on to the next reel. Never swap in a new source unasked.
5. **Run reels side by side.** Give each reel its own helper with a fresh brief: the id, this section, the three step skill paths and `references/rules.md`. Run at most 4 at once. Helpers never run git and never post.
6. **End.** Each reel's `script.md` reads `status: looks pitched` (or `blocked`). Report one table: reel, folder, story shape, the 3 looks, open questions, blocked reason.

After the user picks a look for a bulk reel, ask voiceover yes or no, then run mg-reel-storyboard and mg-reel-build without stops up to the live preview: the preview and the render are the user's checks. A voice take still waits for the user's ear.

### Question round (once, before step 1)

One `AskUserQuestion` call, skipping anything the user already said. Each question has 2 to 4 options and a recommended pick.

- **Source** (if not given): on an Islamic page a hadith or ayah; on any other page a fact, a study, a book or an official page; for any niche a YouTube video (then its script is the source; see mg-reel-story).
- **Mood**: soft or intense. It sets the sound weight. It never narrows the looks pitched in mg-reel-style: pitch clear, different options, light and dark, and the user picks.
- **Look**: a named style, or "pitch me" (mg-reel-style pitches).
- **Length**: about 30 s, 45 s or 75 s. A length is a guide, never a cap: the script decides.
- **Voiceover**: yes or no. Voice is not a default; it is a choice per reel. If yes, mg-reel-storyboard makes the take first and times the beats to it.

### Fixed for every reel

These are about making the reel correctly, not how it looks. Every step follows them. The full checklist with every number is [references/rules.md](references/rules.md): mg-reel-topic copies it into the reel folder, and each step ticks its own section.

1. **Read the source on the primary page.** Islamic pages (`niche: islamic`): the Arabic, the English and the number come from sunnah.com or quran.com. Every other niche: each claim comes from its primary link (an official site, a study, a book page), read with web fetch. A search summary or memory is a lead, never the source: the reel goes out under a public name, and a wrong number is a public correction.
2. **Agree before building.** Every step stops for the user's yes, except in Bulk prep, where the open questions are written down instead. Building first and asking later wastes a render and pushes the user toward whatever already exists.
3. **Motion graphics that act the content out.** Every line gets its own visual event, drawn as proper illustration in code, and every visual carries the message without its caption. Never carousel paragraphs over a decorative motif. No AI video ever; no AI images unless the user agrees an exception for one reel.
4. **Balanced pace.** Each line stays long enough to read, something new keeps arriving, and the final read holds still, because dead holds were felt in every early cut. Numbers: rules.md, Build and look.
5. **Flow between beats is decided beat by beat.** Stay continuous when the next idea builds on the last; make a full scene change when the story really moves on. Neither a cut on every beat nor one forced shot.
6. **Readable on a phone,** with all text clear of the Instagram buttons. Minimum sizes and the safe zone: rules.md, Build and look.
7. **The medium's texture runs on every frame at full strength,** because thinning it makes the style read as fake.
8. **Copy tells a story** to one person, in full warm sentences, in the voice set in `00 - notes/context/declared/brand.md` (until `00 - notes/context/observed/taste.md` has lessons, a plain warm neutral voice). Nothing basic or overused: the viewer should never think "this again". The preferred way is to narrate what happened with the reference under it; reading the translation is fine when it fits. No em dashes, no jargon, no AI tells, no guilt hooks. On Islamic pages, scholars and tafsir may be named when read. On other pages, experts and authors may be named when read. Every reel ends with a comment ask (rule in rules.md, Copy).
9. Islamic pages: **Never draw a prophet,** in any form. Show a prophet through light, objects, places or the text. It cannot be taken back once public. A companion (sahabi) may be drawn as a faceless figure.
10. Islamic pages: **No six-pointed star, and no logo, stamp, seal or emblem.** Viewers read them as Israeli symbols. Loose 5-point stars and open 8-, 10- or 12-point Islamic geometry are fine.
11. **1080x1920, 30 fps, sound effects over a calm bed.** No music, never a constant hum, and a loudness ceiling the user set (rules.md, Sound). Detail in [references/sound.md](references/sound.md).

### Brand constants

These stay the same in every style, so the feed reads as one page. Each style draws them in its own type and colour. For every niche, the page's own values come from `00 - notes/context/declared/brand.md`: `handle`, `comment_word`, `colours` and `hashtags`. Items marked Islamic pages apply only when `niche: islamic`.

1. **Citation line**: the source in spaced capitals under the source text. One citation per screen. Islamic pages: the collection and number, `SAHIH AL-BUKHARI 6464`, `QURAN 2:286`. Every other niche: a plain source line with the source name, such as `WORLD HEALTH ORGANIZATION` or `ATOMIC HABITS, JAMES CLEAR`. No Arabic.
2. **Ending beat** on the reel's own palette: the comment ask (one word that fits this reel; `comment_word` in brand.md is the page's usual word, and "Comment SubhanAllah" is an Islamic page example), the page handle (`handle` in brand.md) near y 1420, "Follow for more." The page colours (`colours` in brand.md) are never a silent default.
3. **Sound weight matches the reel, and sound stays sparse:** about one sound every 3 to 5 s, one at a time. No scratchy pen or paper sounds.
4. **Arabic in Scheherazade New** (Islamic pages, or any reel that shows Arabic; `assets/ScheherazadeNew-Regular.ttf`, full tashkeel, the whole string shaped at once). Amiri drops dots in Chrome. Dots are checked on a full-size crop by pixel count.
5. **Key Arabic is written with the pen** (Islamic pages, up to 10 words): [pen-stroke calligraphy](references/styles/pen-stroke-calligraphy.md). Every other niche shows no Arabic: the key line of the source is set large in the reel's own type.
6. **Light watermark on every frame until the end card.** The page handle (from `00 - notes/context/declared/brand.md`) sits small near y 1475 (about 30px, opacity about .2) through the whole reel, clear of the text, then fades out in about .5 s as the end card shows its usual full handle. It protects reposts without getting in the way.
7. **Hashtags**: the caption ends with the `hashtags` in brand.md, for every niche.

### Shared files

Step skills link to these and never copy them, so a rule changed here reaches every step.

- [references/rules.md](references/rules.md) - every rule as a checklist, one section per step. When the user sets a new rule or corrects a reel, add it here in the same turn, with its reason.
- [references/story-shapes.md](references/story-shapes.md) - story shapes and the story references (mg-reel-story).
- [references/hooks.json](references/hooks.json) - 23 hook formulas with their traps; `scripts/hookscore.py` scores three per reel (mg-reel-story step 3).
- [references/THIRD-PARTY.md](references/THIRD-PARTY.md) - the MIT notice for the parts adapted from instagram-agent-skill.
- `mg-reel-parable` (its own skill) - made-up stories built on a checked text: Scout saves ideas to the board, Script hands a reel in at `status: story done`.
- [references/styles/index.md](references/styles/index.md) - the style recipes, each with a working page in `assets/styles/` (mg-reel-style).
- [references/ideas.md](references/ideas.md) - visual moves: openings, middles, transitions, payoffs, endings (mg-reel-story, mg-reel-style, mg-reel-storyboard).
- [references/look.md](references/look.md) - looks tried, cinema night, type, safe area, motion numbers (mg-reel-style, mg-reel-build).
- [references/sound.md](references/sound.md) - the sound line, the SFX Kit, the mix, the voiceover (mg-reel-storyboard, mg-reel-build).
- [references/screens.md](references/screens.md), [references/variants.md](references/variants.md) - ready-made screens; one reel in other styles (mg-reel-build).
- [references/review.md](references/review.md) - the cold reader brief (plan and built reel), the fix card, and the scope check (`capture.mjs scope`) (reel-direction, mg-reel-build).
- [references/style-prompts/](references/style-prompts/) - the source prompts behind 20 recipes, each with its reference code (mg-reel-style, mg-reel-build, only when a recipe is not enough).
- [assets/sfx-kit/GUIDE.md](assets/sfx-kit/GUIDE.md) and [assets/sfx-kit/catalogue.md](assets/sfx-kit/catalogue.md) - how to pick and sync a kit sound, and every sound with its sync point (mg-reel-storyboard, mg-reel-build).
- `assets/starter.html` (a blank hand-built scene: scene windows, `up()`, `typer()`, `add()`), `assets/motion.js` (springs).
- `scripts/` - source.mjs, preview.mjs, capture.mjs, sheet.mjs, mix.py, render.sh, pacing_check.py, readcheck.mjs (every on-screen text held long enough to read; needs `window.TEXTS(t)` in the page), blur.py, voice_check.py (Whisper hears each voice line and checks it against `voice-text.txt`), hookscore.py (scores hook lines), caption_check.py (lints each caption against the page rules). Run them, do not edit them per reel.

### Setup

In this chat, use the Setup at the top of this skill.

### Recipe and source files

Every recipe, for mg-reel-style to open directly once a style is chosen: [art-deco-foil](references/styles/art-deco-foil.md), [blueprint](references/styles/blueprint.md), [botanical-plate](references/styles/botanical-plate.md), [chalkboard-lesson](references/styles/chalkboard-lesson.md), [chapter-cards](references/styles/chapter-cards.md), [cinematic](references/styles/cinematic.md), [pastel-cinema](references/styles/pastel-cinema.md), [compass-bloom](references/styles/compass-bloom.md), [cyanotype](references/styles/cyanotype.md), [deep-sea-glow](references/styles/deep-sea-glow.md), [dot-ledger](references/styles/dot-ledger.md), [dreamy-aura](references/styles/dreamy-aura.md), [editorial-spread](references/styles/editorial-spread.md), [essay-collage](references/styles/essay-collage.md), [flat-vector](references/styles/flat-vector.md), [flow-field](references/styles/flow-field.md), [frosted-glass](references/styles/frosted-glass.md), [gold-vine](references/styles/gold-vine.md), [graphite-sketchbook](references/styles/graphite-sketchbook.md), [growing-island](references/styles/growing-island.md), [hand-drawn](references/styles/hand-drawn.md), [impasto](references/styles/impasto.md), [ink-in-water](references/styles/ink-in-water.md), [iso-night](references/styles/iso-night.md), [isometric-pastel](references/styles/isometric-pastel.md), [lantern-night](references/styles/lantern-night.md), [lattice-light](references/styles/lattice-light.md), [line-art-story](references/styles/line-art-story.md), [linocut](references/styles/linocut.md), [low-poly](references/styles/low-poly.md), [manuscript-page](references/styles/manuscript-page.md), [matisse-cutouts](references/styles/matisse-cutouts.md), [minimal-geometry](references/styles/minimal-geometry.md), [moon-phases](references/styles/moon-phases.md), [napkin-sketch](references/styles/napkin-sketch.md), [newsprint-collage](references/styles/newsprint-collage.md), [nouveau-card](references/styles/nouveau-card.md), [one-line](references/styles/one-line.md), [origami](references/styles/origami.md), [paper-diorama](references/styles/paper-diorama.md), [papercraft-kit](references/styles/papercraft-kit.md), [pen-stroke-calligraphy](references/styles/pen-stroke-calligraphy.md), [pixel-quest](references/styles/pixel-quest.md), [pressed-flower-journal](references/styles/pressed-flower-journal.md), [qalam-sketch](references/styles/qalam-sketch.md), [rain-and-light](references/styles/rain-and-light.md), [retro-os](references/styles/retro-os.md), [ridgeline](references/styles/ridgeline.md), [rim-light-stick](references/styles/rim-light-stick.md), [riso-print](references/styles/riso-print.md), [stained-glass](references/styles/stained-glass.md), [star-chart](references/styles/star-chart.md), [sumi-e-wash](references/styles/sumi-e-wash.md), [swiss-grid-poster](references/styles/swiss-grid-poster.md), [time-road](references/styles/time-road.md), [voxel-diorama](references/styles/voxel-diorama.md), [watercolour-bloom](references/styles/watercolour-bloom.md), [watercolour-sketchbook](references/styles/watercolour-sketchbook.md), [wireframe-terrain](references/styles/wireframe-terrain.md), [word-stack](references/styles/word-stack.md), [zellige-tile](references/styles/zellige-tile.md).

Style source prompts: [art-deco](references/style-prompts/art-deco.md), [botanical-plate](references/style-prompts/botanical-plate.md), [chalkboard](references/style-prompts/chalkboard.md), [cosmic](references/style-prompts/cosmic.md), [deep-sea](references/style-prompts/deep-sea.md), [editorial-collage](references/style-prompts/editorial-collage.md), [flow-field](references/style-prompts/flow-field.md), [glassmorphism](references/style-prompts/glassmorphism.md), [isometric](references/style-prompts/isometric.md), [linocut](references/style-prompts/linocut.md), [low-poly](references/style-prompts/low-poly.md), [napkin-sketch](references/style-prompts/napkin-sketch.md), [origami](references/style-prompts/origami.md), [papercraft](references/style-prompts/papercraft.md), [ridgeline](references/style-prompts/ridgeline.md), [sketchbook-pencil](references/style-prompts/sketchbook-pencil.md), [tarot-card](references/style-prompts/tarot-card.md), [voxel](references/style-prompts/voxel.md), [watercolor](references/style-prompts/watercolor.md), [wireframe-terrain](references/style-prompts/wireframe-terrain.md).

SFX Kit docs: [assets/sfx-kit/GUIDE.md](assets/sfx-kit/GUIDE.md) (how to pick and sync a kit sound) and [assets/sfx-kit/catalogue.md](assets/sfx-kit/catalogue.md) (every sound with its sync point).

## Step 1, sources: `mg-reel-topic`

Gets the sources right before any story is written, because the reel goes out under a public name and a wrong number is a public correction. Shared rules: the `mg-reel` section of this skill (Fixed for every reel) and `/home/claude/creator/.engine/references/rules.md`, section "Source (mg-reel-topic)".

Read the niche from 00 - notes/context/declared/brand.md.

Islamic pages (`niche: islamic`) check every hadith and ayah as below. Every other niche does a normal fact check with links instead.

```text
Topic progress:
- [ ] 0 Rules read
- [ ] 1 rules.md copied into the reel folder
- [ ] 2 Every source read on its primary page
- [ ] 3 Every number, count and absolute checked
- [ ] 4 Source is showable
- [ ] 5 Recorded in script.md, status: topic done
```

0. **Read the rules first,** even when this step runs alone, because the numbers live only there. Read "Fixed for every reel" and "Brand constants" in the `mg-reel` section of this skill, and the "Source" section of `/home/claude/creator/.engine/references/rules.md`. If the reel folder has no `rules.md`, copy it there. Done when read.
1. **Rules.** Copy `/home/claude/creator/.engine/references/rules.md` into the reel folder as `rules.md`. Tick the Questions section from the gate's answers. Done when the file is in the folder.
2. **Read each source on the primary page.**
   - **Islamic pages (`niche: islamic`).** Hadith: read `https://sunnah.com/<collection>:<n>` with your own web fetch. Ayah: quran.com, The Clear Quran for the English. Which hadith qualify, and the speaker check: rules.md, Source. For a YouTube source, find a primary page for each fact the video states; the video's story, images and claims stay in unless a primary text contradicts them (rules.md, Source). Done when every source has collection, number, narrator, grading, Arabic and English copied from the page.
   - **Every other niche: a normal fact check.** Each claim the reel makes gets a primary link: the official site, the study or the book page, read with web fetch. A search summary, a repost or memory is a lead, never the source. Record each one in `## Sources` with its title, its URL and the quoted line that backs the claim. For a YouTube source, find a primary link for each fact the video states. Done when every claim has a title, a URL and a quoted line.
3. **Check the risky words.** Every number, count and absolute ("only", "never", "once", "every") against the primary text, with the method written down. For a pattern or count reel, also the counting method to show on screen and a label for each claim (verified, a scholar's view, a coincidence or disputed; rules.md, Source). The hook is the highest-risk line. List each line the sources do not support, for the user's call. Done when each is checked or listed.
4. **Showable?** The source needs an object, a place, an action, a change or a count that motion can act out. If it is pure dialogue or a list, say so and offer a carousel instead, or text over a living scene. An outside analogy is fine when marked as ours, never as what the source says. Done when the user agrees it is showable, or picks the other route.
5. **Record.** Write `## Sources` in the reel's `script.md`, with the unsupported lines under it, and set `status: topic done` in its frontmatter (the same field older reels use). Tick the Source section of the reel's `rules.md`.

**Stop.** Show the user the sources and any unsupported lines. When they say yes, go to the `mg-reel-story` section. If a source fails, go back to step 2 with a new one. In bulk prep (`reel` SKILL.md, Bulk prep), do not stop: write the question and the pick under `## Open questions` and go on.

## Step 2, story: `mg-reel-story`

Decides how the reel tells its story before anything is drawn, because the story choice used to hide inside the look and came up too late. Reads the reel's `script.md` (`## Sources`). Shared rules: the `mg-reel` section of this skill and `/home/claude/creator/.engine/references/rules.md`, sections "Direction" and "Copy".

Read the niche from 00 - notes/context/declared/brand.md.

The citation line uses the niche's source format (the `mg-reel` section of this skill, Brand constants, Citation line): on an Islamic page the collection and number, on any other page a plain line with the source name.

```text
Story progress:
- [ ] 0 Rules read
- [ ] 1 Story shape picked or made
- [ ] 2 What the viewer watches planned
- [ ] 3 Copy written
- [ ] 4 Story check run
- [ ] 5 Copy approved, status: story done
```

0. **Read the rules first,** even when this step runs alone, because the numbers live only there. Read "Fixed for every reel" and "Brand constants" in the `mg-reel` section of this skill, and the "Direction" and "Copy" section of `/home/claude/creator/.engine/references/rules.md`. If the reel folder has no `rules.md`, copy it there. Done when read.
1. **Pick the shape.** Open `/home/claude/creator/.engine/references/story-shapes.md`. Offer three shapes that fit this source (a shape from the list or a new one), each in one line with why, and a pick. For a YouTube source, the video's order is the default: say so. Done when the user picks.
2. **Plan what the viewer watches, line by line.** A beat often holds several lines, and a scene planned per beat leaves lines with nothing to act them out. So plan each line on its own: what acts that line out, what is in front and behind, what moves, where the camera goes, and why the shot matters. Pictures may add details the words do not say; the words still say everything plainly. A line shares the scene before it only when it is too short to carry its own event (under about 1.5 s) or only adds the citation; write why next to it. Then plan the one motif that transforms through the reel, and where the camera travels inside one world. Borrow moves from `/home/claude/creator/.engine/references/ideas.md` (openings, middles, payoffs, endings); they are a toolbox, not a menu. No look or colours yet: that is mg-reel-style. Done when every line of the copy has its own visual event or a written reason to share one, and each would still say its line with the caption hidden.
3. **Write the copy.** Full warm sentences to one person, in the voice set in `00 - notes/context/declared/brand.md` (until `00 - notes/context/observed/taste.md` has lessons, a plain warm neutral voice). Only what the sources say; each unsupported line from mg-reel-topic stays out unless the user agreed it. One citation per screen, in the niche's source format (Brand constants, Citation line). No em dashes, no jargon, no guilt hooks. On Islamic pages, scholars and tafsir may be named when read. On other pages, experts and authors may be named when read. Pick the comment ask: one word or short phrase that fits this reel (story-shapes.md, "The comment ask"). If the hook adapts another page's line, say whose and how it changed. For the hook, write three from three different formulas and score them (story-shapes.md, "Hooks"); record all three with their scores and the pick under `## Hooks` in `script.md`. Done when every line is written with its citation and the hook is picked.
4. **Story check.** Read the copy and the plan as a harsh editor would. These are guides, not gates: a strong story can break one.
   - First: would a basic Muslim (who knows who Musa is, what salah is) understand every line on one listen? Say plainly what happens and what things are; no metaphors, no line written to sound like a quote.
   - Is the opening interesting to someone who does not know the topic?
   - Does it tell a story, or only explain?
   - Is the angle fresh, or would the viewer think "this again"? Could another page make almost the same reel?
   - Is the information revealed in a good order, with a turn where the viewer's understanding changes and a payoff at the end?
   - Is there one picture the viewer will remember, or are the visuals only illustrations?
   - Could it be much better?
   If the words are strong but the pictures are generic, fix the pictures in step 2; if the pictures are strong but the story is weak, fix the story in step 3. Write a short note on what the check changed under `## Story check`. Done when the check is written.
5. **Record.** Write `## Copy` and `## What the viewer watches` in `script.md`, keep any old draft under `## Old draft`, set `status: story done`, and tick the Direction and Copy rules that are done.

**Stop.** Show the copy beat by beat with its citation. When the user approves, go to the `mg-reel-style` section. If they change the shape, return to step 1; if they change lines, return to step 3. In bulk prep (`reel` SKILL.md, Bulk prep), do not stop: write the question and the pick under `## Open questions` and go on.

## Step 3, look: `mg-reel-style`

Picks how the reel looks, with one still per option, because three full builds were once all rejected when one still each would have caught it. Reads `script.md` (`## Treatment`, `## Copy`, `## What the viewer watches`). The look serves the picked treatment: its world, signature move and hero sequence must work in it. Shared rules: the `mg-reel` section of this skill and `/home/claude/creator/.engine/references/rules.md`, section "Direction".

A style is only a look: material, palette, texture, light, motion. Never tie it to its example props or topics; any style can draw anything the story needs.

```text
Style progress:
- [ ] 0 Rules read
- [ ] 1 Two or three looks pitched
- [ ] 2 One key still per look
- [ ] 3 Look picked, status: style done
```

0. **Read the rules first,** even when this step runs alone, because the numbers live only there. Read "Fixed for every reel" and "Brand constants" in the `mg-reel` section of this skill, and the "Direction" section of `/home/claude/creator/.engine/references/rules.md`. If the reel folder has no `rules.md`, copy it there. Done when read.
1. **Pitch.** First read the looks the user liked in `00 - notes/context/observed/taste.md`, and the Cinema night look in `references/look.md`. Pitch from those first. Never pitch Paper diorama or Sumi-e wash for a reel with human figures. If the user named a look in the question round, pitch only that one plus one contrast. Otherwise pitch two or three that differ in kind, not colour, from `/home/claude/creator/.engine/references/styles/index.md` (each recipe has Look, Motion, How it explains, and a working page in `/home/claude/creator/.engine/assets/styles/`). A recipe's **Production readiness** line says whether the style has held a full reel; a `needs work` style can still be pitched, with its gaps named. Open `/home/claude/creator/.engine/references/look.md` for looks tried and the cinema night look; `references/style-prompts/` only when a recipe is not enough. Name the palette for each: never the page colours by default, and "pastel" means many pastel palettes. Done when each look has a name, a palette and one line on why it fits the story.
2. **One key still per look.** Draw the hero sequence's key moment (from `## Treatment`) in each look's real style code: start from the style's working page in `/home/claude/creator/.engine/assets/styles/`, never a quick sketch from zero, because flat from-zero sketches read as clip art, at 1080x1920, captured with `node /home/claude/creator/.engine/scripts/capture.mjs <folder> stills <t>`. Look at each at full size. The style pages show `@YOURPAGE`: swap it for `handle` from `00 - notes/context/declared/brand.md`. Done when every look has a still and none breaks a fixed rule (Islamic pages: no prophet drawn, no emblem or six-pointed star; every page: text clear of the Instagram zones).
3. **Record.** Write `## Look` in `script.md`: the style, the palette as hex values, the fonts, the texture, and the still's path. Set `status: style done`.

**Stop.** Show the stills side by side, with a pick. When the user picks, go to the `mg-reel-storyboard` section. If none fits, return to step 1 with what they disliked. In bulk prep (`reel` SKILL.md, Bulk prep), do not stop: write the question and the pick under `## Open questions` and go on.

## Step 4, storyboard: `mg-reel-storyboard`

Plans every beat on paper before the full world is built, like a quick mock before the real app, because a full build takes many minutes and a sketch takes few. Reads `script.md` (`## Copy`, `## What the viewer watches`, `## Look`, and `voiceover:` from the question round). Shared rules: the `mg-reel` section of this skill and `/home/claude/creator/.engine/references/rules.md`, sections "Copy and storyboard" and "Sound".

```text
Storyboard progress:
- [ ] 0 Rules read
- [ ] 1 Voice take made and timed (only if voiceover: yes)
- [ ] 2 Beat table written
- [ ] 3 storyboard.html built and shown
- [ ] 4 Approved, status: storyboard done
```

0. **Read the rules first,** even when this step runs alone, because the numbers live only there. Read "Fixed for every reel" and "Brand constants" in the `mg-reel` section of this skill, and the "Copy and storyboard" and "Sound" section of `/home/claude/creator/.engine/references/rules.md`. If the reel folder has no `rules.md`, copy it there. Done when read.
1. **Voice (only if `voiceover: yes`).** Follow `/home/claude/creator/.engine/references/sound.md`, the Voiceover part. Write the text with tags and pauses in `voice-text.txt` (Arabic words and اللَّه in Arabic script with tashkeel). The Qur'an is never read by a computer voice. The ElevenLabs key comes from the env and is never printed: run Python with `python3 -I`. Save the take in `03 - export/<YYYY-MM-DD>-<slug>/`. Add the pauses and write `voice.wav` and `voice-times.js` (`window.VT`, start and end per line and cue word). Then run `python3 -I /home/claude/creator/.engine/scripts/voice_check.py <folder>`: Whisper hears each line back and fails any skipped, misread or extra word, or a tag read aloud; remake a failed line. Ask the user to listen to the Arabic words (its LISTEN lines), which it cannot check. Done when the user is happy with the take. The beats are timed to it from here on.
2. **Beat table.** In `script.md`, one row per line of copy (the line plan from `## What the viewer watches`), grouped under its beat: the seconds (from `window.VT` when there is a voice), the exact on-screen text, the composition (what is in front, what is behind, what the eye sees first) and why the shot is there, what moves, the object's state before and after (what this line changes), the camera move and shot size (mix wide, close, abstract and type-led on purpose), the transition into it (continuous, and what carries over; or a scene change with a reason, such as the camera travels through an object or a shape grows into the next scene; vary the moves, see `screens.md` Transitions and `ideas.md`), the feeling the line should leave, and the sounds with their kit ids and volumes, including any silence placed on purpose. Sounds per `/home/claude/creator/.engine/references/sound.md` and `/home/claude/creator/.engine/assets/sfx-kit/catalogue.md`, inside the limits in rules.md, Sound (with a voice, sounds sit well under it). Pace per rules.md, Build and look; length follows the script, never a cap. Done when every line has its own row with every column; a row that shares the scene above says why.
   Under the table, write `### Hero sequence` (from `## Treatment`): its time range and its choreography move by move: anticipation, the main move with its easing, overshoot (look.md limits), follow-through, settle, secondary motion, and the camera path. Only the hero sequence and the few key moves get this detail; other rows stay one line.
3. **storyboard.html** in the reel folder: a grid of quick 2D sketch panels (flat shapes for the objects, the exact text where it sits, an arrow for the camera, palette swatches), each with its beat number, times, transition and key sounds; under the grid, any fact or number that was assumed. Add ONE hero frame drawn with the real style code at full quality: the key moment of the hero sequence. Show it in the built-in browser pane. Done when the user has seen it.
4. **Record.** Set `status: storyboard done` and tick the storyboard and sound-plan rules.

**Stop.** When the user approves, go to the `mg-reel-build` section. If they change the beats, return to step 2; if they change the look, hand back to `mg-reel-style`. In bulk prep (`reel` SKILL.md, Bulk prep), do not stop: write the question and the pick under `## Open questions` and go on.

## Step 5, build and render: `mg-reel-build`

Turns the approved storyboard into the final MP4. Reads `script.md` (`## Beat table`, `## Look`) and `storyboard.html`. Shared rules: the `mg-reel` section of this skill and `/home/claude/creator/.engine/references/rules.md`, sections "Build and look", "Sound", "Deliver" and "After the user posts". Scripts live in `/home/claude/creator/.engine/scripts/` (called `S/` below).

```text
Build progress:
- [ ] 0 Rules read
- [ ] 1 Built: every beat plays
- [ ] 2 Live preview seen by the user
- [ ] 3 Stills and motion clips checked and scored
- [ ] 4 Rendered with sound
- [ ] 5 Final MP4 checked, rules ticked, delivered
```

0. **Read the rules first,** even when this step runs alone, because the numbers live only there. Read "Fixed for every reel" and "Brand constants" in the `mg-reel` section of this skill, and the "Build and look", "Sound" and "Deliver" section of `/home/claude/creator/.engine/references/rules.md`. If the reel folder has no `rules.md`, copy it there. Done when read.
1. **Build** `index.html` in the reel folder. It exposes `frame(t)` as a pure function of time (all randomness seeded) and pushes sounds into `window.SFX`. Reuse the storyboard's drawing code; start hand-built scenes from `/home/claude/creator/.engine/assets/starter.html`; ready-made screens and transitions are in `/home/claude/creator/.engine/references/screens.md`; motion numbers and easing in `references/look.md`. A helper gets a fresh brief, never a fork of the chat (a fork carries the whole conversation and builds nothing better). Done when every beat plays. When the reel shows Arabic, copy `/home/claude/creator/.engine/assets/ScheherazadeNew-Regular.ttf` next to the reel's `index.html` (the starter loads it from the same folder).
2. **Preview.** First fetch the SFX Kit sounds the page names that are not on disk: `python3 -I S/get-sounds.py S/.. <folder>` (run it again before the render if the sounds changed). If the fetch fails (no internet), pick a sound of the same feel that is on disk (`S/../assets/sfx-kit/sounds/`), or use none, and tell the user in one line. Then `node S/preview.mjs <folder> [port]`, open it with the built-in browser's `preview_start` and give the user the link. It plays live with sound and reloads on save. Done when the user has seen it. Stop the server when the step ends.
3. **Stills and motion.** `node S/capture.mjs <folder> stills <t1,t2,...>` at the start, middle and end of each beat, then `node S/sheet.mjs <folder>/stills`; open every questionable still at full size, Arabic dots by pixel count. A good still can hide bad motion, so also run `node S/capture.mjs <folder> clip <t0-t1,...>` for the hero sequence and every scene change: it writes `clips/<range>.mp4` and a strip of every 2nd frame, `clips/<range>.jpg`, where the spacing between frames shows easing, weight and overshoot. Look at each strip. Then a cold reader scores it (`/home/claude/creator/.engine/references/review.md`, part B): a fresh helper that sees only a pack of the stills sheet, the strips, key stills and `WORDS.md`, never the chat or the code. It scores 1 to 10 through four lenses, as a strict senior team would: **story** (pictures and words work together, the hero sequence shows what the words do not), **art direction** (composition, what the eye sees first, type, colour, depth, one consistent world), **motion** (nothing mechanical, weight feels real, every camera move and transition has a reason, no effect without a job), **phone viewer** (reads at a glance, the first 2 s pull in). Write its scores (marked `cold reader`) and its worst 3 problems in `script.md`, fix those 3, each with a fix card and a scope check (review.md), and re-capture only what changed. Each round gets a new reader. A fix that would change something the user already saw and approved (in the storyboard or the live preview) is asked first, in one line: what changes and why. Fixes to things the user never saw (a cut-off dot, a text clash) go ahead. Stop at all 8 or more, or after 2 rounds, and say what still scores low. One full still check, never a second one. If a still fails a fixed rule, return to step 1. Optional: other styles side by side, `/home/claude/creator/.engine/references/variants.md`.
4. **Render.** `bash S/render.sh <folder> [poster-seconds]` (in the background). It writes `reel.mp4` and `poster.jpg` to `03 - export/<YYYY-MM-DD>-<slug>/` in the kit folder, with the poster as frame 0. Read its report: every `TOO LOUD` line is a sound to lower in the page; with a voice, test the levels on a copy with `python3 S/mix.py <copy> <copy>` before rendering again. Done when the report prints no `TOO LOUD` line and the peak passes (rules.md, Sound).
5. **Deliver.** `node S/readcheck.mjs <folder>` (every text held long enough to read; the page must expose `window.TEXTS(t)`, contract at the top of the script): fix each FAIL before delivery. `python3 S/pacing_check.py <out>/reel.mp4` (in the background): look at each flagged spot and the strips it writes; frame 0 is the poster, which is planned. Read its sync report. Make the contact sheet it prints and look at it. Write the packaging in `script.md`: cover text and one short caption carrying the comment ask (rules.md, Deliver). Save each caption to a file and run `python3 -I S/caption_check.py <file>` (add `--platform youtube` or `threads`, and `--parable` for a parable; it reads the hashtags from `00 - notes/context/declared/brand.md`); fix every FAIL and say each WARN out loud. Tick every box in the reel's `rules.md`. Give the user the path, the packaging, the direction in one line, and what was not checked (nobody but the user listens to the sound).

**Fixing after the user has seen it** (a note on the preview or the render, or a check FAIL). Write a fix card first (`/home/claude/creator/.engine/references/review.md`): the cause, the scope, what stays, and the proof. Show it in the reply. Save `index.before.html`, make the fix, then run `node S/capture.mjs <folder> scope index.before.html <ranges>`: every frame outside the scope must be identical. A re-render still waits for the user's yes.

**Stop.** The reel is done when the user has the path. After they post, follow "After the user posts" in `rules.md`.

## Made-up stories: `mg-reel-parable`

A parable is a made-up story that carries a real lesson. The person in it never lived; the lesson comes from a text read on its primary page. Studied reels (Straight Path Stories, Sabr Stories) show a made-up story around one lesson can travel far (on an Islamic page, one text, with no Qur'an story or seerah in it). What kills a parable is not the telling but a basic lesson told the usual way: the viewer thinks "this again".

### Rules for every run

Read the niche from 00 - notes/context/declared/brand.md.

Islamic pages (`niche: islamic`) keep every rule as written. Every other niche follows the "Every other niche" line where a rule has one: the lesson needs a real source from that niche, such as a book or a study.

1. **Never limit the story.** Any kind of story, any setting, any length, one lesson or several. Every example in this skill or its reference is a spark, never a menu to pick from: invent past them every time.
2. **The story is made up; the lesson is not.**
   - **Islamic pages:** each lesson rests on an ayah, or a sahih or hasan hadith, read on quran.com or sunnah.com with your own web fetch, with its grading recorded. The Qur'an comes first where it fits, read with the verses around it. A text that only half fits the story is dropped: find a better story or a better text. A plain basic-deen lesson (pray, thank Allah, be kind to parents) may run with no citation, but any line that quotes or names a text must be checked.
   - **Every other niche:** each lesson rests on a real source from that niche (a book, a study, an official page), read on its primary page with web fetch and recorded with its title, URL and the quoted line. A plain common-sense lesson (keep your word, rest when tired) may run with no source, but any line that quotes or names a source must be checked.
3. **The story never claims more than the text.** It is never shown as a real event. On an Islamic page it is never shown as a hadith, and no line puts words in the Prophet's ﷺ mouth. On any other page no line puts words in a real author's or expert's mouth. Mark an outside picture as ours when the copy explains it.
4. **The made-up people are ordinary people.** Never a real, named person. On an Islamic page, never a prophet or a companion, and never one of their names. Faceless figures that show feeling through posture work well.
5. **Any look is allowed,** stick figures included. The look is still picked in mg-reel-style.
6. **No guilt aimed at the viewer.** No guilt hooks and no shaming tone; the viewer should see themselves, not feel accused. The character is another matter: his story may end dark or costly when it earns it.
7. Every rule in the `mg-reel` section of this skill "Fixed for every reel" still holds: no em dashes, the comment ask at the end, readable on a phone.

### Pick the mode

| Mode | When | Output |
|---|---|---|
| Scout | "give me ideas", a number of ideas, a theme to explore | Idea notes in `00 - notes/ideas/`, shown as a list |
| Script | "write one", "script now", a topic with no ask for options, or a pick from Scout | A reel folder with `script.md` at `status: story done` |

If the request fits both, ask once: Scout or Script, with Script as the pick when a topic was named.

### Scout

```text
Scout progress:
- [ ] 1 Rules read
- [ ] 2 About 15 ideas made, scored, strong ones kept
- [ ] 3 Every text read on its primary page
- [ ] 4 Idea notes written and checked
- [ ] 5 List shown with a pick
```

1. **Read the rules:** "Fixed for every reel" in the `mg-reel` section of this skill, the Source and Copy parts of `/home/claude/creator/.engine/references/rules.md`, and [references/parable-craft.md](references/parable-craft.md). Done when read.
2. **Spread wide, then cut.** Make about 15 ideas. Start some from a human situation (someone wants something, and it costs them) and some from a lesser-known text read for the human problem inside it. No two share the same kind of story, setting or picture idea. Each has the conflict, the made-up story in three lines, the turn, the lesson (or lessons) and its text, the picture idea, and the comment ask. Score each 1 to 10 as a harsh editor on freshness, hook, feeling, story, fit of the text, picture idea and how long it holds; a sweet but obvious story is a 5. Drop anything basic or overused (craft file, "The basic test"). Keep every strong one, or the number the user asked for. Done when every kept idea differs from the others in kind and scores high on freshness.
3. **Read each text** on its primary page. A text that fails is replaced, never kept: on an Islamic page a weak grading, a wrong number or a wrong speaker; on any other page a link that does not say what the idea claims. Done when every idea has a checked text or is a plain lesson (basic deen on an Islamic page).
4. **Write the notes** as `parable-<slug>.md`, in the same frontmatter as the other notes in that folder (`area: parable`, `found_by: mg-reel-parable`, `source_status: verified`, or `none-needed` for a plain lesson with no source). Done when every new note has all the frontmatter keys of `00 - notes/ideas/_template.md`.
5. **Show the list,** one line per idea, with the one you would make first. A pick goes to Script.

### Script

```text
Script progress:
- [ ] 1 Rules read
- [ ] 2 Text read on its primary page
- [ ] 3 Script written
- [ ] 4 Reel folder made
- [ ] 5 Script shown, handed to the chain on yes
```

1. **Read the rules** (as Scout step 1). Done when read.
2. **Read the text** on its primary page and copy it. Islamic pages: its Arabic, English, number, narrator and grading. Every other niche: its title, URL and the quoted line. If it fails, offer another text for the same lesson. Done when the text passes.
3. **Write the script:** a strong, clear hook (the first line and the first frame), then a beat table with seconds, every on-screen line exactly, what the viewer watches in each beat, the lesson beat with its one citation, and the comment ask last. Every line says plainly what happens; no metaphors, no line written to sound like a quote. Then the cover text and a caption that says "An original parable." Under it, two one-line other angles for the same lesson. Run the story check in `mg-reel-story` step 4 before showing it. Done when every beat would still say its line with the caption hidden.
4. **Make the reel folder** `00 - notes/content/<YYYY-MM-DD>-<slug>/`: copy `/home/claude/creator/.engine/references/rules.md` in, write `script.md` with `## Sources`, `## Copy` and `## What the viewer watches`, set `status: story done`, and tick the Source and Copy parts of its `rules.md`. If the idea came from Scout, set that note's `status: picked`. Done when the folder exists.
5. **Show the script** beat by beat. On yes, ask the /mg-reel question round for mood, look, length and voiceover (skip what the user said), then go to the `mg-reel-style` section. If they change lines, return to step 3.

### Files

- [references/parable-craft.md](references/parable-craft.md) - what makes a parable work, sparks, the reference reels, and the checks before a parable is done. Open in step 1 of either mode.

## The carousel: `mg-carousel`

Makes a carousel the user can post as it is: PNG slides and a caption. It works like the reel chain. Each step ends at a stop, and the next step starts only after the user says yes. Only the way a carousel is made is fixed. The text, the shape and the look are new for every carousel.

Read the niche from `00 - notes/context/declared/brand.md`. The `handle`, `voice`, `colours` and `hashtags` come from the same file. The `niche:` key is islamic, faceless, business, personal or other. The rules in "Islamic pages" below apply only when `niche: islamic`. Every other page skips that section.

Read `00 - notes/context/observed/taste.md` before step 3. Its likes, dislikes and lessons come from reels and carousels, and they shape the text and the look.

### Start

The user starts in one of four ways:

| The user says | Path |
|---|---|
| "make a carousel about X" | Topic path: steps 1 to 7. |
| "turn this into slides" (with their own text) | Own-text path: skip step 2. Split the text in step 3. |
| "turn this reel into a carousel" | Reel path: follow `/home/claude/creator/.engine/references/carousel/from-reel.md`. |
| "use my <name> template" | Template path: the text still comes from a topic, the user's text or a reel. Load the look from `/home/claude/creator/.engine/references/carousel/templates.md`, and skip the look questions in step 4. |

The user's own words are never changed without asking. This is true for pasted text, for a reel's copy and for every fix after a render. Ask first, show the change, and wait for a yes.

Copy this list into each reply and tick it off:

```text
Carousel progress:
- [ ] 1 Folder made
- [ ] 2 Source checked (topic path only)
- [ ] 3 Shape and text approved
- [ ] 4 Look and size picked
- [ ] 5 Rendered, every PNG looked at
- [ ] 6 Slides and caption handed over
- [ ] 7 Template offered, lesson written
```

### The flow

1. **Folder.** Make `00 - notes/content/<YYYY-MM-DD>-<slug>-carousel/`. Write `script.md` there with this frontmatter: `format: carousel`, `status:` (empty for now), `look:`, `size:` and `template:` (empty unless a template was picked). Write the user's request under `## Request`. If the carousel comes from an idea note in `00 - notes/ideas/`, set `format: carousel` and `status: picked` in that note. On the reel path, the reel's idea note stays with the reel: the carousel gets its own note in step 6. Done when the folder and `script.md` exist.
2. **Source (topic path only).** Follow the `mg-reel-topic` section of this skill, steps 2 and 3. Use it as it is. Do not copy it. Read each claim on its primary page: an official site, a study or a book page, read with web fetch. A search summary, a repost or memory is a lead, never the source. Write `## Sources` in `script.md`: title, URL and the quoted line for each claim. List any line the sources do not support, for the user's call. Set `status: source done`. **Stop.** Show the sources. Go on when the user says yes.
3. **Shape and text.** Follow `/home/claude/creator/.engine/references/carousel/writing.md`. Pick one shape. Write one thought per slide. Slide 1 hooks. The last slide asks the reader to share or save, and names who to send it to. The topic decides the slide count, about 4 to 12. For the own-text path, split the user's text into slides and change no word. If a slide is too long, show the user two ways to split it and let them pick. Write `## Slides` in `script.md`: one numbered line per slide, with its lead and source line if it has one. Set `status: text done`. **Stop.** Show the slides as a numbered list. Go on when the user says yes.
4. **Look and size.** Follow `/home/claude/creator/.engine/references/carousel/looks.md`. Skip the questions when a template was picked.
   - Ask with one `AskUserQuestion` call: **plain**, **themed** or **graphic**.
   - **Graphic:** pitch 2 or 3 styles from `/home/claude/creator/.engine/references/styles/index.md`, each with one still, drawn from its working page in `/home/claude/creator/.engine/assets/styles/` (the same way `mg-reel-style` does it). Then ask how much drawing, with 3 choices:
     - a **drawn cover** with lighter slides after it;
     - a **drawing on every slide**;
     - something **in between** (for example the cover, one middle slide and the last slide).

     If the user is not sure, suggest the drawn cover.
   - **Size:** `3:4` (1080x1440) is the default, because the Instagram profile grid shows 3:4. Offer `4:5` (1080x1350) and `1:1` (1080x1080).

   Write `deck.json` in the folder (fields in `/home/claude/creator/.engine/references/carousel/looks.md`). Write `## Look` in `script.md`. Set `status: look done`. Set the idea note to `status: building`, if there is one.
5. **Render.** Write the slides into `deck.json`, then run from your folder:
   ```bash
   python3 -I /home/claude/creator/.engine/scripts/carousel/make-slides.py "00 - notes/content/<folder>"
   node /home/claude/creator/.engine/scripts/carousel/slides.mjs "00 - notes/content/<folder>" "03 - export/<folder>"
   ```
   `<folder>` is the same name in both places. For plain and themed, `make-slides.py` writes `slides/NN.html` from the deck. For graphic, you write each `slides/NN.html` first, from `/home/claude/creator/.engine/assets/carousel/graphic-base.html` (`/home/claude/creator/.engine/references/carousel/looks.md`, Graphic). `slides.mjs` uses the same Chrome and Playwright setup as the reels: Playwright comes from `NODE_GLOBAL` (else the global npm folder), and Chrome comes from `REEL_CHROME` (else the installed Chrome). If it prints `text overflows slide NN`, that slide has too much text. Shorten or split it (for the user's own words, ask first), then render again.

   Look at every PNG at full size before you say it is done. Check that the text is easy to read on a phone, that nothing is cut off, that the fonts loaded, and that Arabic (if any) is right to left with its dots. Fix and render again anything that fails. Set `status: rendered`.
6. **Hand over.** Write the caption (`/home/claude/creator/.engine/references/carousel/writing.md`, Caption). Save it as `03 - export/<folder>/caption.txt`. Give the user the path to the PNGs and show the caption in a fenced code block, so they can press copy. In the chat edition, give the PNGs as files to download. Say in one line what was not checked. Set `status: delivered`. Then do the idea note the same way as for a reel (the `## Helper: Caption helper` section, steps 6 and 7):
   - Set the idea note to `status: built`. If there is none (the user's own topic or text, or the reel path), make one first: copy `00 - notes/ideas/_template.md`, name it after the carousel in plain words, fill the keys from `script.md` (`area`, `hook`, `source`, `source_url`, `source_status`), and set `format: carousel`, `status: built`, `found_by: own topic` (on the reel path: `found_by: from reel <reel folder>`) and `created` to today. So every carousel shows on the boards.
   - Ask when the user will post it, with numbered choices: 1. Today, 2. Tomorrow, 3. Pick a date, 4. Not sure yet. Set `post_date` in the idea note to that day, as YYYY-MM-DD. For "Not sure yet", leave it empty. Set `slot` to the highest `slot` in all idea notes, plus 1 (or 1 if none has a slot). Leave it if the note already has one.
7. **After.**
   - Offer to save the look as a template (`/home/claude/creator/.engine/references/carousel/templates.md`).
   - Write one lesson in `00 - notes/context/observed/taste.md`, under `## Lessons`, as one short line, newest first (the same rule as reels). Keep 30 lessons at most. Merge old ones.
   - When the user posts and gives the post link (now or in a later chat): add a row to `## Posts` in `00 - notes/ledger.md`: `| YYYY-MM-DD | [[<idea note name>]] | carousel | <link> | <one short note> |`. In the idea note, set `post_url` to the link, `post_date` to the day it went out, and `status: posted`. Write one line in `log.md`: `YYYY-MM-DD | Posted <slug> | 00 - notes/ledger.md, <idea note>`. Tell the user to run `creator:review` in two days for the numbers.
   - When the post is two days old, ask the user for the numbers (or get them the same way as for reels, `/home/claude/creator/.engine/references/rules.md`, After the user posts). Add a row to `## Stats at 48 h`. Write `N/A` for skip rate and average watch, because a carousel has no watch time.

### Status values

`script.md` frontmatter `status:` moves through `source done`, `text done`, `look done`, `rendered`, `delivered`. A folder with a status resumes at the next step. The own-text and reel paths start at `text done` once the split or the reuse is approved. A template path follows the path of its text: with a topic it runs from step 2, and with pasted text it starts at `text done`.

The idea note in `00 - notes/ideas/` moves on the boards the same way as a reel's: `picked` (step 1), `building` (step 4), `built` (step 6) and `posted` (when the user posts).

### Where things live

- **Work folder:** `00 - notes/content/<YYYY-MM-DD>-<slug>-carousel/`, with `script.md`, `deck.json` and `slides/`. It sits next to the reel folders.
- **Output:** `03 - export/<same folder name>/`, with `01.png`, `02.png` and so on, plus `caption.txt`.
- **Templates:** `00 - notes/context/declared/templates/<name>.md` (one file each). In the chat edition: one Project file, `templates.md`, copied to `00 - notes/context/declared/templates.md` (how to save, list and use: `/home/claude/creator/.engine/references/carousel/templates.md`).

### Islamic pages

These rules apply only when `niche: islamic`. A page with any other niche never asks for a hadith or an ayah.

- **Source.** Every hadith and ayah is read on its primary page through the `mg-reel-topic` section of this skill step 2: hadith on sunnah.com, ayah on quran.com. Follow the Source section of `/home/claude/creator/.engine/references/rules.md`. Hadith: sahih or hasan only, with the grading recorded. A search snippet is a lead, not a source.
- **One reference per slide,** placed after the point. In the themed look it goes in the slide's `source` line, for example `SAHIH AL-BUKHARI 6464` or `QURAN 2:286`.
- **Own text is checked too.** On the own-text path, check every hadith and ayah the user cites on its primary page, the same way. If one is wrong or weak, tell the user what you found. Do not change their words.
- **Never a ruling.** The carousel says what the text says. It does not rule on what the reader must do.
- **Composed words never look like scripture.** A line we wrote never sits in the frame or style that a quoted ayah or hadith uses, and it gets no citation.
- **Never draw a prophet,** in any form. No six-pointed star, and no logo, stamp, seal or emblem. The same as the reels.
- **Arabic** is set in Scheherazade New (`/home/claude/creator/.engine/assets/ScheherazadeNew-Regular.ttf`), with full tashkeel. Arabic placement gotchas: `/home/claude/creator/.engine/references/carousel/writing.md`, Arabic on a slide.

### Shared files

- `/home/claude/creator/.engine/references/carousel/writing.md`: shapes, slide rules, hooks, endings, the caption.
- `/home/claude/creator/.engine/references/carousel/looks.md`: plain, themed and graphic, drawing levels, sizes, `deck.json`, readability.
- `/home/claude/creator/.engine/references/carousel/templates.md`: save, list and use templates, in both editions.
- `/home/claude/creator/.engine/references/carousel/from-reel.md`: turn a reel into a carousel.
- `/home/claude/creator/.engine/scripts/carousel/`: `make-slides.py` and `slides.mjs`. Run them. Do not edit them per carousel.
- `/home/claude/creator/.engine/assets/carousel/`: `plain.html`, `themed.html` and `graphic-base.html`.
- Reused from the reels, never copied: the `mg-reel-topic` section of this skill (sources), `/home/claude/creator/.engine/references/styles/` and `/home/claude/creator/.engine/assets/styles/` (graphic styles), `/home/claude/creator/.engine/references/rules.md` (source rules and After the user posts).

## If the render fails here: the backup page

Use this only when `render.sh` cannot make `reel.mp4` in this chat (Chromium will not start, or the render stops with an error you cannot fix). The user then makes the video in their own browser.

1. Make the sound. If `sfx.json` is missing from the reel folder, write it by hand from the reel's `window.SFX` events: `{"duration": <DURATION>, "events": [{"t": ..., "type": ..., "v": ..., "pan": ...}]}`. Then run `python3 -I /home/claude/creator/.engine/scripts/mix.py <reel-folder> <reel-folder>`. It writes `audio.wav`.
2. Fill the page: `python3 -I /home/claude/creator/.engine/scripts/fill-render.py <reel-folder> <reel-folder>/audio.wav <reel-folder>/make-video.html /home/claude/creator/.engine/assets/browser-render.html`. It puts the reel, its fonts and the sound inside one file. If it says the file is too big, ask the user for a shorter sound.
3. Publish `make-video.html` as an Artifact with `capabilities: {downloads: true}`.
4. Tell the user, in plain words:
   - Open the link. Keep the page open while it works, about as long as the reel.
   - Tap Download when it says "Your video is ready."
   - It works best on a computer with Chrome, Edge or Safari. If the page says "This phone cannot make the video", open the same link on a computer.
5. The browser video has no motion blur on fast moves, so it can look a little sharper than a normal render. Say so only if the user asks.
