// ---------- tiny deterministic timeline engine (WAAPI + hooks) ----------
// Every time `t` is in seconds of the voiceover. window.seek(t) freezes the page at t; tools/render.js films it.
// API: scene(t0,t1,{cap,whoosh,outType,push}), el(), item(), words(), counter(), typer(), cursor(), A(), sfx(), HOOKS.
const STAGE = document.getElementById('stage');
const ROOT = document.getElementById('cam') || STAGE;   // scenes live inside #cam so fx.js can punch/shake/glitch them
const EO = 'cubic-bezier(.22,1,.36,1)';      // smooth ease-out
const EIO = 'cubic-bezier(.65,0,.35,1)';     // ease-in-out
const HOOKS = [];                             // (t)=>{} per-frame custom logic
const SCENES = [];
const SFX = [];                               // {t, k}
const CAPOFF = [];                            // [t0,t1] ranges where captions hidden

function sfx(t, k) { SFX.push({ t: +t.toFixed(3), k }); }
function A(el, kf, t, d, ease = EO, fill = 'both') {
  return el.animate(kf, { delay: t * 1000, duration: Math.max(1, d * 1000), easing: ease, fill });
}
const ENTRY = {
  up:   [{ opacity: 0, transform: 'translateY(46px)', filter: 'blur(12px)' }, { opacity: 1, transform: 'none', filter: 'blur(0px)' }],
  down: [{ opacity: 0, transform: 'translateY(-46px)', filter: 'blur(12px)' }, { opacity: 1, transform: 'none', filter: 'blur(0px)' }],
  pop:  [{ opacity: 0, transform: 'scale(.55)' }, { opacity: 1, transform: 'scale(1.06)', offset: .62 }, { opacity: 1, transform: 'scale(1)' }],
  zoom: [{ opacity: 0, transform: 'scale(1.5)', filter: 'blur(24px)' }, { opacity: 1, transform: 'scale(1)', filter: 'blur(0px)' }],
  fade: [{ opacity: 0 }, { opacity: 1 }],
  left: [{ opacity: 0, transform: 'translateX(-120px)', filter: 'blur(10px)' }, { opacity: 1, transform: 'none', filter: 'blur(0px)' }],
  right:[{ opacity: 0, transform: 'translateX(120px)', filter: 'blur(10px)' }, { opacity: 1, transform: 'none', filter: 'blur(0px)' }],
  rise: [{ opacity: 0, transform: 'translateY(160px) scale(.9)' }, { opacity: 1, transform: 'none' }],
};
const EXIT = {
  fade: [{ opacity: 1, transform: 'none', filter: 'blur(0px)' }, { opacity: 0, transform: 'scale(.96)', filter: 'blur(10px)' }],
  up:   [{ opacity: 1, transform: 'none', filter: 'blur(0px)' }, { opacity: 0, transform: 'translateY(-60px)', filter: 'blur(10px)' }],
  down: [{ opacity: 1, transform: 'none' }, { opacity: 0, transform: 'translateY(220px) rotate(8deg)' }],
  dim:  [{ opacity: 1, filter: 'blur(0px)' }, { opacity: .28, filter: 'blur(3px)' }],
  shrink:[{ opacity: 1, transform: 'none' }, { opacity: 0, transform: 'scale(.6)' }],
};

function el(tag, cls, html, parent, style) {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (html != null) e.innerHTML = html;
  if (style) e.style.cssText = style;
  (parent || STAGE).appendChild(e);
  return e;
}
// item = wrapper(exit) > inner(entry)
function item(parent, html, o = {}) {
  const w = el('div', 'w ' + (o.cls || ''), null, parent, o.style || '');
  const i = el('div', 'in ' + (o.icls || ''), html, w, o.istyle || '');
  A(i, ENTRY[o.type || 'up'], o.t, o.d || .6, o.ease || EO);
  if (o.out != null) A(w, EXIT[o.outType || 'fade'], o.out, o.od || .35, EIO, 'forwards');
  if (o.sfx) sfx(o.t, o.sfx);
  return i;
}
// kinetic words: list of [text, t, cls]
function words(parent, list, o = {}) {
  const line = el('div', 'kline ' + (o.cls || ''), null, parent, o.style || '');
  list.forEach(([tx, t, c]) => {
    const s = el('span', 'kw ' + (c || ''), tx, line);
    A(s, [{ opacity: 0, transform: 'translateY(34px)', filter: 'blur(10px)' }, { opacity: 1, transform: 'none', filter: 'blur(0px)' }], t, o.d || .42);
    if (c && /hl/.test(c)) A(s, [{ transform: 'scale(1)' }, { transform: 'scale(1.12)' }, { transform: 'scale(1)' }], t + .05, .5, EIO, 'none');
  });
  if (o.out != null) A(line, EXIT[o.outType || 'fade'], o.out, .35, EIO, 'forwards');
  return line;
}
function scene(t0, t1, o = {}) {
  const s = el('div', 'scene', null, ROOT);
  A(s, [{ opacity: 0 }, { opacity: 1 }], t0, .01);
  if (t1 != null) A(s, EXIT[o.outType || 'fade'], t1 - .32, .32, EIO, 'forwards');
  SCENES.push({ s, t0, t1: t1 == null ? 1e9 : t1 });
  if (o.whoosh !== false) sfx(Math.max(0, t0 - .12), 'whoosh');
  if (o.cap === false) CAPOFF.push([t0, t1]);
  if (o.push) A(s, [{ transform: 'scale(1)' }, { transform: 'scale(' + (o.push === true ? 1.04 : o.push) + ')' }], t0, (t1 == null ? 3 : t1 - t0), 'linear');
  return s;
}
// text counter
function counter(node, from, to, t, d, fmt) {
  HOOKS.push(tt => {
    let p = Math.min(1, Math.max(0, (tt - t) / d));
    p = 1 - Math.pow(1 - p, 3);
    node.textContent = fmt(Math.round(from + (to - from) * p));
  });
}
// typewriter
function typer(node, text, t, cps, caret = true) {
  const chars = Array.from(text);
  HOOKS.push(tt => {
    const n = Math.max(0, Math.min(chars.length, Math.floor((tt - t) * cps)));
    const blink = caret && (Math.floor(tt * 2.2) % 2 === 0 || n < chars.length);
    node.innerHTML = chars.slice(0, n).join('').replace(/\n/g, '<br>') + (caret && tt >= t - .3 ? `<span class="caret" style="opacity:${blink ? 1 : 0}">|</span>` : '');
  });
  // type tick sfx
  for (let k = 0; k < chars.length; k += 3) sfx(t + k / cps, 'type');
}
// mouse cursor path: pts [[t,x,y]], clicks [t]
function cursor(parent, pts, clicks = []) {
  const c = el('div', 'cursor', CURSOR_SVG, parent);
  HOOKS.push(tt => {
    if (tt < pts[0][0] - .25 || tt > pts[pts.length - 1][0] + 1.2) { c.style.opacity = 0; return; }
    let x = pts[0][1], y = pts[0][2];
    for (let i = 0; i < pts.length - 1; i++) {
      const [ta, xa, ya] = pts[i], [tb, xb, yb] = pts[i + 1];
      if (tt >= ta && tt <= tb) { let p = (tt - ta) / (tb - ta); p = p < .5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2; x = xa + (xb - xa) * p; y = ya + (yb - ya) * p; }
      if (tt > tb) { x = xb; y = yb; }
    }
    let sc = 1;
    clicks.forEach(ct => { const d = tt - ct; if (d >= 0 && d < .25) sc = 1 - .22 * Math.sin(d / .25 * Math.PI); });
    c.style.opacity = Math.min(1, (tt - pts[0][0] + .25) / .25);
    c.style.transform = `translate(${x}px,${y}px) scale(${sc})`;
  });
  clicks.forEach(t => sfx(t, 'click'));
  return c;
}
const CURSOR_SVG = `<svg width="64" height="64" viewBox="0 0 24 24"><path d="M4 2.5 L4 19 L8.6 14.8 L11.6 21.4 L14.6 20 L11.7 13.6 L18 13.4 Z" fill="#111" stroke="#fff" stroke-width="1.4" stroke-linejoin="round"/></svg>`;

window.seek = t => {
  SCENES.forEach(({ s, t0, t1 }) => { s.style.display = (t >= t0 - .02 && t <= t1 + .02) ? '' : 'none'; });
  document.getAnimations().forEach(a => { a.pause(); a.currentTime = t * 1000; });
  HOOKS.forEach(h => h(t));
};
