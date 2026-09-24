// One-shot confetti burst, used exactly once (the countdown reveal).
// Kept deliberately simple: a canvas overlay, a handful of particles, gravity.
function fireConfettiBurst(onDone){
  const colors = ['#FF8FB1', '#FFD966', '#A7C7E7', '#8B76D1', '#FFFBEA'];
  const canvas = document.createElement('canvas');
  canvas.style.position = 'fixed';
  canvas.style.inset = '0';
  canvas.style.zIndex = '50';
  canvas.style.pointerEvents = 'none';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  const resize = () => { canvas.width = innerWidth; canvas.height = innerHeight; };
  resize();
  addEventListener('resize', resize);

  const cx = canvas.width / 2, cy = canvas.height / 2;
  const count = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 140;
  const particles = Array.from({ length: count }, () => {
    const angle = Math.random() * Math.PI * 2;
    const speed = 4 + Math.random() * 10;
    return {
      x: cx, y: cy,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 4,
      size: 5 + Math.random() * 6,
      color: colors[Math.floor(Math.random() * colors.length)],
      rot: Math.random() * Math.PI,
      vrot: (Math.random() - 0.5) * 0.3,
      life: 1
    };
  });

  let frame = 0;
  function tick(){
    frame++;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let alive = false;
    for (const p of particles){
      p.vy += 0.18;
      p.x += p.vx;
      p.y += p.vy;
      p.rot += p.vrot;
      p.life -= 0.008;
      if (p.life > 0){
        alive = true;
        ctx.save();
        ctx.globalAlpha = Math.max(p.life, 0);
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
        ctx.restore();
      }
    }
    if (alive && frame < 300){
      requestAnimationFrame(tick);
    } else {
      canvas.remove();
      if (onDone) onDone();
    }
  }
  if (count === 0){ canvas.remove(); if (onDone) onDone(); }
  else requestAnimationFrame(tick);
}
