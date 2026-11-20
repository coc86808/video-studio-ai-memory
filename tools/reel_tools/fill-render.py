# Free from @barakahraaz on Instagram. Not for sale.
# usage: python3 -I fill-render.py <reel-folder> <sound.wav|.m4a|-> <out.html> [browser-render.html]
# Puts a reel into the backup renderer page, ready to publish as an Artifact.
# The reel's index.html gets every local file it points at (fonts, images) inlined as data URLs,
# and Google Fonts stylesheets inlined when they can be fetched. The sound (audio.wav from mix.py)
# is turned into a small M4A when ffmpeg is there, else kept as it is. "-" makes a silent video.
import base64, mimetypes, os, re, shutil, subprocess, sys, tempfile, urllib.parse, urllib.request

MIME = {'.ttf': 'font/ttf', '.otf': 'font/otf', '.woff': 'font/woff', '.woff2': 'font/woff2', '.png': 'image/png',
        '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.gif': 'image/gif', '.svg': 'image/svg+xml',
        '.wav': 'audio/wav', '.m4a': 'audio/mp4', '.mp3': 'audio/mpeg'}
LIMIT = 15 * 1024 * 1024  # an Artifact page may be 16 MB; checked on the final file (the reel is base64 over data-URL fonts, about 1.8x)


def data_url(raw, ext):
    return f'data:{MIME.get(ext) or mimetypes.guess_type("x" + ext)[0] or "application/octet-stream"};base64,' + base64.b64encode(raw).decode()


def inline_local(html, folder):
    def swap(ref):
        if re.match(r'^(data:|https?:|#|//|blob:)', ref):
            return None
        path = os.path.normpath(os.path.join(folder, urllib.parse.unquote(ref.split('?')[0].split('#')[0])))
        if not os.path.isfile(path):
            return None
        return data_url(open(path, 'rb').read(), os.path.splitext(path)[1].lower())

    def url_sub(m):
        new = swap(m.group(2))
        return f'url({new})' if new else m.group(0)

    def attr_sub(m):
        new = swap(m.group(3))
        return f'{m.group(1)}={m.group(2)}{new}{m.group(2)}' if new else m.group(0)

    html = re.sub(r'url\(\s*([\'"]?)([^\'")]+)\1\s*\)', url_sub, html)
    return re.sub(r'\b(src|href|xlink:href)=([\'"])([^\'"]+)\2', attr_sub, html)


def fetch(url):
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Macintosh) AppleWebKit/537.36 Chrome/130 Safari/537.36'})
    return urllib.request.urlopen(req, timeout=20).read()


def google_css(url):
    css = fetch(url.replace('&amp;', '&')).decode()
    return re.sub(r'url\((https://fonts\.gstatic\.com/[^)]+)\)',
                  lambda f: 'url(' + data_url(fetch(f.group(1)), os.path.splitext(f.group(1))[1].lower()) + ')', css)


def inline_google_fonts(html):
    def sub(m, wrap):
        try:
            return wrap(google_css(m.group(1)))
        except Exception as e:
            print(f'note: could not inline {m.group(1)[:60]}... ({e}); the page will load it online', file=sys.stderr)
            return m.group(0)
    html = re.sub(r'<link[^>]+href="(https://fonts\.googleapis\.com/[^"]+)"[^>]*>', lambda m: sub(m, lambda c: f'<style>{c}</style>'), html)
    return re.sub(r'@import\s+url\(\s*[\'"]?(https://fonts\.googleapis\.com/[^\'")]+)[\'"]?\s*\)\s*;', lambda m: sub(m, lambda c: c), html)


def sound(path):
    if path == '-':
        return ''
    ext = os.path.splitext(path)[1].lower()
    if ext == '.wav' and shutil.which('ffmpeg'):
        out = os.path.join(tempfile.mkdtemp(), 'audio.m4a')
        subprocess.run(['ffmpeg', '-loglevel', 'error', '-y', '-i', path, '-c:a', 'aac', '-b:a', '192k', out], check=True)
        path, ext = out, '.m4a'
    return data_url(open(path, 'rb').read(), ext)


def main():
    if len(sys.argv) < 4:
        sys.exit(__doc__ or 'usage: python3 -I fill-render.py <reel-folder> <sound|-> <out.html> [browser-render.html]')
    folder, snd, out = sys.argv[1:4]
    here = os.path.dirname(os.path.abspath(__file__))
    page_path = sys.argv[4] if len(sys.argv) > 4 else next(
        (p for p in (os.path.join(here, 'browser-render.html'), os.path.join(here, '..', 'assets', 'browser-render.html')) if os.path.isfile(p)), None)
    if not page_path:
        sys.exit('browser-render.html not found; pass its path as the 4th argument')
    reel = open(os.path.join(folder, 'index.html'), encoding='utf-8').read()
    reel = inline_google_fonts(inline_local(reel, folder))
    page = open(page_path, encoding='utf-8').read()
    for key in ('__REEL_HTML_B64__', '__REEL_AUDIO__'):
        if page.count(key) != 1:
            sys.exit(f'{page_path}: expected {key} once')
    page = page.replace('__REEL_HTML_B64__', base64.b64encode(reel.encode()).decode()).replace('__REEL_AUDIO__', sound(snd))
    open(out, 'w', encoding='utf-8').write(page)
    size = os.path.getsize(out)
    print(f'{out}: {size / 1048576:.1f} MB')
    if size > LIMIT:
        sys.exit('too big for an Artifact (over 15 MB): use a shorter sound file or smaller images')


main()
