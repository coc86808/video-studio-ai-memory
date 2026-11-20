// references/actor_recipes.js
// Vector Stickman Actor Generator with Contact Shadows and Accessories for Type 3 videos

function stickActor(pose = 'stand', w = 200, h = 280, col = '#FFFFFF', glow = '#E5B842') {
  let body = '';
  // Subtle contact shadow underneath character feet
  const shadow = `<ellipse cx="90" cy="245" rx="40" ry="9" fill="rgba(0,0,0,0.55)" filter="blur(2px)"/>`;

  if (pose === 'stand') {
    body = `
      ${shadow}
      <circle cx="90" cy="40" r="26" fill="${col}" filter="drop-shadow(0 0 14px ${glow})"/>
      <line x1="90" y1="66" x2="90" y2="155" stroke="${col}" stroke-width="9" stroke-linecap="round"/>
      <line x1="90" y1="95" x2="48" y2="135" stroke="${col}" stroke-width="8" stroke-linecap="round"/>
      <line x1="90" y1="95" x2="132" y2="135" stroke="${col}" stroke-width="8" stroke-linecap="round"/>
      <line x1="90" y1="155" x2="65" y2="238" stroke="${col}" stroke-width="9" stroke-linecap="round"/>
      <line x1="90" y1="155" x2="115" y2="238" stroke="${col}" stroke-width="9" stroke-linecap="round"/>
    `;
  } else if (pose === 'briefcase') {
    body = `
      ${shadow}
      <circle cx="90" cy="40" r="26" fill="${col}" filter="drop-shadow(0 0 16px ${glow})"/>
      <line x1="90" y1="66" x2="90" y2="155" stroke="${col}" stroke-width="9" stroke-linecap="round"/>
      <line x1="90" y1="95" x2="45" y2="120" stroke="${col}" stroke-width="8" stroke-linecap="round"/>
      <line x1="90" y1="95" x2="138" y2="125" stroke="${col}" stroke-width="8" stroke-linecap="round"/>
      <!-- Glowing Briefcase (Reference Video Style) -->
      <g transform="translate(126, 118)">
        <rect x="0" y="6" width="50" height="36" rx="7" fill="${glow}" filter="drop-shadow(0 0 20px ${glow})"/>
        <path d="M15 6V2a4 4 0 0 1 4-4h12a4 4 0 0 1 4 4v4" fill="none" stroke="${glow}" stroke-width="3.5"/>
        <line x1="0" y1="22" x2="50" y2="22" stroke="#1A1300" stroke-width="2.5"/>
        <text x="25" y="26" fill="#1A1300" font-size="11" font-weight="900" text-anchor="middle" font-family="sans-serif">SKILL</text>
      </g>
      <line x1="90" y1="155" x2="68" y2="238" stroke="${col}" stroke-width="9" stroke-linecap="round"/>
      <line x1="90" y1="155" x2="112" y2="238" stroke="${col}" stroke-width="9" stroke-linecap="round"/>
    `;
  } else if (pose === 'thinking') {
    body = `
      ${shadow}
      <circle cx="90" cy="40" r="26" fill="${col}" filter="drop-shadow(0 0 12px ${glow})"/>
      <line x1="90" y1="66" x2="90" y2="155" stroke="${col}" stroke-width="9" stroke-linecap="round"/>
      <!-- Arm to chin in deep thought -->
      <path d="M90 95 L56 122 L72 58" fill="none" stroke="${col}" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>
      <line x1="90" y1="95" x2="128" y2="142" stroke="${col}" stroke-width="8" stroke-linecap="round"/>
      <line x1="90" y1="155" x2="65" y2="238" stroke="${col}" stroke-width="9" stroke-linecap="round"/>
      <line x1="90" y1="155" x2="115" y2="238" stroke="${col}" stroke-width="9" stroke-linecap="round"/>
    `;
  } else if (pose === 'celebrate') {
    body = `
      ${shadow}
      <circle cx="90" cy="42" r="26" fill="${col}" filter="drop-shadow(0 0 18px ${glow})"/>
      <line x1="90" y1="68" x2="90" y2="155" stroke="${col}" stroke-width="9" stroke-linecap="round"/>
      <!-- Victory hands up in air -->
      <line x1="90" y1="95" x2="35" y2="35" stroke="${col}" stroke-width="9" stroke-linecap="round"/>
      <line x1="90" y1="95" x2="145" y2="35" stroke="${col}" stroke-width="9" stroke-linecap="round"/>
      <line x1="90" y1="155" x2="60" y2="238" stroke="${col}" stroke-width="9" stroke-linecap="round"/>
      <line x1="90" y1="155" x2="120" y2="238" stroke="${col}" stroke-width="9" stroke-linecap="round"/>
    `;
  } else if (pose === 'presenting') {
    body = `
      ${shadow}
      <circle cx="90" cy="40" r="26" fill="${col}" filter="drop-shadow(0 0 14px ${glow})"/>
      <line x1="90" y1="66" x2="90" y2="155" stroke="${col}" stroke-width="9" stroke-linecap="round"/>
      <!-- Left arm points to card, right arm relaxed -->
      <line x1="90" y1="95" x2="25" y2="75" stroke="${col}" stroke-width="8" stroke-linecap="round"/>
      <line x1="90" y1="95" x2="130" y2="135" stroke="${col}" stroke-width="8" stroke-linecap="round"/>
      <line x1="90" y1="155" x2="68" y2="238" stroke="${col}" stroke-width="9" stroke-linecap="round"/>
      <line x1="90" y1="155" x2="112" y2="238" stroke="${col}" stroke-width="9" stroke-linecap="round"/>
    `;
  }
  return `<svg width="${w}" height="${h}" viewBox="0 0 180 260" fill="none" xmlns="http://www.w3.org/2000/svg">${body}</svg>`;
}
