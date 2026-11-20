// DEMO — replace with the real video's scenes. Every time comes from words.js (python tools/words_to_js.py ...).
window.CAPTION = { highlight: ['studio', 'স্টুডিও'], success: ['ready.', 'রেডি।'] };
A(document.getElementById('bg'), [{ transform: 'rotate(-8deg)' }, { transform: 'rotate(-8deg) translate(-300px,-150px)' }], 0, 60, 'linear');
let s, c;

s = scene(-0.05, 3.0, { cap: false, whoosh: false, push: true });
c = el('div', 'center', null, s);
item(c, `<span class="pill accent">DEMO</span>`, { t: 0.2, type: 'down', sfx: 'tick' });
words(c, [['Video', 0.4], ['Studio', 0.8, 'highlight hl'], ['Ready', 1.2, 'success']], { cls: 'h1' });
punch(0.8);

s = scene(3.0, 6.0, { cap: false, push: true });
c = el('div', 'center', null, s, 'gap:40px');
words(c, [['ভিডিও', 3.2], ['স্টুডিও', 3.6, 'highlight hl'], ['রেডি', 4.0, 'success']], { cls: 'h1' });
const r = el('div', 'row', null, c);
item(r, stamp('TEST OK', 'var(--success)', 70, -5), { t: 4.3, type: 'zoom', d: .25, sfx: 'thud' });
const n = item(r, `<span id="cnt" class="h2 info"></span>`, { t: 4.4, type: 'up' });
counter(n.querySelector('#cnt'), 0, 100, 4.4, 1.0, v => v + '%');
shake(4.3);
