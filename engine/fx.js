// Extra effects + ready-made components (load after engine.js and icons.js).
// Camera fx act on #cam (all scenes):  punch(t, amount)  shake(t, px)  glitch(t, dur)  blackout(t0, t1)
// Components return HTML strings for item(): stamp(), photo(), plate(), quote(), progress() — see each comment.
const CAM = document.getElementById('cam');
const FX = { bumps: [], shakes: [], glitches: [], black: [] };
function punch(t, a = .07) { FX.bumps.push([t, a]); }                   // quick zoom-in that settles back (emphasis word)
function shake(t, a = 10) { FX.shakes.push([t, a]); }                    // 5-frame camera shake (big numbers, impacts)
function glitch(t, d = .22) { FX.glitches.push([t, d]); sfx(t, 'glitch'); } // RGB split, use 2–3 times per video max
function blackout(t0, t1) { FX.black.push([t0, t1]); }                  // full black screen (pair with sfx.py mute range)
HOOKS.push(t => {
  if (CAM) {
    let s = 1, x = 0, y = 0;
    FX.bumps.forEach(([b, a]) => { const d = t - b; if (d >= 0 && d < .9) s += d < .12 ? a * d / .12 : a * Math.exp(-(d - .12) * 5); });
    FX.shakes.forEach(([b, a]) => { const d = t - b; if (d >= 0 && d < .17) { const k = Math.floor(d * 30) + 1; x += a * (((k * 7919) % 13) / 6.5 - 1); y += a * (((k * 104729) % 11) / 5.5 - 1); } });
    CAM.style.transform = `translate(${x.toFixed(1)}px,${y.toFixed(1)}px) scale(${s.toFixed(4)})`;
    const g = FX.glitches.find(([b, d]) => t >= b && t < b + d);
    if (g) { const o = [10, -6, 14][Math.floor(t * 30) % 3]; CAM.style.filter = `drop-shadow(${o}px 0 0 rgba(255,0,70,.8)) drop-shadow(${-o}px 0 0 rgba(0,220,255,.8))`; } else CAM.style.filter = 'none';
  }
  const gr = document.getElementById('grain'); if (gr) { const f = Math.floor(t * 15); gr.style.backgroundPosition = `${(f * 137) % 300}px ${(f * 211) % 300}px`; }
  const bl = document.getElementById('black'); if (bl) bl.style.opacity = FX.black.some(([a, b]) => t >= a && t < b) ? 1 : 0;
});
// rubber stamp: stamp('AUG 2025', 'var(--highlight)', 140, -6)
const stamp = (txt, col = 'var(--danger)', size = 120, rot = -6) => `<div class="stamp" style="color:${col};font-size:${size}px;transform:rotate(${rot}deg)">${txt}</div>`;
// polaroid photo with tape: photo('assets/x.jpg', 760, 'CAPTION', -3)
const photo = (src, w = 760, caption = '', rot = -3) => `<div class="photo" style="width:${w}px;transform:rotate(${rot}deg);position:relative"><img src="${src}" style="width:${w - 36}px;display:block">
  <div class="tape" style="left:40px;transform:rotate(-8deg)"></div><div class="tape" style="right:40px;transform:rotate(7deg)"></div>
  <div style="position:absolute;left:0;right:0;bottom:12px;text-align:center;font-size:34px;color:#15161a;text-transform:uppercase">${caption}</div></div>`;
// person / source name plate without a photo (or with one): plate('RAY', 'STREAMER', 'assets/ray.png')
const plate = (name, role = '', img = '') => `<div class="card" style="display:flex;align-items:center;gap:28px;padding:22px 44px 22px 26px;border-radius:120px">
  <div style="width:120px;height:120px;border-radius:50%;background:var(--bg2);border:3px solid var(--card-border);overflow:hidden;display:flex;align-items:flex-end;justify-content:center">
  ${img ? `<img src="${img}" style="width:100%;height:100%;object-fit:cover">` : `<svg width="110" height="110" viewBox="0 0 24 24"><circle cx="12" cy="8.5" r="4.2" fill="var(--muted)"/><path d="M3.8 21.5c1.2-4.6 4.4-6.8 8.2-6.8s7 2.2 8.2 6.8z" fill="var(--muted)"/></svg>`}</div>
  <div style="text-align:left"><div class="h3" style="line-height:1">${name}</div>${role ? `<div class="p" style="margin-top:6px;font-size:34px">${role}</div>` : ''}</div></div>`;
// attributed quote card: quote('RAY THINKS', '“IT\'S A <span class=danger>SCAM</span>”')
const quote = (who, html, w = 860) => `<div class="card" style="position:relative;width:${w}px;padding:44px 50px 46px;text-align:center">
  <div style="position:absolute;left:30px;top:-28px"><span class="pill hl">${who}</span></div><div class="h2" style="margin-top:10px;line-height:1.05">${html}</div></div>`;
// progress bar: progress('pb1', 820) then A(document.querySelector('#pb1'), [{width:'0%'},{width:'10%'}], t, .7)
const progress = (id, w = 820, h = 76) => `<div style="position:relative;width:${w}px;height:${h}px;border-radius:${h / 2}px;background:rgba(255,255,255,.08);border:3px solid var(--card-border);overflow:hidden">
  <div id="${id}" style="position:absolute;left:0;top:0;bottom:0;width:0;background:var(--info);box-shadow:0 0 40px var(--info)"></div></div>`;
