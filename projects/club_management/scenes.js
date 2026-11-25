// scenes.js — "How to Manage a Club Without JS and GS"
// Type 3: Cinematic Stickman 2.5D Explainer (Theatrical Spotlight, Slate #0C1014, Glowing Gold #E5B842)

window.CAPTION = {
  maxWords: 3,
  highlight: ['100-member', 'club', 'playbook', 'pods', 'Logistics', 'Media', 'Corporate', 'Relations', 'SOPs', '5,000', 'Kanban', '10', 'times', 'leader', 'autonomous'],
  danger: ['without', 'waiting', 'signatures', 'freezes', 'exams', 'trapped', 'queue', 'bottlenecks', 'bottleneck', 'messy'],
  success: ['decentralized', 'direct', 'authority', 'instantly', 'transparent', 'speeds', 'leadership', 'leader'],
  info: ['JS', 'GS', 'Joint', 'Secretary', 'General', 'Step', 'one', 'two', 'three', 'WhatsApp']
};

// Global Background Animation
A(document.getElementById('bg'), [
  { transform: 'rotate(-4deg) translate(0,0)' },
  { transform: 'rotate(-4deg) translate(-160px,-110px)' }
], 0, 70, 'linear');

// Helper SVG: Grounded 2.5D Stickman Actor
function stickActor(pose = 'stand', w = 190, h = 270, col = '#FFFFFF', glow = '#E5B842') {
  let body = '';
  if (pose === 'stand') {
    body = `
      <ellipse cx="95" cy="255" rx="48" ry="10" fill="rgba(0,0,0,0.65)"/>
      <circle cx="95" cy="42" r="25" fill="${col}" filter="drop-shadow(0 0 14px ${glow})"/>
      <line x1="95" y1="67" x2="95" y2="158" stroke="${col}" stroke-width="8" stroke-linecap="round"/>
      <line x1="95" y1="95" x2="55" y2="140" stroke="${col}" stroke-width="7" stroke-linecap="round"/>
      <line x1="95" y1="95" x2="135" y2="140" stroke="${col}" stroke-width="7" stroke-linecap="round"/>
      <line x1="95" y1="158" x2="70" y2="245" stroke="${col}" stroke-width="8" stroke-linecap="round"/>
      <line x1="95" y1="158" x2="120" y2="245" stroke="${col}" stroke-width="8" stroke-linecap="round"/>
    `;
  } else if (pose === 'locked') {
    body = `
      <ellipse cx="95" cy="255" rx="46" ry="10" fill="rgba(0,0,0,0.65)"/>
      <circle cx="95" cy="42" r="25" fill="${col}" filter="drop-shadow(0 0 12px #FF453A)"/>
      <line x1="95" y1="67" x2="95" y2="158" stroke="${col}" stroke-width="8" stroke-linecap="round"/>
      <!-- Arms bound/crossed with padlock -->
      <path d="M60 120 L95 105 L130 120" fill="none" stroke="${col}" stroke-width="7" stroke-linecap="round"/>
      <rect x="80" y="112" width="30" height="26" rx="5" fill="#FF453A" filter="drop-shadow(0 0 12px #FF453A)"/>
      <path d="M87 112 V102 a8 8 0 0 1 16 0 v10" fill="none" stroke="#FFFFFF" stroke-width="3"/>
      <line x1="95" y1="158" x2="72" y2="245" stroke="${col}" stroke-width="8" stroke-linecap="round"/>
      <line x1="95" y1="158" x2="118" y2="245" stroke="${col}" stroke-width="8" stroke-linecap="round"/>
    `;
  } else if (pose === 'thinking') {
    body = `
      <ellipse cx="95" cy="255" rx="48" ry="10" fill="rgba(0,0,0,0.65)"/>
      <circle cx="95" cy="42" r="25" fill="${col}" filter="drop-shadow(0 0 14px ${glow})"/>
      <line x1="95" y1="67" x2="95" y2="158" stroke="${col}" stroke-width="8" stroke-linecap="round"/>
      <!-- Hand to chin -->
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
      <!-- One arm pointing forward, other on hip -->
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
      <!-- Arms raised high in victory -->
      <line x1="95" y1="90" x2="45" y2="38" stroke="${col}" stroke-width="8" stroke-linecap="round"/>
      <line x1="95" y1="90" x2="145" y2="38" stroke="${col}" stroke-width="8" stroke-linecap="round"/>
      <line x1="95" y1="158" x2="65" y2="245" stroke="${col}" stroke-width="8" stroke-linecap="round"/>
      <line x1="95" y1="158" x2="125" y2="245" stroke="${col}" stroke-width="8" stroke-linecap="round"/>
    `;
  }
  return `<svg width="${w}" height="${h}" viewBox="0 0 190 270" fill="none" class="stick-actor" xmlns="http://www.w3.org/2000/svg">${body}</svg>`;
}

// Stage Environment Lighting
function addStageLighting(parent) {
  el('div', 'spotlight-beam', null, parent);
  el('div', 'stage-floor', null, parent);
  el('div', 'stage-reflection', null, parent);
}

let s, c, row, box, x;

// ==============================================================
// SCENE 1: HOOK (0.00s -> 7.00s)
// "Run your entire 100-member club without waiting on 2 executive signatures: your JS and GS."
// ==============================================================
s = scene(0, 7.00, { cap: true, whoosh: false, push: 1.05 });
addStageLighting(s);
c = el('div', 'center', null, s, 'gap:32px;justify-content:center');

// Top Category Pill
item(c, `<span class="pill badge-gold" style="font-size:26px;padding:8px 34px">STUDENT CLUB PLAYBOOK</span>`, { t: 0.1, type: 'down', sfx: 'tick' });

// Hero 100-Member Club Card
item(c, `
  <div class="card card-3d" style="width:820px;padding:38px 30px;text-align:center;position:relative">
    <div class="kinetic-sub text-gold">CAMPUS EXECUTIVE LEADERSHIP</div>
    <div class="kinetic-big text-gold" style="margin:10px 0;font-size:84px">100-MEMBER CLUB</div>
    <div style="font-size:32px;color:#fff;font-weight:700">RUNNING WITH ZERO BOTTLENECK</div>
  </div>
`, { t: 0.3, type: 'zoom', d: 0.6, sfx: 'pop' });
punch(0.4);

// Dual Slash Card: Crossing out "2 SIGNATURES: JS & GS"
row = el('div', 'row', null, c, 'gap:32px;align-items:center;margin-top:12px');
item(row, stickActor('lead', 200, 270, '#FFFFFF', '#FFD255'), { t: 1.0, type: 'rise', d: 0.5 });
item(row, `
  <div class="card card-3d" style="width:540px;padding:28px 32px;text-align:left;position:relative;border-color:rgba(255,69,58,0.5)">
    <div style="display:flex;align-items:center;justify-content:space-between">
      <span style="font-size:26px;color:#94A3B8;letter-spacing:1px">TRADITIONAL BOTTLENECK</span>
      <span class="badge-red" style="font-size:20px;padding:4px 14px;border-radius:999px">BLOCKED</span>
    </div>
    <div style="font-size:46px;font-weight:900;color:#FF5A5A;margin:8px 0;text-decoration:line-through">2 SIGNATURES</div>
    <div style="font-size:30px;color:#fff;display:flex;gap:14px;align-items:center">
      <span style="background:rgba(255,69,58,0.25);padding:4px 16px;border-radius:8px;font-weight:800;color:#FF5A5A">JS</span>
      <span style="background:rgba(255,69,58,0.25);padding:4px 16px;border-radius:8px;font-weight:800;color:#FF5A5A">GS</span>
      <span style="color:#94A3B8;font-size:26px">= Frozen Club</span>
    </div>
  </div>
`, { t: 3.2, type: 'pop', d: 0.5, sfx: 'pop' });
punch(3.4);

// ==============================================================
// SCENE 2: THE PROBLEM (7.00s -> 14.00s)
// "In most student organizations, everything freezes the second the Joint Secretary and General Secretary have exams."
// ==============================================================
s = scene(7.00, 14.00, { cap: true, push: 1.04 });
addStageLighting(s);
c = el('div', 'center', null, s, 'gap:28px;justify-content:center');

// Header Pill
item(c, `<span class="pill badge-red" style="font-size:26px;padding:8px 34px">THE MIDTERM PARALYSIS</span>`, { t: 7.2, type: 'down', sfx: 'tick' });

// Traditional Hierarchy Card with Locked Gate
item(c, `
  <div class="card card-3d" style="width:820px;padding:34px;text-align:center">
    <div style="font-size:26px;color:var(--muted);letter-spacing:2px">TRADITIONAL EXECUTIVE PYRAMID</div>
    
    <!-- Top President -->
    <div style="margin:14px auto;width:260px;padding:12px;background:rgba(229,184,66,0.15);border:1px solid rgba(229,184,66,0.4);border-radius:14px;color:#FFD255;font-size:28px;font-weight:800">
      PRESIDENT
    </div>
    
    <div style="font-size:26px;color:#FF5A5A">▼</div>

    <!-- Bottleneck Gate JS & GS -->
    <div style="display:flex;gap:20px;justify-content:center;margin:10px 0">
      <div style="width:280px;padding:16px;background:rgba(255,69,58,0.22);border:2px solid #FF453A;border-radius:18px;color:#FFF">
        <div style="font-size:32px;font-weight:900;color:#FF5A5A">JOINT SEC (JS)</div>
        <div style="font-size:22px;color:#FFD255;margin-top:4px">📚 EXAM WEEK: OFF</div>
      </div>
      <div style="width:280px;padding:16px;background:rgba(255,69,58,0.22);border:2px solid #FF453A;border-radius:18px;color:#FFF">
        <div style="font-size:32px;font-weight:900;color:#FF5A5A">GEN SEC (GS)</div>
        <div style="font-size:22px;color:#FFD255;margin-top:4px">📚 EXAM WEEK: OFF</div>
      </div>
    </div>

    <div style="font-size:26px;color:#FF5A5A">▼</div>

    <!-- Frozen General Members -->
    <div style="padding:14px;background:rgba(148,163,184,0.12);border-radius:16px;color:#94A3B8;font-size:26px">
      100 Members Stuck Waiting for Approvals
    </div>
  </div>
`, { t: 7.5, type: 'rise', d: 0.6, sfx: 'whoosh' });

// Frozen Stickman & Alert
row = el('div', 'row', null, c, 'gap:28px;align-items:center;margin-top:8px');
item(row, stickActor('locked', 170, 240, '#94A3B8', '#FF453A'), { t: 9.5, type: 'pop', d: 0.5, sfx: 'pop' });
item(row, `
  <div style="background:rgba(255,69,58,0.2);border:2px solid #FF453A;padding:16px 32px;border-radius:20px;font-size:32px;font-weight:900;color:#FF5A5A;box-shadow:0 0 30px rgba(255,69,58,0.3)">
    ⚠️ CLUB OPERATIONS: FROZEN
  </div>
`, { t: 9.8, type: 'zoom', d: 0.4 });
punch(10.0);

// ==============================================================
// SCENE 3: TRAPPED QUEUE (14.00s -> 20.40s)
// "Every sponsorship pitch, stage banner, and social post gets trapped in an endless approval queue."
// ==============================================================
s = scene(14.00, 20.40, { cap: true, push: 1.04 });
addStageLighting(s);
c = el('div', 'center', null, s, 'gap:24px;justify-content:center');

item(c, `<span class="pill badge-red" style="font-size:26px;padding:8px 34px">THE APPROVAL BOTTLENECK</span>`, { t: 14.2, type: 'down', sfx: 'tick' });

// 3 Trapped Cards
const queueBox = el('div', 'center', null, c, 'gap:18px;width:820px');

item(queueBox, `
  <div class="card card-3d" style="padding:22px 32px;display:flex;align-items:center;justify-content:space-between;border-left:8px solid #FF453A">
    <div style="text-align:left">
      <div style="font-size:36px;font-weight:800;color:#FFF">1. Corporate Sponsor Pitch</div>
      <div style="font-size:24px;color:#94A3B8;margin-top:4px">Waiting 4 days for GS signature</div>
    </div>
    <span class="badge-red" style="font-size:22px;padding:6px 18px;border-radius:8px">TRAPPED</span>
  </div>
`, { t: 14.4, type: 'rise', d: 0.4, sfx: 'pop' });

item(queueBox, `
  <div class="card card-3d" style="padding:22px 32px;display:flex;align-items:center;justify-content:space-between;border-left:8px solid #FF453A">
    <div style="text-align:left">
      <div style="font-size:36px;font-weight:800;color:#FFF">2. Stage Banner Print File</div>
      <div style="font-size:24px;color:#94A3B8;margin-top:4px">Needs JS WhatsApp confirmation</div>
    </div>
    <span class="badge-red" style="font-size:22px;padding:6px 18px;border-radius:8px">DELAYED</span>
  </div>
`, { t: 15.5, type: 'rise', d: 0.4, sfx: 'pop' });

item(queueBox, `
  <div class="card card-3d" style="padding:22px 32px;display:flex;align-items:center;justify-content:space-between;border-left:8px solid #FF453A">
    <div style="text-align:left">
      <div style="font-size:36px;font-weight:800;color:#FFF">3. Social Media Event Teaser</div>
      <div style="font-size:24px;color:#94A3B8;margin-top:4px">Unread in executive group chat</div>
    </div>
    <span class="badge-red" style="font-size:22px;padding:6px 18px;border-radius:8px">99+ UNREAD</span>
  </div>
`, { t: 16.6, type: 'rise', d: 0.4, sfx: 'pop' });
punch(17.0);

// ==============================================================
// SCENE 4: PLAYBOOK PIVOT (20.40s -> 25.00s)
// "Here is the 3-step playbook modern student clubs use to run completely decentralized."
// ==============================================================
s = scene(20.40, 25.00, { cap: true, push: 1.05 });
addStageLighting(s);
c = el('div', 'center', null, s, 'gap:28px;justify-content:center');

item(c, `<span class="pill badge-gold" style="font-size:26px;padding:8px 34px">THE SOLUTION</span>`, { t: 20.6, type: 'down', sfx: 'tick' });

item(c, `
  <div class="card card-3d" style="width:820px;padding:44px;text-align:center;border-color:rgba(229,184,66,0.6)">
    <div class="kinetic-sub text-gold">DECENTRALIZED ARCHITECTURE</div>
    <div class="kinetic-big" style="color:#FFF;margin:12px 0;font-size:80px">THE 3-STEP PLAYBOOK</div>
    <div style="font-size:30px;color:var(--muted)">Run Faster • Zero Bureaucracy • Real Ownership</div>
  </div>
`, { t: 20.9, type: 'zoom', d: 0.6, sfx: 'whoosh' });
punch(21.1);

row = el('div', 'row', null, c, 'gap:22px;justify-content:center;margin-top:8px');
item(row, `<div style="background:rgba(229,184,66,0.18);border:1px solid rgba(229,184,66,0.5);border-radius:16px;padding:14px 26px;color:#FFD255;font-size:26px;font-weight:800">1. Autonomous Pods</div>`, { t: 21.6, type: 'rise', sfx: 'tick' });
item(row, `<div style="background:rgba(229,184,66,0.18);border:1px solid rgba(229,184,66,0.5);border-radius:16px;padding:14px 26px;color:#FFD255;font-size:26px;font-weight:800">2. Clear SOPs</div>`, { t: 22.3, type: 'rise', sfx: 'tick' });
item(row, `<div style="background:rgba(229,184,66,0.18);border:1px solid rgba(229,184,66,0.5);border-radius:16px;padding:14px 26px;color:#FFD255;font-size:26px;font-weight:800">3. Public Kanban</div>`, { t: 23.0, type: 'rise', sfx: 'tick' });

// ==============================================================
// SCENE 5: STEP 1 - AUTONOMOUS PODS (25.00s -> 39.50s)
// "Step 1: Replace hierarchy with Autonomous Pods. Instead of routing tasks through two bottlenecks, build 3-person pods for Logistics, Media, and Corporate Relations with direct execution authority."
// ==============================================================
s = scene(25.00, 39.50, { cap: true, push: 1.04 });
addStageLighting(s);
c = el('div', 'center', null, s, 'gap:24px;justify-content:center');

item(c, `<span class="pill badge-gold" style="font-size:26px;padding:8px 34px">STEP 01: SQUAD STRUCTURE</span>`, { t: 25.2, type: 'down', sfx: 'tick' });

item(c, `
  <div style="font-size:52px;font-weight:900;color:#FFF;text-align:center">
    AUTONOMOUS <span class="text-gold">3-PERSON PODS</span>
  </div>
`, { t: 25.6, type: 'rise', d: 0.5 });

// 3 Pods Side-by-Side
const podsRow = el('div', 'row', null, c, 'gap:18px;width:860px;justify-content:center');

// Pod 1: Logistics
item(podsRow, `
  <div class="card card-3d" style="width:260px;padding:26px 20px;text-align:center;border-color:rgba(56,189,248,0.45)">
    <div style="font-size:46px">📦</div>
    <div style="font-size:32px;font-weight:900;color:#38BDF8;margin:8px 0">LOGISTICS</div>
    <div style="font-size:20px;color:#94A3B8;line-height:1.3">Venue, Sound, Stage Equipment</div>
    <div style="margin-top:14px;background:rgba(56,189,248,0.18);padding:6px;border-radius:8px;font-size:18px;color:#38BDF8;font-weight:800">3 Members</div>
  </div>
`, { t: 28.0, type: 'pop', d: 0.5, sfx: 'pop' });

// Pod 2: Media & Creative
item(podsRow, `
  <div class="card card-3d" style="width:260px;padding:26px 20px;text-align:center;border-color:rgba(229,184,66,0.45)">
    <div style="font-size:46px">🎨</div>
    <div style="font-size:32px;font-weight:900;color:#FFD255;margin:8px 0">MEDIA</div>
    <div style="font-size:20px;color:#94A3B8;line-height:1.3">Graphics, Video, Social Copy</div>
    <div style="margin-top:14px;background:rgba(229,184,66,0.18);padding:6px;border-radius:8px;font-size:18px;color:#FFD255;font-weight:800">3 Members</div>
  </div>
`, { t: 29.2, type: 'pop', d: 0.5, sfx: 'pop' });

// Pod 3: Corporate Relations
item(podsRow, `
  <div class="card card-3d" style="width:260px;padding:26px 20px;text-align:center;border-color:rgba(50,215,75,0.45)">
    <div style="font-size:46px">🤝</div>
    <div style="font-size:32px;font-weight:900;color:#38EF7D;margin:8px 0">SPONSORS</div>
    <div style="font-size:20px;color:#94A3B8;line-height:1.3">Pitches, MoU, Brand Relations</div>
    <div style="margin-top:14px;background:rgba(50,215,75,0.18);padding:6px;border-radius:8px;font-size:18px;color:#38EF7D;font-weight:800">3 Members</div>
  </div>
`, { t: 30.5, type: 'pop', d: 0.5, sfx: 'pop' });

// Direct Authority Badge
item(c, `
  <div class="card card-3d" style="width:820px;padding:22px 34px;display:flex;align-items:center;justify-content:center;gap:18px;background:rgba(56,239,125,0.15);border-color:#38EF7D">
    <span style="font-size:36px">⚡</span>
    <span style="font-size:32px;font-weight:900;color:#FFF">DIRECT EXECUTION AUTHORITY — NO WAITING</span>
  </div>
`, { t: 36.5, type: 'zoom', d: 0.5, sfx: 'whoosh' });
punch(37.0);

// ==============================================================
// SCENE 6: STEP 2 - SOPS & BUDGET THRESHOLDS (39.50s -> 50.40s)
// "Step 2: Define Clear SOPs and Budget Thresholds. Any routine expense under 5,000 or standard social post moves forward instantly without executive sign-off."
// ==============================================================
s = scene(39.50, 50.40, { cap: true, push: 1.04 });
addStageLighting(s);
c = el('div', 'center', null, s, 'gap:26px;justify-content:center');

item(c, `<span class="pill badge-gold" style="font-size:26px;padding:8px 34px">STEP 02: AUTONOMY RULES</span>`, { t: 39.8, type: 'down', sfx: 'tick' });

// 3D Budget Rule Meter Widget
item(c, `
  <div class="card card-3d" style="width:820px;padding:36px;text-align:center">
    <div class="kinetic-sub text-gold">FINANCIAL THRESHOLD RULE</div>
    <div style="font-size:78px;font-weight:900;color:#38EF7D;margin:8px 0;text-shadow:0 0 35px rgba(56,239,125,0.5)">
      UNDER ৳5,000
    </div>
    <div style="font-size:30px;color:#FFF;margin-bottom:18px">
      Automated Spend Permission (No GS Approval Required)
    </div>
    
    <!-- Progress Threshold Bar -->
    <div style="width:100%;height:18px;background:rgba(255,255,255,0.1);border-radius:999px;position:relative;overflow:hidden">
      <div style="width:70%;height:100%;background:linear-gradient(90deg, #38EF7D, #FFD255);border-radius:999px"></div>
    </div>
  </div>
`, { t: 41.0, type: 'zoom', d: 0.6, sfx: 'whoosh' });
punch(41.5);

// Two Instant Execution Cards
row = el('div', 'row', null, c, 'gap:24px;width:820px;justify-content:center');
item(row, `
  <div class="card card-3d" style="flex:1;padding:26px;text-align:left;border-color:rgba(56,239,125,0.45)">
    <div style="display:flex;align-items:center;gap:12px">
      <span style="font-size:30px">✅</span>
      <span style="font-size:28px;font-weight:900;color:#FFF">Routine Spend</span>
    </div>
    <div style="font-size:22px;color:#94A3B8;margin-top:8px">Prints, Refreshments, Badges</div>
    <div style="margin-top:14px;color:#38EF7D;font-weight:800;font-size:22px">INSTANT PASS</div>
  </div>
`, { t: 43.5, type: 'rise', d: 0.4, sfx: 'pop' });

item(row, `
  <div class="card card-3d" style="flex:1;padding:26px;text-align:left;border-color:rgba(56,239,125,0.45)">
    <div style="display:flex;align-items:center;gap:12px">
      <span style="font-size:30px">✅</span>
      <span style="font-size:28px;font-weight:900;color:#FFF">Standard Media</span>
    </div>
    <div style="font-size:22px;color:#94A3B8;margin-top:8px">Template Reels & Announcements</div>
    <div style="margin-top:14px;color:#38EF7D;font-weight:800;font-size:22px">INSTANT PUBLISH</div>
  </div>
`, { t: 45.5, type: 'rise', d: 0.4, sfx: 'pop' });

// ==============================================================
// SCENE 7: STEP 3 - PUBLIC KANBAN (50.40s -> 61.00s)
// "Step 3: Public Kanban Boards. Move progress out of messy WhatsApp threads onto a shared board where accountability is transparent to the entire club."
// ==============================================================
s = scene(50.40, 61.00, { cap: true, push: 1.04 });
addStageLighting(s);
c = el('div', 'center', null, s, 'gap:24px;justify-content:center');

item(c, `<span class="pill badge-gold" style="font-size:26px;padding:8px 34px">STEP 03: RADICAL TRANSPARENCY</span>`, { t: 50.7, type: 'down', sfx: 'tick' });

item(c, `
  <div style="font-size:50px;font-weight:900;color:#FFF;text-align:center">
    PUBLIC <span class="text-gold">KANBAN BOARD</span>
  </div>
`, { t: 51.2, type: 'rise', d: 0.5 });

// 3-Column Glassmorphic Kanban Board
const kanban = el('div', 'row', null, c, 'gap:16px;width:860px;justify-content:center');

// Col 1: TO-DO
item(kanban, `
  <div class="card card-3d" style="width:265px;padding:22px 18px;text-align:left">
    <div style="font-size:24px;font-weight:900;color:#94A3B8;border-bottom:1px solid rgba(255,255,255,0.12);padding-bottom:10px">
      📋 TO-DO (4)
    </div>
    <div style="margin-top:14px;background:rgba(255,255,255,0.06);padding:14px;border-radius:12px;font-size:20px;color:#FFF">
      • Guest Speaker Invite
    </div>
    <div style="margin-top:8px;background:rgba(255,255,255,0.06);padding:14px;border-radius:12px;font-size:20px;color:#FFF">
      • Memento Procurement
    </div>
  </div>
`, { t: 51.5, type: 'pop', d: 0.4, sfx: 'pop' });

// Col 2: IN-PROGRESS
item(kanban, `
  <div class="card card-3d" style="width:265px;padding:22px 18px;text-align:left;border-color:rgba(229,184,66,0.5)">
    <div style="font-size:24px;font-weight:900;color:#FFD255;border-bottom:1px solid rgba(229,184,66,0.3);padding-bottom:10px">
      ⚙️ IN-PROGRESS (2)
    </div>
    <div style="margin-top:14px;background:rgba(229,184,66,0.15);padding:14px;border-radius:12px;font-size:20px;color:#FFD255">
      • Main Stage Banner
    </div>
    <div style="margin-top:8px;background:rgba(229,184,66,0.15);padding:14px;border-radius:12px;font-size:20px;color:#FFD255">
      • Sponsor Pitch Deck
    </div>
  </div>
`, { t: 52.3, type: 'pop', d: 0.4, sfx: 'pop' });

// Col 3: DONE
item(kanban, `
  <div class="card card-3d" style="width:265px;padding:22px 18px;text-align:left;border-color:rgba(56,239,125,0.5)">
    <div style="font-size:24px;font-weight:900;color:#38EF7D;border-bottom:1px solid rgba(56,239,125,0.3);padding-bottom:10px">
      🎉 DONE (8)
    </div>
    <div style="margin-top:14px;background:rgba(56,239,125,0.15);padding:14px;border-radius:12px;font-size:20px;color:#38EF7D">
      ✓ Auditorium Booked
    </div>
    <div style="margin-top:8px;background:rgba(56,239,125,0.15);padding:14px;border-radius:12px;font-size:20px;color:#38EF7D">
      ✓ Teaser Reel Live
    </div>
  </div>
`, { t: 53.2, type: 'pop', d: 0.4, sfx: 'pop' });

item(c, `
  <div style="font-size:28px;color:#94A3B8;text-align:center;font-weight:600">
    Replaces 50 messy WhatsApp groups with 100% visible accountability
  </div>
`, { t: 55.0, type: 'rise' });

// ==============================================================
// SCENE 8: CONCLUSION / IMPACT (61.00s -> 69.50s)
// "When you remove the two-person bottleneck, execution speeds up 10 times, and every member becomes a true leader."
// ==============================================================
s = scene(61.00, 69.50, { cap: true, push: 1.05 });
addStageLighting(s);
c = el('div', 'center', null, s, 'gap:28px;justify-content:center');

item(c, `<span class="pill badge-gold" style="font-size:26px;padding:8px 34px">THE FINAL OUTCOME</span>`, { t: 61.2, type: 'down', sfx: 'tick' });

// Big 10X Speed Metric Card
item(c, `
  <div class="card card-3d" style="width:820px;padding:38px;text-align:center;border-color:rgba(229,184,66,0.6)">
    <div class="kinetic-sub text-gold">EXECUTION VELOCITY</div>
    <div style="font-size:125px;font-weight:900;color:#FFD255;line-height:1;margin:8px 0;text-shadow:0 0 50px rgba(229,184,66,0.7)">
      10X FASTER
    </div>
    <div style="font-size:32px;color:#FFF;font-weight:700">
      Zero Approval Backlog • Unstoppable Club
    </div>
  </div>
`, { t: 61.8, type: 'zoom', d: 0.6, sfx: 'whoosh' });
punch(62.2);

// Celebrating Stickman Team
row = el('div', 'row', null, c, 'gap:32px;align-items:flex-end;margin-top:6px');
item(row, stickActor('celebrate', 180, 250, '#FFFFFF', '#38EF7D'), { t: 63.8, type: 'rise', d: 0.5, sfx: 'pop' });
item(row, stickActor('lead', 210, 280, '#FFFFFF', '#FFD255'), { t: 64.6, type: 'rise', d: 0.5, sfx: 'pop' });
item(row, stickActor('celebrate', 180, 250, '#FFFFFF', '#38BDF8'), { t: 65.4, type: 'rise', d: 0.5, sfx: 'pop' });

item(c, `
  <div style="font-size:38px;font-weight:900;color:#FFF;letter-spacing:1px;text-align:center;margin-top:6px">
    EVERY MEMBER BECOMES A <span class="text-gold">TRUE LEADER</span>
  </div>
`, { t: 66.5, type: 'rise', sfx: 'tick' });
