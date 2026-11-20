"""Convert a word-timestamp JSON (ElevenLabs-style segments[].words[] with text/start_time/end_time,
or Whisper-style words with word/start/end) into <project>/words.js, and print sentence timings.
Usage: python tools/words_to_js.py <transcript.json> <projectDir>"""
import json, sys, re, os
d = json.load(open(sys.argv[1], encoding='utf-8'))
raw = []
def walk(o):
    if isinstance(o, dict):
        if ('word' in o or 'text' in o) and ('start' in o or 'start_time' in o):
            t = o.get('text', o.get('word', ''))
            s = o.get('start_time', o.get('start')); e = o.get('end_time', o.get('end'))
            if t and t.strip() and s is not None: raw.append([t.strip(), round(float(s), 2), round(float(e), 2)])
        elif 'words' in o and isinstance(o['words'], list):
            for w in o['words']:
                t = w.get('text', w.get('word', ''))
                s = w.get('start_time', w.get('start')); e = w.get('end_time', w.get('end'))
                if t and t.strip() and s is not None: raw.append([t.strip(), round(float(s), 2), round(float(e), 2)])
        else:
            for v in o.values(): walk(v)
    elif isinstance(o, list):
        for v in o: walk(v)
walk(d)
raw.sort(key=lambda w: w[1])
out = os.path.join(sys.argv[2], 'words.js')
open(out, 'w', encoding='utf-8').write('const WORDS=' + json.dumps(raw, ensure_ascii=False) + ';')
print(f'{len(raw)} words -> {out}   total {raw[0][1]}s - {raw[-1][2]}s\n')
cur, st = [], None
for w in raw:
    if st is None: st = w[1]
    cur.append(f'{w[0]}@{w[1]:.2f}')
    if re.search(r'[।?!.]$', w[0]):
        print(f'{st:7.2f}-{w[2]:7.2f} | ' + ' '.join(cur)); cur, st = [], None
if cur: print(f'{st:7.2f}-      ? | ' + ' '.join(cur))
