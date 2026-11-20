---
name: remotion-video-editing
description: >-
  Comprehensive guide and runbook for programmatic video editing with Remotion, React,
  and TypeScript. Use when creating, editing, animating, previewing, or rendering videos
  using Remotion components, Sequences, springs, interpolations, and CLI tools.
---

# Remotion Video Editing Skill

This skill provides full guidance, architecture patterns, animation formulas, and CLI workflows for creating and editing programmatic videos using **Remotion** (React + TypeScript).

---

## 1. Core Principles

### Video as a Pure Function of Frame
In Remotion, a video frame is a deterministic function of the current frame number:
$$\text{DOM / Visual State} = f(\text{frame})$$

- **Always use `useCurrentFrame()`** to drive visual properties.
- **Strict Determinism**:
  - ❌ NEVER use `Math.random()`. Use Remotion's seeded `random(seed)`.
  - ❌ NEVER use wall-clock time (`Date.now()`, `performance.now()`).
  - ❌ NEVER fetch data inside the render function of a frame. Fetch upfront or via `calculateMetadata`.

### Time Units: Frames vs Seconds
Always compute frame counts from `fps`:
```typescript
import { useVideoConfig } from "remotion";

const { fps, durationInFrames, width, height } = useVideoConfig();
const ONE_SECOND = fps;
const DURATION_SCENE = 3 * fps; // 3 seconds
```

---

## 2. Essential Layout & Timeline Primitives

### `<AbsoluteFill>`
A full-canvas absolute container (`position: absolute; inset: 0; width: 100%; height: 100%`).
Use to layer backgrounds, video clips, text overlays, and watermarks:
```tsx
import { AbsoluteFill } from "remotion";

export const Scene: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#0f172a" }}>
      {/* Background layer */}
      <AbsoluteFill style={{ opacity: 0.5 }}>...</AbsoluteFill>
      {/* Foreground content layer */}
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <h1>My Video Title</h1>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
```

### `<Sequence>`
Controls local timing for child components.
- Inside `<Sequence from={60} durationInFrames={90}>`, `useCurrentFrame()` starts at **0** when the root timeline hits frame 60.
- `layout="absolute-fill"` (default) keeps children positioned across the canvas.
```tsx
<Sequence from={0} durationInFrames={60} name="Intro Scene">
  <Intro />
</Sequence>
<Sequence from={60} durationInFrames={120} name="Main Feature">
  <Feature />
</Sequence>
```

### `<Series>`
Chains sequential scenes without manual frame math:
```tsx
import { Series } from "remotion";

<Series>
  <Series.Sequence durationInFrames={90}>
    <SceneA />
  </Series.Sequence>
  {/* Overlap by 15 frames for transition */}
  <Series.Sequence durationInFrames={90} offset={-15}>
    <SceneB />
  </Series.Sequence>
</Series>
```

---

## 3. Motion & Animation Mastery

### 1. `interpolate` (Linear & Curved Remapping)
Maps the current frame to styling values (opacity, translate, scale, rotation):
```tsx
import { interpolate, useCurrentFrame } from "remotion";

const frame = useCurrentFrame();

// Fade-in over first 20 frames, stay visible, fade-out over last 20 frames
const opacity = interpolate(
  frame,
  [0, 20, durationInFrames - 20, durationInFrames],
  [0, 1, 1, 0],
  {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  }
);

// Slide in from left
const translateX = interpolate(frame, [0, 30], [-500, 0], {
  extrapolateRight: "clamp",
});
```

### 2. `spring` (Physics-based Motion)
Produces smooth, natural, organic movement without robotic linear speeds:
```tsx
import { spring, useCurrentFrame, useVideoConfig } from "remotion";

const frame = useCurrentFrame();
const { fps } = useVideoConfig();

const entrance = spring({
  frame,
  fps,
  config: {
    damping: 12,       // Lower = more bounciness
    stiffness: 100,    // Higher = faster snap
    mass: 0.5,         // Inertia
  },
});

// Use directly for scale or interpolate with spring value:
const scale = entrance; // 0 -> 1
```

---

## 4. Media & Asset Handling

### Audio (`<Audio>`)
Synchronized audio with volume automation and fading:
```tsx
import { Audio, staticFile, interpolate, useCurrentFrame } from "remotion";

const frame = useCurrentFrame();

// Fade out audio over the last 30 frames
const volume = interpolate(
  frame,
  [durationInFrames - 30, durationInFrames],
  [1, 0],
  { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
);

<Audio src={staticFile("bgm.mp3")} volume={volume} />
```

### Video Clips (`<Video>` / `<OffthreadVideo>`)
- Use `<OffthreadVideo>` for reliable multi-threaded headless CLI renders.
- Control start and end offsets via `startFrom` and `endAt`:
```tsx
import { OffthreadVideo, staticFile } from "remotion";

<OffthreadVideo
  src={staticFile("gameplay.mp4")}
  startFrom={120} // Start reading clip from 120 frames in
  endAt={300}
/>
```

### Images (`<Img>`)
Always use Remotion's `<Img>` instead of `<img>` to guarantee frames are not captured before image loading finishes:
```tsx
import { Img, staticFile } from "remotion";

<Img src={staticFile("logo.png")} style={{ width: 200, height: 200 }} />
```

---

## 5. Composition Architecture & Declarations

In `src/Root.tsx`:
```tsx
import { Composition } from "remotion";
import { MainVideo } from "./MainVideo";

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="Main"
      component={MainVideo}
      durationInFrames={300} // 10 seconds at 30 fps
      fps={30}
      width={1920}
      height={1080}
      defaultProps={{
        title: "Hello World",
        accentColor: "#3b82f6",
      }}
    />
  );
};
```

---

## 6. CLI Commands & Workflows

### 1. Interactive Studio Preview
Starts the real-time scrubbing preview UI:
```bash
npm run dev
# or
npx remotion preview
```
- Available at `http://localhost:3000`
- Provides frame scrubber, scale preview, props tweaker, and rendering inspector.

### 2. Rendering Final Video (MP4)
```bash
# Basic render
npx remotion render src/index.ts <CompositionId> out/video.mp4

# Render with concurrency and hardware acceleration
npx remotion render src/index.ts Main out/video.mp4 --concurrency=4 --gl=angle

# Override props dynamically at render time
npx remotion render src/index.ts Main out/custom.mp4 --props='{"title":"Dynamic Title"}'

# Render only a test snippet (e.g. frames 0 to 60)
npx remotion render src/index.ts Main out/test.mp4 --frames=0-60
```

### 3. Rendering Still Thumbnails
```bash
npx remotion still src/index.ts Main out/thumbnail.png --frame=45
```

---

## 7. Troubleshooting & Quality Checklist

1. **Missing frames or blank flashes?**
   - Ensure async resources use `delayRender()` and `continueRender()`.
   - Use `<Img>` and `<OffthreadVideo>`.
2. **Font rendering issues?**
   - Use `@remotion/google-fonts` to automatically preload fonts safely.
3. **Animations desynced or jerking?**
   - Verify every animated CSS property references `useCurrentFrame()`.
   - Never rely on CSS `@keyframes` or CSS `transition`! Always compute inline styles using `interpolate()` or `spring()`.
