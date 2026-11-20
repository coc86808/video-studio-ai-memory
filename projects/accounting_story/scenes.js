// scenes.js — "খাতার এক রাত" (International Accounting Day Explainer)
// Style: Type 4 AI Open Studio Motion Explainer matching ref_video.mp4 (9:16 Vertical, Slate #0C1014, Glowing Gold #E5B842)

window.CAPTION = {
  maxWords: 3,
  highlight: ['১০', 'নভেম্বর', 'হিসাবের', 'ডাবল-এন্ট্রি', 'লাভ', 'আন্তর্জাতিক', 'ধন্যবাদ', '১৪৯৪', 'লুকা', 'পাচিওলি'],
  danger: ['না', 'মেলে'],
  success: ['ঠিক', 'পরিষ্কার', 'গুছিয়ে', 'সাহসী'],
  info: ['নুসরাত', 'রহিম', 'ভেনিসে', 'দোকান']
};

// Global Background Animation
A(document.getElementById('bg'), [
  { transform: 'rotate(-8deg) translate(0,0)' },
  { transform: 'rotate(-8deg) translate(-250px,-180px)' }
], 0, 63, 'linear');

// Helper SVG: Stickman Actor
function stickActor(pose = 'stand', w = 180, h = 260, col = '#FFFFFF', glow = '#E5B842') {
  let body = '';
  if (pose === 'stand') {
    body = `
      <circle cx="90" cy="40" r="24" fill="${col}" filter="drop-shadow(0 0 12px ${glow})"/>
      <line x1="90" y1="64" x2="90" y2="155" stroke="${col}" stroke-width="8" stroke-linecap="round"/>
      <line x1="90" y1="90" x2="50" y2="135" stroke="${col}" stroke-width="7" stroke-linecap="round"/>
      <line x1="90" y1="90" x2="130" y2="135" stroke="${col}" stroke-width="7" stroke-linecap="round"/>
      <line x1="90" y1="155" x2="65" y2="235" stroke="${col}" stroke-width="8" stroke-linecap="round"/>
      <line x1="90" y1="155" x2="115" y2="235" stroke="${col}" stroke-width="8" stroke-linecap="round"/>
    `;
  } else if (pose === 'briefcase') {
    body = `
      <circle cx="90" cy="40" r="24" fill="${col}" filter="drop-shadow(0 0 14px ${glow})"/>
      <line x1="90" y1="64" x2="90" y2="155" stroke="${col}" stroke-width="8" stroke-linecap="round"/>
      <line x1="90" y1="90" x2="45" y2="120" stroke="${col}" stroke-width="7" stroke-linecap="round"/>
      <line x1="90" y1="90" x2="135" y2="125" stroke="${col}" stroke-width="7" stroke-linecap="round"/>
      <!-- Glowing Briefcase -->
      <g transform="translate(125, 120)">
        <rect x="0" y="5" width="46" height="34" rx="6" fill="${glow}" filter="drop-shadow(0 0 18px ${glow})"/>
        <path d="M14 5V1a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v4" fill="none" stroke="${glow}" stroke-width="3"/>
        <line x1="0" y1="20" x2="46" y2="20" stroke="#1A1300" stroke-width="2"/>
        <text x="23" y="24" fill="#1A1300" font-size="10" font-weight="900" text-anchor="middle">SKILL</text>
      </g>
      <line x1="90" y1="155" x2="68" y2="235" stroke="${col}" stroke-width="8" stroke-linecap="round"/>
      <line x1="90" y1="155" x2="112" y2="235" stroke="${col}" stroke-width="8" stroke-linecap="round"/>
    `;
  } else if (pose === 'thinking') {
    body = `
      <circle cx="90" cy="40" r="24" fill="${col}" filter="drop-shadow(0 0 10px ${glow})"/>
      <line x1="90" y1="64" x2="90" y2="155" stroke="${col}" stroke-width="8" stroke-linecap="round"/>
      <!-- hand to chin -->
      <path d="M90 92 L60 120 L75 58" fill="none" stroke="${col}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
      <line x1="90" y1="92" x2="125" y2="140" stroke="${col}" stroke-width="7" stroke-linecap="round"/>
      <line x1="90" y1="155" x2="65" y2="235" stroke="${col}" stroke-width="8" stroke-linecap="round"/>
      <line x1="90" y1="155" x2="115" y2="235" stroke="${col}" stroke-width="8" stroke-linecap="round"/>
    `;
  } else if (pose === 'celebrate') {
    body = `
      <circle cx="90" cy="42" r="24" fill="${col}" filter="drop-shadow(0 0 16px ${glow})"/>
      <line x1="90" y1="66" x2="90" y2="155" stroke="${col}" stroke-width="8" stroke-linecap="round"/>
      <!-- hands in air -->
      <line x1="90" y1="90" x2="40" y2="40" stroke="${col}" stroke-width="8" stroke-linecap="round"/>
      <line x1="90" y1="90" x2="140" y2="40" stroke="${col}" stroke-width="8" stroke-linecap="round"/>
      <line x1="90" y1="155" x2="60" y2="235" stroke="${col}" stroke-width="8" stroke-linecap="round"/>
      <line x1="90" y1="155" x2="120" y2="235" stroke="${col}" stroke-width="8" stroke-linecap="round"/>
    `;
  }
  return `<svg width="${w}" height="${h}" viewBox="0 0 180 260" fill="none" xmlns="http://www.w3.org/2000/svg">${body}</svg>`;
}

// Stage environment elements
function addStageLighting(parent) {
  el('div', 'spotlight-beam', null, parent);
  el('div', 'stage-floor', null, parent);
  el('div', 'stage-reflection', null, parent);
}

let s, c, r, box, x;

// ==============================================================
// SCENE 1: HOOK (0.00s -> 5.50s)
// "১০ নভেম্বর। হিসাবের খাতা খুললে একটা গল্প বেরিয়ে আসে।"
// ==============================================================
s = scene(0, 5.50, { cap: true, whoosh: false, push: 1.05 });
addStageLighting(s);
c = el('div', 'center', null, s, 'gap:45px;justify-content:center');

// Top Category Pill
item(c, `<span class="pill badge-gold">আন্তর্জাতিক হিসাববিজ্ঞান দিবস</span>`, { t: 0.1, type: 'down', sfx: 'tick' });

// Date Display / Calendar Card
x = item(c, `
  <div class="card card-3d glow-gold" style="width:580px;padding:36px;text-align:center;position:relative">
    <div style="font-size:38px;color:var(--muted);letter-spacing:4px">NOVEMBER</div>
    <div style="font-size:160px;font-weight:900;color:var(--highlight);line-height:1;margin:10px 0;text-shadow:0 0 35px rgba(229,184,66,0.6)">১০</div>
    <div style="font-size:36px;color:#fff;border-top:2px solid rgba(229,184,66,0.3);padding-top:14px">হিসাবের দিন</div>
  </div>
`, { t: 0.3, type: 'zoom', d: 0.7, sfx: 'pop', out: 3.2 });
punch(0.3);

// Spoken words
words(c, [['১০', 0.0, 'highlight hl'], ['নভেম্বর।', 0.22, 'highlight']], { cls: 'h1', out: 3.2 });

// 3D Antique Ledger Unfolding
const ledgerBox = item(c, `
  <div class="card card-3d glow-gold" style="width:720px;padding:45px;display:flex;align-items:center;gap:35px;border-radius:32px">
    <div style="width:140px;height:140px;border-radius:24px;background:rgba(229,184,66,0.15);display:flex;align-items:center;justify-content:center">
      <svg width="85" height="85" viewBox="0 0 24 24" fill="none" stroke="var(--highlight)" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/><line x1="8" y1="7" x2="16" y2="7"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
    </div>
    <div style="text-align:left">
      <div style="font-size:52px;font-weight:800;color:#fff">হিসাবের খাতা</div>
      <div style="font-size:32px;color:var(--highlight);margin-top:6px">একটি অজানা রূপকথা</div>
    </div>
  </div>
`, { t: 1.6, type: 'rise', d: 0.6, sfx: 'whoosh' });
punch(1.8);

// ==============================================================
// SCENE 2: RAHIM'S SHOP & THE PROBLEM (5.50s -> 14.50s)
// "রহিমের ছোট দোকান। বিক্রি হয়, টাকা আসে, টাকা যায়। কিন্তু মাস শেষে হিসাব মেলে না।"
// ==============================================================
s = scene(5.50, 14.50, { cap: true, push: 1.04 });
addStageLighting(s);
c = el('div', 'center', null, s, 'gap:32px;justify-content:center');

// Store Sign Header
item(c, `
  <div class="card card-3d" style="padding:16px 42px;border-radius:999px;display:flex;align-items:center;gap:18px">
    <span style="width:18px;height:18px;border-radius:50%;background:var(--highlight);box-shadow:0 0 15px var(--highlight)"></span>
    <span style="font-size:38px;color:#fff;letter-spacing:2px">রহিম স্টোর (RAHIM STORE)</span>
  </div>
`, { t: 5.7, type: 'down', sfx: 'tick' });

// Rahim Character at work
const actorBox = el('div', 'row', null, c, 'gap:40px;align-items:flex-end;margin-top:10px');
item(actorBox, stickActor('thinking', 190, 270, '#FFFFFF', '#E5B842'), { t: 5.9, type: 'rise', d: 0.5 });

// Shop desk with clutter
item(actorBox, `
  <div class="card card-3d" style="width:480px;padding:32px;text-align:left">
    <div style="font-size:34px;color:var(--muted)">দৈনিক হিসাবের খাতা</div>
    <div style="font-size:46px;color:#fff;font-weight:800;margin:10px 0">টাকা আসে ও যায়</div>
    <div style="display:flex;gap:16px;margin-top:14px">
      <span class="pill success" style="font-size:26px;padding:6px 18px">+৳ বিক্রি</span>
      <span class="pill danger" style="font-size:26px;padding:6px 18px">-৳ খরচ</span>
    </div>
  </div>
`, { t: 6.2, type: 'pop', d: 0.5, sfx: 'pop' });

// Cash flow transactions floating
const flowRow = el('div', 'row', null, c, 'gap:24px');
item(flowRow, `<div class="card card-3d glow-gold" style="padding:14px 28px;font-size:38px;color:var(--success);font-weight:800">+৳৫,০০০ বিক্রি</div>`, { t: 7.8, type: 'left', sfx: 'pop' });
item(flowRow, `<div class="card card-3d" style="padding:14px 28px;font-size:38px;color:var(--danger);font-weight:800">-৳৩,২০০ খরচ</div>`, { t: 9.8, type: 'right', sfx: 'pop' });

// Problem Alert: "হিসাব মেলে না"
const alertBox = el('div', 'w', null, c);
item(alertBox, `
  <div class="card card-3d" style="border:3px solid var(--danger);background:rgba(40,15,18,0.95);padding:36px 60px;text-align:center;box-shadow:0 0 60px rgba(255,69,58,0.4)">
    <div style="font-size:42px;color:var(--danger);letter-spacing:3px;font-weight:800">মাস শেষে গোলকধাঁধা!</div>
    <div class="h1 text-gold" style="color:var(--danger);margin:8px 0;font-size:98px">হিসাব মেলে না! ✕</div>
    <div style="font-size:32px;color:var(--muted)">আয়-ব্যয়ের অমিল</div>
  </div>
`, { t: 11.2, type: 'zoom', d: 0.6, sfx: 'thud' });
punch(11.4, 0.1);
shake(13.2, 16);
sfx(13.2, 'boom');

// ==============================================================
// SCENE 3: NUSRAT ARRIVES (14.50s -> 20.80s)
// "একদিন এলো নুসরাত, একজন হিসাবরক্ষক। সে বলল, চলুন, হিসাবটা গুছিয়ে নিই।"
// ==============================================================
s = scene(14.50, 20.80, { cap: true, push: 1.04 });
addStageLighting(s);
c = el('div', 'center', null, s, 'gap:38px;justify-content:center');

// Top Badge
item(c, `<span class="pill badge-gold">সমাধানের প্রবেশ</span>`, { t: 14.6, type: 'down', sfx: 'tick' });

// Nusrat with Glowing Briefcase
const nusratRow = el('div', 'row', null, c, 'gap:40px;align-items:center');
item(nusratRow, stickActor('briefcase', 210, 290, '#FFFFFF', '#E5B842'), { t: 14.8, type: 'rise', d: 0.6, sfx: 'pop' });

// Nusrat Identity Plate
item(nusratRow, `
  <div class="card card-3d glow-gold" style="width:480px;padding:36px;text-align:left">
    <div style="display:flex;align-items:center;gap:16px;margin-bottom:8px">
      <span class="pill info" style="font-size:24px">প্রফেশনাল</span>
      <span style="font-size:28px;color:var(--highlight)">সার্টিফাইড</span>
    </div>
    <div style="font-size:62px;font-weight:900;color:#fff;line-height:1.1">নুসরাত</div>
    <div style="font-size:34px;color:var(--highlight);margin-top:6px">পেশাদার হিসাবরক্ষক</div>
  </div>
`, { t: 15.2, type: 'left', d: 0.5 });
punch(15.4);

// Speech Quote Card
item(c, `
  <div class="card card-3d glow-gold" style="width:780px;padding:42px;text-align:center;border-left:8px solid var(--highlight)">
    <div style="font-size:32px;color:var(--muted);text-transform:uppercase;margin-bottom:12px">পরামর্শ</div>
    <div class="h2" style="font-size:68px;line-height:1.2;color:#fff">
      “চলুন, হিসাবটা <span class="text-gold">গুছিয়ে</span> নিই!”
    </div>
  </div>
`, { t: 17.6, type: 'up', d: 0.6, sfx: 'ding' });
punch(18.2);

// ==============================================================
// SCENE 4: 1494 & LUCA PACIOLI (20.80s -> 31.40s)
// "এই নিয়মের শুরু অনেক আগে। ১৪৯৪ সালে ইতালির ভেনিসে লুকা পাচিওলি একটি বই প্রকাশ করেন, যেখানে ডাবল-এন্ট্রি বুককিপিংয়ের কথা ছিল।"
// ==============================================================
s = scene(20.80, 31.40, { cap: true, push: 1.05 });
addStageLighting(s);
c = el('div', 'center', null, s, 'gap:34px;justify-content:center');

// Historical Rewind Odometer Card
const odoCard = item(c, `
  <div class="card card-3d glow-gold" style="width:680px;padding:34px;text-align:center">
    <div style="font-size:32px;color:var(--muted);letter-spacing:3px">টাইম ট্রাভেল — ইতিহাস</div>
    <div id="yr_counter" style="font-size:150px;font-weight:900;color:var(--highlight);line-height:1.05;margin:10px 0;text-shadow:0 0 35px rgba(229,184,66,0.6)">2026</div>
    <div style="font-size:36px;color:#fff">ভেনিস, ইতালি</div>
  </div>
`, { t: 20.9, type: 'zoom', d: 0.6, sfx: 'whoosh' });
punch(21.1);

// Animate Year Counter from 2026 to 1494
const yrNode = odoCard.querySelector('#yr_counter');
counter(yrNode, 2026, 1494, 21.0, 1.8, v => v + ' সাল');
punch(22.9, 0.1);
shake(22.9, 12);
sfx(22.9, 'thud');

// Historical Discovery Card: Luca Pacioli
item(c, `
  <div class="card card-3d" style="width:780px;padding:36px;display:flex;align-items:center;gap:30px">
    <div style="width:150px;height:150px;border-radius:24px;background:rgba(229,184,66,0.15);border:2px solid var(--highlight);display:flex;align-items:center;justify-content:center">
      <svg width="90" height="90" viewBox="0 0 24 24" fill="none" stroke="var(--highlight)" stroke-width="1.8"><circle cx="12" cy="7" r="4"/><path d="M5.5 21v-2a6.5 6.5 0 0 1 13 0v2"/><path d="M12 11v4M10 13h4"/></svg>
    </div>
    <div style="text-align:left">
      <div style="font-size:30px;color:var(--highlight)">হিসাববিজ্ঞানের জনক</div>
      <div style="font-size:56px;font-weight:900;color:#fff">লুকা পাচিওলি</div>
      <div style="font-size:28px;color:var(--muted);margin-top:4px">ভেনিস, ইতালি (১৪৯৪)</div>
    </div>
  </div>
`, { t: 24.2, type: 'rise', d: 0.6, sfx: 'pop' });

// Book & Double-Entry Concept
item(c, `
  <div class="card card-3d glow-gold" style="width:780px;padding:32px;text-align:center">
    <div class="pill badge-gold" style="font-size:28px;margin-bottom:12px">যুগান্তকারী প্রকাশনা</div>
    <div style="font-size:48px;font-weight:800;color:#fff">“সুম্মা ডি এরিথমেটিকা”</div>
    <div class="text-gold" style="font-size:42px;font-weight:900;margin-top:8px">ডাবল-এন্ট্রি বুককিপিং</div>
  </div>
`, { t: 26.5, type: 'up', d: 0.6, sfx: 'ding' });
punch(28.2);

// ==============================================================
// SCENE 5: 3D BALANCE SCALE (31.40s -> 38.50s)
// "প্রতিটি লেনদেনের দুটি দিক। একদিকে আসে, অন্যদিকে যায়। দুই দিক মিললেই হিসাব ঠিক।"
// ==============================================================
s = scene(31.40, 38.50, { cap: true, push: 1.04 });
addStageLighting(s);
c = el('div', 'center', null, s, 'gap:32px;justify-content:center');

// Top Principle Badge
item(c, `<span class="pill badge-gold">দুতরফা দাখিলা পদ্ধতি</span>`, { t: 31.5, type: 'down', sfx: 'tick' });

// Animated Balance Scale SVG
const scaleSvg = `
  <div class="card card-3d glow-gold" style="width:800px;padding:45px 30px;text-align:center;position:relative">
    <svg width="680" height="340" viewBox="0 0 680 340" fill="none">
      <!-- Base & Stand -->
      <path d="M340 50 L340 310" stroke="var(--highlight)" stroke-width="10" stroke-linecap="round"/>
      <path d="M260 310 L420 310" stroke="var(--highlight)" stroke-width="14" stroke-linecap="round"/>
      <circle cx="340" cy="50" r="16" fill="var(--highlight)" filter="drop-shadow(0 0 15px var(--highlight))"/>
      
      <!-- Balance Beam (animated via id) -->
      <g id="scale_beam" transform="rotate(-6 340 50)">
        <line x1="80" y1="50" x2="600" y2="50" stroke="#FFFFFF" stroke-width="8" stroke-linecap="round"/>
        <!-- Left Pan (Debit) -->
        <line x1="120" y1="50" x2="80" y2="160" stroke="rgba(255,255,255,0.6)" stroke-width="3"/>
        <line x1="120" y1="50" x2="160" y2="160" stroke="rgba(255,255,255,0.6)" stroke-width="3"/>
        <path d="M70 160 Q120 190 170 160 Z" fill="var(--success)" opacity="0.85"/>
        
        <!-- Right Pan (Credit) -->
        <line x1="560" y1="50" x2="520" y2="160" stroke="rgba(255,255,255,0.6)" stroke-width="3"/>
        <line x1="560" y1="50" x2="600" y2="160" stroke="rgba(255,255,255,0.6)" stroke-width="3"/>
        <path d="M510 160 Q560 190 610 160 Z" fill="var(--highlight)" opacity="0.85"/>
      </g>
    </svg>
    <div style="display:flex;justify-content:space-around;margin-top:10px">
      <div style="font-size:42px;font-weight:900;color:var(--success)">ডেবিট (আসে)</div>
      <div style="font-size:42px;font-weight:900;color:var(--highlight)">ক্রেডিট (যায়)</div>
    </div>
  </div>
`;
x = item(c, scaleSvg, { t: 31.8, type: 'zoom', d: 0.7, sfx: 'whoosh' });
const beam = x.querySelector('#scale_beam');

// Animate beam to level zero when "দুই দিক মিললেই হিসাব ঠিক"
if (beam) {
  A(beam, [
    { transform: 'rotate(-7deg)', transformOrigin: '340px 50px' },
    { transform: 'rotate(7deg)', transformOrigin: '340px 50px', offset: 0.4 },
    { transform: 'rotate(0deg)', transformOrigin: '340px 50px' }
  ], 33.5, 3.2, EIO);
}

// Success Equilibrium Stamp
item(c, `
  <div class="card card-3d" style="border:3px solid var(--success);padding:18px 48px;border-radius:999px;display:flex;align-items:center;gap:20px;box-shadow:0 0 45px rgba(50,215,75,0.4)">
    <div style="width:48px;height:48px">${ICON.check('var(--success)')}</div>
    <div style="font-size:48px;font-weight:900;color:var(--success)">ডেবিট = ক্রেডিট — হিসাব ঠিক!</div>
  </div>
`, { t: 36.8, type: 'pop', d: 0.5, sfx: 'ding' });
punch(37.0);

// ==============================================================
// SCENE 6: SORTED LEDGER (38.50s -> 44.00s)
// "নুসরাত খাতা সাজাল। কোথায় টাকা আসে, কোথায় যায়, সব পরিষ্কার হয়ে গেল।"
// ==============================================================
s = scene(38.50, 44.00, { cap: true, push: 1.04 });
addStageLighting(s);
c = el('div', 'center', null, s, 'gap:28px;justify-content:center');

// Ledger Table Container
item(c, `
  <div class="card card-3d glow-gold" style="width:820px;padding:38px 45px;text-align:left">
    <div style="display:flex;justify-content:space-between;align-items:center;border-bottom:2px solid rgba(229,184,66,0.3);padding-bottom:18px;margin-bottom:20px">
      <div>
        <div style="font-size:44px;font-weight:900;color:#fff">সুশৃঙ্খল খাতা</div>
        <div style="font-size:28px;color:var(--highlight)">নুসরাতের অডিট সমাপ্ত</div>
      </div>
      <span class="pill success" style="font-size:26px">১০০% নির্ভুল</span>
    </div>

    <!-- Rows of clean accounting -->
    <div style="display:flex;flex-direction:column;gap:16px">
      <div style="display:flex;justify-content:space-between;padding:16px 20px;background:rgba(255,255,255,0.05);border-radius:16px">
        <span style="font-size:36px;color:#fff">পণ্য বিক্রি (নগদ)</span>
        <span style="font-size:36px;color:var(--success);font-weight:800">+ ৳৪৫,০০০</span>
      </div>
      <div style="display:flex;justify-content:space-between;padding:16px 20px;background:rgba(255,255,255,0.05);border-radius:16px">
        <span style="font-size:36px;color:#fff">দোকান ভাড়া</span>
        <span style="font-size:36px;color:var(--muted);font-weight:800">- ৳৮,০০০</span>
      </div>
      <div style="display:flex;justify-content:space-between;padding:16px 20px;background:rgba(255,255,255,0.05);border-radius:16px">
        <span style="font-size:36px;color:#fff">নতুন স্টক ক্রয়</span>
        <span style="font-size:36px;color:var(--muted);font-weight:800">- ৳১৫,০০০</span>
      </div>
    </div>

    <div style="margin-top:24px;border-top:2px dashed rgba(255,255,255,0.2);padding-top:16px;display:flex;justify-content:space-between;align-items:center">
      <span style="font-size:34px;color:var(--highlight)">সব লেনদেন:</span>
      <span style="font-size:42px;font-weight:900;color:var(--success)">পরিষ্কার ও স্বচ্ছ ✔</span>
    </div>
  </div>
`, { t: 38.8, type: 'rise', d: 0.6, sfx: 'whoosh' });
punch(42.2);

// ==============================================================
// SCENE 7: RAHIM'S PROFIT & DECISION (44.00s -> 50.20s)
// "মাস শেষে রহিম প্রথমবার জানল, লাভ কত। আর সেই জানা থেকেই এলো সাহসী সিদ্ধান্ত।"
// ==============================================================
s = scene(44.00, 50.20, { cap: true, push: 1.05 });
addStageLighting(s);
c = el('div', 'center', null, s, 'gap:32px;justify-content:center');

// Celebration character
r = el('div', 'row', null, c, 'gap:30px;align-items:center');
item(r, stickActor('celebrate', 190, 270, '#FFFFFF', '#E5B842'), { t: 44.2, type: 'pop', d: 0.5, sfx: 'pop' });

// Dynamic Profit Card with Counter
const profitCard = item(r, `
  <div class="card card-3d glow-gold" style="width:540px;padding:36px;text-align:left">
    <div style="font-size:32px;color:var(--muted)">মাসের প্রকৃত নিট লাভ</div>
    <div id="profit_num" class="text-gold" style="font-size:92px;font-weight:900;line-height:1.1;margin:10px 0">৳০</div>
    <div style="display:flex;align-items:center;gap:12px">
      <span class="pill success" style="font-size:26px">↑ +৪০% প্রবৃদ্ধি</span>
      <span style="font-size:26px;color:#fff">রেকর্ড সাফল্য</span>
    </div>
  </div>
`, { t: 44.4, type: 'rise', d: 0.5 });

const profitNum = profitCard.querySelector('#profit_num');
counter(profitNum, 0, 78500, 44.8, 1.6, v => '৳' + v.toLocaleString());
punch(46.4, 0.08);

// Confident Business Decision Banner
item(c, `
  <div class="card card-3d glow-gold" style="width:780px;padding:36px;text-align:center;border:2px solid var(--highlight)">
    <div style="font-size:30px;color:var(--highlight);letter-spacing:3px">ব্যবসায়ের রূপান্তর</div>
    <div class="h2 text-gold" style="font-size:64px;margin-top:6px">“সাহসী ও সঠিক সিদ্ধান্ত!”</div>
  </div>
`, { t: 47.8, type: 'up', d: 0.6, sfx: 'ding' });
punch(48.8);

// ==============================================================
// SCENE 8: ACCOUNTANTS EVERYWHERE (50.20s -> 56.60s)
// "দোকান, স্কুল, হাসপাতাল, প্রতিষ্ঠান: সবখানে হিসাবের পেছনে আছেন একজন হিসাবরক্ষক।"
// ==============================================================
s = scene(50.20, 56.60, { cap: true, push: 1.04 });
addStageLighting(s);
c = el('div', 'center', null, s, 'gap:30px;justify-content:center');

// 4 Hub Sectors in 2x2 Grid
const gridBox = el('div', '', null, c, 'display:grid;grid-template-columns:1fr 1fr;gap:24px;width:820px');

item(gridBox, `
  <div class="card card-3d" style="padding:26px;text-align:center">
    <div style="font-size:48px">🏬</div>
    <div style="font-size:38px;font-weight:800;color:#fff;margin-top:8px">দোকান</div>
  </div>
`, { t: 50.4, type: 'pop', sfx: 'pop' });

item(gridBox, `
  <div class="card card-3d" style="padding:26px;text-align:center">
    <div style="font-size:48px">🏫</div>
    <div style="font-size:38px;font-weight:800;color:#fff;margin-top:8px">স্কুল</div>
  </div>
`, { t: 50.8, type: 'pop', sfx: 'pop' });

item(gridBox, `
  <div class="card card-3d" style="padding:26px;text-align:center">
    <div style="font-size:48px">🏥</div>
    <div style="font-size:38px;font-weight:800;color:#fff;margin-top:8px">হাসপাতাল</div>
  </div>
`, { t: 51.3, type: 'pop', sfx: 'pop' });

item(gridBox, `
  <div class="card card-3d" style="padding:26px;text-align:center">
    <div style="font-size:48px">🏢</div>
    <div style="font-size:38px;font-weight:800;color:#fff;margin-top:8px">প্রতিষ্ঠান</div>
  </div>
`, { t: 52.0, type: 'pop', sfx: 'pop' });

// Central Pillar: The Accountant
item(c, `
  <div class="card card-3d glow-gold" style="width:820px;padding:36px;text-align:center;border:3px solid var(--highlight)">
    <div class="pill badge-gold" style="font-size:28px;margin-bottom:8px">অদৃশ্য চালিকাশক্তি</div>
    <div style="font-size:62px;font-weight:900;color:#fff">পেছনে একজন হিসাবরক্ষক</div>
    <div style="font-size:30px;color:var(--muted);margin-top:6px">অর্থনীতির আসল কারিগর</div>
  </div>
`, { t: 53.6, type: 'rise', d: 0.6, sfx: 'boom' });
punch(55.2);

// ==============================================================
// SCENE 9: INTERNATIONAL ACCOUNTING DAY FINALE (56.60s -> 62.75s)
// "আজ আন্তর্জাতিক হিসাব দিবস। আপনার পাশের হিসাবরক্ষককে একটা ধন্যবাদ জানান।"
// ==============================================================
s = scene(56.60, 62.75, { cap: true, push: 1.05 });
addStageLighting(s);
c = el('div', 'center', null, s, 'gap:32px;justify-content:center');

// Grand Date Pill
item(c, `<span class="pill badge-gold" style="font-size:32px;padding:12px 36px">১০ নভেম্বর ২০২৬</span>`, { t: 56.8, type: 'down', sfx: 'tick' });

// Main Festive Title Card
item(c, `
  <div class="card card-3d glow-gold" style="width:820px;padding:48px 36px;text-align:center">
    <div style="font-size:38px;color:var(--muted);letter-spacing:3px">শুভ</div>
    <div class="h1 text-gold" style="font-size:82px;line-height:1.15;margin:12px 0">
      আন্তর্জাতিক<br>হিসাববিজ্ঞান দিবস
    </div>
    <div style="font-size:32px;color:rgba(255,255,255,0.7);letter-spacing:1px">International Accounting Day</div>
  </div>
`, { t: 57.2, type: 'zoom', d: 0.7, sfx: 'ding' });
punch(58.0);

// Gratitude Call to Action
item(c, `
  <div class="card card-3d" style="width:820px;padding:36px;text-align:center;background:rgba(229,184,66,0.12);border:2px solid var(--highlight)">
    <div style="font-size:46px;font-weight:900;color:#fff">
      “আপনার পাশের হিসাবরক্ষককে<br><span class="text-gold">ধন্যবাদ</span> জানান!” 👏
    </div>
  </div>
`, { t: 59.8, type: 'up', d: 0.6, sfx: 'pop' });
punch(61.3);
