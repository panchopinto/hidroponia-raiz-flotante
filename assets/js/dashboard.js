// Dashboard con datos simulados; si conectas Sheets, reemplaza fetch de demo.
const demo = [
  {fecha:'2025-10-01', ph:6.0, ce:1.1, temp:19.8, obs:'Inicio sistema'},
  {fecha:'2025-10-03', ph:6.2, ce:1.3, temp:20.4, obs:'Plantines trasplantados'},
  {fecha:'2025-10-06', ph:6.1, ce:1.2, temp:21.0, obs:'Raíces activas'},
  {fecha:'2025-10-10', ph:6.3, ce:1.4, temp:22.1, obs:'Crecimiento vigoroso'},
  {fecha:'2025-10-15', ph:6.0, ce:1.2, temp:21.5, obs:'Ajuste pH'},
  {fecha:'2025-10-20', ph:6.1, ce:1.3, temp:20.9, obs:'Nutriente estable'},
  {fecha:'2025-10-23', ph:6.2, ce:1.2, temp:20.2, obs:'Raíces blancas'}
];

function avg(arr){ return (arr.reduce((a,b)=>a+b,0)/arr.length).toFixed(2); }

function render(data){
  const labels = data.map(r=>r.fecha);
  const ph = data.map(r=>r.ph);
  const ce = data.map(r=>r.ce);
  const temp = data.map(r=>r.temp);

  document.getElementById('avgPh').textContent = avg(ph);
  document.getElementById('avgCe').textContent = avg(ce);
  document.getElementById('avgTemp').textContent = avg(temp);

  const tbl = document.querySelector('#tbl tbody');
  tbl.innerHTML = data.map(r=>`<tr><td>${r.fecha}</td><td>${r.ph}</td><td>${r.ce}</td><td>${r.temp}</td><td>${r.obs||''}</td></tr>`).join('');

  const phCtx = document.getElementById('phChart');
  new Chart(phCtx, {
    type:'line',
    data:{ labels, datasets:[{ label:'pH', data:ph }] },
    options:{ responsive:true, maintainAspectRatio:false }
  });

  const ceCtx = document.getElementById('ceChart');
  new Chart(ceCtx, {
    type:'bar',
    data:{ labels, datasets:[{ label:'CE', data:ce }] },
    options:{ responsive:true, maintainAspectRatio:false }
  });

  const tCtx = document.getElementById('tempChart');
  new Chart(tCtx, {
    type:'line',
    data:{ labels, datasets:[{ label:'Temp (°C)', data:temp }] },
    options:{ responsive:true, maintainAspectRatio:false }
  });
}

// Inicializa con demo
render(demo);
