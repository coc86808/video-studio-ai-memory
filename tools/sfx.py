"""Synthesize subtle SFX from <projectDir>/sfx.json and mix them under the voice.
Usage: python tools/sfx.py <projectDir> <voice.wav> <out.wav> <video_length_seconds> [sfx_db=-11] [music.wav] [music_db=-22] [mute=29.46-30.4,...]
  music.wav : optional background music (convert first: ffmpeg -i song.mp3 -ar 44100 -ac 2 music.wav); loops if short
  mute      : time ranges where SFX AND music are fully silent (e.g. a dramatic "silence" moment); voice is never muted"""
import os
import json, sys, numpy as np
from scipy.io import wavfile
from scipy.signal import butter, sosfilt

SR = 44100
rng = np.random.default_rng(7)
def env(n, a, r):  # attack/release in samples, exp decay
    e = np.ones(n); a = max(1, a); e[:a] = np.linspace(0, 1, a)
    e[a:] = np.exp(-np.linspace(0, r, n - a)); return e
def bp(x, lo, hi): return sosfilt(butter(2, [lo, hi], 'band', fs=SR, output='sos'), x)
def lp(x, f): return sosfilt(butter(2, f, 'low', fs=SR, output='sos'), x)

def whoosh():
    n = int(.42 * SR); t = np.linspace(0, 1, n)
    lo = bp(rng.standard_normal(n), 250, 1800); hi = bp(rng.standard_normal(n), 1800, 7000)
    return (lo * (1 - t) + hi * t) * np.sin(np.pi * t) ** 1.6 * .55
def pop():
    n = int(.09 * SR); t = np.arange(n) / SR
    f = 900 * np.exp(-t * 30) + 380
    return np.sin(2*np.pi*np.cumsum(f)/SR) * env(n, 40, 9) * .55
def tick():
    n = int(.035 * SR); return bp(rng.standard_normal(n), 2500, 9000) * env(n, 5, 12) * .45
def click():
    n = int(.05 * SR); t = np.arange(n)/SR
    return (np.sin(2*np.pi*1800*t) * .4 + bp(rng.standard_normal(n), 1500, 7000) * .5) * env(n, 4, 14) * .6
def typ():
    n = int(.03 * SR); return bp(rng.standard_normal(n), 1800, 6000) * env(n, 3, 14) * .22
def ding():
    n = int(1.4 * SR); t = np.arange(n)/SR
    x = sum(a*np.sin(2*np.pi*f*t) for f, a in [(1318.5, 1), (2637, .35), (1975.5, .25), (3951, .1)])
    return x * env(n, 60, 6) * .28
def boom():
    n = int(1.0 * SR); t = np.arange(n)/SR
    f = 120 * np.exp(-t * 4) + 38
    x = np.sin(2*np.pi*np.cumsum(f)/SR) + lp(rng.standard_normal(n), 300) * .3
    return x * env(n, 80, 5) * .8
def swipe():
    n = int(.32 * SR); t = np.linspace(0, 1, n)
    return bp(rng.standard_normal(n), 2000, 9000) * np.sin(np.pi*t) ** 2 * .35
def drop():
    n = int(.5 * SR); t = np.arange(n)/SR
    f = 500 * np.exp(-t * 6) + 80
    return np.sin(2*np.pi*np.cumsum(f)/SR) * env(n, 100, 6) * .35
def success():
    n = int(.6 * SR); t = np.arange(n)/SR; x = np.zeros(n)
    for k, f in enumerate([880, 1318.5]):
        s0 = int(k * .09 * SR); tt = t[:n-s0]
        x[s0:] += np.sin(2*np.pi*f*tt) * env(n - s0, 40, 9) * .25
    return x
def error():
    n = int(.35 * SR); t = np.arange(n)/SR
    return (np.sign(np.sin(2*np.pi*180*t)) * .12 + np.sin(2*np.pi*90*t) * .2) * env(n, 50, 7)

def thud():
    n = int(.45 * SR); t = np.arange(n)/SR
    f = 95 * np.exp(-t * 9) + 45
    x = np.sin(2*np.pi*np.cumsum(f)/SR) * env(n, 30, 7) + lp(rng.standard_normal(n), 900) * env(n, 10, 25) * .6
    return x * .8
def rip():
    n = int(.42 * SR); t = np.linspace(0, 1, n)
    x = bp(rng.standard_normal(n), 900, 7000)
    crackle = (rng.random(n) < .02) * rng.standard_normal(n) * 3
    return (x + bp(crackle, 1500, 8000)) * np.sin(np.pi * np.clip(t * 1.4, 0, 1)) ** .7 * (1 - t) ** .5 * .5
def glitch():
    n = int(.22 * SR); t = np.arange(n)/SR
    sq = np.sign(np.sin(2*np.pi*(320 + 900*np.floor(t*40) % 700)*t)) * .25
    return (sq + bp(rng.standard_normal(n), 2000, 9000) * .5) * env(n, 20, 6) * .45
GEN = dict(thud=thud, rip=rip, glitch=glitch, whoosh=whoosh, pop=pop, tick=tick, click=click, type=typ, ding=ding, boom=boom, swipe=swipe, drop=drop, success=success, error=error)
cache = {k: v() for k, v in GEN.items()}

PROJ, VOICE, OUT = sys.argv[1], sys.argv[2], sys.argv[3]
sr, v = wavfile.read(VOICE)
if sr != SR: sys.exit(f'voice must be 44100 Hz (got {sr}); convert first: ffmpeg -i in -ar 44100 voice.wav')
if v.dtype == np.int16: v = v.astype(np.float32) / 32768.0
elif v.dtype == np.int32: v = v.astype(np.float32) / 2147483648.0
else: v = v.astype(np.float32)
if v.ndim == 1: v = np.stack([v, v], 1)
T = float(sys.argv[4])
DB = float(sys.argv[5]) if len(sys.argv) > 5 else -11
MUSIC = sys.argv[6] if len(sys.argv) > 6 and sys.argv[6] not in ('', '-') else None
MDB = float(sys.argv[7]) if len(sys.argv) > 7 else -22
MUTE = [tuple(map(float, r.split('-'))) for r in sys.argv[8].split(',')] if len(sys.argv) > 8 and sys.argv[8] else []
N = int(T * SR)
voice = np.zeros((N, 2), np.float32); m = min(N, len(v)); voice[:m] = v[:m]
fx = np.zeros(N, np.float32)
GAIN = dict(thud=.8, rip=.8, glitch=.5, whoosh=.55, pop=.6, tick=.5, click=.7, type=.6, ding=.6, boom=.75, swipe=.6, drop=.6, success=.6, error=.55)
for e in json.load(open(os.path.join(PROJ, 'sfx.json'))):
    s = cache.get(e['k']);
    if s is None: continue
    i = int(e['t'] * SR)
    if i >= N: continue
    j = min(N, i + len(s)); fx[i:j] += s[:j-i] * GAIN[e['k']]
fx *= 10 ** (DB / 20)   # SFX well under the voice
bed = np.zeros((N, 2), np.float32)
if MUSIC:
    msr, mu = wavfile.read(MUSIC)
    if msr != SR: sys.exit('music must be 44100 Hz wav')
    mu = mu.astype(np.float32) / (32768.0 if mu.dtype == np.int16 else 2147483648.0 if mu.dtype == np.int32 else 1.0)
    if mu.ndim == 1: mu = np.stack([mu, mu], 1)
    reps = int(np.ceil(N / len(mu))); bed = np.tile(mu, (reps, 1))[:N] * 10 ** (MDB / 20)
    # duck music a further 4 dB while the voice is speaking
    env_v = np.abs(voice[:, 0]); k = int(.15 * SR)
    env_v = np.convolve(env_v, np.ones(k) / k, 'same')
    duck = np.where(env_v > .02, 10 ** (-4 / 20), 1.0).astype(np.float32)
    duck = np.convolve(duck, np.ones(k) / k, 'same').astype(np.float32)
    bed *= duck[:, None]
gate = np.ones(N, np.float32)
for a, b in MUTE:
    i, j = int(a * SR), min(N, int(b * SR)); r = int(.03 * SR)
    gate[i:j] = 0
    if i - r > 0: gate[i - r:i] = np.linspace(1, 0, r)
    if j + r < N: gate[j:j + r] = np.linspace(0, 1, r)
mix = voice + (fx[:, None] + bed) * gate[:, None]
pk = np.abs(mix).max()
if pk > .98: mix *= .98 / pk
wavfile.write(OUT, SR, (mix * 32767).astype(np.int16))
print('ok', T, 'voice peak', float(np.abs(voice).max()), 'fx peak', float(np.abs(fx).max()))
