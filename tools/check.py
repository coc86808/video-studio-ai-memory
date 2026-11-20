"""Check a finished video: size, fps, duration, audio, loudness, silent ranges, and a contact sheet of frames.
Usage: python tools/check.py <video.mp4> [--silence 29.4-30.4,...] [--frames 8]
Writes <video>_check.jpg next to the video so you can look at it."""
import sys, subprocess, json, argparse, os, re
from PIL import Image

ap = argparse.ArgumentParser(); ap.add_argument('video'); ap.add_argument('--silence', default=''); ap.add_argument('--frames', type=int, default=8)
a = ap.parse_args(); V = a.video
info = json.loads(subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration:stream=codec_type,width,height,r_frame_rate', '-of', 'json', V], capture_output=True, text=True).stdout)
dur = float(info['format']['duration']); vs = [s for s in info['streams'] if s['codec_type'] == 'video']; au = [s for s in info['streams'] if s['codec_type'] == 'audio']
ok = True
def line(good, msg):
    global ok; ok &= good; print(('PASS ' if good else 'FAIL ') + msg)
line(bool(vs), f"video stream: {vs[0]['width']}x{vs[0]['height']} @ {vs[0]['r_frame_rate']}" if vs else 'no video stream')
line(bool(au), 'audio stream present' if au else 'NO AUDIO')
print(f'INFO duration {dur:.2f}s')
def vol(ss=None, t=None):
    cmd = ['ffmpeg', '-v', 'info'] + (['-ss', str(ss), '-t', str(t)] if ss is not None else []) + ['-i', V, '-vn', '-af', 'volumedetect', '-f', 'null', '-']
    e = subprocess.run(cmd, capture_output=True, text=True).stderr
    m = re.search(r'mean_volume: (-?[\d.]+)', e); x = re.search(r'max_volume: (-?[\d.]+)', e)
    return (float(m.group(1)) if m else None, float(x.group(1)) if x else None)
if au:
    m, x = vol(); line(m is not None and m > -35 and x is not None and x < 0.1, f'loudness mean {m} dB, peak {x} dB (want mean > -35, peak < 0)')
    for r in [r for r in a.silence.split(',') if r]:
        s0, s1 = map(float, r.split('-')); m2, _ = vol(s0 + .1, max(.1, s1 - s0 - .2))
        line(m2 is not None and m2 < -40, f'silent range {r}: mean {m2} dB (want < -40 unless the voice speaks there)')
# contact sheet
n = a.frames; tiles = []
for i in range(n):
    t = dur * (i + .5) / n; f = f'/tmp/_chk_{i}.jpg' if os.name != 'nt' else os.path.join(os.environ.get('TEMP', '.'), f'_chk_{i}.jpg')
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-ss', f'{t:.2f}', '-i', V, '-frames:v', '1', '-vf', 'scale=360:-2', f])
    if os.path.exists(f): tiles.append((t, Image.open(f).convert('RGB')))
if tiles:
    w, h = tiles[0][1].size; cols = 4; rows = (len(tiles) + cols - 1) // cols
    sh = Image.new('RGB', (w * cols, h * rows), 'white')
    for i, (t, im) in enumerate(tiles): sh.paste(im, ((i % cols) * w, (i // cols) * h))
    outp = os.path.splitext(V)[0] + '_check.jpg'; sh.save(outp, quality=85); print('INFO contact sheet:', outp, '(open it and look)')
print('RESULT:', 'ALL PASS' if ok else 'SOME CHECKS FAILED')
