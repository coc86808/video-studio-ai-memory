// Screenshot part of a web page (article headline, post, chart, official statement) as a clean PNG.
// Usage: node tools/web_capture.js <url> <out.png> [options]
//   --selector "<css>"   capture only this element (e.g. "h1", "article header", "[data-testid=tweet]")
//   --text "<words>"     capture the smallest block that contains these words (headline/quote)
//   --clip x,y,w,h       capture a fixed region (CSS px)
//   --width 1280         viewport width (default 1280)   --scale 2  (sharper image, default 2)
//   --hide-media         hide all <img>/<video>/<picture> (use when a page shows people's photos)
//   --dark               ask the site for dark mode     --wait 2500  extra ms to let the page settle
// Always writes <out>.source.txt with the URL and time, for the assets log.
const { chromium } = require('playwright');
const fs = require('fs');
(async () => {
  const [url, out, ...rest] = process.argv.slice(2);
  if (!url || !out) { console.error('usage: node tools/web_capture.js <url> <out.png> [options]'); process.exit(1); }
  const opt = {}; for (let i = 0; i < rest.length; i++) { if (rest[i].startsWith('--')) { const k = rest[i].slice(2); const v = rest[i + 1] && !rest[i + 1].startsWith('--') ? rest[++i] : true; opt[k] = v; } }
  const br = await chromium.launch({ executablePath: process.env.CHROME_PATH || undefined });
  const ctx = await br.newContext({ viewport: { width: +(opt.width || 1280), height: 900 }, deviceScaleFactor: +(opt.scale || 2), colorScheme: opt.dark ? 'dark' : 'light',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130 Safari/537.36', locale: 'en-US' });
  const pg = await ctx.newPage();
  try { await pg.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 }); } catch (e) { console.error('LOAD FAILED:', e.message); await br.close(); process.exit(2); }
  await pg.waitForTimeout(+(opt.wait || 2500));
  // remove cookie / consent / newsletter / sticky overlays (best effort)
  await pg.addStyleTag({ content: `[id*="cookie" i],[class*="cookie" i],[id*="consent" i],[class*="consent" i],[class*="gdpr" i],[id*="onetrust" i],[class*="newsletter" i],[class*="paywall" i],[class*="modal" i][role="dialog"],[aria-modal="true"],iframe[src*="ads"]{display:none!important} html,body{overflow:auto!important}` + (opt['hide-media'] ? ' img,video,picture,svg image,[style*="background-image"]{visibility:hidden!important}' : '') });
  await pg.waitForTimeout(400);
  let target = null;
  if (opt.selector) target = await pg.$(opt.selector);
  if (!target && opt.text) {
    const h = await pg.evaluateHandle(t => {
      const want = t.toLowerCase(); let best = null;
      for (const el of document.querySelectorAll('h1,h2,h3,p,blockquote,article,section,div,li,span')) {
        const s = (el.innerText || '').toLowerCase();
        if (s.includes(want) && el.getBoundingClientRect().height > 10) { if (!best || s.length < (best.innerText || '').length) best = el; }
      }
      return best;
    }, opt.text);
    target = h.asElement();
  }
  if ((opt.selector || opt.text) && !target) { console.error('NOT FOUND on page: ' + (opt.selector || opt.text) + ' — try another selector/text or --clip'); await br.close(); process.exit(3); }
  if (target) { await target.scrollIntoViewIfNeeded(); await target.screenshot({ path: out }); }
  else if (opt.clip) { const [x, y, w, h] = opt.clip.split(',').map(Number); await pg.screenshot({ path: out, clip: { x, y, width: w, height: h } }); }
  else await pg.screenshot({ path: out });
  fs.writeFileSync(out + '.source.txt', `url: ${url}\ncaptured: ${new Date().toISOString()}\noptions: ${JSON.stringify(opt)}\n`);
  console.log('saved', out);
  await br.close();
})();
