"""Check that everything the video studio needs is installed and working. Run from the video-studio folder:
    python tools/doctor.py            (fast checks + a 2-second test render)
    python tools/doctor.py --no-render
Prints PASS/FAIL per item with the fix for each failure."""
import os, sys, shutil, subprocess, json, glob, re, importlib
if sys.platform == "win32":
    sys.stdout.reconfigure(encoding="utf-8")

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.chdir(ROOT)
results = []
def check(name, ok, fix=''):
    results.append((name, ok, fix)); print(('PASS ' if ok else 'FAIL ') + name + ('' if ok else f'\n     fix: {fix}'), flush=True)
def out(cmd):
    try: return subprocess.run(cmd, capture_output=True, text=True, timeout=120)
    except Exception as e: return None

# 1. system tools
for tool, fix in [('ffmpeg', 'install ffmpeg (Windows: winget install --id Gyan.FFmpeg -e · macOS: brew install ffmpeg · Linux: sudo apt install ffmpeg), then open a NEW terminal'),
                  ('ffprobe', 'comes with ffmpeg — reinstall ffmpeg'), ('node', 'install Node.js 18+ (Windows: winget install --id OpenJS.NodeJS.LTS -e · macOS: brew install node)')]:
    check(f'{tool} found', shutil.which(tool) is not None, fix)
r = out(['node', '-v'])
if r and r.returncode == 0:
    v = int(re.findall(r'\d+', r.stdout)[0]); check(f'node version {r.stdout.strip()} (need 18+)', v >= 18, 'update Node.js to the LTS version')
check(f'python {sys.version.split()[0]} (need 3.9+)', sys.version_info >= (3, 9), 'install Python 3.10+')
# 2. python packages
for mod, pipn in [('numpy', 'numpy'), ('scipy', 'scipy'), ('PIL', 'pillow')]:
    try: importlib.import_module(mod); check(f'python package {pipn}', True)
    except Exception: check(f'python package {pipn}', False, 'python -m pip install -r requirements.txt')
try: importlib.import_module('faster_whisper'); check('optional: faster-whisper (auto transcription)', True)
except Exception: print('INFO optional: faster-whisper not installed — only needed when you have no word-timestamp JSON (python -m pip install faster-whisper)')
# 3. playwright + chromium
r = out(['node', '-e', "const p=require('playwright');console.log(p.chromium.executablePath())"])
pw_ok = bool(r and r.returncode == 0)
check('node package playwright', pw_ok, 'npm install')
if pw_ok:
    exe = r.stdout.strip(); chrome = os.environ.get('CHROME_PATH')
    check('chromium browser for rendering', bool(chrome and os.path.exists(chrome)) or os.path.exists(exe), 'npx playwright install chromium   (or set CHROME_PATH to an installed Chrome)')
# 4. fonts
fonts = glob.glob('fonts/*.ttf') + glob.glob('fonts/*.otf')
check(f'fonts folder has fonts ({len(fonts)}: {", ".join(os.path.basename(f) for f in fonts) or "none"})', len(fonts) > 0, 'run the setup skill font step (downloads Montserrat, Hind Siliguri, Noto Sans)')
# 5. skills & commands
want = ['video-studio-setup', 'creative-director', 'motion-explainer', 'video-render', 'web-assets']
for s in want:
    f = f'.opencode/skills/{s}/SKILL.md'
    ok = os.path.exists(f) and re.search(rf'^name:\s*{re.escape(s)}\s*$', open(f, encoding='utf-8').read(), re.M) is not None
    check(f'skill {s}', ok, f'missing or wrong "name:" in {f} — re-copy the kit')
for c in ['check-setup', 'new-video', 'fix-scene']:
    check(f'command /{c}', os.path.exists(f'.opencode/commands/{c}.md'), f're-copy .opencode/commands/{c}.md from the kit')
for d in ['references', 'inputs', 'output', 'projects', 'template', 'engine', 'tools']:
    check(f'folder {d}/', os.path.isdir(d), f'create the folder {d}/')
# 6. test render (Latin + Bengali text, 2 s, 1080p)
if '--no-render' not in sys.argv and pw_ok and shutil.which('ffmpeg'):
    T = os.path.join('projects', '_doctor_test')
    if os.path.exists(T): shutil.rmtree(T)
    shutil.copytree('template', T)
    f = next((x for x in fonts if 'hind' in x.lower() or 'bengali' in x.lower()), fonts[0] if fonts else None)
    if f: shutil.copy(f, os.path.join(T, 'assets', 'font.ttf'))
    r = out(['node', 'tools/render.js', T, 'still', '1.4,4.8'])
    st = [os.path.join(T, 'stills', 'f_1.4.jpg'), os.path.join(T, 'stills', 'f_4.8.jpg')]
    check('test still render', r is not None and r.returncode == 0 and all(os.path.exists(s) for s in st), (r.stderr[-400:] if r else 'render did not start'))
    r = out(['node', 'tools/render.js', T, 'video', '0', '2', os.path.join(T, 'test.mp4')])
    okv = r is not None and r.returncode == 0 and os.path.exists(os.path.join(T, 'test.mp4'))
    if okv:
        d = float(out(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', os.path.join(T, 'test.mp4')]).stdout.strip())
        okv = abs(d - 2.0) < .1
    check('test video render (2 s)', okv, (r.stderr[-400:] if r else 'render did not start'))
    if all(os.path.exists(s) for s in st):
        print(f'INFO look at {st[0]} (English) and {st[1]} (Bengali — "স্টুডিও" must be joined, not broken boxes)')
fails = [n for n, ok, _ in results if not ok]
print('\nRESULT:', 'ALL PASS — studio ready' if not fails else f'{len(fails)} FAIL: ' + '; '.join(fails))
sys.exit(1 if fails else 0)
