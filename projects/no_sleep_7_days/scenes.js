// scenes.js — Episode 01: What Happens If You Do Not Sleep For 7 Days
// Style: Modernized Type 3 Viral Motion Graphics & Kinetic Typography (Derived from Reference Videos)

window.CAPTION = {
  maxWords: 3,
  highlight: ['brain', 'sleep', 'seven', 'days', 'adenosine', 'chemical', 'micro-sleeps', 'hallucinations', 'paranoia', 'microglia', 'neurons', 'death', 'awake', 'comments'],
  danger: ['not', 'shut', 'down', 'collapses', 'failure', 'eating', 'risk', 'extreme'],
  success: ['healthy', 'awake', 'longest'],
  info: ['one', 'three', 'five', 'seven', 'organ']
};

// Global Background Depth Shift
A(document.getElementById('bg'), [
  { transform: 'rotate(-4deg) translate(0,0)' },
  { transform: 'rotate(-4deg) translate(-140px,-100px)' }
], 0, 50, 'linear');

// Helper SVG: Modern Stickman Actor with Grounded Contact Shadow & Neon Rim
function stickActor(pose = 'stand', w = 220, h = 300, col = '#FFFFFF', glow = '#38BDF8') {
  let body = '';
  if (pose === 'stand') {
    body = `
      <ellipse cx="110" cy="285" rx="54" ry="12" fill="rgba(0,0,0,0.7)"/>
      <circle cx="110" cy="45" r="28" fill="${col}" filter="drop-shadow(0 0 16px ${glow})"/>
      <line x1="110" y1="73" x2="110" y2="175" stroke="${col}" stroke-width="10" stroke-linecap="round" filter="drop-shadow(0 0 10px ${glow})"/>
      <line x1="110" y1="105" x2="58" y2="155" stroke="${col}" stroke-width="9" stroke-linecap="round"/>
      <line x1="110" y1="105" x2="162" y2="155" stroke="${col}" stroke-width="9" stroke-linecap="round"/>
      <line x1="110" y1="175" x2="78" y2="275" stroke="${col}" stroke-width="10" stroke-linecap="round"/>
      <line x1="110" y1="175" x2="142" y2="275" stroke="${col}" stroke-width="10" stroke-linecap="round"/>
    `;
  } else if (pose === 'thinking') {
    body = `
      <ellipse cx="110" cy="285" rx="54" ry="12" fill="rgba(0,0,0,0.7)"/>
      <circle cx="110" cy="45" r="28" fill="${col}" filter="drop-shadow(0 0 16px ${glow})"/>
      <line x1="110" y1="73" x2="110" y2="175" stroke="${col}" stroke-width="10" stroke-linecap="round"/>
      <!-- Hand to chin -->
      <path d="M110 105 L72 135 L92 62" fill="none" stroke="${col}" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/>
      <line x1="110" y1="105" x2="158" y2="155" stroke="${col}" stroke-width="9" stroke-linecap="round"/>
      <line x1="110" y1="175" x2="78" y2="275" stroke="${col}" stroke-width="10" stroke-linecap="round"/>
      <line x1="110" y1="175" x2="142" y2="275" stroke="${col}" stroke-width="10" stroke-linecap="round"/>
      <!-- Thought bubble -->
      <circle cx="160" cy="35" r="7" fill="${glow}" filter="drop-shadow(0 0 8px ${glow})"/>
      <circle cx="180" cy="20" r="11" fill="${glow}" filter="drop-shadow(0 0 12px ${glow})"/>
    `;
  } else if (pose === 'exhausted') {
    body = `
      <ellipse cx="105" cy="285" rx="56" ry="12" fill="rgba(0,0,0,0.7)"/>
      <circle cx="98" cy="56" r="28" fill="${col}" filter="drop-shadow(0 0 14px ${glow})"/>
      <!-- Sweat drop -->
      <path d="M136 48 Q140 60 134 66 Q128 60 136 48 Z" fill="#38BDF8" filter="drop-shadow(0 0 10px #38BDF8)"/>
      <line x1="102" y1="84" x2="106" y2="175" stroke="${col}" stroke-width="10" stroke-linecap="round"/>
      <!-- Dangling tired arms -->
      <line x1="104" y1="115" x2="72" y2="185" stroke="${col}" stroke-width="9" stroke-linecap="round"/>
      <line x1="104" y1="115" x2="138" y2="185" stroke="${col}" stroke-width="9" stroke-linecap="round"/>
      <line x1="106" y1="175" x2="75" y2="275" stroke="${col}" stroke-width="10" stroke-linecap="round"/>
      <line x1="106" y1="175" x2="135" y2="275" stroke="${col}" stroke-width="10" stroke-linecap="round"/>
    `;
  } else if (pose === 'headache') {
    body = `
      <ellipse cx="110" cy="285" rx="54" ry="12" fill="rgba(0,0,0,0.7)"/>
      <circle cx="110" cy="48" r="28" fill="${col}" filter="drop-shadow(0 0 20px ${glow})"/>
      <line x1="110" y1="76" x2="110" y2="175" stroke="${col}" stroke-width="10" stroke-linecap="round"/>
      <!-- Clutching head -->
      <path d="M110 105 L62 85 L86 48" fill="none" stroke="${col}" stroke-width="9" stroke-linecap="round"/>
      <path d="M110 105 L158 85 L134 48" fill="none" stroke="${col}" stroke-width="9" stroke-linecap="round"/>
      <line x1="110" y1="175" x2="78" y2="275" stroke="${col}" stroke-width="10" stroke-linecap="round"/>
      <line x1="110" y1="175" x2="142" y2="275" stroke="${col}" stroke-width="10" stroke-linecap="round"/>
      <!-- Pain sparks -->
      <path d="M52 22 L64 38 L55 46 L72 58" stroke="#FF453A" stroke-width="4.5" fill="none" stroke-linecap="round" filter="drop-shadow(0 0 12px #FF453A)"/>
      <path d="M168 22 L156 38 L165 46 L148 58" stroke="#FF453A" stroke-width="4.5" fill="none" stroke-linecap="round" filter="drop-shadow(0 0 12px #FF453A)"/>
    `;
  } else if (pose === 'terrified') {
    body = `
      <ellipse cx="110" cy="285" rx="58" ry="12" fill="rgba(0,0,0,0.7)"/>
      <circle cx="110" cy="48" r="28" fill="${col}" filter="drop-shadow(0 0 20px ${glow})"/>
      <line x1="110" y1="76" x2="110" y2="175" stroke="${col}" stroke-width="10" stroke-linecap="round"/>
      <!-- Hands up shielding -->
      <path d="M110 108 L72 100 L62 62" fill="none" stroke="${col}" stroke-width="9" stroke-linecap="round"/>
      <path d="M110 108 L148 100 L158 62" fill="none" stroke="${col}" stroke-width="9" stroke-linecap="round"/>
      <line x1="110" y1="175" x2="68" y2="275" stroke="${col}" stroke-width="10" stroke-linecap="round"/>
      <line x1="110" y1="175" x2="152" y2="275" stroke="${col}" stroke-width="10" stroke-linecap="round"/>
    `;
  } else if (pose === 'collapse') {
    body = `
      <ellipse cx="120" cy="275" rx="66" ry="13" fill="rgba(0,0,0,0.75)"/>
      <circle cx="72" cy="138" r="28" fill="${col}" filter="drop-shadow(0 0 20px ${glow})"/>
      <!-- Slumped over -->
      <line x1="88" y1="154" x2="142" y2="190" stroke="${col}" stroke-width="10" stroke-linecap="round"/>
      <line x1="142" y1="190" x2="158" y2="260" stroke="${col}" stroke-width="10" stroke-linecap="round"/>
      <line x1="158" y1="260" x2="82" y2="270" stroke="${col}" stroke-width="10" stroke-linecap="round"/>
      <line x1="104" y1="165" x2="82" y2="245" stroke="${col}" stroke-width="9" stroke-linecap="round"/>
    `;
  } else if (pose === 'talk') {
    body = `
      <ellipse cx="110" cy="285" rx="54" ry="12" fill="rgba(0,0,0,0.7)"/>
      <circle cx="110" cy="45" r="28" fill="${col}" filter="drop-shadow(0 0 18px ${glow})"/>
      <line x1="110" y1="73" x2="110" y2="175" stroke="${col}" stroke-width="10" stroke-linecap="round"/>
      <!-- Presenting gesture -->
      <path d="M110 105 L158 110 L188 82" fill="none" stroke="${col}" stroke-width="9" stroke-linecap="round"/>
      <line x1="110" y1="105" x2="58" y2="155" stroke="${col}" stroke-width="9" stroke-linecap="round"/>
      <line x1="110" y1="175" x2="80" y2="275" stroke="${col}" stroke-width="10" stroke-linecap="round"/>
      <line x1="110" y1="175" x2="140" y2="275" stroke="${col}" stroke-width="10" stroke-linecap="round"/>
    `;
  }
  return `<svg width="${w}" height="${h}" viewBox="0 0 220 300" fill="none" xmlns="http://www.w3.org/2000/svg">${body}</svg>`;
}

// Modern 3D Stage Environment (Venetian Slats + Cyber Grid Floor + Bokeh Motes)
function setupModernStage(parent, mood = 'cyan') {
  // Studio Venetian Gobo Slats Layer
  el('div', 'stage-gobo-shadows', null, parent);

  // Atmospheric Mood Glow behind content
  el('div', 'stage-ambient-aura ' + mood, null, parent);
  
  // 3D Perspective Cyber Grid Floor
  el('div', 'stage-grid-floor', '<div class="stage-grid-plane"></div>', parent);
  el('div', 'stage-horizon-glow', null, parent);
  
  // Ambient Floating Bokeh Particles
  const pBox = el('div', 'ambient-particles-container', null, parent);
  const particleColors = mood === 'danger' 
    ? ['#FF453A', '#FF9F0A', '#FFD255'] 
    : mood === 'purple' 
    ? ['#C084FC', '#38BDF8', '#E5B842'] 
    : mood === 'gold' 
    ? ['#FFD255', '#E5B842', '#38BDF8'] 
    : ['#38BDF8', '#0EA5E9', '#CCFF00'];
    
  const particles = [
    { x: 140, y: 380, s: 7, col: 0 },
    { x: 920, y: 520, s: 9, col: 1 },
    { x: 240, y: 840, s: 5, col: 0 },
    { x: 820, y: 980, s: 8, col: 2 },
    { x: 180, y: 1220, s: 9, col: 1 },
    { x: 880, y: 1380, s: 6, col: 0 },
    { x: 450, y: 310, s: 5, col: 2 },
    { x: 620, y: 720, s: 6, col: 0 },
    { x: 340, y: 1100, s: 8, col: 1 },
    { x: 760, y: 440, s: 7, col: 0 },
    { x: 150, y: 680, s: 8, col: 2 },
    { x: 940, y: 880, s: 6, col: 1 },
  ];
  
  particles.forEach(p => {
    const c = particleColors[p.col % particleColors.length];
    el('div', 'ambient-mote', null, pBox, 
      `left:${p.x}px;top:${p.y}px;width:${p.s}px;height:${p.s}px;background:${c};box-shadow:0 0 ${p.s * 2}px ${c};`
    );
  });
}

let s, c, x;

// ==============================================================
// SCENE 1: HOOK (0.00s -> 4.50s)
// "What happens to your brain if you do not sleep for seven straight days? Day one."
// ==============================================================
s = scene(0, 4.50, { cap: true, whoosh: false, push: 1.05 });
setupModernStage(s, 'gold');
c = el('div', 'center', null, s, 'gap:32px;justify-content:center');

item(c, `<span class="pill badge-gold">⚠️ HUMAN BIOLOGY EXPERIMENT</span>`, { t: 0.1, type: 'down', sfx: 'tick' });

// Center Motion Graphics Kinetic Text & Brain Graphic
x = item(c, `
  <div style="display:flex;flex-direction:column;align-items:center;text-align:center">
    <div class="kinetic-sub">WHAT HAPPENS TO YOUR BRAIN</div>
    <div class="kinetic-huge kinetic-gold" style="margin:8px 0">
      NO SLEEP <span class="kinetic-lime">7 DAYS</span>
    </div>
    
    <div style="display:flex;align-items:center;justify-content:center;gap:35px;margin-top:20px">
      <!-- 3D Wireframe Brain SVG -->
      <svg width="220" height="180" viewBox="0 0 180 150" fill="none">
        <path d="M30 75 Q15 45 45 25 Q75 10 90 35 Q105 10 135 25 Q165 45 150 75 Q165 110 135 130 Q105 140 90 120 Q75 140 45 130 Q15 110 30 75 Z" stroke="#FFD255" stroke-width="4.5" fill="rgba(229,184,66,0.15)" filter="drop-shadow(0 0 20px #FFD255)"/>
        <line x1="90" y1="35" x2="90" y2="120" stroke="#FFD255" stroke-width="3" stroke-dasharray="6 6"/>
        <circle cx="65" cy="65" r="8" fill="#FFD255" filter="drop-shadow(0 0 10px #FFD255)"/>
        <circle cx="115" cy="65" r="8" fill="#FFD255" filter="drop-shadow(0 0 10px #FFD255)"/>
        <circle cx="90" cy="95" r="9" fill="#FF453A" filter="drop-shadow(0 0 12px #FF453A)"/>
      </svg>
      ${stickActor('thinking', 200, 270, '#FFFFFF', '#E5B842')}
    </div>
  </div>
`, { t: 0.3, type: 'zoom', d: 0.7, sfx: 'pop', out: 3.8 });
punch(0.3);

// Day 1 Milestone entrance
item(c, `
  <div class="card card-3d card-gold" style="width:580px;padding:20px 36px;display:flex;align-items:center;gap:24px;border-radius:24px">
    <div style="font-size:76px;font-weight:900;color:var(--gold);line-height:1">01</div>
    <div style="text-align:left">
      <div style="font-size:22px;color:var(--muted);letter-spacing:2px">MILESTONE REACHED</div>
      <div style="font-size:38px;font-weight:800;color:#FFF">DAY ONE: 24 HOURS</div>
    </div>
  </div>
`, { t: 4.15, type: 'rise', d: 0.45, sfx: 'hit' });
punch(4.17);


// ==============================================================
// SCENE 2: EXHAUSTION & IRRITABILITY (4.50s -> 7.10s)
// "You feel exhausted and irritable."
// ==============================================================
s = scene(4.50, 7.10, { cap: true, push: 1.04 });
setupModernStage(s, 'danger');
c = el('div', 'center', null, s, 'gap:32px;justify-content:center');

item(c, `<span class="pill badge-danger">🔥 CRANIAL FATIGUE ONSET</span>`, { t: 4.6, type: 'down', sfx: 'tick' });

x = item(c, `
  <div style="display:flex;flex-direction:column;align-items:center;text-align:center">
    <div class="kinetic-sub">EMOTIONAL STABILITY COLLAPSE</div>
    <div class="kinetic-huge kinetic-red" style="margin:4px 0">
      EXHAUSTED
    </div>
    <div class="kinetic-big" style="color:#FFF">
      &amp; <span class="kinetic-lime">IRRITABLE</span>
    </div>

    <div style="display:flex;align-items:center;gap:40px;justify-content:center;margin-top:24px">
      ${stickActor('exhausted', 220, 280, '#E2E8F0', '#FF9F0A')}
      
      <div class="card card-3d card-danger" style="width:460px;padding:30px;text-align:center">
        <div style="font-size:22px;color:var(--muted);letter-spacing:2px">CORTISOL SURGE</div>
        <div style="font-size:72px;font-weight:900;color:var(--danger);margin:6px 0;text-shadow:0 0 30px rgba(255,69,58,0.7)">+85%</div>
        <div style="width:100%;height:14px;background:rgba(255,255,255,0.08);border-radius:7px;margin-top:14px;overflow:hidden;border:1px solid rgba(255,69,58,0.3)">
          <div style="width:85%;height:100%;background:linear-gradient(90deg, #FF9F0A, #FF453A);border-radius:7px;box-shadow:0 0 20px #FF453A"></div>
        </div>
      </div>
    </div>
  </div>
`, { t: 4.75, type: 'rise', d: 0.6, sfx: 'whoosh' });


// ==============================================================
// SCENE 3: ADENOSINE CHEMICAL FLOOD (7.10s -> 11.50s)
// "Adenosine, the sleep-inducing chemical, is drowning your brain cells. Day three."
// ==============================================================
s = scene(7.10, 11.50, { cap: true, push: 1.05 });
setupModernStage(s, 'cyan');
c = el('div', 'center', null, s, 'gap:32px;justify-content:center');

item(c, `<span class="pill badge-cyan">🧪 BIOCHEMICAL OVERLOAD</span>`, { t: 7.2, type: 'down', sfx: 'pop' });

x = item(c, `
  <div style="display:flex;flex-direction:column;align-items:center;text-align:center">
    <div class="kinetic-sub">MOLECULAR FORMULA: C₁₀H₁₃N₅O₄</div>
    <div class="kinetic-huge kinetic-cyan" style="margin:4px 0">
      ADENOSINE
    </div>
    <div class="kinetic-big" style="color:#FFF">
      DROWNING <span class="kinetic-lime">CELLS</span>
    </div>
    
    <!-- 3D Biological Chamber -->
    <div style="margin:20px auto;width:380px;height:170px;border:3px solid #38BDF8;border-radius:28px;position:relative;overflow:hidden;background:#091422;box-shadow:0 0 45px rgba(56,189,248,0.35)">
      <div style="position:absolute;bottom:0;left:0;width:100%;height:88%;background:linear-gradient(180deg, #38BDF8, #0284C7);opacity:0.85;box-shadow:0 0 35px #38BDF8"></div>
      <div style="position:absolute;top:40%;left:0;width:100%;text-align:center;color:#FFF;font-size:28px;font-weight:900;text-shadow:0 0 15px #000">
        RECEPTORS SATURATED · 94%
      </div>
    </div>
  </div>
`, { t: 7.3, type: 'zoom', d: 0.65, sfx: 'whoosh', out: 10.7 });
punch(7.4);

// Day 3 Milestone entrance
item(c, `
  <div class="card card-3d card-cyan" style="width:580px;padding:20px 36px;display:flex;align-items:center;gap:24px;border-radius:24px">
    <div style="font-size:76px;font-weight:900;color:#38BDF8;line-height:1">03</div>
    <div style="text-align:left">
      <div style="font-size:22px;color:var(--muted);letter-spacing:2px">CRITICAL THRESHOLD</div>
      <div style="font-size:38px;font-weight:800;color:#FFF">DAY THREE: 72 HOURS</div>
    </div>
  </div>
`, { t: 10.9, type: 'rise', d: 0.45, sfx: 'hit' });
punch(10.9);


// ==============================================================
// SCENE 4: MICRO-SLEEPS (11.50s -> 13.90s)
// "Your brain enters micro-sleeps."
// ==============================================================
s = scene(11.50, 13.90, { cap: true, push: 1.04 });
setupModernStage(s, 'cyan');
c = el('div', 'center', null, s, 'gap:32px;justify-content:center');

item(c, `
  <div style="display:flex;flex-direction:column;align-items:center;text-align:center">
    <div class="kinetic-sub">INVOLUNTARY SYSTEM FREEZE</div>
    <div class="kinetic-huge kinetic-glitch" style="margin:6px 0">
      MICRO-SLEEP
    </div>
    <div class="kinetic-big kinetic-lime">
      3 TO 15 SECONDS
    </div>
    
    <div style="margin-top:20px">
      ${stickActor('stand', 220, 270, '#FFFFFF', '#38BDF8')}
    </div>
  </div>
`, { t: 11.6, type: 'pop', d: 0.5, sfx: 'pop' });
punch(11.85);


// ==============================================================
// SCENE 5: NEURONS SHUT DOWN / EYES WIDE OPEN (13.90s -> 18.20s)
// "Neurons shut down for seconds at a time while your eyes are still wide open."
// ==============================================================
s = scene(13.90, 18.20, { cap: true, push: 1.05 });
setupModernStage(s, 'danger');
c = el('div', 'center', null, s, 'gap:30px;justify-content:center');

// Cinematic Face Close-up with Detailed Veins and Expression
item(c, `
  <div style="width:380px;height:380px;border-radius:50%;background:#0A131F;border:7px solid #FF453A;box-shadow:0 0 70px rgba(255,69,58,0.6);position:relative;display:flex;flex-direction:column;align-items:center;justify-content:center">
    <!-- Forehead veins -->
    <div style="position:absolute;top:32px;display:flex;gap:45px">
      <div style="width:30px;height:4px;background:#FF453A;transform:rotate(20deg);border-radius:2px"></div>
      <div style="width:30px;height:4px;background:#FF453A;transform:rotate(-20deg);border-radius:2px"></div>
    </div>

    <!-- Eyes Row -->
    <div style="display:flex;align-items:center;gap:35px;margin-top:15px">
      <!-- Left Eye -->
      <div style="width:92px;height:125px;background:#FFF;border-radius:50%;position:relative;overflow:hidden;box-shadow:inset 0 0 20px rgba(255,69,58,0.5)">
        <div style="width:42px;height:42px;background:#030712;border-radius:50%;position:absolute;top:41px;left:25px;border:3px solid #38BDF8"></div>
        <div style="position:absolute;top:15px;left:10px;width:34px;height:3px;background:#FF453A;transform:rotate(25deg)"></div>
        <div style="position:absolute;bottom:22px;right:12px;width:30px;height:3px;background:#FF453A;transform:rotate(-20deg)"></div>
        <div style="position:absolute;top:50px;right:8px;width:24px;height:2.5px;background:#FF453A;transform:rotate(10deg)"></div>
      </div>
      <!-- Right Eye -->
      <div style="width:92px;height:125px;background:#FFF;border-radius:50%;position:relative;overflow:hidden;box-shadow:inset 0 0 20px rgba(255,69,58,0.5)">
        <div style="width:42px;height:42px;background:#030712;border-radius:50%;position:absolute;top:41px;left:25px;border:3px solid #38BDF8"></div>
        <div style="position:absolute;top:15px;right:10px;width:34px;height:3px;background:#FF453A;transform:rotate(-25deg)"></div>
        <div style="position:absolute;bottom:22px;left:12px;width:30px;height:3px;background:#FF453A;transform:rotate(20deg)"></div>
        <div style="position:absolute;top:50px;left:8px;width:24px;height:2.5px;background:#FF453A;transform:rotate(-10deg)"></div>
      </div>
    </div>

    <!-- Trembling Clenched Mouth -->
    <div style="margin-top:30px;width:105px;height:14px;border:4px solid #FFF;border-radius:7px;background:rgba(255,255,255,0.2)"></div>
  </div>
`, { t: 14.0, type: 'zoom', d: 0.6, sfx: 'whoosh' });
punch(14.2);

// Kinetic Motion Graphics Text
item(c, `
  <div style="text-align:center">
    <div class="kinetic-big kinetic-red">
      NEURONS <span class="kinetic-glitch">SHUT DOWN</span>
    </div>
    <div class="kinetic-sub" style="color:#FFF;margin-top:6px">
      EYES ARE WIDE OPEN · <span class="kinetic-cyan">45% OFFLINE</span>
    </div>
  </div>
`, { t: 15.0, type: 'rise', d: 0.5, sfx: 'hit' });


// ==============================================================
// SCENE 6: HALLUCINATIONS & SHADOWS (18.20s -> 22.80s)
// "Shadows begin to move, and intense hallucinations start. Day five."
// ==============================================================
s = scene(18.20, 22.80, { cap: true, push: 1.05 });
setupModernStage(s, 'purple');
c = el('div', 'center', null, s, 'gap:30px;justify-content:center');

item(c, `<span class="pill" style="background:rgba(168,85,247,0.25);color:#C084FC;border:1.5px solid #A855F7;font-weight:800">👁️ VISUAL PSYCHOSIS ACTIVATED</span>`, { t: 18.3, type: 'down', sfx: 'pop' });

x = item(c, `
  <div style="display:flex;flex-direction:column;align-items:center;text-align:center;position:relative">
    <!-- Creeping Phantom Shapes -->
    <div style="position:absolute;top:-20px;left:-110px;font-size:110px;opacity:0.45;filter:blur(6px)">👤</div>
    <div style="position:absolute;top:50px;right:-110px;font-size:130px;opacity:0.45;filter:blur(8px)">👁️</div>
    
    <div class="kinetic-sub">DOPAMINE OVERFLOW</div>
    <div class="kinetic-huge kinetic-purple" style="margin:4px 0">
      SHADOWS MOVE
    </div>
    <div class="kinetic-big" style="color:#FFF">
      INTENSE <span class="kinetic-lime">HALLUCINATIONS</span>
    </div>

    <div style="margin-top:20px">
      ${stickActor('terrified', 230, 280, '#F1F5F9', '#A855F7')}
    </div>
  </div>
`, { t: 18.4, type: 'rise', d: 0.6, sfx: 'whoosh', out: 21.6 });

// Day 5 Milestone entrance
item(c, `
  <div class="card card-3d card-purple" style="width:580px;padding:20px 36px;display:flex;align-items:center;gap:24px;border-radius:24px">
    <div style="font-size:76px;font-weight:900;color:#C084FC;line-height:1">05</div>
    <div style="text-align:left">
      <div style="font-size:22px;color:var(--muted);letter-spacing:2px">DELIRIUM STAGE</div>
      <div style="font-size:38px;font-weight:800;color:#FFF">DAY FIVE: 120 HOURS</div>
    </div>
  </div>
`, { t: 21.8, type: 'rise', d: 0.45, sfx: 'hit' });
punch(21.8);


// ==============================================================
// SCENE 7: EXTREME PARANOIA (22.80s -> 25.00s)
// "Extreme paranoia kicks in."
// ==============================================================
s = scene(22.80, 25.00, { cap: true, push: 1.06 });
setupModernStage(s, 'danger');
c = el('div', 'center', null, s, 'gap:32px;justify-content:center');

item(c, `
  <div style="display:flex;flex-direction:column;align-items:center;text-align:center">
    <div class="kinetic-sub" style="color:#FF453A">AMYGDALA MAXIMUM OVERDRIVE</div>
    <div class="kinetic-huge kinetic-glitch kinetic-red" style="margin:6px 0">
      PARANOIA
    </div>
    <div class="kinetic-big kinetic-gold">
      FIGHT OR FLIGHT
    </div>
    
    <div style="margin-top:20px">
      ${stickActor('headache', 240, 290, '#FF453A', '#FF453A')}
    </div>
  </div>
`, { t: 23.0, type: 'zoom', d: 0.45, sfx: 'hit' });
shake(23.1, 0.5, 18);


// ==============================================================
// SCENE 8: IMMUNE & TEMPERATURE COLLAPSE (25.00s -> 31.40s)
// "Your immune system completely collapses, and your body can no longer regulate its own temperature."
// ==============================================================
s = scene(25.00, 31.40, { cap: true, push: 1.05 });
setupModernStage(s, 'cyan');
c = el('div', 'center', null, s, 'gap:32px;justify-content:center');

item(c, `<span class="pill badge-danger">⚠️ SYSTEMIC HOMEOSTASIS FAILURE</span>`, { t: 25.1, type: 'down', sfx: 'tick' });

item(c, `
  <div style="display:flex;flex-direction:column;align-items:center;text-align:center">
    <div class="kinetic-sub">THERMAL REGULATION FAILURE</div>
    <div class="kinetic-huge kinetic-cyan">34.5°C</div>
    <div class="kinetic-big kinetic-red">IMMUNE COLLAPSE: 0%</div>

    <div style="display:flex;align-items:center;gap:35px;justify-content:center;margin-top:20px">
      ${stickActor('exhausted', 200, 260, '#38BDF8', '#38BDF8')}
      
      <div class="card card-3d card-danger" style="width:480px;padding:28px;text-align:center">
        <div style="font-size:22px;color:var(--muted);letter-spacing:2px">DEFENSE MECHANISM</div>
        <div style="font-size:62px;font-weight:900;color:var(--danger)">OFFLINE</div>
        <div style="font-size:24px;color:#FFF;margin-top:6px">WHITE BLOOD CELLS 0%</div>
      </div>
    </div>
  </div>
`, { t: 25.2, type: 'rise', d: 0.6, sfx: 'whoosh' });


// ==============================================================
// SCENE 9: DAY 7 (31.40s -> 34.50s)
// "Day seven. Your brain turns on itself."
// ==============================================================
s = scene(31.40, 34.50, { cap: true, push: 1.06 });
setupModernStage(s, 'danger');
c = el('div', 'center', null, s, 'gap:30px;justify-content:center');

item(c, `
  <div style="display:flex;flex-direction:column;align-items:center;text-align:center">
    <div class="kinetic-sub" style="color:#FF453A;letter-spacing:6px">THE CRITICAL THRESHOLD</div>
    <div class="kinetic-huge kinetic-red" style="font-size:160px;line-height:0.9;margin:10px 0;text-shadow:0 0 60px rgba(255,69,58,0.9)">
      DAY 07
    </div>
    <div class="kinetic-big" style="color:#FFF">
      BRAIN TURNS <span class="kinetic-lime">ON ITSELF</span>
    </div>
  </div>
`, { t: 31.6, type: 'zoom', d: 0.65, sfx: 'boom' });
punch(31.8);
shake(32.0, 0.4, 20);


// ==============================================================
// SCENE 10: MICROGLIA EATING NEURONS (34.50s -> 39.50s)
// "Microglia cells begin eating your own healthy neurons and synapses."
// ==============================================================
s = scene(34.50, 39.50, { cap: true, push: 1.05 });
setupModernStage(s, 'danger');
c = el('div', 'center', null, s, 'gap:30px;justify-content:center');

item(c, `<span class="pill badge-danger">⚠️ AUTO-PHAGOCYTOSIS PROTOCOL</span>`, { t: 34.6, type: 'down', sfx: 'tick' });

item(c, `
  <div style="display:flex;flex-direction:column;align-items:center;text-align:center">
    <div class="kinetic-sub">CELLULAR AUTO-CANNIBALISM</div>
    <div class="kinetic-huge kinetic-red" style="margin:4px 0">
      MICROGLIA
    </div>
    <div class="kinetic-big" style="color:#FFF">
      EATING <span class="kinetic-gold">HEALTHY SYNAPSES</span>
    </div>
    
    <!-- Microscopic Arena Graphic -->
    <div style="margin:20px auto;width:580px;height:190px;position:relative;background:#09121E;border-radius:24px;border:2px dashed rgba(255,69,58,0.5);display:flex;align-items:center;justify-content:space-around;overflow:hidden">
      <!-- Synaptic Nodes -->
      <div style="width:42px;height:42px;border-radius:50%;background:#FFD255;box-shadow:0 0 25px #FFD255;position:relative">
        <div style="position:absolute;top:-18px;left:-5px;font-size:14px;color:#FFD255;font-weight:800">SYNAPSE</div>
      </div>
      <div style="width:42px;height:42px;border-radius:50%;background:#FFD255;box-shadow:0 0 25px #FFD255"></div>
      <!-- Spiky Microglia Phagocyte Monster -->
      <div style="width:105px;height:105px;border-radius:50%;background:radial-gradient(circle, #FF453A 0%, #B91C1C 100%);box-shadow:0 0 45px #FF453A;display:flex;align-items:center;justify-content:center;color:#000;font-weight:900;font-size:18px;letter-spacing:1px">
        DEVOUR
      </div>
      <div style="width:42px;height:42px;border-radius:50%;background:rgba(255,210,85,0.25)"></div>
    </div>
  </div>
`, { t: 34.8, type: 'zoom', d: 0.6, sfx: 'whoosh' });
punch(35.0);


// ==============================================================
// SCENE 11: ORGAN FAILURE & DEATH RISK (39.50s -> 43.80s)
// "Organ failure begins, and death becomes a real medical risk."
// ==============================================================
s = scene(39.50, 43.80, { cap: true, push: 1.05 });
setupModernStage(s, 'danger');
c = el('div', 'center', null, s, 'gap:30px;justify-content:center');

item(c, `
  <div style="display:flex;flex-direction:column;align-items:center;text-align:center">
    <div class="kinetic-sub" style="color:var(--danger)">VITAL SIGNS FLATLINING</div>
    <div class="kinetic-huge kinetic-red" style="margin:4px 0">
      ORGAN FAILURE
    </div>
    <div class="kinetic-big" style="color:#FFF">
      FATAL <span class="kinetic-glitch">MEDICAL RISK</span>
    </div>
    
    <!-- ECG Monitor Line -->
    <div style="width:580px;height:60px;margin:15px auto;display:flex;align-items:center">
      <svg width="100%" height="60" viewBox="0 0 600 60" fill="none">
        <path d="M0 30 L180 30 L200 10 L220 50 L240 15 L260 30 L600 30" stroke="#FF453A" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" filter="drop-shadow(0 0 12px #FF453A)"/>
      </svg>
    </div>

    <div style="margin-top:10px">
      ${stickActor('collapse', 240, 250, '#FF453A', '#FF453A')}
    </div>
  </div>
`, { t: 39.7, type: 'rise', d: 0.6, sfx: 'boom' });
shake(40.0, 0.6, 16);


// ==============================================================
// SCENE 12: CALL TO ACTION (43.80s -> 49.59s)
// "What is the longest you have ever stayed awake? Tell us in the comments!"
// ==============================================================
s = scene(43.80, 49.59, { cap: true, push: 1.04 });
setupModernStage(s, 'gold');
c = el('div', 'center', null, s, 'gap:30px;justify-content:center');

item(c, `<span class="pill badge-gold">💬 COMMUNITY RECORD</span>`, { t: 43.9, type: 'down', sfx: 'tick' });

item(c, `
  <div style="display:flex;flex-direction:column;align-items:center;text-align:center">
    <div class="kinetic-sub" style="color:var(--gold)">WHAT'S YOUR RECORD?</div>
    <div class="kinetic-huge kinetic-gold" style="margin:6px 0">
      LONGEST AWAKE?
    </div>
    <div class="kinetic-big kinetic-lime" style="margin:10px 0">
      COMMENT BELOW! 👇
    </div>
    
    <div style="display:flex;align-items:center;gap:35px;justify-content:center;margin-top:15px">
      <!-- Floating Record Pills -->
      <div style="display:flex;flex-direction:column;gap:12px">
        <div class="pill" style="background:rgba(255,255,255,0.1);color:#FFF;border:1px solid rgba(255,255,255,0.3);font-size:24px">⏱️ 36 HOURS</div>
        <div class="pill" style="background:rgba(204,255,0,0.15);color:#CCFF00;border:1px solid #CCFF00;font-size:24px">🔥 48 HOURS</div>
      </div>
      
      ${stickActor('talk', 220, 270, '#FFFFFF', '#E5B842')}
    </div>
  </div>
`, { t: 44.1, type: 'zoom', d: 0.6, sfx: 'pop' });
punch(44.3);
