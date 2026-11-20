// references/widget_recipes.js
// Ready-to-use 3D mechanical widgets and cards for Type 3 videos

// 1. Balance Scale (Mechanical seesaw with animated beam)
function widgetBalanceScale(leftLabel = 'ডেবিট (আসে)', rightLabel = 'ক্রেডিট (যায়)', w = 800) {
  return `
    <div class="card card-3d glow-gold" style="width:${w}px;padding:45px 30px;text-align:center;position:relative">
      <svg width="680" height="340" viewBox="0 0 680 340" fill="none">
        <path d="M340 50 L340 310" stroke="var(--highlight)" stroke-width="10" stroke-linecap="round"/>
        <path d="M260 310 L420 310" stroke="var(--highlight)" stroke-width="14" stroke-linecap="round"/>
        <circle cx="340" cy="50" r="16" fill="var(--highlight)" filter="drop-shadow(0 0 15px var(--highlight))"/>
        <g id="scale_beam" transform="rotate(-6 340 50)">
          <line x1="80" y1="50" x2="600" y2="50" stroke="#FFFFFF" stroke-width="8" stroke-linecap="round"/>
          <line x1="120" y1="50" x2="80" y2="160" stroke="rgba(255,255,255,0.6)" stroke-width="3"/>
          <line x1="120" y1="50" x2="160" y2="160" stroke="rgba(255,255,255,0.6)" stroke-width="3"/>
          <path d="M70 160 Q120 190 170 160 Z" fill="var(--success)" opacity="0.85"/>
          <line x1="560" y1="50" x2="520" y2="160" stroke="rgba(255,255,255,0.6)" stroke-width="3"/>
          <line x1="560" y1="50" x2="600" y2="160" stroke="rgba(255,255,255,0.6)" stroke-width="3"/>
          <path d="M510 160 Q560 190 610 160 Z" fill="var(--highlight)" opacity="0.85"/>
        </g>
      </svg>
      <div style="display:flex;justify-content:space-around;margin-top:10px">
        <div style="font-size:42px;font-weight:900;color:var(--success)">${leftLabel}</div>
        <div style="font-size:42px;font-weight:900;color:var(--highlight)">${rightLabel}</div>
      </div>
    </div>
  `;
}

// 2. Historical Year Rewind Odometer
function widgetYearOdometer(fromYear = 2026, toYear = 1494, locationText = 'ভেনিস, ইতালি') {
  return `
    <div class="card card-3d glow-gold" style="width:680px;padding:34px;text-align:center">
      <div style="font-size:32px;color:var(--muted);letter-spacing:3px">টাইম ট্রাভেল — ইতিহাস</div>
      <div id="yr_counter" style="font-size:150px;font-weight:900;color:var(--highlight);line-height:1.05;margin:10px 0;text-shadow:0 0 35px rgba(229,184,66,0.6)">${fromYear}</div>
      <div style="font-size:36px;color:#fff">${locationText}</div>
    </div>
  `;
}

// 3. Structured Accounting Ledger Sheet
function widgetLedgerSheet(title = 'সুশৃঙ্খল খাতা', subtitle = 'অডিট সমাপ্ত', rows = []) {
  const rowsHtml = rows.map(r => `
    <div style="display:flex;justify-content:space-between;padding:16px 20px;background:rgba(255,255,255,0.05);border-radius:16px">
      <span style="font-size:36px;color:#fff">${r.name}</span>
      <span style="font-size:36px;color:${r.col || 'var(--success)'};font-weight:800">${r.amount}</span>
    </div>
  `).join('');

  return `
    <div class="card card-3d glow-gold" style="width:820px;padding:38px 45px;text-align:left">
      <div style="display:flex;justify-content:space-between;align-items:center;border-bottom:2px solid rgba(229,184,66,0.3);padding-bottom:18px;margin-bottom:20px">
        <div>
          <div style="font-size:44px;font-weight:900;color:#fff">${title}</div>
          <div style="font-size:28px;color:var(--highlight)">${subtitle}</div>
        </div>
        <span class="pill success" style="font-size:26px">১০০% নির্ভুল</span>
      </div>
      <div style="display:flex;flex-direction:column;gap:16px">
        ${rowsHtml}
      </div>
      <div style="margin-top:24px;border-top:2px dashed rgba(255,255,255,0.2);padding-top:16px;display:flex;justify-content:space-between;align-items:center">
        <span style="font-size:34px;color:var(--highlight)">সব লেনদেন:</span>
        <span style="font-size:42px;font-weight:900;color:var(--success)">পরিষ্কার ও স্বচ্ছ ✔</span>
      </div>
    </div>
  `;
}
