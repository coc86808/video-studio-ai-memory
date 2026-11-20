// scenes.js — Episode: The Power of Istighfar (The Miracle of Imam Ahmad and the Baker)
// Style: Type 5 Islamic Reel Studio (Lantern Night / Lamp Ink + Scheherazade Calligraphy)

window.CAPTION = {
  maxWords: 3,
  highlight: ['baker', 'Allah', 'answered', 'prayers', 'wish', 'scholar', 'Ahmad', 'mosque', 'midnight', 'Astaghfirullah', 'repentance', 'weep', 'SubhanAllah', 'dragged', 'doorstep', 'Prophet', 'Istighfar', 'relief', 'distress', 'expects'],
  danger: ['except', 'rain', 'pushed', 'cold', 'die'],
  success: ['answered', 'warm', 'SubhanAllah', 'provides', 'relief', 'prayers'],
  info: ['one', 'centuries', 'hours', 'fruit']
};

// -------------------------------------------------------------
// PERSISTENT STAGE ELEMENTS (#bg)
// -------------------------------------------------------------
const BG = document.getElementById('bg');

// 1. Stars and Night Sky
el('div', 'stage-stars', '', BG);

// 2. Diagonal Gobo Slats
el('div', 'stage-gobo', '', BG);

// 3. Ambient Lantern Beam
el('div', 'stage-lantern-beam', '', BG);

// 4. Ground Line & Floor Perspective Grid
el('div', 'stage-floor', '', BG);
el('div', 'stage-floor-grid', '', BG);

// Helper SVG: Modest Islamic Character (Thobe & Kufi)
function islamicActor(pose = 'stand', w = 220, h = 320, col = '#0e0b12', rimCol = '#ffd255') {
  let body = '';
  if (pose === 'stand') {
    body = `
      <ellipse cx="110" cy="300" rx="55" ry="12" fill="rgba(0,0,0,0.65)"/>
      <circle cx="110" cy="50" r="26" fill="${col}" stroke="${rimCol}" stroke-width="2.5" filter="drop-shadow(0 0 10px ${rimCol})"/>
      <path d="M86 42 Q110 24 134 42 Z" fill="${rimCol}" opacity="0.9"/>
      <path d="M92 78 L70 195 L62 285 L158 285 L150 195 L128 78 Z" fill="${col}" stroke="${rimCol}" stroke-width="2.5"/>
      <path d="M92 82 L55 150 L68 185" fill="none" stroke="${col}" stroke-width="12" stroke-linecap="round"/>
      <path d="M128 82 L165 150 L152 185" fill="none" stroke="${col}" stroke-width="12" stroke-linecap="round"/>
      <path d="M128 78 L150 195 L158 285" fill="none" stroke="${rimCol}" stroke-width="3.5" filter="drop-shadow(0 0 6px ${rimCol})"/>
    `;
  } else if (pose === 'dua') {
    body = `
      <ellipse cx="110" cy="300" rx="55" ry="12" fill="rgba(0,0,0,0.65)"/>
      <circle cx="110" cy="50" r="26" fill="${col}" stroke="${rimCol}" stroke-width="2.5" filter="drop-shadow(0 0 10px ${rimCol})"/>
      <path d="M86 42 Q110 24 134 42 Z" fill="${rimCol}" opacity="0.9"/>
      <path d="M92 78 L70 195 L62 285 L158 285 L150 195 L128 78 Z" fill="${col}" stroke="${rimCol}" stroke-width="2.5"/>
      <path d="M92 85 L80 135 L102 110" fill="none" stroke="${col}" stroke-width="10" stroke-linecap="round"/>
      <path d="M128 85 L140 135 L118 110" fill="none" stroke="${col}" stroke-width="10" stroke-linecap="round"/>
      <circle cx="102" cy="106" r="6" fill="${rimCol}"/>
      <circle cx="118" cy="106" r="6" fill="${rimCol}"/>
      <path d="M128 78 L150 195 L158 285" fill="none" stroke="${rimCol}" stroke-width="3.5" filter="drop-shadow(0 0 6px ${rimCol})"/>
    `;
  } else if (pose === 'knead') {
    body = `
      <ellipse cx="110" cy="300" rx="55" ry="12" fill="rgba(0,0,0,0.65)"/>
      <circle cx="110" cy="58" r="26" fill="${col}" stroke="${rimCol}" stroke-width="2.5" filter="drop-shadow(0 0 10px ${rimCol})"/>
      <path d="M86 50 Q110 32 134 50 Z" fill="${rimCol}" opacity="0.9"/>
      <path d="M94 86 L75 195 L68 285 L156 285 L148 195 L126 86 Z" fill="${col}" stroke="${rimCol}" stroke-width="2.5"/>
      <path d="M94 92 L75 150 L95 185" fill="none" stroke="${col}" stroke-width="11" stroke-linecap="round"/>
      <path d="M126 92 L145 150 L125 185" fill="none" stroke="${col}" stroke-width="11" stroke-linecap="round"/>
      <circle cx="110" cy="190" r="14" fill="#fff" opacity="0.8" filter="drop-shadow(0 0 8px #fff)"/>
      <circle cx="95" cy="180" r="6" fill="#fff" opacity="0.6"/>
      <circle cx="125" cy="180" r="6" fill="#fff" opacity="0.6"/>
      <path d="M126 86 L148 195 L156 285" fill="none" stroke="${rimCol}" stroke-width="3.5" filter="drop-shadow(0 0 6px ${rimCol})"/>
    `;
  } else if (pose === 'traveler') {
    body = `
      <ellipse cx="110" cy="300" rx="55" ry="12" fill="rgba(0,0,0,0.65)"/>
      <circle cx="105" cy="52" r="26" fill="${col}" stroke="${rimCol}" stroke-width="2.5" filter="drop-shadow(0 0 10px ${rimCol})"/>
      <ellipse cx="105" cy="42" rx="28" ry="12" fill="${rimCol}" opacity="0.9"/>
      <path d="M90 80 L70 195 L62 285 L158 285 L148 195 L126 80 Z" fill="${col}" stroke="${rimCol}" stroke-width="2.5"/>
      <line x1="165" y1="40" x2="165" y2="300" stroke="${rimCol}" stroke-width="6" stroke-linecap="round" filter="drop-shadow(0 0 8px ${rimCol})"/>
      <path d="M126 84 L148 135 L165 130" fill="none" stroke="${col}" stroke-width="10" stroke-linecap="round"/>
      <path d="M126 80 L148 195 L158 285" fill="none" stroke="${rimCol}" stroke-width="3.5" filter="drop-shadow(0 0 6px ${rimCol})"/>
    `;
  } else if (pose === 'weep') {
    body = `
      <ellipse cx="110" cy="300" rx="55" ry="12" fill="rgba(0,0,0,0.65)"/>
      <circle cx="110" cy="55" r="26" fill="${col}" stroke="${rimCol}" stroke-width="2.5" filter="drop-shadow(0 0 10px ${rimCol})"/>
      <ellipse cx="110" cy="45" rx="28" ry="12" fill="${rimCol}" opacity="0.9"/>
      <path d="M92 84 L72 195 L64 285 L156 285 L148 195 L128 84 Z" fill="${col}" stroke="${rimCol}" stroke-width="2.5"/>
      <path d="M92 88 L75 140 L108 135" fill="none" stroke="${col}" stroke-width="10" stroke-linecap="round"/>
      <circle cx="108" cy="135" r="7" fill="${rimCol}"/>
      <path d="M128 88 L145 155 L135 185" fill="none" stroke="${col}" stroke-width="10" stroke-linecap="round"/>
      <path d="M122 65 Q125 75 120 78 Q116 75 122 65 Z" fill="#38bdf8" filter="drop-shadow(0 0 6px #38bdf8)"/>
      <path d="M128 84 L148 195 L156 285" fill="none" stroke="${rimCol}" stroke-width="3.5" filter="drop-shadow(0 0 6px ${rimCol})"/>
    `;
  }
  return `<svg viewBox="0 0 220 320" width="${w}" height="${h}" style="overflow:visible">${body}</svg>`;
}

// Helper SVG: Hanging Brass Lantern with Flame
function hangingLantern(w = 160, h = 260) {
  return `
    <svg viewBox="0 0 160 260" width="${w}" height="${h}" style="overflow:visible">
      <defs>
        <radialGradient id="lanternGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#fff" stop-opacity="1"/>
          <stop offset="35%" stop-color="#ffe3a8" stop-opacity="0.9"/>
          <stop offset="70%" stop-color="#ffb347" stop-opacity="0.5"/>
          <stop offset="100%" stop-color="#c86414" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <line x1="80" y1="0" x2="80" y2="60" stroke="#ffd255" stroke-width="4" stroke-dasharray="6,4"/>
      <path d="M55 60 L105 60 L95 75 L65 75 Z" fill="#c86414" stroke="#ffd255" stroke-width="2"/>
      <circle cx="80" cy="55" r="7" fill="none" stroke="#ffd255" stroke-width="3"/>
      <circle cx="80" cy="135" r="75" fill="url(#lanternGlow)"/>
      <path d="M60 75 L100 75 L112 145 L80 185 L48 145 Z" fill="rgba(255, 227, 168, 0.25)" stroke="#ffd255" stroke-width="3.5"/>
      <line x1="80" y1="75" x2="80" y2="185" stroke="#ffd255" stroke-width="2.5"/>
      <line x1="60" y1="75" x2="80" y2="185" stroke="#ffd255" stroke-width="1.8"/>
      <line x1="100" y1="75" x2="80" y2="185" stroke="#ffd255" stroke-width="1.8"/>
      <path d="M80 120 Q88 135 80 148 Q72 135 80 120 Z" fill="#ffffff" filter="drop-shadow(0 0 12px #ffe3a8)"/>
      <circle cx="80" cy="192" r="6" fill="#ffd255"/>
    </svg>
  `;
}

let s;

// -------------------------------------------------------------
// SCENE 1 (0.0s – 5.5s): The Hook - An Unanswered Prayer
// -------------------------------------------------------------
s = scene(0.0, 5.5, { whoosh: true, push: 1.08 });
item(s, '✨ The Secret of Dua', {
  cls: 'stage-pill', t: 0.1, d: 0.5, type: 'down'
});
item(s, `
  <div class="kinetic-sub">AN UNANSWERED PRAYER</div>
  <div class="kinetic-huge">THE BAKER'S</div>
  <div class="kinetic-big kinetic-gold">IMPOSSIBLE DUA</div>
`, { cls: 'kinetic-header', t: 0.3, d: 0.55, type: 'up' });

// Center stage visual
const lBox1 = el('div', '', hangingLantern(180, 280), s, 'position:absolute; top:460px; left:450px; z-index:30;');
A(lBox1, [
  { transform: 'rotate(-4deg)', transformOrigin: 'top center' },
  { transform: 'rotate(4deg)', transformOrigin: 'top center' },
  { transform: 'rotate(-4deg)', transformOrigin: 'top center' }
], 0.2, 5.3, 'ease-in-out');

const a1 = el('div', '', islamicActor('dua', 280, 380, '#0e0b12', '#ffd255'), s, 'position:absolute; top:750px; left:400px; z-index:25;');
A(a1, [{ opacity: 0, transform: 'translateY(50px)' }, { opacity: 1, transform: 'none' }], 0.4, 0.7);

// -------------------------------------------------------------
// SCENE 2 (5.5s – 11.5s): The Exhausted Scholar in Wasit
// -------------------------------------------------------------
s = scene(5.5, 11.5, { whoosh: true, push: 1.07 });
item(s, '📜 9th Century Iraq · Wasit', {
  cls: 'stage-pill', t: 5.6, d: 0.5, type: 'down'
});
item(s, `
  <div class="kinetic-sub">THE DISTANT TRAVELER</div>
  <div class="kinetic-huge">IMAM AHMAD</div>
  <div class="kinetic-big kinetic-amber">TRAVELING AT NIGHT</div>
`, { cls: 'kinetic-header', t: 5.8, d: 0.55, type: 'up' });

el('div', '', `
  <svg viewBox="0 0 1080 300" width="1080" height="300" style="position:absolute; top:750px; left:0; opacity:0.4;">
    <path d="M0 300 L0 240 Q60 210 120 240 L180 240 L180 180 Q220 150 260 180 L260 240 L450 240 L450 140 Q490 100 530 140 L530 240 L700 240 L700 170 Q750 120 800 170 L800 240 L1080 240 L1080 300 Z" fill="#070d1f"/>
    <circle cx="220" cy="140" r="4" fill="#ffd255" opacity="0.8"/>
    <circle cx="490" cy="90" r="5" fill="#ffd255" opacity="0.9"/>
    <circle cx="750" cy="110" r="4" fill="#ffd255" opacity="0.8"/>
  </svg>
`, s);

const a2 = el('div', '', islamicActor('traveler', 280, 380, '#0e0b12', '#38bdf8'), s, 'position:absolute; top:760px; left:400px; z-index:25;');
A(a2, [{ opacity: 0, transform: 'translateX(-80px)' }, { opacity: 1, transform: 'none' }], 5.8, 0.8);

// -------------------------------------------------------------
// SCENE 3 (11.5s – 18.0s): Turned Away in the Freezing Rain
// -------------------------------------------------------------
s = scene(11.5, 18.0, { whoosh: true, push: 1.09 });
item(s, '🌧️ Midnight Storm', {
  cls: 'stage-pill', t: 11.6, d: 0.5, type: 'down'
});
item(s, `
  <div class="kinetic-sub">SHELTER DENIED</div>
  <div class="kinetic-huge" style="color:#f87171;">LOCKED OUT</div>
  <div class="kinetic-big kinetic-gold">INTO THE COLD RAIN</div>
`, { cls: 'kinetic-header', t: 11.8, d: 0.55, type: 'up' });

el('div', '', `
  <svg viewBox="0 0 600 500" width="550" height="460" style="position:absolute; top:490px; left:265px; z-index:15;">
    <path d="M100 460 L100 220 Q300 70 500 220 L500 460" fill="none" stroke="rgba(255,210,85,0.4)" stroke-width="10"/>
    <path d="M130 460 L130 230 Q300 100 470 230 L470 460" fill="rgba(5, 10, 24, 0.75)" stroke="#38bdf8" stroke-width="2.5" stroke-dasharray="8,6"/>
    <line x1="80" y1="100" x2="40" y2="240" stroke="#38bdf8" stroke-width="2.5" opacity="0.6"/>
    <line x1="220" y1="70" x2="180" y2="210" stroke="#38bdf8" stroke-width="2" opacity="0.5"/>
    <line x1="420" y1="90" x2="380" y2="230" stroke="#38bdf8" stroke-width="3" opacity="0.7"/>
    <line x1="520" y1="130" x2="480" y2="270" stroke="#38bdf8" stroke-width="2" opacity="0.5"/>
  </svg>
`, s);

const a3 = el('div', '', islamicActor('stand', 260, 360, '#0e0b12', '#38bdf8'), s, 'position:absolute; top:770px; left:410px; z-index:25;');
A(a3, [
  { transform: 'translateX(0)' }, { transform: 'translateX(-4px)' }, { transform: 'translateX(4px)' }, { transform: 'translateX(0)' }
], 12.0, 5.8, 'ease-in-out');

// -------------------------------------------------------------
// SCENE 4 (18.0s – 27.0s): The Humble Baker Opens His Door
// -------------------------------------------------------------
s = scene(18.0, 27.0, { whoosh: true, push: 1.08 });
item(s, '🍞 The Warm Bakery', {
  cls: 'stage-pill', t: 18.1, d: 0.5, type: 'down'
});
item(s, `
  <div class="kinetic-sub">UNEXPECTED MERCY</div>
  <div class="kinetic-huge">A STRANGER</div>
  <div class="kinetic-big kinetic-emerald">INVITED INSIDE</div>
`, { cls: 'kinetic-header', t: 18.3, d: 0.55, type: 'up' });

el('div', '', `
  <svg viewBox="0 0 600 400" width="580" height="380" style="position:absolute; top:540px; left:250px; z-index:10;">
    <defs>
      <radialGradient id="ovenGlow2" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#ffe3a8" stop-opacity="1"/>
        <stop offset="40%" stop-color="#ffb347" stop-opacity="0.8"/>
        <stop offset="80%" stop-color="#c86414" stop-opacity="0.3"/>
        <stop offset="100%" stop-color="transparent" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <path d="M120 380 L120 200 Q300 80 480 200 L480 380 Z" fill="#1b120c" stroke="#ffb347" stroke-width="6"/>
    <circle cx="300" cy="270" r="110" fill="url(#ovenGlow2)"/>
    <rect x="60" y="340" width="480" height="35" rx="8" fill="#3a2214" stroke="#ffd255" stroke-width="2.5"/>
  </svg>
`, s);

const a4_baker = el('div', '', islamicActor('stand', 240, 340, '#0e0b12', '#ffb347'), s, 'position:absolute; top:760px; left:290px; z-index:25;');
const a4_guest = el('div', '', islamicActor('traveler', 240, 340, '#0e0b12', '#ffd255'), s, 'position:absolute; top:760px; left:550px; z-index:25;');
A(a4_baker, [{ opacity: 0, transform: 'translateX(-30px)' }, { opacity: 1, transform: 'none' }], 18.4, 0.7);
A(a4_guest, [{ opacity: 0, transform: 'translateX(30px)' }, { opacity: 1, transform: 'none' }], 18.6, 0.7);

// -------------------------------------------------------------
// SCENE 5 (27.0s – 37.0s): Kneading Dough & Astaghfirullah
// -------------------------------------------------------------
s = scene(27.0, 37.0, { whoosh: true, push: 1.10 });
item(s, '📿 The Secret Habit', {
  cls: 'stage-pill', t: 27.1, d: 0.5, type: 'down'
});
item(s, `
  <div class="kinetic-sub">WITH EVERY KNEAD OF DOUGH</div>
  <div class="arabic-calligraphy">أَسْتَغْفِرُ اللَّهَ</div>
  <div class="kinetic-huge kinetic-gold">ASTAGHFIRULLAH</div>
`, { cls: 'kinetic-header', t: 27.3, d: 0.6, type: 'up' });

const a5 = el('div', '', islamicActor('knead', 280, 380, '#0e0b12', '#ffd255'), s, 'position:absolute; top:760px; left:400px; z-index:25;');
A(a5, [{ transform: 'translateY(0)' }, { transform: 'translateY(8px)' }, { transform: 'translateY(0)' }], 27.5, 1.2, 'ease-in-out');

const flour5 = el('div', '', `
  <svg viewBox="0 0 600 300" width="550" height="260" style="position:absolute; top:680px; left:265px; z-index:35; pointer-events:none;">
    <circle cx="150" cy="180" r="5" fill="#fff" filter="drop-shadow(0 0 6px #fff)"/>
    <circle cx="280" cy="120" r="7" fill="#ffe3a8" filter="drop-shadow(0 0 8px #ffd255)"/>
    <circle cx="340" cy="90" r="4" fill="#fff"/>
    <circle cx="420" cy="160" r="6" fill="#ffe3a8" filter="drop-shadow(0 0 6px #ffd255)"/>
    <circle cx="490" cy="110" r="5" fill="#fff"/>
  </svg>
`, s);
A(flour5, [{ opacity: 0.4, transform: 'translateY(0)' }, { opacity: 1, transform: 'translateY(-30px)' }, { opacity: 0.4, transform: 'translateY(0)' }], 27.5, 9.0, 'linear');

// -------------------------------------------------------------
// SCENE 6 (37.0s – 46.0s): All Prayers Answered Except One
// -------------------------------------------------------------
s = scene(37.0, 46.0, { whoosh: true, push: 1.08 });
item(s, '💬 The Baker\'s Confession', {
  cls: 'stage-pill', t: 37.1, d: 0.5, type: 'down'
});
item(s, `
  <div class="kinetic-sub">ONE FINAL WISH</div>
  <div class="kinetic-huge">TO MEET AHMAD</div>
  <div class="kinetic-big kinetic-amber">BEFORE I DIE</div>
`, { cls: 'kinetic-header', t: 37.3, d: 0.55, type: 'up' });

const hud6 = el('div', 'glass-card', `
  <div style="font-size:24px; color:#94a3b8; letter-spacing:3px; margin-bottom:12px; font-weight:700;">DUA TRACKER RECORD</div>
  <div style="font-size:52px; font-weight:900; color:#34d399; font-family:var(--font-serif); margin-bottom:8px;">ALL PRAYERS ANSWERED</div>
  <div style="display:flex; justify-content:center; gap:30px; font-size:26px; font-weight:800; color:#ffd255;">
    <span>GRANTED: 100%</span>
    <span style="color:#f87171;">PENDING: 1</span>
  </div>
`, s, 'position:absolute; top:520px; left:140px; width:800px; z-index:20;');
A(hud6, [{ opacity: 0, transform: 'scale(0.92)' }, { opacity: 1, transform: 'scale(1)' }], 37.4, 0.6);

const a6 = el('div', '', islamicActor('stand', 260, 360, '#0e0b12', '#ffd255'), s, 'position:absolute; top:810px; left:410px; z-index:25;');

// -------------------------------------------------------------
// SCENE 7 (46.0s – 54.0s): The Emotional Climax - Dragged to Your Door
// -------------------------------------------------------------
s = scene(46.0, 54.0, { whoosh: true, push: 1.12 });
item(s, '🤲 Divine Decree', {
  cls: 'stage-pill', t: 46.1, d: 0.5, type: 'down'
});
item(s, `
  <div class="kinetic-sub">ALLAH ANSWERED YOUR DUA</div>
  <div class="arabic-calligraphy" style="color:#34d399;">سُبْحَانَ اللَّهِ</div>
  <div class="kinetic-huge kinetic-gold">AHMAD DRAGGED</div>
  <div class="kinetic-big kinetic-emerald">TO YOUR DOORSTEP!</div>
`, { cls: 'kinetic-header', t: 46.3, d: 0.6, type: 'up' });

const a7_imam = el('div', '', islamicActor('weep', 260, 360, '#0e0b12', '#34d399'), s, 'position:absolute; top:750px; left:290px; z-index:25;');
const a7_baker = el('div', '', islamicActor('dua', 260, 360, '#0e0b12', '#ffd255'), s, 'position:absolute; top:750px; left:530px; z-index:25;');
A(a7_imam, [{ opacity: 0, transform: 'scale(0.9)' }, { opacity: 1, transform: 'scale(1)' }], 46.4, 0.6);
A(a7_baker, [{ opacity: 0, transform: 'scale(0.9)' }, { opacity: 1, transform: 'scale(1)' }], 46.6, 0.6);

// -------------------------------------------------------------
// SCENE 8 (54.0s – 60.0s): The Hadith Promise & Call to Action
// -------------------------------------------------------------
s = scene(54.0, 60.0, { whoosh: true, push: 1.06 });
item(s, '📖 Sunan Abu Dawud', {
  cls: 'stage-pill', t: 54.1, d: 0.5, type: 'down'
});
item(s, `
  <div class="kinetic-sub">THE PROPHETIC PROMISE</div>
  <div class="kinetic-huge">RELIEF FROM</div>
  <div class="kinetic-big kinetic-gold">EVERY DIFFICULTY</div>
`, { cls: 'kinetic-header', t: 54.3, d: 0.55, type: 'up' });

const cta8 = el('div', 'glass-card', `
  <div style="font-size:26px; color:#cbd5e1; line-height:1.4; margin-bottom:14px;">
    "Whoever is constant in Istighfar, Allah provides from sources he never imagined."
  </div>
  <div style="font-family:var(--font-arabic); font-size:68px; color:#ffd255; text-shadow:0 0 25px rgba(255,210,85,0.7); line-height:1.2;">
    أَسْتَغْفِرُ اللَّهَ
  </div>
  <div style="font-size:22px; font-weight:800; color:#34d399; letter-spacing:2px; margin-top:8px;">
    SHARE THIS BARAKAH WITH OTHERS
  </div>
`, s, 'position:absolute; top:520px; left:90px; width:900px; z-index:25;');
A(cta8, [{ opacity: 0, transform: 'translateY(30px)' }, { opacity: 1, transform: 'none' }], 54.4, 0.6);

const lBox8 = el('div', '', hangingLantern(170, 260), s, 'position:absolute; top:860px; left:455px; z-index:30;');
