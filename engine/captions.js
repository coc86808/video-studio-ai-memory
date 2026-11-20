// Captions: shown from words.js (word timestamps). Configure per project in scenes.js BEFORE this file loads:
// window.CAPTION = { maxWords: 3, highlight: ['RECEIPTS','40'], danger: ['SCAM'], success: [], info: ['WATER'], hide: [[29.4, 30.4]], off: false }
// - Scenes created with scene(t0, t1, {cap:false}) also hide captions.  - Vertical videos: 2–3 words; horizontal: up to 6.
(function () {
  const C = Object.assign({ maxWords: document.body.classList.contains('vertical') ? 3 : 6, highlight: [], danger: [], success: [], info: [], hide: [], off: false }, window.CAPTION || {});
  const CAP = el('div', '', '', STAGE); CAP.id = 'cap';
  if (C.off || typeof WORDS === 'undefined') { window.ready = true; return; }
  const norm = s => s.toLowerCase().replace(/[.,!?;:"“”'’।]+$/g, '').replace(/^["“'‘]+/, '');
  const set = k => new Set((C[k] || []).map(norm));
  const S = { highlight: set('highlight'), danger: set('danger'), success: set('success'), info: set('info') };
  const colour = w => { const n = norm(w); for (const k of ['danger', 'highlight', 'success', 'info']) if (S[k].has(n)) return `var(--${k})`; return ''; };
  const CH = []; let cur = [];
  WORDS.forEach((w, i) => {
    cur.push(w); const nx = WORDS[i + 1];
    if (/[.,!?।]$/.test(w[0]) || cur.length >= C.maxWords || (nx && nx[1] - w[2] > .45)) { CH.push(cur); cur = []; }
  });
  if (cur.length) CH.push(cur);
  HOOKS.push(t => {
    if (CAPOFF.some(([a, b]) => t >= a && t < b) || C.hide.some(([a, b]) => t >= a && t < b)) { CAP.innerHTML = ''; return; }
    let ch = null;
    for (let i = 0; i < CH.length; i++) {
      const a = CH[i][0][1], nx = i + 1 < CH.length ? CH[i + 1][0][1] : 1e9, e = CH[i][CH[i].length - 1][2] + .4;
      if (t >= a - .03 && t < Math.min(nx, e)) { ch = CH[i]; break; }
    }
    if (!ch) { CAP.innerHTML = ''; return; }
    CAP.innerHTML = '<div>' + ch.map(w => {
      if (t < w[1] - .03) return '';
      const d = t - w[1], sc = d < .1 ? 1.2 - 2 * d : 1, col = colour(w[0]);
      const isActive = (t >= w[1] - 0.03 && t <= w[2] + 0.05);
      const cls = isActive ? 'kw-active' : 'kw-word';
      return `<span class="${cls}" style="${col ? 'color:' + col + ';' : ''}transform:scale(${sc.toFixed(3)})">${w[0]}</span>`;
    }).join('') + '</div>';
  });
  window.SFX = SFX;
  window.ready = true;
})();
