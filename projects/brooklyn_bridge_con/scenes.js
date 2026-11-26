// scenes.js — "George C. Parker: The Man Who Sold the Brooklyn Bridge"
// Type 3: Cinematic Stickman 2.5D Explainer (Theatrical Spotlight, Deep Slate #0C1014, Sepia Gold #C8A96E, Antique Gold #E5B842)
// Duration: 84.0 seconds

window.CAPTION = {
  maxWords: 3,
  highlight: ['Brooklyn', 'Bridge', 'Parker', 'sold', 'toll', 'deed', 'Sing', 'brazen', 'forged', 'owner', 'bought'],
  danger: ['scam', 'fake', 'caught', 'prison', 'con', 'fooled', 'swindle', 'conned', 'fraud', 'bewildered', 'barricade'],
  success: ['genius', 'legendary', 'bold', 'idiom', 'classic', 'bridge'],
  info: ['NYPD', 'Madison', 'Metropolitan', 'Grant', 'Tomb', 'immigrants', 'tolls', 'documents']
};

// Global slow background drift
A(document.getElementById('bg'), [
  { transform: 'rotate(-3deg) translate(0,0)' },
  { transform: 'rotate(-3deg) translate(-120px,-80px)' }
], 0, 84, 'linear');

// ================================================================
// Stickman Actor Generator
// ================================================================
function stickActor(pose = 'stand', w = 190, h = 270, col = '#FFFFFF', glow = '#C8A96E') {
  let body = '';
  if (pose === 'tophat') {
    // Parker in top hat: confident, one arm extended forward (selling)
    body = `
      <ellipse cx="95" cy="255" rx="48" ry="10" fill="rgba(0,0,0,0.65)"/>
      <!-- Top hat brim -->
      <ellipse cx="95" cy="22" rx="34" ry="6" fill="${glow}" opacity="0.9"/>
      <!-- Top hat cylinder -->
      <rect x="68" y="0" width="54" height="24" rx="4" fill="${glow}" opacity="0.9"/>
      <!-- Head -->
      <circle cx="95" cy="42" r="22" fill="${col}" filter="drop-shadow(0 0 16px ${glow})"/>
      <!-- Body -->
      <line x1="95" y1="64" x2="95" y2="155" stroke="${col}" stroke-width="8" stroke-linecap="round"/>
      <!-- Right arm extended forward (selling gesture) -->
      <line x1="95" y1="90" x2="152" y2="68" stroke="${glow}" stroke-width="8" stroke-linecap="round" filter="drop-shadow(0 0 10px ${glow})"/>
      <!-- Left arm back -->
      <line x1="95" y1="90" x2="50" y2="118" stroke="${col}" stroke-width="7" stroke-linecap="round"/>
      <!-- Legs -->
      <line x1="95" y1="155" x2="68" y2="245" stroke="${col}" stroke-width="8" stroke-linecap="round"/>
      <line x1="95" y1="155" x2="122" y2="245" stroke="${col}" stroke-width="8" stroke-linecap="round"/>
      <!-- Cane / gold bar prop -->
      <line x1="122" y1="245" x2="148" y2="210" stroke="${glow}" stroke-width="6" stroke-linecap="round"/>
      <circle cx="148" cy="210" r="8" fill="${glow}" filter="drop-shadow(0 0 8px ${glow})"/>
    `;
  } else if (pose === 'immigrant') {
    // Immigrant victim: hunched, holding bag of money, excited/naive
    body = `
      <ellipse cx="95" cy="255" rx="44" ry="10" fill="rgba(0,0,0,0.65)"/>
      <circle cx="95" cy="44" r="22" fill="${col}" filter="drop-shadow(0 0 10px rgba(255,255,255,0.3))"/>
      <line x1="95" y1="66" x2="95" y2="155" stroke="${col}" stroke-width="8" stroke-linecap="round"/>
      <!-- Arms reaching forward (handing money) -->
      <line x1="95" y1="92" x2="148" y2="108" stroke="${col}" stroke-width="7" stroke-linecap="round"/>
      <line x1="95" y1="92" x2="45" y2="118" stroke="${col}" stroke-width="7" stroke-linecap="round"/>
      <!-- Money bag in right hand -->
      <circle cx="152" cy="118" r="14" fill="#FFD255" filter="drop-shadow(0 0 8px rgba(255,210,85,0.6))"/>
      <text x="152" y="123" text-anchor="middle" font-size="13" fill="#1A1300" font-weight="800">$</text>
      <!-- Legs -->
      <line x1="95" y1="155" x2="72" y2="245" stroke="${col}" stroke-width="8" stroke-linecap="round"/>
      <line x1="95" y1="155" x2="118" y2="245" stroke="${col}" stroke-width="8" stroke-linecap="round"/>
    `;
  } else if (pose === 'worker') {
    // Victim with hammer trying to build toll booth
    body = `
      <ellipse cx="95" cy="255" rx="48" ry="10" fill="rgba(0,0,0,0.65)"/>
      <circle cx="95" cy="44" r="22" fill="${col}" filter="drop-shadow(0 0 8px rgba(255,255,255,0.3))"/>
      <line x1="95" y1="66" x2="95" y2="155" stroke="${col}" stroke-width="8" stroke-linecap="round"/>
      <!-- Hammer arm raised -->
      <path d="M95 92 L52 48 L38 62 L82 92" fill="none" stroke="${col}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
      <!-- Hammer head -->
      <rect x="28" y="45" width="28" height="20" rx="4" fill="#94A3B8"/>
      <!-- Other arm on hip -->
      <line x1="95" y1="92" x2="140" y2="115" stroke="${col}" stroke-width="7" stroke-linecap="round"/>
      <!-- Legs wide stance -->
      <line x1="95" y1="155" x2="62" y2="248" stroke="${col}" stroke-width="8" stroke-linecap="round"/>
      <line x1="95" y1="155" x2="128" y2="248" stroke="${col}" stroke-width="8" stroke-linecap="round"/>
    `;
  } else if (pose === 'celebrate') {
    body = `
      <ellipse cx="95" cy="255" rx="52" ry="10" fill="rgba(0,0,0,0.65)"/>
      <circle cx="95" cy="42" r="22" fill="${col}" filter="drop-shadow(0 0 18px ${glow})"/>
      <line x1="95" y1="64" x2="95" y2="155" stroke="${col}" stroke-width="8" stroke-linecap="round"/>
      <line x1="95" y1="90" x2="45" y2="38" stroke="${col}" stroke-width="8" stroke-linecap="round"/>
      <line x1="95" y1="90" x2="145" y2="38" stroke="${col}" stroke-width="8" stroke-linecap="round"/>
      <line x1="95" y1="155" x2="65" y2="245" stroke="${col}" stroke-width="8" stroke-linecap="round"/>
      <line x1="95" y1="155" x2="125" y2="245" stroke="${col}" stroke-width="8" stroke-linecap="round"/>
    `;
  } else if (pose === 'prisoner') {
    // Parker behind bars, hands clasped
    body = `
      <ellipse cx="95" cy="255" rx="44" ry="10" fill="rgba(0,0,0,0.65)"/>
      <circle cx="95" cy="44" r="22" fill="${col}" filter="drop-shadow(0 0 8px rgba(255,255,255,0.2))"/>
      <line x1="95" y1="66" x2="95" y2="155" stroke="${col}" stroke-width="8" stroke-linecap="round"/>
      <!-- Hands clasped in front (dejected) -->
      <line x1="95" y1="90" x2="68" y2="130" stroke="${col}" stroke-width="7" stroke-linecap="round"/>
      <line x1="95" y1="90" x2="122" y2="130" stroke="${col}" stroke-width="7" stroke-linecap="round"/>
      <!-- Legs -->
      <line x1="95" y1="155" x2="75" y2="245" stroke="${col}" stroke-width="8" stroke-linecap="round"/>
      <line x1="95" y1="155" x2="115" y2="245" stroke="${col}" stroke-width="8" stroke-linecap="round"/>
      <!-- Prison bars overlay -->
      <line x1="55" y1="10" x2="55" y2="260" stroke="rgba(148,163,184,0.7)" stroke-width="7" stroke-linecap="round"/>
      <line x1="82" y1="10" x2="82" y2="260" stroke="rgba(148,163,184,0.7)" stroke-width="7" stroke-linecap="round"/>
      <line x1="108" y1="10" x2="108" y2="260" stroke="rgba(148,163,184,0.7)" stroke-width="7" stroke-linecap="round"/>
      <line x1="135" y1="10" x2="135" y2="260" stroke="rgba(148,163,184,0.7)" stroke-width="7" stroke-linecap="round"/>
      <line x1="40" y1="80" x2="150" y2="80" stroke="rgba(148,163,184,0.7)" stroke-width="7" stroke-linecap="round"/>
    `;
  } else if (pose === 'lead') {
    body = `
      <ellipse cx="95" cy="255" rx="48" ry="10" fill="rgba(0,0,0,0.65)"/>
      <circle cx="95" cy="42" r="22" fill="${col}" filter="drop-shadow(0 0 16px ${glow})"/>
      <line x1="95" y1="64" x2="95" y2="155" stroke="${col}" stroke-width="8" stroke-linecap="round"/>
      <line x1="95" y1="90" x2="52" y2="130" stroke="${col}" stroke-width="7" stroke-linecap="round"/>
      <line x1="95" y1="90" x2="152" y2="68" stroke="${glow}" stroke-width="8" stroke-linecap="round" filter="drop-shadow(0 0 10px ${glow})"/>
      <line x1="95" y1="155" x2="68" y2="245" stroke="${col}" stroke-width="8" stroke-linecap="round"/>
      <line x1="95" y1="155" x2="122" y2="245" stroke="${col}" stroke-width="8" stroke-linecap="round"/>
    `;
  }
  return `<svg width="${w}" height="${h}" viewBox="0 0 190 270" fill="none" class="stick-actor" xmlns="http://www.w3.org/2000/svg">${body}</svg>`;
}

function addStageLighting(parent, mode = 'normal') {
  el('div', mode === 'crisis' ? 'spotlight-beam crisis' : mode === 'triumph' ? 'spotlight-beam triumph' : 'spotlight-beam', null, parent);
  el('div', mode === 'crisis' ? 'stage-floor crisis' : mode === 'triumph' ? 'stage-floor triumph' : 'stage-floor', null, parent);
  el('div', 'stage-reflection', null, parent);
}

let s, c, row;

// ================================================================
// SCENE 1: HOOK (0.00s -> 6.00s)
// "What if you owned the Brooklyn Bridge and charged every person a toll?
//  That was the pitch. And people bought it."
// ================================================================
s = scene(0, 6.00, { cap: true, whoosh: false, push: 1.06 });
addStageLighting(s, 'normal');
c = el('div', 'center', null, s, 'gap:28px;justify-content:center');

item(c, `<span class="pill badge-sepia" style="font-size:26px;padding:8px 34px">🌉 NEW YORK CITY — 1900s</span>`, { t: 0.1, type: 'down', sfx: 'tick' });

item(c, `
  <div class="card-sepia" style="width:860px;padding:38px 32px;text-align:center">
    <div class="kinetic-sub text-sepia">THE GREATEST CON IN HISTORY</div>
    <div class="kinetic-big" style="color:#FFF;margin:12px 0;font-size:80px">WHAT IF YOU<br><span class="text-gold">OWNED</span><br>THE BRIDGE?</div>
    <div style="font-size:30px;color:#C8A96E;font-weight:700">And charged everyone a toll?</div>
  </div>
`, { t: 0.3, type: 'zoom', d: 0.55, sfx: 'boom' });
punch(0.4);

// ================================================================
// SCENE 2: PARKER INTRO (6.00s -> 17.00s)
// "Meet George C. Parker — the most brazen con artist in American history."
// ================================================================
s = scene(6.00, 17.00, { cap: true, push: 1.04 });
addStageLighting(s, 'normal');
c = el('div', 'center', null, s, 'gap:26px;justify-content:center');

item(c, `<span class="pill badge-sepia" style="font-size:26px;padding:8px 34px">🎩 THE MASTERMIND</span>`, { t: 6.2, type: 'down', sfx: 'tick' });

row = el('div', 'row', null, c, 'gap:36px;align-items:center;width:860px');
item(row, stickActor('tophat', 200, 280, '#FFFFFF', '#E5B842'), { t: 6.9, type: 'rise', d: 0.5, sfx: 'whoosh' });
item(row, `
  <div class="card-3d" style="flex:1;padding:32px 28px;text-align:left;border-color:rgba(200,169,110,0.6)">
    <div style="font-size:24px;color:#94A3B8;font-weight:700;letter-spacing:2px">GEORGE C. PARKER</div>
    <div style="font-size:46px;font-weight:900;color:#FFD255;margin:8px 0;line-height:1.1">AMERICA'S<br>BOLDEST CON</div>
    <div style="font-size:22px;color:#FFF;margin-top:10px">Early 1900s — New York City</div>
    <div style="margin-top:16px;padding:10px 18px;background:rgba(255,69,58,0.18);border-radius:12px;border:1px solid rgba(255,69,58,0.4)">
      <span style="font-size:20px;color:#FF5A5A;font-weight:800">CONNED HUNDREDS OF PEOPLE</span>
    </div>
  </div>
`, { t: 8.2, type: 'pop', d: 0.5, sfx: 'pop' });

// ================================================================
// SCENE 3: THE TARGET (17.00s -> 29.00s)
// "Parker approached newly arrived immigrants near the Brooklyn Bridge.
//  He posed as the official owner — a city developer with government ties."
// ================================================================
s = scene(17.00, 29.00, { cap: true, push: 1.04 });
addStageLighting(s, 'normal');
c = el('div', 'center', null, s, 'gap:24px;justify-content:center');

item(c, `<span class="pill badge-sepia" style="font-size:26px;padding:8px 34px">🚢 THE TARGETS</span>`, { t: 17.2, type: 'down', sfx: 'tick' });

item(c, `
  <div style="font-size:50px;font-weight:900;color:#FFF;text-align:center">
    NEWLY ARRIVED<br><span class="text-sepia">IMMIGRANTS</span>
  </div>
`, { t: 18.0, type: 'rise', d: 0.45 });

row = el('div', 'row', null, c, 'gap:28px;width:860px;justify-content:center;align-items:center');
item(row, stickActor('immigrant', 175, 255, '#FFFFFF', '#FFD255'), { t: 19.5, type: 'rise', d: 0.4, sfx: 'pop' });
item(row, stickActor('tophat', 185, 265, '#FFFFFF', '#E5B842'), { t: 20.2, type: 'rise', d: 0.4, sfx: 'pop' });
item(row, stickActor('immigrant', 175, 255, '#FFFFFF', '#94A3B8'), { t: 20.9, type: 'rise', d: 0.4, sfx: 'pop' });

item(c, `
  <div class="card-3d" style="width:840px;padding:22px 30px;display:flex;align-items:center;gap:16px;background:rgba(200,169,110,0.1);border-color:rgba(200,169,110,0.5)">
    <span style="font-size:38px">🌉</span>
    <div>
      <div style="font-size:24px;font-weight:900;color:#FFD255">Parker posed as the OFFICIAL OWNER</div>
      <div style="font-size:20px;color:#94A3B8;margin-top:4px">"City developer with government ties"</div>
    </div>
  </div>
`, { t: 24.0, type: 'zoom', d: 0.45, sfx: 'whoosh' });

// ================================================================
// SCENE 4: THE FAKE DEED (29.00s -> 41.00s)
// "He had forged deeds. Stamped legal documents. Official-looking certificates
//  of ownership. And a smooth, confident voice."
// ================================================================
s = scene(29.00, 41.00, { cap: true, push: 1.05 });
addStageLighting(s, 'crisis');
c = el('div', 'center', null, s, 'gap:26px;justify-content:center');

item(c, `<span class="pill badge-red" style="font-size:26px;padding:8px 34px">📜 THE FORGERY</span>`, { t: 29.2, type: 'down', sfx: 'tick' });

item(c, `
  <div style="font-size:52px;font-weight:900;color:#FFF;text-align:center">
    <span class="text-danger">FORGED</span> DEEDS<br>FAKE CERTIFICATES
  </div>
`, { t: 30.2, type: 'rise', d: 0.45, sfx: 'boom' });
punch(30.5);

row = el('div', 'row', null, c, 'gap:20px;width:860px;justify-content:center');

item(row, `
  <div class="card-3d" style="flex:1;padding:28px 20px;text-align:center;border-color:rgba(255,69,58,0.55)">
    <div style="font-size:48px">📜</div>
    <div style="font-size:28px;font-weight:900;color:#FF5A5A;margin:8px 0">FORGED DEED</div>
    <div style="font-size:18px;color:#94A3B8">Official ownership<br>document — FAKE</div>
  </div>
`, { t: 32.5, type: 'pop', d: 0.4, sfx: 'pop' });

item(row, `
  <div class="card-3d" style="flex:1;padding:28px 20px;text-align:center;border-color:rgba(255,69,58,0.55)">
    <div style="font-size:48px">🏛️</div>
    <div style="font-size:28px;font-weight:900;color:#FF5A5A;margin:8px 0">GOV. STAMP</div>
    <div style="font-size:18px;color:#94A3B8">Looked completely<br>legitimate</div>
  </div>
`, { t: 34.0, type: 'pop', d: 0.4, sfx: 'pop' });

item(row, `
  <div class="card-3d" style="flex:1;padding:28px 20px;text-align:center;border-color:rgba(255,69,58,0.55)">
    <div style="font-size:48px">🤝</div>
    <div style="font-size:28px;font-weight:900;color:#FF5A5A;margin:8px 0">FALSE TRUST</div>
    <div style="font-size:18px;color:#94A3B8">Smooth voice,<br>confident pitch</div>
  </div>
`, { t: 35.5, type: 'pop', d: 0.4, sfx: 'pop' });

// ================================================================
// SCENE 5: THE SALE — PRICE RANGE (41.00s -> 52.00s)
// "The price? Anywhere from fifty dollars to several thousand.
//  A fortune for most immigrants. And they paid. Dozens of them did."
// ================================================================
s = scene(41.00, 52.00, { cap: true, push: 1.04 });
addStageLighting(s, 'crisis');
c = el('div', 'center', null, s, 'gap:26px;justify-content:center');

item(c, `<span class="pill badge-red" style="font-size:26px;padding:8px 34px">💰 THE PRICE TAG</span>`, { t: 41.2, type: 'down', sfx: 'tick' });

item(c, `
  <div class="card-3d" style="width:860px;padding:40px 36px;text-align:center;border-color:rgba(255,69,58,0.55)">
    <div class="kinetic-sub text-sepia">BRIDGE OWNERSHIP — STARTING AT</div>
    <div class="kinetic-big text-gold" style="font-size:110px;margin:8px 0">\$50</div>
    <div style="font-size:30px;color:#94A3B8">up to <span class="text-danger" style="font-size:40px;font-weight:900">\$1,000s</span> per sale</div>
  </div>
`, { t: 42.2, type: 'zoom', d: 0.55, sfx: 'boom' });
punch(42.5);

item(c, `
  <div style="display:flex;gap:18px;align-items:center;justify-content:center">
    <div style="text-align:center">
      <div style="font-size:70px;font-weight:900;color:#FF453A;text-shadow:0 0 40px rgba(255,69,58,0.8)">DOZENS</div>
      <div style="font-size:28px;color:#FFF;font-weight:700">of real people paid</div>
    </div>
  </div>
`, { t: 47.0, type: 'rise', d: 0.5 });

// ================================================================
// SCENE 6: THE PUNCHLINE — TOLL BOOTH CHAOS (52.00s -> 63.50s)
// "The scam only unraveled when buyers showed up with lumber and tools
//  ready to install their toll booths. NYPD arrived to find..."
// ================================================================
s = scene(52.00, 63.50, { cap: true, push: 1.04 });
addStageLighting(s, 'crisis');
c = el('div', 'center', null, s, 'gap:24px;justify-content:center');

item(c, `<span class="pill badge-red" style="font-size:26px;padding:8px 34px">🔨 THE UNRAVELING</span>`, { t: 52.2, type: 'down', sfx: 'tick' });

item(c, `
  <div style="font-size:52px;font-weight:900;color:#FFF;text-align:center">
    VICTIMS SHOWED UP<br>TO <span class="text-danger">BUILD TOLL BOOTHS</span>
  </div>
`, { t: 53.2, type: 'rise', d: 0.5, sfx: 'boom' });
punch(53.5);

row = el('div', 'row', null, c, 'gap:24px;width:860px;align-items:flex-end;justify-content:center');
item(row, stickActor('worker', 175, 255, '#FFD255', '#FFD255'), { t: 55.0, type: 'rise', d: 0.4, sfx: 'pop' });
item(row, stickActor('worker', 175, 255, '#38BDF8', '#38BDF8'), { t: 55.6, type: 'rise', d: 0.4, sfx: 'pop' });

item(c, `
  <div class="card-3d" style="width:840px;padding:22px 30px;display:flex;align-items:center;gap:18px;background:rgba(255,69,58,0.14);border-color:#FF453A">
    <span style="font-size:44px">🚔</span>
    <div>
      <div style="font-size:28px;font-weight:900;color:#FF5A5A">NYPD ARRIVED TO FIND...</div>
      <div style="font-size:20px;color:#FFF;margin-top:4px">Ordinary people trying to barricade the bridge with lumber!</div>
    </div>
  </div>
`, { t: 58.5, type: 'zoom', d: 0.5, sfx: 'whoosh' });

// ================================================================
// SCENE 7: THE SCALE — OTHER LANDMARKS (63.50s -> 73.00s)
// "But Parker didn't stop at the Brooklyn Bridge. He also sold Madison Square
//  Garden. The Metropolitan Museum of Art. And Grant's Tomb."
// ================================================================
s = scene(63.50, 73.00, { cap: true, push: 1.04 });
addStageLighting(s, 'normal');
c = el('div', 'center', null, s, 'gap:22px;justify-content:center');

item(c, `<span class="pill badge-sepia" style="font-size:26px;padding:8px 34px">🏛️ THE FULL PORTFOLIO</span>`, { t: 63.7, type: 'down', sfx: 'tick' });

item(c, `
  <div style="font-size:40px;font-weight:900;color:#FFF;text-align:center">
    HE SOLD <span class="text-danger">THEM ALL</span>
  </div>
`, { t: 64.5, type: 'rise', d: 0.4 });

const landmarkGrid = el('div', 'row', null, c, 'gap:16px;width:860px;justify-content:center');

item(landmarkGrid, `
  <div class="card-3d" style="flex:1;padding:24px 16px;text-align:center;border-color:rgba(200,169,110,0.5)">
    <div style="font-size:46px">🌉</div>
    <div style="font-size:22px;font-weight:900;color:#FFD255;margin:8px 0">Brooklyn<br>Bridge</div>
    <div class="badge-red" style="padding:4px 10px;border-radius:8px;font-size:16px">SOLD ×dozens</div>
  </div>
`, { t: 65.5, type: 'pop', d: 0.35, sfx: 'pop' });

item(landmarkGrid, `
  <div class="card-3d" style="flex:1;padding:24px 16px;text-align:center;border-color:rgba(200,169,110,0.5)">
    <div style="font-size:46px">🏟️</div>
    <div style="font-size:22px;font-weight:900;color:#FFD255;margin:8px 0">Madison<br>Square Garden</div>
    <div class="badge-red" style="padding:4px 10px;border-radius:8px;font-size:16px">SOLD</div>
  </div>
`, { t: 66.5, type: 'pop', d: 0.35, sfx: 'pop' });

item(landmarkGrid, `
  <div class="card-3d" style="flex:1;padding:24px 16px;text-align:center;border-color:rgba(200,169,110,0.5)">
    <div style="font-size:46px">🏛️</div>
    <div style="font-size:22px;font-weight:900;color:#FFD255;margin:8px 0">Metropolitan<br>Museum</div>
    <div class="badge-red" style="padding:4px 10px;border-radius:8px;font-size:16px">SOLD</div>
  </div>
`, { t: 67.5, type: 'pop', d: 0.35, sfx: 'pop' });

item(landmarkGrid, `
  <div class="card-3d" style="flex:1;padding:24px 16px;text-align:center;border-color:rgba(200,169,110,0.5)">
    <div style="font-size:46px">⚰️</div>
    <div style="font-size:22px;font-weight:900;color:#FFD255;margin:8px 0">Grant's<br>Tomb</div>
    <div class="badge-red" style="padding:4px 10px;border-radius:8px;font-size:16px">SOLD</div>
  </div>
`, { t: 68.5, type: 'pop', d: 0.35, sfx: 'pop' });

// ================================================================
// SCENE 8: LEGACY — SING SING + IDIOM (73.00s -> 84.00s)
// "He was finally caught and sentenced to Sing Sing prison for life.
//  His legacy — the classic American expression:
//  'If you believe that, I have a bridge to sell you.'
//  Greed makes even the smartest people miss the most obvious lies."
// ================================================================
s = scene(73.00, 84.00, { cap: true, push: 1.05 });
addStageLighting(s, 'triumph');
c = el('div', 'center', null, s, 'gap:26px;justify-content:center');

item(c, `<span class="pill badge-gold" style="font-size:26px;padding:8px 34px">⚖️ SING SING PRISON — FOR LIFE</span>`, { t: 73.2, type: 'down', sfx: 'tick' });

row = el('div', 'row', null, c, 'gap:36px;align-items:center;width:860px');
item(row, stickActor('prisoner', 185, 265, '#94A3B8', '#94A3B8'), { t: 74.0, type: 'rise', d: 0.45, sfx: 'boom' });
item(row, `
  <div class="card-3d" style="flex:1;padding:28px 24px;text-align:left;border-color:rgba(229,184,66,0.55)">
    <div style="font-size:22px;color:#94A3B8;letter-spacing:2px">HIS LEGACY</div>
    <div style="font-size:30px;font-weight:900;color:#FFD255;margin:10px 0;line-height:1.3;font-style:italic">"If you believe that, I have a bridge to sell you."</div>
    <div style="font-size:20px;color:#FFF;margin-top:8px">— Classic American idiom born from Parker's cons</div>
  </div>
`, { t: 75.5, type: 'pop', d: 0.5, sfx: 'ding' });

item(c, `
  <div class="card-3d" style="width:860px;padding:30px 36px;text-align:center;border-color:rgba(229,184,66,0.65);background:rgba(229,184,66,0.08)">
    <div class="kinetic-sub text-gold">THE TAKEAWAY</div>
    <div style="font-size:46px;font-weight:900;color:#FFF;margin:10px 0;line-height:1.2">GREED MAKES EVEN<br>THE <span class="text-danger">SMARTEST PEOPLE</span><br>MISS THE OBVIOUS</div>
  </div>
`, { t: 79.0, type: 'zoom', d: 0.55, sfx: 'whoosh' });
punch(79.5);
