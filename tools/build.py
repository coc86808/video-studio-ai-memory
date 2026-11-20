"""One command to render a finished video, or to re-render ONLY a time range and splice it in.
Run from the video-studio folder.

Full render:
  python tools/build.py projects/<name> [--out output/<name>_final.mp4] [--parts 2]
         [--music inputs/x/music.mp3] [--music-db -22] [--sfx-db -11] [--mute 29.4-30.4,...] [--tail 1.5]
Fix one scene (keeps everything else, writes a new version, never overwrites the old file):
  python tools/build.py projects/<name> --fix 37.5-42.3 [same audio options]

Video length = voice length (+ --tail seconds for an end card), or config.json "duration" if set.
Needs: projects/<name>/assets/voice.(wav|mp3|m4a), config.json, index.html, scenes.js, words.js."""
import argparse, json, math, os, subprocess, sys, glob, shutil

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FPS = 30
ENC = ['-c:v', 'libx264', '-preset', 'veryfast', '-crf', '18', '-pix_fmt', 'yuv420p', '-r', str(FPS)]

def run(cmd, **kw):
    print('>', ' '.join(str(c) for c in cmd), flush=True)
    r = subprocess.run(cmd, **kw)
    if r.returncode != 0: sys.exit(f'FAILED ({r.returncode}): {" ".join(str(c) for c in cmd)}')
def probe_dur(f):
    return float(subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', f], capture_output=True, text=True).stdout.strip())
def frames(f):
    return int(subprocess.run(['ffprobe', '-v', 'error', '-count_frames', '-select_streams', 'v', '-show_entries', 'stream=nb_read_frames', '-of', 'csv=p=0', f], capture_output=True, text=True).stdout.strip())

ap = argparse.ArgumentParser()
ap.add_argument('project'); ap.add_argument('--out'); ap.add_argument('--parts', type=int, default=2)
ap.add_argument('--music'); ap.add_argument('--music-db', type=float); ap.add_argument('--sfx-db', type=float)
ap.add_argument('--mute'); ap.add_argument('--tail', type=float); ap.add_argument('--fix')
a = ap.parse_args()
P = os.path.abspath(a.project); name = os.path.basename(P.rstrip('/\\'))
R = os.path.join(P, 'render'); os.makedirs(R, exist_ok=True)
# remember audio/length options so a later --fix uses exactly the same ones unless overridden
saved_f = os.path.join(R, 'build.json'); saved = json.load(open(saved_f)) if os.path.exists(saved_f) else {}
for k, d in (('music', None), ('music_db', -22.0), ('sfx_db', -11.0), ('mute', ''), ('tail', None)):
    if getattr(a, k) is None: setattr(a, k, saved.get(k, d))
json.dump({k: getattr(a, k) for k in ('music', 'music_db', 'sfx_db', 'mute', 'tail')}, open(saved_f, 'w'))
cfg = json.load(open(os.path.join(P, 'config.json'))) if os.path.exists(os.path.join(P, 'config.json')) else {}
node = ['node', os.path.join(ROOT, 'tools', 'render.js'), P]

# ---- voice → 44.1 kHz stereo wav
src = next((f for ext in ('wav', 'mp3', 'm4a', 'aac', 'ogg', 'flac') for f in glob.glob(os.path.join(P, 'assets', f'voice.{ext}'))), None)
if not src: sys.exit('No voice file. Put it at projects/<name>/assets/voice.wav (or .mp3/.m4a).')
voice = os.path.join(R, 'voice_44k.wav')
if not os.path.exists(voice) or os.path.getmtime(voice) < os.path.getmtime(src):
    run(['ffmpeg', '-v', 'error', '-y', '-i', src, '-ar', '44100', '-ac', '2', voice])
tail = a.tail if a.tail is not None else cfg.get('tail', 0)
L = float(cfg['duration']) if 'duration' in cfg else probe_dur(voice) + tail
N = round(L * FPS); L = N / FPS
print(f'== {name}: {cfg.get("width", 1920)}x{cfg.get("height", 1080)}, {L:.2f}s, {N} frames')

# ---- audio (always rebuilt: cheap, and scene changes can move SFX)
run(node + ['sfx'])
music = None
if a.music:
    music = os.path.join(R, 'music_44k.wav'); run(['ffmpeg', '-v', 'error', '-y', '-i', a.music, '-ar', '44100', '-ac', '2', music])
mix = os.path.join(R, 'mix.wav')
run([sys.executable, os.path.join(ROOT, 'tools', 'sfx.py'), P, voice, mix, f'{L:.3f}', str(a.sfx_db), music or '-', str(a.music_db), a.mute])

video = os.path.join(R, 'video.mp4')
if not a.fix:
    # ---- full render in parallel parts, split on exact frames
    k = max(1, a.parts); cuts = [round(N * i / k) for i in range(k + 1)]
    procs, parts = [], []
    for i in range(k):
        f = os.path.join(R, f'part{i + 1}.mp4'); parts.append(f)
        if os.path.exists(f): os.remove(f)
        log = open(os.path.join(R, f'part{i + 1}.log'), 'w')
        procs.append(subprocess.Popen(node + ['video', f'{cuts[i] / FPS:.6f}', f'{cuts[i + 1] / FPS:.6f}', f], stdout=log, stderr=subprocess.STDOUT))
        print(f'  part {i + 1}: frames {cuts[i]}–{cuts[i + 1]} (log: render/part{i + 1}.log)')
    for i, p in enumerate(procs):
        p.wait()
        if p.returncode != 0 or not os.path.exists(parts[i]): sys.exit(f'Render part {i + 1} failed — read {R}/part{i + 1}.log')
    lst = os.path.join(R, 'list.txt'); open(lst, 'w').write(''.join(f"file '{os.path.basename(f)}'\n" for f in parts))
    run(['ffmpeg', '-v', 'error', '-y', '-f', 'concat', '-safe', '0', '-i', lst, '-c', 'copy', video])
    out = a.out or os.path.join(ROOT, 'output', f'{name}_final.mp4')
else:
    if not os.path.exists(video): sys.exit('No previous render/video.mp4 — run a full build first.')
    t0, t1 = [float(x) for x in a.fix.split('-')]
    fa, fb = max(0, math.floor(t0 * FPS)), min(N, math.ceil(t1 * FPS))
    print(f'== fixing frames {fa}–{fb} ({fa / FPS:.2f}s–{fb / FPS:.2f}s)')
    seg, head, tailf, newv = [os.path.join(R, x) for x in ('fix_seg.mp4', 'fix_head.mp4', 'fix_tail.mp4', 'video_new.mp4')]
    run(node + ['video', f'{fa / FPS:.6f}', f'{fb / FPS:.6f}', seg])
    pieces = []
    if fa > 0: run(['ffmpeg', '-v', 'error', '-y', '-i', video, '-frames:v', str(fa)] + ENC + ['-an', head]); pieces.append(head)
    pieces.append(seg)
    if fb < N: run(['ffmpeg', '-v', 'error', '-y', '-ss', f'{fb / FPS:.6f}', '-i', video] + ENC + ['-an', tailf]); pieces.append(tailf)
    lst = os.path.join(R, 'fix_list.txt'); open(lst, 'w').write(''.join(f"file '{os.path.basename(f)}'\n" for f in pieces))
    run(['ffmpeg', '-v', 'error', '-y', '-f', 'concat', '-safe', '0', '-i', lst, '-c', 'copy', newv])
    got = frames(newv)
    if abs(got - N) > 1: sys.exit(f'Splice check failed: {got} frames, expected {N}. Old video kept.')
    shutil.copy(video, os.path.join(R, 'video_before_fix.mp4')); os.replace(newv, video)
    v = 2
    while os.path.exists(os.path.join(ROOT, 'output', f'{name}_final_v{v}.mp4')): v += 1
    out = a.out or os.path.join(ROOT, 'output', f'{name}_final_v{v}.mp4')

os.makedirs(os.path.dirname(os.path.abspath(out)), exist_ok=True)
run(['ffmpeg', '-v', 'error', '-y', '-i', video, '-i', mix, '-map', '0:v', '-map', '1:a', '-c:v', 'copy', '-c:a', 'aac', '-b:a', '192k', '-shortest', '-movflags', '+faststart', out])
run([sys.executable, os.path.join(ROOT, 'tools', 'check.py'), out] + (['--silence', a.mute] if a.mute else []))
print('\nDONE ->', out)
