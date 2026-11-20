"""Measure reference videos so style decisions are based on data, not guesses.
Usage: python tools/analyze_refs.py <out_dir> <video1> [video2 ...]
Writes for each video: <out_dir>/<name>/sheet_*.jpg (frames every 1s, timestamped),
cuts list + pacing, dominant palette (hex), brightness, and one summary file <out_dir>/ref_data.md"""
import sys, os, subprocess, re, json, warnings
warnings.filterwarnings("ignore")
from PIL import Image, ImageDraw, ImageStat, ImageChops
import colorsys

def run(cmd): return subprocess.run(cmd, capture_output=True, text=True)
def dur(v): return float(run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', v]).stdout.strip())
def size(v):
    o = run(['ffprobe', '-v', 'error', '-select_streams', 'v', '-show_entries', 'stream=width,height,r_frame_rate', '-of', 'csv=p=0', v]).stdout.strip().split(',')
    return int(o[0]), int(o[1]), o[2]

out = sys.argv[1]; os.makedirs(out, exist_ok=True)
summary = ['# Reference data (measured)\n']
for v in sys.argv[2:]:
    name = os.path.splitext(os.path.basename(v))[0]; d = os.path.join(out, name); os.makedirs(d, exist_ok=True)
    D = dur(v); W, H, fr = size(v)
    # 1) scene cuts
    r = run(['ffmpeg', '-i', v, '-vf', "select='gt(scene,0.25)',showinfo", '-f', 'null', '-'])
    cuts = [round(float(x), 2) for x in re.findall(r'pts_time:([0-9.]+)', r.stderr)]
    bounds = [0.0] + cuts + [D]; shots = [round(b - a, 2) for a, b in zip(bounds, bounds[1:]) if b - a > 0.05]
    avg = sum(shots) / len(shots) if shots else D
    # 2) frames every 1s
    fdir = os.path.join(d, 'frames'); os.makedirs(fdir, exist_ok=True)
    run(['ffmpeg', '-v', 'error', '-y', '-i', v, '-vf', 'fps=1,scale=480:-2', os.path.join(fdir, 'f_%04d.jpg')])
    fs = sorted(os.listdir(fdir))
    # 3) contact sheets (16 per sheet) with timestamps
    for p in range(0, len(fs), 16):
        ims = [Image.open(os.path.join(fdir, f)) for f in fs[p:p+16]]
        w, h = ims[0].size; cols = 4; rows = (len(ims) + 3) // 4
        sh = Image.new('RGB', (w * cols, h * rows), 'white'); dr = ImageDraw.Draw(sh)
        for i, im in enumerate(ims):
            x, y = (i % cols) * w, (i // cols) * h; sh.paste(im, (x, y))
            dr.rectangle([x, y, x + 70, y + 26], fill='black'); dr.text((x + 6, y + 6), f'{p + i}s', fill='yellow')
        sh.save(os.path.join(d, f'sheet_{p // 16}.jpg'), quality=85)
    # 4) visual beats: how often the picture meaningfully changes (works for motion graphics with no hard cuts)
    bdir = os.path.join(d, 'beat'); os.makedirs(bdir, exist_ok=True)
    run(['ffmpeg', '-v', 'error', '-y', '-i', v, '-vf', 'fps=4,scale=96:-2,format=gray', os.path.join(bdir, 'b_%05d.png')])
    bf = sorted(os.listdir(bdir)); diffs = []
    for a, b in zip(bf, bf[1:]):
        diffs.append(ImageStat.Stat(ImageChops.difference(Image.open(os.path.join(bdir, a)), Image.open(os.path.join(bdir, b)))).mean[0])
    m = sum(diffs) / max(1, len(diffs)); sd = (sum((x - m) ** 2 for x in diffs) / max(1, len(diffs))) ** .5
    thr = max(2.0, m + .5 * sd); beats = []
    for i, x in enumerate(diffs):
        t = (i + 1) / 4
        if x > thr and (not beats or t - beats[-1] >= .5): beats.append(round(t, 2))
    gaps = [round(b - a, 2) for a, b in zip([0] + beats, beats + [D])]
    avg_beat = sum(gaps) / len(gaps)
    # 5) palette: overall + accent (saturated) colours + brightness
    allpx = Image.new('RGB', (len(fs) * 64, 36))
    for i, f in enumerate(fs): allpx.paste(Image.open(os.path.join(fdir, f)).resize((64, 36)), (i * 64, 0))
    def pal_of(img, k):
        q = img.quantize(colors=k, method=Image.Quantize.MEDIANCUT); p = q.getpalette(); cs = sorted(q.getcolors(), reverse=True); t = sum(c for c, _ in cs)
        return [(f'#{p[i*3]:02X}{p[i*3+1]:02X}{p[i*3+2]:02X}', round(100 * c / t, 1)) for c, i in cs]
    colors = pal_of(allpx, 8)
    sat = [px for px in allpx.resize((allpx.width // 2, 18)).getdata() if colorsys.rgb_to_hsv(*[c / 255 for c in px])[1] > .45 and max(px) > 90]
    accents = []
    if sat:
        si = Image.new('RGB', (len(sat), 1)); si.putdata(sat); accents = pal_of(si, 6)
    lum = ImageStat.Stat(allpx.convert('L')).mean[0]
    info = dict(video=v, duration=round(D, 2), size=f'{W}x{H}', fps=fr, cuts=cuts, shot_lengths=shots,
                avg_shot_seconds=round(avg, 2), cuts_per_minute=round(len(cuts) / D * 60, 1),
                visual_beats=beats, avg_seconds_between_visual_changes=round(avg_beat, 2), accent_hex_percent=accents,
                palette_hex_percent=colors, avg_brightness_0_255=round(lum), sheets=sorted(x for x in os.listdir(d) if x.startswith('sheet')))
    json.dump(info, open(os.path.join(d, 'data.json'), 'w'), indent=1)
    summary += [f'## {name}', f'- {W}x{H}, {fr} fps, {D:.1f}s', f'- hard cuts: {len(cuts)} (avg shot {avg:.2f}s)',
                f'- VISUAL CHANGES (what matters for motion graphics): {len(beats)} -> one every {avg_beat:.2f}s',
                f'- visual change times (s): {beats[:60]}', f'- base palette (hex, % of pixels): {colors}', f'- accent colours (saturated, hex, %): {accents}',
                f'- average brightness: {round(lum)} / 255 ({"dark" if lum < 85 else "mid" if lum < 170 else "bright"})',
                f'- contact sheets: {", ".join(os.path.join(d, s) for s in info["sheets"])}', '']
open(os.path.join(out, 'ref_data.md'), 'w', encoding='utf-8').write('\n'.join(summary))
print('\n'.join(summary))
