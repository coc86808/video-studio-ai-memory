// Video size: put <projectDir>/config.json = {"width":1080,"height":1920} for 9:16 Shorts (default 1920x1080).
// Usage (run from the video-studio folder):
//   node tools/render.js <projectDir> still 1.5,4.2,8          -> <projectDir>/stills/f_<t>.jpg
//   node tools/render.js <projectDir> video <start> <end> <out.mp4>
//   node tools/render.js <projectDir> sfx                      -> <projectDir>/sfx.json
const { chromium } = require('playwright');
const { spawn } = require('child_process');
const fs = require('fs'), path = require('path'), { pathToFileURL } = require('url');
(async () => {
  const [proj, mode, a, b, out] = process.argv.slice(2);
  const dir = path.resolve(proj);
  let W = 1920, H = 1080;
  try { const cf = JSON.parse(fs.readFileSync(path.join(dir, 'config.json'), 'utf8')); W = cf.width || W; H = cf.height || H; } catch (e) {}
  const br = await chromium.launch({ executablePath: process.env.CHROME_PATH || undefined, args: ['--allow-file-access-from-files', '--force-color-profile=srgb'] });
  const pg = await br.newPage({ viewport: { width: W, height: H } });
  pg.on('pageerror', e => console.error('PAGE ERROR:', e.message));
  pg.on('console', m => { if (m.type() === 'error') console.error('CONSOLE ERROR:', m.text()); });
  await pg.goto(pathToFileURL(path.join(dir, 'index.html')).href);
  await pg.waitForFunction('window.ready === true', null, { timeout: 30000 });
  await pg.evaluate(`document.documentElement.style.width='${W}px';document.documentElement.style.height='${H}px';document.body.style.width='${W}px';document.body.style.height='${H}px';document.body.classList.add('${H > W ? 'vertical' : 'horizontal'}')`);
  await pg.evaluate('document.fonts.ready');
  if (mode === 'sfx') { fs.writeFileSync(path.join(dir, 'sfx.json'), JSON.stringify(await pg.evaluate('window.SFX'))); await br.close(); return; }
  if (mode === 'still') {
    fs.mkdirSync(path.join(dir, 'stills'), { recursive: true });
    for (const t of a.split(',')) { await pg.evaluate(`seek(${t})`); await pg.screenshot({ path: path.join(dir, 'stills', `f_${t}.jpg`), type: 'jpeg', quality: 88 }); }
    await br.close(); return;
  }
  const t0 = +a, t1 = +b, fps = 30, n = Math.round((t1 - t0) * fps);
  const outp = path.resolve(out), tmp = outp.replace(/\.mp4$/, '.part.mp4');
  const ff = spawn('ffmpeg', ['-y', '-v', 'error', '-f', 'image2pipe', '-framerate', '30', '-i', '-', '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '18', '-pix_fmt', 'yuv420p', '-r', '30', tmp], { stdio: ['pipe', 'inherit', 'inherit'] });
  const st = Date.now();
  for (let i = 0; i < n; i++) {
    await pg.evaluate(`seek(${t0 + i / fps})`);
    const buf = await pg.screenshot({ type: 'jpeg', quality: 92 });
    if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r));
    if (i % 150 === 0) console.error(`${path.basename(outp)} ${i}/${n} frames, ${((Date.now() - st) / 1000).toFixed(0)}s`);
  }
  ff.stdin.end();
  await new Promise(r => ff.on('close', code => { if (code === 0) fs.renameSync(tmp, outp); else console.error('ffmpeg failed', code); r(); }));
  console.error(`done ${n} frames -> ${outp}`);
  await br.close();
})();
