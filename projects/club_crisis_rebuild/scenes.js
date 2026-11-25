// scenes.js — "When GS, JS, R&D, IT, PR, and Office Leave Your Club"
// Type 3: Cinematic Stickman 2.5D Explainer (Theatrical Spotlight, Slate #0C1014, Crisis Crimson -> Glowing Gold #E5B842)

window.CAPTION = {
  maxWords: 3,
  highlight: ['six', '6', 'protocol', 'hubs', 'operations', 'growth', 'AI', 'SOPs', '10-minute', '14-day', 'bootcamp', '48-hour', 'badge', 'rebuild', 'club', '30'],
  danger: ['lost', 'overnight', 'zero', 'left', 'walked', 'out', 'panic', 'empty', 'kills', 'freeze', 'bleeding', 'dead', 'crisis', 'walkout'],
  success: ['emergency', 'protect', 'flagship', 'core', 'no-code', 'plug-and-play', 'checklists', 'ships', 'earns', 'lean', 'unstoppable'],
  info: ['GS', 'JS', 'R&D', 'IT', 'PR', 'office', 'Step', 'one', 'two', 'three', 'four', 'Canva', 'Google']
};

// Global Background Depth Shift
A(document.getElementById('bg'), [
  { transform: 'rotate(-4deg) translate(0,0)' },
  { transform: 'rotate(-4deg) translate(-160px,-110px)' }
], 0, 79, 'linear');

// Helper SVG: Grounded 2.5D Stickman Actor
function stickActor(pose = 'stand', w = 190, h = 270, col = '#FFFFFF', glow = '#E5B842') {
  let body = '';
  if (pose === 'stressed') {
    body = `
      <ellipse cx="95" cy="255" rx="48" ry="10" fill="rgba(0,0,0,0.65)"/>
      <circle cx="95" cy="44" r="25" fill="${col}" filter="drop-shadow(0 0 14px ${glow})"/>
      <line x1="95" y1="69" x2="95" y2="158" stroke="${col}" stroke-width="8" stroke-linecap="round"/>
      <!-- Both hands on head in shock -->
      <path d="M95 95 L55 72 L70 36" fill="none" stroke="${col}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M95 95 L135 72 L120 36" fill="none" stroke="${col}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
      <line x1="95" y1="158" x2="72" y2="245" stroke="${col}" stroke-width="8" stroke-linecap="round"/>
      <line x1="95" y1="158" x2="118" y2="245" stroke="${col}" stroke-width="8" stroke-linecap="round"/>
    `;
  } else if (pose === 'thinking') {
    body = `
      <ellipse cx="95" cy="255" rx="48" ry="10" fill="rgba(0,0,0,0.65)"/>
      <circle cx="95" cy="42" r="25" fill="${col}" filter="drop-shadow(0 0 14px ${glow})"/>
      <line x1="95" y1="67" x2="95" y2="158" stroke="${col}" stroke-width="8" stroke-linecap="round"/>
      <path d="M95 95 L65 125 L78 60" fill="none" stroke="${col}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
      <line x1="95" y1="95" x2="130" y2="140" stroke="${col}" stroke-width="7" stroke-linecap="round"/>
      <line x1="95" y1="158" x2="70" y2="245" stroke="${col}" stroke-width="8" stroke-linecap="round"/>
      <line x1="95" y1="158" x2="120" y2="245" stroke="${col}" stroke-width="8" stroke-linecap="round"/>
    `;
  } else if (pose === 'lead') {
    body = `
      <ellipse cx="95" cy="255" rx="48" ry="10" fill="rgba(0,0,0,0.65)"/>
      <circle cx="95" cy="42" r="25" fill="${col}" filter="drop-shadow(0 0 16px ${glow})"/>
      <line x1="95" y1="67" x2="95" y2="158" stroke="${col}" stroke-width="8" stroke-linecap="round"/>
      <line x1="95" y1="95" x2="52" y2="135" stroke="${col}" stroke-width="7" stroke-linecap="round"/>
      <line x1="95" y1="95" x2="155" y2="70" stroke="${glow}" stroke-width="8" stroke-linecap="round" filter="drop-shadow(0 0 10px ${glow})"/>
      <line x1="95" y1="158" x2="68" y2="245" stroke="${col}" stroke-width="8" stroke-linecap="round"/>
      <line x1="95" y1="158" x2="125" y2="245" stroke="${col}" stroke-width="8" stroke-linecap="round"/>
    `;
  } else if (pose === 'celebrate') {
    body = `
      <ellipse cx="95" cy="255" rx="52" ry="10" fill="rgba(0,0,0,0.65)"/>
      <circle cx="95" cy="42" r="25" fill="${col}" filter="drop-shadow(0 0 18px ${glow})"/>
      <line x1="95" y1="67" x2="95" y2="158" stroke="${col}" stroke-width="8" stroke-linecap="round"/>
      <line x1="95" y1="90" x2="45" y2="38" stroke="${col}" stroke-width="8" stroke-linecap="round"/>
      <line x1="95" y1="90" x2="145" y2="38" stroke="${col}" stroke-width="8" stroke-linecap="round"/>
      <line x1="95" y1="158" x2="65" y2="245" stroke="${col}" stroke-width="8" stroke-linecap="round"/>
      <line x1="95" y1="158" x2="125" y2="245" stroke="${col}" stroke-width="8" stroke-linecap="round"/>
    `;
  }
  return `<svg width="${w}" height="${h}" viewBox="0 0 190 270" fill="none" class="stick-actor" xmlns="http://www.w3.org/2000/svg">${body}</svg>`;
}

function addStageLighting(parent, crisis = false) {
  el('div', crisis ? 'spotlight-beam crisis' : 'spotlight-beam', null, parent);
  el('div', crisis ? 'stage-floor crisis' : 'stage-floor', null, parent);
  el('div', 'stage-reflection', null, parent);
}

let s, c, row;

// ==============================================================
// SCENE 1: HOOK (0.00s -> 4.30s)
// "You lost six club departments overnight with zero replacements left."
// ==============================================================
s = scene(0, 4.30, { cap: true, whoosh: false, push: 1.06 });
addStageLighting(s, true);
c = el('div', 'center', null, s, 'gap:28px;justify-content:center');

item(c, `<span class="pill badge-red" style="font-size:26px;padding:8px 34px">EMERGENCY CLUB CRISIS</span>`, { t: 0.05, type: 'down', sfx: 'tick' });

item(c, `
  <div class="card card-3d" style="width:840px;padding:38px 30px;text-align:center;border-color:rgba(255,69,58,0.55)">
    <div class="kinetic-sub text-danger">TOTAL LEADERSHIP WALKOUT</div>
    <div class="kinetic-big text-danger" style="margin:10px 0;font-size:84px">6 TEAMS GONE</div>
    <div style="font-size:34px;color:#FFF;font-weight:800">0 PRODUCTIVE REPLACEMENTS LEFT</div>
  </div>
`, { t: 0.25, type: 'zoom', d: 0.55, sfx: 'boom' });
punch(0.35);

row = el('div', 'row', null, c, 'gap:34px;align-items:center');
item(row, stickActor('stressed', 190, 260, '#FFFFFF', '#FF453A'), { t: 0.8, type: 'rise', d: 0.45 });
item(row, `
  <div class="card card-3d" style="width:480px;padding:24px 30px;text-align:left;border-color:rgba(255,69,58,0.45)">
    <div style="font-size:24px;color:#94A3B8">CLUB STATUS</div>
    <div style="font-size:44px;font-weight:900;color:#FF5A5A;margin:6px 0">CRITICAL VACUUM</div>
    <div style="font-size:24px;color:#FFD255">What do you do next?</div>
  </div>
`, { t: 1.6, type: 'pop', d: 0.45, sfx: 'pop' });

// ==============================================================
// SCENE 2: THE 6 EMPTY CHAIRS (4.30s -> 18.00s)
// "Your GS, JS, R&D, IT, PR, and office team just walked out... Do not panic and try to fill six empty chairs with warm bodies."
// ==============================================================
s = scene(4.30, 18.00, { cap: true, push: 1.04 });
addStageLighting(s, true);
c = el('div', 'center', null, s, 'gap:22px;justify-content:center');

item(c, `<span class="pill badge-red" style="font-size:26px;padding:8px 34px">THE WALKOUT ROSTER</span>`, { t: 4.35, type: 'down', sfx: 'tick' });

// 6 Departing Departments Grid (2 rows x 3 cols)
const grid1 = el('div', 'row', null, c, 'gap:18px;width:840px;justify-content:center');
item(grid1, `
  <div class="card card-3d" style="width:260px;padding:20px;text-align:center;border-color:rgba(255,69,58,0.5)">
    <div style="font-size:42px;font-weight:900;color:#FF5A5A">GS</div>
    <div style="font-size:20px;color:#94A3B8">General Secretary</div>
    <div class="badge-red" style="margin-top:10px;padding:4px 12px;border-radius:8px;font-size:18px">VACANT</div>
  </div>
`, { t: 4.5, type: 'pop', d: 0.3, sfx: 'pop' });

item(grid1, `
  <div class="card card-3d" style="width:260px;padding:20px;text-align:center;border-color:rgba(255,69,58,0.5)">
    <div style="font-size:42px;font-weight:900;color:#FF5A5A">JS</div>
    <div style="font-size:20px;color:#94A3B8">Joint Secretary</div>
    <div class="badge-red" style="margin-top:10px;padding:4px 12px;border-radius:8px;font-size:18px">VACANT</div>
  </div>
`, { t: 5.0, type: 'pop', d: 0.3, sfx: 'pop' });

item(grid1, `
  <div class="card card-3d" style="width:260px;padding:20px;text-align:center;border-color:rgba(255,69,58,0.5)">
    <div style="font-size:42px;font-weight:900;color:#FF5A5A">R&D</div>
    <div style="font-size:20px;color:#94A3B8">Research & Dev</div>
    <div class="badge-red" style="margin-top:10px;padding:4px 12px;border-radius:8px;font-size:18px">VACANT</div>
  </div>
`, { t: 5.75, type: 'pop', d: 0.3, sfx: 'pop' });

const grid2 = el('div', 'row', null, c, 'gap:18px;width:840px;justify-content:center');
item(grid2, `
  <div class="card card-3d" style="width:260px;padding:20px;text-align:center;border-color:rgba(255,69,58,0.5)">
    <div style="font-size:42px;font-weight:900;color:#FF5A5A">IT</div>
    <div style="font-size:20px;color:#94A3B8">Tech & Web</div>
    <div class="badge-red" style="margin-top:10px;padding:4px 12px;border-radius:8px;font-size:18px">VACANT</div>
  </div>
`, { t: 6.6, type: 'pop', d: 0.3, sfx: 'pop' });

item(grid2, `
  <div class="card card-3d" style="width:260px;padding:20px;text-align:center;border-color:rgba(255,69,58,0.5)">
    <div style="font-size:42px;font-weight:900;color:#FF5A5A">PR</div>
    <div style="font-size:20px;color:#94A3B8">Public Relations</div>
    <div class="badge-red" style="margin-top:10px;padding:4px 12px;border-radius:8px;font-size:18px">VACANT</div>
  </div>
`, { t: 7.25, type: 'pop', d: 0.3, sfx: 'pop' });

item(grid2, `
  <div class="card card-3d" style="width:260px;padding:20px;text-align:center;border-color:rgba(255,69,58,0.5)">
    <div style="font-size:42px;font-weight:900;color:#FF5A5A">OFFICE</div>
    <div style="font-size:20px;color:#94A3B8">Admin & Ops</div>
    <div class="badge-red" style="margin-top:10px;padding:4px 12px;border-radius:8px;font-size:18px">VACANT</div>
  </div>
`, { t: 7.85, type: 'pop', d: 0.3, sfx: 'pop' });

// Fatal Trap Warning Card
item(c, `
  <div class="card card-3d" style="width:820px;padding:24px 32px;display:flex;align-items:center;justify-content:space-between;border-color:#FF453A;background:rgba(255,69,58,0.16)">
    <div style="text-align:left">
      <div style="font-size:28px;font-weight:900;color:#FF5A5A">❌ FATAL TRAP: DO NOT FILL CHAIRS WITH WARM BODIES</div>
      <div style="font-size:22px;color:#FFF;margin-top:4px">Giving unready members big titles kills execution completely</div>
    </div>
  </div>
`, { t: 12.7, type: 'zoom', d: 0.5, sfx: 'boom' });
punch(13.0);

// ==============================================================
// SCENE 3: PROTOCOL PIVOT (18.00s -> 22.00s)
// "Instead, run this four-step emergency rebuild protocol."
// ==============================================================
s = scene(18.00, 22.00, { cap: true, push: 1.05 });
addStageLighting(s, false);
c = el('div', 'center', null, s, 'gap:28px;justify-content:center');

item(c, `<span class="pill badge-gold" style="font-size:26px;padding:8px 34px">SURVIVAL STRATEGY</span>`, { t: 18.15, type: 'down', sfx: 'tick' });

item(c, `
  <div class="card card-3d" style="width:840px;padding:48px 36px;text-align:center;border-color:rgba(229,184,66,0.65)">
    <div class="kinetic-sub text-gold">FROM COLLAPSE TO COMEBACK</div>
    <div class="kinetic-big" style="color:#FFF;margin:14px 0;font-size:78px">4-STEP EMERGENCY REBUILD</div>
    <div style="font-size:30px;color:var(--muted)">Triage • Consolidate • Automate • Recruit</div>
  </div>
`, { t: 18.5, type: 'zoom', d: 0.55, sfx: 'whoosh' });
punch(18.8);

// ==============================================================
// SCENE 4: STEP 1 — FREEZE NON-ESSENTIAL OPS (22.00s -> 32.50s)
// "Step one, freeze all non-essential ops. Cancel side projects for 30 days and protect only one flagship event so your skeleton crew stops bleeding energy."
// ==============================================================
s = scene(22.00, 32.50, { cap: true, push: 1.04 });
addStageLighting(s, false);
c = el('div', 'center', null, s, 'gap:26px;justify-content:center');

item(c, `<span class="pill badge-gold" style="font-size:26px;padding:8px 34px">STEP 01: TRIAGE & FREEZE</span>`, { t: 22.15, type: 'down', sfx: 'tick' });

item(c, `
  <div style="font-size:50px;font-weight:900;color:#FFF;text-align:center">
    FREEZE FOR <span class="text-cyan">30 DAYS</span>
  </div>
`, { t: 23.0, type: 'rise', d: 0.45 });

row = el('div', 'row', null, c, 'gap:24px;width:840px;justify-content:center');

// Left: Cancel Side Projects
item(row, `
  <div class="card card-3d" style="flex:1;padding:28px;text-align:left;border-color:rgba(56,189,248,0.45)">
    <div style="font-size:40px">❄️</div>
    <div style="font-size:30px;font-weight:900;color:#38BDF8;margin:8px 0">PAUSE SIDE OPS</div>
    <div style="font-size:22px;color:#94A3B8;text-decoration:line-through">• Weekly Casual Mixers</div>
    <div style="font-size:22px;color:#94A3B8;text-decoration:line-through;margin-top:6px">• Extra Workshops</div>
    <div style="margin-top:14px;color:#38BDF8;font-weight:800;font-size:20px">STOP ENERGY BLEED</div>
  </div>
`, { t: 25.0, type: 'pop', d: 0.45, sfx: 'pop' });

// Right: Protect 1 Flagship Event
item(row, `
  <div class="card card-3d" style="flex:1;padding:28px;text-align:left;border-color:rgba(229,184,66,0.6)">
    <div style="font-size:40px">🛡️</div>
    <div style="font-size:30px;font-weight:900;color:#FFD255;margin:8px 0">1 FLAGSHIP ONLY</div>
    <div style="font-size:22px;color:#FFF">Focus 100% of your skeleton crew on one visible win</div>
    <div style="margin-top:14px;color:#38EF7D;font-weight:800;font-size:20px">MOMENTUM PROTECTED</div>
  </div>
`, { t: 28.0, type: 'pop', d: 0.45, sfx: 'pop' });
punch(28.5);

// ==============================================================
// SCENE 5: STEP 2 — MERGE 6 ROLES INTO 2 CORE HUBS (32.50s -> 47.10s)
// "Step two, merge six roles into two core hubs. Combine GS, JS, and office into one operations desk, and merge R&D, IT, and PR into one growth engine powered by AI templates and no-code tools."
// ==============================================================
s = scene(32.50, 47.10, { cap: true, push: 1.04 });
addStageLighting(s, false);
c = el('div', 'center', null, s, 'gap:24px;justify-content:center');

item(c, `<span class="pill badge-gold" style="font-size:26px;padding:8px 34px">STEP 02: CONSOLIDATE</span>`, { t: 32.75, type: 'down', sfx: 'tick' });

item(c, `
  <div style="font-size:50px;font-weight:900;color:#FFF;text-align:center">
    MERGE <span class="text-danger">6 ROLES</span> → <span class="text-gold">2 CORE HUBS</span>
  </div>
`, { t: 33.8, type: 'rise', d: 0.45 });

row = el('div', 'row', null, c, 'gap:22px;width:850px;justify-content:center');

// Hub 1: Operations Desk
item(row, `
  <div class="card card-3d" style="flex:1;padding:30px 24px;text-align:center;border-color:rgba(229,184,66,0.55)">
    <div style="font-size:44px">🏛️</div>
    <div style="font-size:32px;font-weight:900;color:#FFD255;margin:8px 0">OPERATIONS DESK</div>
    <div style="display:flex;gap:8px;justify-content:center;margin:14px 0">
      <span style="background:rgba(229,184,66,0.2);padding:4px 14px;border-radius:8px;font-size:22px;color:#FFD255;font-weight:800">GS</span>
      <span style="background:rgba(229,184,66,0.2);padding:4px 14px;border-radius:8px;font-size:22px;color:#FFD255;font-weight:800">JS</span>
      <span style="background:rgba(229,184,66,0.2);padding:4px 14px;border-radius:8px;font-size:22px;color:#FFD255;font-weight:800">OFFICE</span>
    </div>
    <div style="font-size:20px;color:#94A3B8">Permissions, Venue, Paperwork</div>
  </div>
`, { t: 36.3, type: 'pop', d: 0.45, sfx: 'pop' });

// Hub 2: Growth Engine
item(row, `
  <div class="card card-3d" style="flex:1;padding:30px 24px;text-align:center;border-color:rgba(56,239,125,0.55)">
    <div style="font-size:44px">🚀</div>
    <div style="font-size:32px;font-weight:900;color:#38EF7D;margin:8px 0">GROWTH ENGINE</div>
    <div style="display:flex;gap:8px;justify-content:center;margin:14px 0">
      <span style="background:rgba(56,239,125,0.2);padding:4px 14px;border-radius:8px;font-size:22px;color:#38EF7D;font-weight:800">R&D</span>
      <span style="background:rgba(56,239,125,0.2);padding:4px 14px;border-radius:8px;font-size:22px;color:#38EF7D;font-weight:800">IT</span>
      <span style="background:rgba(56,239,125,0.2);padding:4px 14px;border-radius:8px;font-size:22px;color:#38EF7D;font-weight:800">PR</span>
    </div>
    <div style="font-size:20px;color:#94A3B8">Content, Tech, Outreach</div>
  </div>
`, { t: 40.3, type: 'pop', d: 0.45, sfx: 'pop' });

// AI & No-Code Strip
item(c, `
  <div class="card card-3d" style="width:850px;padding:20px 30px;display:flex;align-items:center;justify-content:center;gap:16px;background:rgba(56,189,248,0.14);border-color:#38BDF8">
    <span style="font-size:34px">🤖</span>
    <span style="font-size:28px;font-weight:900;color:#FFF">POWERED BY AI TEMPLATES & NO-CODE TOOLS</span>
  </div>
`, { t: 44.0, type: 'zoom', d: 0.45, sfx: 'whoosh' });
punch(44.4);

// ==============================================================
// SCENE 6: STEP 3 — PLUG-AND-PLAY SOPs (47.10s -> 59.20s)
// "Step three, deploy plug-and-play SOPs. Never ask unready members to invent work. Give them 10-minute checklists for Canva posts, Google forms, and email outreach."
// ==============================================================
s = scene(47.10, 59.20, { cap: true, push: 1.04 });
addStageLighting(s, false);
c = el('div', 'center', null, s, 'gap:24px;justify-content:center');

item(c, `<span class="pill badge-gold" style="font-size:26px;padding:8px 34px">STEP 03: ZERO GUESSWORK</span>`, { t: 47.4, type: 'down', sfx: 'tick' });

item(c, `
  <div class="card card-3d" style="width:820px;padding:30px;text-align:center;border-color:rgba(229,184,66,0.5)">
    <div class="kinetic-sub text-gold">PLUG-AND-PLAY SOPs</div>
    <div style="font-size:56px;font-weight:900;color:#FFF;margin:6px 0">10-MINUTE CHECKLISTS</div>
    <div style="font-size:24px;color:#94A3B8">Never ask unready members to invent systems from scratch</div>
  </div>
`, { t: 48.4, type: 'zoom', d: 0.5, sfx: 'whoosh' });

const sopList = el('div', 'row', null, c, 'gap:18px;width:840px;justify-content:center');

item(sopList, `
  <div class="card card-3d" style="flex:1;padding:24px 16px;text-align:center;border-color:rgba(56,189,248,0.45)">
    <div style="font-size:44px">🎨</div>
    <div style="font-size:28px;font-weight:900;color:#38BDF8;margin:8px 0">Canva Kits</div>
    <div style="font-size:20px;color:#94A3B8">Swap text & export in 5 mins</div>
  </div>
`, { t: 55.2, type: 'pop', d: 0.35, sfx: 'pop' });

item(sopList, `
  <div class="card card-3d" style="flex:1;padding:24px 16px;text-align:center;border-color:rgba(56,239,125,0.45)">
    <div style="font-size:44px">📝</div>
    <div style="font-size:28px;font-weight:900;color:#38EF7D;margin:8px 0">Google Forms</div>
    <div style="font-size:20px;color:#94A3B8">Automated registration flows</div>
  </div>
`, { t: 56.2, type: 'pop', d: 0.35, sfx: 'pop' });

item(sopList, `
  <div class="card card-3d" style="flex:1;padding:24px 16px;text-align:center;border-color:rgba(229,184,66,0.45)">
    <div style="font-size:44px">📧</div>
    <div style="font-size:28px;font-weight:900;color:#FFD255;margin:8px 0">Email Scripts</div>
    <div style="font-size:20px;color:#94A3B8">Copy-paste sponsor outreach</div>
  </div>
`, { t: 57.3, type: 'pop', d: 0.35, sfx: 'pop' });

// ==============================================================
// SCENE 7: STEP 4 — 14-DAY BUILDER BOOTCAMP (59.20s -> 70.40s)
// "Step four, run a 14-day builder bootcamp. Test idle members with tiny, 48-hour micro-tasks. Whoever ships twice earns an executive badge."
// ==============================================================
s = scene(59.20, 70.40, { cap: true, push: 1.04 });
addStageLighting(s, false);
c = el('div', 'center', null, s, 'gap:24px;justify-content:center');

item(c, `<span class="pill badge-gold" style="font-size:26px;padding:8px 34px">STEP 04: BUILD NEW LEADERS</span>`, { t: 59.5, type: 'down', sfx: 'tick' });

item(c, `
  <div style="font-size:52px;font-weight:900;color:#FFF;text-align:center">
    14-DAY <span class="text-gold">BUILDER BOOTCAMP</span>
  </div>
`, { t: 60.5, type: 'rise', d: 0.45 });

row = el('div', 'row', null, c, 'gap:30px;align-items:center;width:840px');
item(row, stickActor('lead', 190, 260, '#FFFFFF', '#FFD255'), { t: 61.8, type: 'rise', d: 0.45 });
item(row, `
  <div class="card card-3d" style="flex:1;padding:28px 32px;text-align:left;border-color:rgba(56,239,125,0.5)">
    <div style="font-size:24px;color:#38BDF8;font-weight:800">⏱️ 48-HOUR MICRO-TASK TEST</div>
    <div style="margin:14px 0;display:flex;flex-direction:column;gap:10px">
      <div style="background:rgba(56,239,125,0.15);padding:10px 16px;border-radius:10px;font-size:24px;color:#FFF">✓ Ship Micro-Task #1</div>
      <div style="background:rgba(56,239,125,0.15);padding:10px 16px;border-radius:10px;font-size:24px;color:#FFF">✓ Ship Micro-Task #2</div>
    </div>
    <div class="badge-gold" style="display:inline-block;padding:8px 20px;border-radius:12px;font-size:24px">
      🏅 EARNS EXECUTIVE BADGE
    </div>
  </div>
`, { t: 63.2, type: 'pop', d: 0.5, sfx: 'ding' });
punch(67.6);

// ==============================================================
// SCENE 8: CONCLUSION — LEAN & UNSTOPPABLE (70.40s -> 78.50s)
// "A crisis walkout strips away dead weight and lets you rebuild a lean, unstoppable club from scratch."
// ==============================================================
s = scene(70.40, 78.50, { cap: true, push: 1.05 });
addStageLighting(s, false);
c = el('div', 'center', null, s, 'gap:28px;justify-content:center');

item(c, `<span class="pill badge-green" style="font-size:26px;padding:8px 34px">REBUILT FROM SCRATCH</span>`, { t: 70.7, type: 'down', sfx: 'tick' });

item(c, `
  <div class="card card-3d" style="width:840px;padding:38px;text-align:center;border-color:rgba(229,184,66,0.65)">
    <div class="kinetic-sub text-gold">NO DEAD WEIGHT • PURE EXECUTION</div>
    <div style="font-size:96px;font-weight:900;color:#FFD255;line-height:1.05;margin:10px 0;text-shadow:0 0 45px rgba(229,184,66,0.7)">
      LEAN &amp; UNSTOPPABLE
    </div>
    <div style="font-size:30px;color:#FFF;font-weight:700">
      A Crisis Walkout Is Your Chance To Reset Stronger
    </div>
  </div>
`, { t: 71.2, type: 'zoom', d: 0.55, sfx: 'whoosh' });
punch(71.6);

row = el('div', 'row', null, c, 'gap:32px;align-items:flex-end');
item(row, stickActor('celebrate', 180, 250, '#FFFFFF', '#38EF7D'), { t: 72.8, type: 'rise', d: 0.45, sfx: 'pop' });
item(row, stickActor('lead', 210, 280, '#FFFFFF', '#FFD255'), { t: 73.4, type: 'rise', d: 0.45, sfx: 'pop' });
item(row, stickActor('celebrate', 180, 250, '#FFFFFF', '#38BDF8'), { t: 74.0, type: 'rise', d: 0.45, sfx: 'pop' });
