// ── EDIT THIS ───────────────────────────────────────────────
// Set to the exact moment the countdown should hit zero.
const TARGET_DATE = new Date('2026-09-24T00:00:00');
// ────────────────────────────────────────────────────────────

// For quick testing without waiting: open index.html?skip
const params = new URLSearchParams(location.search);
const effectiveTarget = params.has('skip')
  ? new Date(Date.now() + 3000)
  : TARGET_DATE;

const digitsEl = document.getElementById('digits');
const units = [
  { key: 'days', label: 'DAYS' },
  { key: 'hours', label: 'HOURS' },
  { key: 'mins', label: 'MINS' },
  { key: 'secs', label: 'SECS' }
];

digitsEl.innerHTML = units.map(u => `
  <div class="digit-box">
    <span class="num" id="unit-${u.key}">00</span>
    <span class="label">${u.label}</span>
  </div>
`).join('');

let burst = false;

function tick() {
  const diff = effectiveTarget - Date.now();

  if (diff <= 0 && !burst) {
    burst = true;
    doBurst();
    return;
  }
  if (diff <= 0) return;

  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff / 3600000) % 24);
  const mins = Math.floor((diff / 60000) % 60);
  const secs = Math.floor((diff / 1000) % 60);

  document.getElementById('unit-days').textContent = String(days).padStart(2, '0');
  document.getElementById('unit-hours').textContent = String(hours).padStart(2, '0');
  document.getElementById('unit-mins').textContent = String(mins).padStart(2, '0');
  document.getElementById('unit-secs').textContent = String(secs).padStart(2, '0');

  requestAnimationFrame(tick);
}

function doBurst() {
  digitsEl.style.transition = 'opacity .4s ease, transform .4s ease';
  digitsEl.style.opacity = '0';
  digitsEl.style.transform = 'scale(1.06)';

  fireConfettiBurst(() => {
    document.getElementById('burst-line').style.opacity = '1';
    setTimeout(() => {
      location.href = 'happy-birthday.html';
    }, 1400);
  });
}

tick();
