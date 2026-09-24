function initScratchCard(cardEl){
  const canvas = cardEl.querySelector('canvas');
  const ctx = canvas.getContext('2d');
  const rect = cardEl.getBoundingClientRect();
  canvas.width = rect.width;
  canvas.height = rect.height;

  function paintCoating(){
    // base coat
    ctx.fillStyle = '#C9B8F0';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // a light dot texture so it doesn't read as a flat rectangle
    ctx.fillStyle = 'rgba(75,59,122,.12)';
    for (let i = 0; i < 140; i++){
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      ctx.beginPath();
      ctx.arc(x, y, Math.random() * 1.6, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.font = '700 20px Caveat, cursive';
    ctx.fillStyle = '#4B3B7A';
    ctx.textAlign = 'center';
    ctx.fillText('scratch me!', canvas.width / 2, canvas.height / 2);
  }
  paintCoating();

  let scratching = false;
  let revealed = false;

  function scratchAt(x, y){
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 22, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalCompositeOperation = 'source-over';
  }

  function getPos(e){
    const r = canvas.getBoundingClientRect();
    const point = e.touches ? e.touches[0] : e;
    return { x: point.clientX - r.left, y: point.clientY - r.top };
  }

  function checkRevealThreshold(){
    if (revealed) return;
    const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    let clear = 0;
    for (let i = 3; i < data.length; i += 40){ // sample every 10th pixel's alpha
      if (data[i] < 30) clear++;
    }
    const sampled = data.length / 40;
    if (clear / sampled > 0.55){
      revealed = true;
      cardEl.dataset.revealed = 'true';   // ← mark for lightbox
      canvas.style.transition = 'opacity .5s ease';
      canvas.style.opacity = '0';
      setTimeout(() => canvas.style.pointerEvents = 'none', 500);
    }
  }

  function start(e){ scratching = true; const p = getPos(e); scratchAt(p.x, p.y); }
  function move(e){
    if (!scratching) return;
    const p = getPos(e);
    scratchAt(p.x, p.y);
    checkRevealThreshold();
  }
  function end(){ scratching = false; }

  canvas.addEventListener('mousedown', start);
  canvas.addEventListener('mousemove', move);
  window.addEventListener('mouseup', end);
  canvas.addEventListener('touchstart', start, { passive: true });
  canvas.addEventListener('touchmove', move, { passive: true });
  canvas.addEventListener('touchend', end);
}
