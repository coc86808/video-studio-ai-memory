---
name: paper-engine
description: |
  Autonomous production engine for editorial paper-collage crime and investigative documentaries
  (Fern / Vox style). Implements the 10-stage pipeline (States 0-9), Fern writing DNA (2.5 wps math,
  cold opens, cliffhangers), the paper-collage visual style system, Universal Video Prompt,
  voiceover rules, and thumbnail DNA.
  Use when: "paper engine", "crime documentary", "fern style", "paper collage video", "state 0",
  "documentary script", "generate beat table", "universal video prompt".
---

# Crime Documentary Paper Engine (v1.0)

## Section 1: Invariants & House Rules
1. **NO EM DASHES**: Never output em dashes (`—`) anywhere in any state. Use commas, colons, parentheses, or plain hyphens.
2. **Word Math**: Exactly 2.5 words per second (land within 5%).
   - 30s: ~75 words (12-15 beats)
   - 1 min: ~150 words (22-30 beats)
   - 2 min: ~300 words (45-60 beats)
   - 3 min: ~450 words (70-90 beats)
   - 5 min: ~750 words (115-150 beats)
3. **Sentence Discipline**: Every sentence ends on a full stop and carries exactly one idea (which maps to one visual beat in State 6). A sentence that cannot be pictured is rewritten until it can.
4. **Accuracy & Real-Tragedy Restraint**: No gore, no suffering close-ups, no mockery of victims. Tension lives in physical objects, documents, maps, currency, weather, and time.

---

## Section 2: The Flow at a Glance (States 0-9)
- **State 0**: Ingestion & Grounding (absorbs source material).
- **State 1**: Pick a niche (Crime & Documentary is default).
- **State 2**: Engine returns 10 Fern-shaped title ideas across distinct sub-territories.
- **State 3**: Pick a target runtime (30s to 5m).
- **State 4**: Engine writes the continuous Fern narration script.
- **State 5**: Voiceover production (type voice, generates/formats voiceover).
- **State 6**: Beat Table (type proceed, splits script into 2-3s beats, 5-8 words).
- **State 7**: Image Prompts (type next, outputs one .txt file with one self-contained prompt per line/beat).
- **State 8**: Universal Video Prompt (type next, outputs the verbatim video animation prompt).
- **State 9**: Thumbnail DNA (type next, outputs 3 high-CTR thumbnail prompts).

---

## Section 3: Fern Writing DNA (State 4)
- **Cold Open**: First 3-4 sentences (30-40 words) open on: a precise date, a named location, and one small concrete action. No throat-clearing, no rhetorical questions.
- **Voice & Rhythm**: Calm, deadpan, factual, documentary. Mostly short declaratives, one longer explanatory sentence per stretch. Tension from chronological facts placed in sequence.
- **Connective Tissue**: Temporal/causal connectives (then, by morning, three days later, within the hour, because of this, which meant, what nobody knew was).
- **Five Cliffhanger Patterns (Final line <= 12 words)**:
  1. THE UNRESOLVED OBJECT: End on a physical thing that still exists and holds the mystery.
  2. THE DATED FORWARD JUMP: End by leaping to a later date that reopens the case.
  3. THE MISSING PIECE: End by naming the one thing investigators never got.
  4. THE QUIET CONTRADICTION: End on a fact that undermines everything before it.
  5. THE PRICE LINE: End on the human or financial cost, stated flat.

---

## Section 4: Beat System (State 6)
- 1 beat = 2 to 3 seconds of narration (5 to 8 words at 2.5 wps).
- Timecode = cumulative word count / 2.5 (rounded to 1 decimal).
- Table format:
  `| Beat # | Start Timecode | Narration Words Covered |`

---

## Section 5: Visual Style System & Prompts (State 7)
The whole video lives in hand-cut documentary paper collage.
Each prompt structure:
`[Hero element description (70% weight)] + [Supporting elements (max 2-3)] + [STYLE BLOCK VERBATIM] + [CLOSER BLOCK VERBATIM]`

### Verbatim Style Block
```text
hand-cut documentary paper collage on aged newsprint and archival map surfaces, black and white halftone photograph cutouts with rough scissor-cut edges and offset accent strokes, torn paper edges, masking tape fragments, typewriter caption strips, rubber stamp marks, red string and brass pins where the story calls for connections, desaturated archival palette of tan, ink black, and halftone gray with ONE hot red signal accent and a restrained mustard yellow secondary, condensed bold headline lettering only where a label is specified, visible print grain and paper fiber, matte, flat even documentary lighting with soft cutout drop shadows.
```

### Verbatim Closer Block
```text
Every element must appear physically hand-cut and layered from real paper, with visible cutout edges, halftone print texture, and soft shadow separation between layers. The composition stays clean, minimal, and editorial with generous negative space. NOT digital illustration, NOT cartoon, NOT 3D render, NOT glossy, no gradients, no clutter, no watermark, no logos, no text beyond the specified label. Premium documentary collage aesthetic, 16:9, ultra-detailed, 8K.
```

### Composition & Text Laws
- 1 hero element (70% weight).
- Max 2-3 supporting elements.
- About 10% background interest. Generous negative space.
- Default is NO text. When a date, name, or number matters, max ONE label of 1-4 words on a strip or stamp.
- Recurring subjects must use identical wording across beats.

---

## Section 6: Universal Video Prompt (State 8, Verbatim)
```text
Transform the provided image into a 10-second premium editorial documentary paper-collage animation. Preserve the final composition of the provided image exactly. Do not redesign, reposition, resize, or replace any element. The provided image is the FINISHED frame that the animation builds toward.

Style: hand-cut documentary paper collage in motion. Aged newsprint and archival surfaces, halftone photo cutouts, torn edges, tape, stamps, red string, typewriter strips. Every element moves as a rigid physical paper piece. Visible cutout thickness, print grain, soft layered shadows. Stop-motion cadence, stepped easing, 2-3 frame holds, the hand-made "cutting on twos" feel. Never smooth CGI motion.

CAMERA, STRICT: the camera stays completely locked for the entire clip. No zoom, no pan, no tilt, no rotation, no orbit, no dolly, no tracking, no handheld shake, no focus pulls, no reframing, no cuts, no transitions, no morphing, no object replacement, no time skips. One continuous static shot.

0 TO 7 SECONDS, BUILD-ON ASSEMBLY: the frame opens on the EMPTY background plate only: the bare aged-newsprint or archival surface with its stains, grain, and any fixed scaffolding (a map base, a timeline line, a corkboard), with every story element absent. Elements then enter one by one, back to front, in narrative order: background scraps settle first, then the hero cutout slides in with paper drag and a small settle, supporting cutouts drop or pin on with a 2-frame stamp settle, tape presses down, typewriter strips slide in, stamps slap on, red string draws itself from pin to pin, marker underlines and arrows draw themselves last. Each entrance lands with a tiny handcrafted bounce and casts a real layered shadow. No element moves again after it lands. By 7 seconds the frame exactly matches the provided image.

7 TO 10 SECONDS, LIVING PAPER POSTER: everything holds position. Only subtle life remains: paper corners lift a millimeter in a draft, halftone dots shimmer faintly, string tension quivers once, shadows breathe, stamp ink glistens subtly. Nothing changes location, nothing scales, nothing rotates significantly, nothing enters or exits.

AUDIO: no music, no narration, no voices. Only close-up paper ASMR and faint scene-appropriate ambience: paper sliding, cardstock taps, tape press, stamp thud, string zip, pin click, soft room tone. All subtle.

FINAL RULE: the finished clip must feel like a real editorial paper collage assembling itself on a table, then holding as a living poster, matching the provided image exactly from 7 seconds to the end.
```

---

## Section 7: Thumbnail DNA (State 9)
- Dominant hero cutout in high-contrast B&W halftone with rough scissor-cut edges and a red offset accent stroke.
- Black censor bar across eyes if a real person.
- Aged newsprint base bleeding off frame.
- Huge condensed all-caps torn-label headline (1-3 words).
- Smaller stamp-box label (1-3 words).
- Rough red marker circle or underline.
- Append modified closer block ("no text beyond the specified thumbnail words").
