// Envío a Google Sheets mediante Apps Script (placeholder) + export CSV
const scriptURL = "REEMPLAZA_CON_TU_WEBAPP_ID"; // <- reemplaza con tu Web App URL
const form = document.getElementById('monForm');
const statusEl = document.getElementById('status');
const exportBtn = document.getElementById('exportCSV');

function toCSV(rows){
  const header = ['fecha','ph','ce','temp','obs'];
  const data = [header.join(',')].concat(rows.map(r=>[r.fecha,r.ph,r.ce,r.temp,r.obs].join(',')));
  return data.join('\n');
}

const localKey = 'hidro-registros';
function loadLocal(){ return JSON.parse(localStorage.getItem(localKey) || '[]'); }
function saveLocal(rows){ localStorage.setItem(localKey, JSON.stringify(rows)); }

form?.addEventListener('submit', async (e)=>{
  e.preventDefault();
  const payload = {
    fecha: document.getElementById('fecha').value,
    ph: parseFloat(document.getElementById('ph').value),
    ce: parseFloat(document.getElementById('ce').value),
    temp: parseFloat(document.getElementById('temp').value),
    obs: document.getElementById('obs').value || ''
  };
  // Guarda local
  const rows = loadLocal(); rows.push(payload); saveLocal(rows);

  statusEl.textContent = "Guardado localmente. Enviando a Sheets...";
  try{
    if (scriptURL.includes('REEMPLAZA_CON_TU_WEBAPP_ID')) throw new Error('Placeholder');
    const res = await fetch(scriptURL, { method:'POST', mode:'no-cors', body: JSON.stringify(payload) });
    statusEl.textContent = "✅ Enviado a Sheets (si tu scriptURL es correcto).";
  }catch(err){
    statusEl.textContent = "⚠️ No se envió a Sheets (placeholder). Quedó guardado localmente.";
  }
  form.reset();
});

exportBtn?.addEventListener('click', ()=>{
  const rows = loadLocal();
  const blob = new Blob([toCSV(rows)], {type:'text/csv'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = 'registros_hidroponia.csv'; a.click();
  URL.revokeObjectURL(url);
});
