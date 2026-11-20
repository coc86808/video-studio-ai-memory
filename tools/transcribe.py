"""Make word timestamps from a voiceover when you have no JSON (works offline after the model downloads once).
Needs: python -m pip install faster-whisper
Usage: python tools/transcribe.py <voice.wav|mp3> <out.json> [language: auto|bn|en|hi|ar|...] [model: small|medium|large-v3]
Default model 'small' is fast on a normal PC; use 'large-v3' for best accuracy (bigger download, slower).
ALWAYS read the result: names and English words inside Bengali speech are often misspelled — fix the text in the JSON,
keep the times."""
import sys, json
from faster_whisper import WhisperModel
src, out = sys.argv[1], sys.argv[2]
lang = sys.argv[3] if len(sys.argv) > 3 and sys.argv[3] != 'auto' else None
size = sys.argv[4] if len(sys.argv) > 4 else 'small'
m = WhisperModel(size, compute_type='int8')
segs, info = m.transcribe(src, language=lang, word_timestamps=True, vad_filter=True)
words = [{'text': w.word.strip(), 'start_time': round(w.start, 2), 'end_time': round(w.end, 2)} for s in segs for w in s.words if w.word.strip()]
json.dump({'language_code': info.language, 'segments': [{'words': words}]}, open(out, 'w', encoding='utf-8'), ensure_ascii=False, indent=0)
print(f'{len(words)} words, language={info.language} -> {out}')
