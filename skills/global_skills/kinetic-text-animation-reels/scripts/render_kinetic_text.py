import math
import os
import subprocess
import wave
import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageFont

W, H = 1080, 1920
FPS = 30

SKILL_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FONT_DIR = os.path.join(SKILL_DIR, "fonts")

FONT_BLACK = os.path.join(FONT_DIR, "Inter-Black.otf")
FONT_BOLD = os.path.join(FONT_DIR, "Inter-ExtraBold.otf")
FONT_BOLD_ITALIC = os.path.join(FONT_DIR, "Inter-ExtraBold.otf")
FONT_MED = os.path.join(FONT_DIR, "Inter-Black.otf")
FONT_MONO = os.path.join(FONT_DIR, "Caladea-Bold.ttf")

DARK_BG = (8, 8, 11)
CREAM_BG = (245, 242, 235)
WHITE = (255, 255, 255)
BLACK = (12, 12, 15)
RED = (229, 9, 20)
TEAL = (0, 185, 185)
GREEN = (16, 185, 129)
YELLOW = (255, 230, 0)
GRAY_MUTED = (145, 145, 155)
CARD_DARK = (22, 22, 29)
CARD_CREAM = (232, 228, 220)

_font_cache = {}


def resolve_font(path):
    if os.path.exists(path):
        return path
    base = os.path.basename(path)
    # Check bundled fonts
    bundled = os.path.join(FONT_DIR, base)
    if os.path.exists(bundled):
        return bundled
    # Check local project fonts
    local = os.path.join("fonts", base)
    if os.path.exists(local):
        return local
    # Check Windows system fonts
    win_fonts = os.path.join(os.environ.get("WINDIR", "C:\\Windows"), "Fonts")
    for win_candidate in [base, "arialbd.ttf", "segoeuib.ttf", "arial.ttf"]:
        p = os.path.join(win_fonts, win_candidate)
        if os.path.exists(p):
            return p
    return path


def get_font(path, size):
    key = (path, int(size))
    if key not in _font_cache:
        resolved = resolve_font(path)
        try:
            _font_cache[key] = ImageFont.truetype(resolved, int(size))
        except Exception:
            try:
                _font_cache[key] = ImageFont.load_default()
            except Exception:
                pass
    return _font_cache[key]


def clamp01(x):
    return max(0.0, min(1.0, float(x)))


def ease_out_expo(t):
    t = clamp01(t)
    return 1.0 if t >= 1.0 else 1.0 - pow(2.0, -10.0 * t)


def ease_out_cubic(t):
    t = clamp01(t)
    return 1.0 - pow(1.0 - t, 3.0)


def ease_out_back(t):
    t = clamp01(t)
    c1 = 1.70158
    c3 = c1 + 1.0
    return 1.0 + c3 * pow(t - 1.0, 3.0) + c1 * pow(t - 1.0, 2.0)


def make_grid_bg(base_rgb, line_rgb, spacing=90):
    arr = np.zeros((H, W, 3), dtype=np.float32)
    arr[:, :] = base_rgb
    for x in range(spacing // 2, W, spacing):
        arr[:, x : x + 2] = line_rgb
    for y in range(spacing // 2, H, spacing):
        arr[y : y + 2, :] = line_rgb
    yy, xx = np.mgrid[0:H, 0:W]
    cx, cy = W / 2.0, H / 2.0
    dist = np.sqrt(((xx - cx) / (W * 0.65)) ** 2 + ((yy - cy) / (H * 0.65)) ** 2)
    if base_rgb[0] > 128:
        vig = np.clip(1.0 - 0.12 * (dist ** 2), 0.85, 1.0)
    else:
        vig = np.clip(1.0 - 0.35 * (dist ** 2), 0.55, 1.0)
    arr *= vig[:, :, None]
    rng = np.random.default_rng(77)
    arr = np.clip(arr + rng.normal(0, 2.0, (H, W, 1)), 0, 255).astype(np.uint8)
    return Image.fromarray(arr, mode="RGB")


def draw_film_dust(draw, frame_idx, color, count=18):
    rng = np.random.default_rng(300 + (frame_idx // 2))
    for _ in range(count):
        x = int(rng.integers(20, W - 20))
        y = int(rng.integers(20, H - 20))
        r = int(rng.integers(1, 3))
        draw.ellipse((x - r, y - r, x + r, y + r), fill=color)


def draw_glow_text(base_img, pos, text, font, fill, glow_color, glow_radius=18, anchor="mm"):
    if glow_radius > 0:
        glow_layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
        gd = ImageDraw.Draw(glow_layer)
        gd.text(pos, text, font=font, fill=glow_color + (200,), anchor=anchor)
        glow_layer = glow_layer.filter(ImageFilter.GaussianBlur(radius=glow_radius))
        base_img.paste(glow_layer, (0, 0), glow_layer)
    d = ImageDraw.Draw(base_img)
    d.text(pos, text, font=font, fill=fill, anchor=anchor)


def draw_blur_to_sharp_text(base_img, pos, text, font, fill, progress, max_blur=14, anchor="mm"):
    p = ease_out_expo(progress)
    blur_r = max(0.0, max_blur * (1.0 - p))
    alpha = int(255 * clamp01(p * 1.4))
    layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    ld = ImageDraw.Draw(layer)
    ld.text(pos, text, font=font, fill=fill[:3] + (alpha,), anchor=anchor)
    if blur_r > 0.4:
        layer = layer.filter(ImageFilter.GaussianBlur(radius=blur_r))
    base_img.paste(layer, (0, 0), layer)


def draw_slide_text(base_img, pos, text, font, fill, progress, offset_y=60, anchor="mm"):
    p = ease_out_cubic(progress)
    x, y = pos
    cur_y = int(y + (1.0 - p) * offset_y)
    alpha = int(255 * clamp01(p * 1.3))
    layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    ld = ImageDraw.Draw(layer)
    ld.text((x, cur_y), text, font=font, fill=fill[:3] + (alpha,), anchor=anchor)
    base_img.paste(layer, (0, 0), layer)


def draw_word_flow(base_img, cx, cy, words_with_times, t, font, normal_fill, active_fill, line_height=95, max_width=860):
    """Render wrapped lines of words that pop in and highlight on schedule."""
    d = ImageDraw.Draw(base_img)
    lines = []
    cur_line = []
    cur_w = 0
    space_w = d.textbbox((0, 0), " ", font=font)[2]

    for word, wt, is_accent in words_with_times:
        ww = d.textbbox((0, 0), word, font=font)[2]
        if cur_line and cur_w + space_w + ww > max_width:
            lines.append(cur_line)
            cur_line = [(word, wt, is_accent, ww)]
            cur_w = ww
        else:
            cur_line.append((word, wt, is_accent, ww))
            cur_w += (space_w + ww if len(cur_line) > 1 else ww)
    if cur_line:
        lines.append(cur_line)

    start_y = cy - ((len(lines) - 1) * line_height) // 2
    for li, line in enumerate(lines):
        total_lw = sum(w[3] for w in line) + space_w * max(0, len(line) - 1)
        cur_x = cx - total_lw // 2
        ly = start_y + li * line_height
        for word, wt, is_accent, ww in line:
            if t >= wt:
                wp = ease_out_back(clamp01((t - wt) / 0.22))
                y_off = int((1.0 - wp) * 18)
                col = active_fill if is_accent else normal_fill
                d.text((cur_x + ww // 2, ly + y_off), word, font=font, fill=col, anchor="mm")
            cur_x += ww + space_w


def draw_pill_text(draw, cx, cy, text, font, bg_color, text_color, pad_x=36, pad_y=18, radius=24):
    bbox = draw.textbbox((0, 0), text, font=font)
    tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
    pw, ph = tw + pad_x * 2, th + pad_y * 2
    draw.rounded_rectangle((cx - pw // 2, cy - ph // 2, cx + pw // 2, cy + ph // 2), radius=radius, fill=bg_color)
    draw.text((cx, cy - 3), text, font=font, fill=text_color, anchor="mm")


def draw_strikethrough(draw, cx, cy, width, progress, color=RED, thickness=10):
    p = ease_out_cubic(progress)
    x0 = cx - width // 2
    x1 = int(x0 + width * p)
    if x1 > x0:
        draw.line((x0, cy, x1, cy), fill=color, width=thickness)


def draw_dashed_rect(draw, box, color, width=4, dash=18):
    x0, y0, x1, y1 = box
    for x in range(int(x0), int(x1), dash * 2):
        draw.line((x, y0, min(x + dash, x1), y0), fill=color, width=width)
        draw.line((x, y1, min(x + dash, x1), y1), fill=color, width=width)
    for y in range(int(y0), int(y1), dash * 2):
        draw.line((x0, y, x0, min(y + dash, y1)), fill=color, width=width)
        draw.line((x1, y, x1, min(y + dash, y1)), fill=color, width=width)


def generate_whoosh_sfx(wav_path, duration, cut_times):
    """Generate clean screen-shift whoosh SFX at scene transitions only."""
    sr = 44100
    n_samples = int(sr * duration)
    audio = np.zeros(n_samples, dtype=np.float32)

    for idx, c in enumerate(cut_times):
        if c <= 0.0:
            continue
        c_idx = int(c * sr)
        w_len = int(0.24 * sr)
        if c_idx + w_len < n_samples:
            wt = np.linspace(0, 0.24, w_len)
            rng = np.random.default_rng(1000 + idx)
            noise = rng.normal(0, 1, w_len)
            # Smooth band-shaped envelope for airy screen-shift whoosh
            env = np.sin(np.pi * (wt / 0.24)) ** 1.8
            sweep = np.sin(2 * np.pi * (160 + 280 * np.exp(-wt * 10)) * wt) * 0.25
            whoosh = (np.convolve(noise, np.ones(18) / 18.0, mode="same") * 0.45 + sweep) * env * 0.35
            audio[c_idx : c_idx + w_len] += whoosh

    peak = np.max(np.abs(audio))
    if peak > 0:
        audio = audio / peak * 0.65
    pcm = (audio * 32767).astype(np.int16)

    with wave.open(wav_path, "wb") as wf:
        wf.setnchannels(1)
        wf.setsampwidth(2)
        wf.setframerate(sr)
        wf.writeframes(pcm.tobytes())


def render_demo():
    """Render a short 12-second sample reel showcasing all text animation primitives."""
    out_dir = "artifacts/file_generation/ttl=63d/output"
    int_dir = "artifacts/file_generation/ttl=63d/intermediate"
    os.makedirs(out_dir, exist_ok=True)
    os.makedirs(int_dir, exist_ok=True)

    duration = 12.0
    total_frames = int(FPS * duration)
    cuts = [0.0, 4.0, 8.0]
    wav_path = os.path.join(int_dir, "demo_whoosh.wav")
    out_mp4 = os.path.join(out_dir, "kinetic_text_demo.mp4")

    generate_whoosh_sfx(wav_path, duration, cuts)

    bg_dark = make_grid_bg(DARK_BG, (24, 24, 30))
    bg_cream = make_grid_bg(CREAM_BG, (226, 222, 214))

    def frame_fn(f):
        t = f / FPS
        if t < 4.0:
            lt = t
            img = bg_dark.copy().convert("RGBA")
            draw_blur_to_sharp_text(img, (W // 2, 760), "Ideas aren't just", get_font(FONT_BOLD, 74), WHITE, lt / 0.5)
            if lt > 0.5:
                draw_glow_text(img, (W // 2, 880), "CREATED.", get_font(FONT_BLACK, 120), TEAL, TEAL, glow_radius=20)
            if lt > 1.4:
                draw_word_flow(
                    img,
                    W // 2,
                    1120,
                    [("They're", 1.4, False), ("born", 1.7, False), ("with", 2.0, False), ("potential.", 2.3, True)],
                    lt,
                    get_font(FONT_BOLD, 66),
                    WHITE,
                    YELLOW,
                )
            draw = ImageDraw.Draw(img)
            draw_film_dust(draw, f, (85, 85, 95))
            return img.convert("RGB")
        elif t < 8.0:
            lt = t - 4.0
            img = bg_cream.copy().convert("RGBA")
            draw = ImageDraw.Draw(img)
            draw_pill_text(draw, W // 2, 560, "STOP WASTING", get_font(FONT_BLACK, 44), RED, WHITE)
            draw_slide_text(img, (W // 2, 760), "Old static captions", get_font(FONT_BOLD, 68), BLACK, lt / 0.4)
            if lt > 1.0:
                draw_strikethrough(draw, W // 2, 760, 660, (lt - 1.0) / 0.4, color=RED, thickness=10)
            if lt > 1.5:
                draw_slide_text(img, (W // 2, 960), "Kinetic text holds", get_font(FONT_BLACK, 74), BLACK, (lt - 1.5) / 0.4)
                draw_slide_text(img, (W // 2, 1060), "ATTENTION.", get_font(FONT_BLACK, 108), RED, (lt - 1.8) / 0.4)
            draw = ImageDraw.Draw(img)
            draw_film_dust(draw, f, (180, 175, 165))
            return img.convert("RGB")
        else:
            lt = t - 8.0
            img = bg_dark.copy().convert("RGBA")
            draw_glow_text(img, (W // 2, 820), "LET THIS SPARK", get_font(FONT_BLACK, 82), WHITE, TEAL, glow_radius=16)
            if lt > 0.6:
                draw_blur_to_sharp_text(img, (W // 2, 950), "TURN INTO WILDFIRE.", get_font(FONT_BLACK, 74), YELLOW, (lt - 0.6) / 0.4)
            draw = ImageDraw.Draw(img)
            if lt > 1.5:
                draw_dashed_rect(draw, (160, 1140, 920, 1290), TEAL, width=4, dash=18)
                draw.text((W // 2, 1215), "FOLLOW FOR MORE", font=get_font(FONT_MONO, 40), fill=TEAL, anchor="mm")
            draw_film_dust(draw, f, (85, 85, 95))
            return img.convert("RGB")

    cmd = [
        "ffmpeg", "-y",
        "-f", "rawvideo", "-vcodec", "rawvideo", "-pix_fmt", "rgb24",
        "-s", f"{W}x{H}", "-r", str(FPS), "-i", "-",
        "-i", wav_path,
        "-map", "0:v:0", "-map", "1:a:0",
        "-c:v", "libx264", "-preset", "fast", "-crf", "18", "-pix_fmt", "yuv420p",
        "-c:a", "aac", "-b:a", "192k", "-shortest",
        out_mp4,
    ]
    proc = subprocess.Popen(cmd, stdin=subprocess.PIPE, stderr=subprocess.PIPE)
    for f in range(total_frames):
        proc.stdin.write(frame_fn(f).tobytes())
    proc.stdin.close()
    ret = proc.wait()
    if ret != 0:
        raise RuntimeError(proc.stderr.read().decode("utf-8", errors="ignore"))
    print("Demo rendered:", out_mp4)


if __name__ == "__main__":
    render_demo()
