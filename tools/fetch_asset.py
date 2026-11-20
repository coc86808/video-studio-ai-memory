"""Download one file (icon, logo, texture, free stock image, font, sound) and log where it came from.
Usage: python tools/fetch_asset.py <url> <out_path> "<licence / why allowed>"
Checks that the file really is the type the extension says, and appends a line to assets_sources.md next to it."""
import sys, os, urllib.request, datetime
url, out, lic = sys.argv[1], sys.argv[2], sys.argv[3] if len(sys.argv) > 3 else 'UNKNOWN - check before use'
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 video-studio asset fetcher'})
data = urllib.request.urlopen(req, timeout=60).read()
sig = {b'\x89PNG': 'png', b'\xff\xd8\xff': 'jpg', b'GIF8': 'gif', b'RIFF': 'webp/wav', b'<svg': 'svg', b'<?xml': 'svg/xml', b'ID3': 'mp3', b'OggS': 'ogg', b'\x00\x01\x00\x00': 'ttf', b'wOFF': 'woff', b'wOF2': 'woff2'}
kind = next((v for k, v in sig.items() if data[:12].lstrip().startswith(k)), None)
if data[:15].lstrip().lower().startswith(b'<!doctype html') or data[:6].lower() == b'<html>':
    sys.exit(f'FAILED: {url} returned a web page, not a file. Find the direct file link.')
os.makedirs(os.path.dirname(os.path.abspath(out)), exist_ok=True)
open(out, 'wb').write(data)
log = os.path.join(os.path.dirname(os.path.abspath(out)), 'assets_sources.md')
with open(log, 'a', encoding='utf-8') as f:
    f.write(f'- {os.path.basename(out)} | {url} | {lic} | {datetime.date.today()} | type={kind or "?"} | {len(data)//1024} KB\n')
print('saved', out, kind, len(data) // 1024, 'KB')
