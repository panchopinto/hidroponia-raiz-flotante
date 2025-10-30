// Inclusión: narrador, contraste, tamaño de fuente, animación de burbujas, PWA install
let currentTheme = localStorage.getItem('theme') || 'dark';
applyTheme(currentTheme);

const voiceBtn = document.getElementById('voiceBtn');
const contrastBtn = document.getElementById('contrastBtn');
const contrastMenu = document.getElementById('contrastMenu');
const fontMinus = document.getElementById('fontMinus');
const fontPlus = document.getElementById('fontPlus');
const fxToggle = document.getElementById('fxToggle');

// Narrador simple
if (voiceBtn) {
  voiceBtn.addEventListener('click', () => {
    const text = document.title + '. ' + Array.from(document.querySelectorAll('h1,h2,h3,p,li'))
      .slice(0, 12).map(el=>el.innerText).join('. ');
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'es-ES'; u.rate = 1.0; u.pitch = 1;
    speechSynthesis.cancel(); speechSynthesis.speak(u);
  });
}

// Contraste
function applyTheme(theme){
  document.body.classList.remove('theme-light','theme-dark','theme-high','theme-sepia');
  const map = { light:'theme-light', dark:'theme-dark', high:'theme-high', sepia:'theme-sepia'};
  document.body.classList.add(map[theme] || 'theme-dark');
  localStorage.setItem('theme', theme);
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute('content', theme==='light' ? '#f7fbfc' : '#0b1114');
}
if (contrastBtn && contrastMenu){
  contrastBtn.addEventListener('click', () => {
    const open = contrastMenu.classList.contains('hidden');
    contrastMenu.classList.toggle('hidden', !open);
    contrastBtn.setAttribute('aria-expanded', String(open));
  });
  contrastMenu.querySelectorAll('.menu-item').forEach(btn => {
    btn.addEventListener('click', () => {
      applyTheme(btn.dataset.theme);
      contrastMenu.classList.add('hidden');
      contrastBtn.setAttribute('aria-expanded','false');
    });
  });
  document.addEventListener('click', (e)=>{
    if (!contrastMenu.contains(e.target) && e.target!==contrastBtn) contrastMenu.classList.add('hidden');
  });
}

// Tamaño de fuente
let baseSize = parseFloat(localStorage.getItem('fontSize') || '16');
function setFontSize(px){ document.documentElement.style.fontSize = px+'px'; localStorage.setItem('fontSize', px); }
setFontSize(baseSize);
fontMinus && fontMinus.addEventListener('click', ()=> setFontSize(Math.max(12, baseSize-=1)));
fontPlus && fontPlus.addEventListener('click', ()=> setFontSize(Math.min(22, baseSize+=1)));

// Burbujas Canvas
const canvas = document.getElementById('bubbles');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let w,h; const bubbles=[];
  function resize(){ w=canvas.width=window.innerWidth; h=canvas.height=window.innerHeight; }
  window.addEventListener('resize', resize); resize();
  for(let i=0;i<60;i++){ bubbles.push({x:Math.random()*w, y:h+Math.random()*h, r:2+Math.random()*6, s:0.5+Math.random()*1.5}); }
  let animOn = true;
  function draw(){
    if (!animOn) return;
    ctx.clearRect(0,0,w,h);
    ctx.fillStyle='rgba(43,212,138,0.15)';
    bubbles.forEach(b=>{
      ctx.beginPath(); ctx.arc(b.x, b.y, b.r, 0, Math.PI*2); ctx.fill();
      b.y -= b.s; if (b.y < -10) { b.y = h + 10; b.x = Math.random()*w; }
    });
    requestAnimationFrame(draw);
  }
  draw();
  fxToggle && fxToggle.addEventListener('click', ()=>{ animOn = !animOn; if(animOn) draw(); });
}

// PWA install
let deferredPrompt;
const installBtn = document.getElementById('installBtn');
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault(); deferredPrompt = e;
  if (installBtn) installBtn.hidden = false;
});
installBtn && installBtn.addEventListener('click', async () => {
  if (!deferredPrompt) return;
  deferredPrompt.prompt();
  await deferredPrompt.userChoice; deferredPrompt = null; installBtn.hidden = true;
});
