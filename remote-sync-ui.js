(()=>{'use strict';
const KEY='bocaina_commitment';
const normalize=value=>String(value??'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').trim().toLowerCase().replace(/\s+/g,' ');
const readRows=()=>{try{return JSON.parse(localStorage.getItem(KEY)||'[]')}catch{return[]}};
function paymentState(r){
  const p=normalize(r?.paymentStatus),source=normalize(r?.statusOrigem||r?.status),sent=normalize(r?.sent);
  if(r?.paid===true||p==='pago'||p.includes('pago'))return'pago';
  if(p.includes('enviado')||p.includes('enviada')||source.includes('enviado para pagamento')||source.includes('enviada para pagamento')||sent.includes('enviado para pagamento')||sent.includes('enviada para pagamento'))return'enviado';
  return'pendente';
}
function apply(){
  const body=document.getElementById('neRows');if(!body)return false;
  const table=body.closest('table');if(!table)return false;
  const heads=[...table.querySelectorAll('thead th')].map(x=>normalize(x.textContent));
  const payIdx=heads.indexOf('pagamento'),sitIdx=heads.indexOf('situacao');
  if(payIdx<0||sitIdx<0)return false;
  const data=readRows();
  body.querySelectorAll('tr.ne-row').forEach(row=>{
    const cells=row.children;if(!cells[payIdx]||!cells[sitIdx])return;
    const i=Number(row.dataset.i),r=data[i];let state=r?paymentState(r):'pendente';
    if(!r){const shown=normalize(cells[payIdx].textContent);if(shown.includes('enviado para pagamento'))state='enviado';else if(shown==='pago'||shown.includes('pago em'))state='pago';}
    const semCredito=state==='enviado'||state==='pago';
    const wanted=semCredito?'Sem crédito':'Com crédito',cls=semCredito?'ne-badge problema':'ne-badge pago';
    const badge=cells[sitIdx].querySelector('.ne-badge');if(!badge)return;
    if(badge.textContent.trim()!==wanted)badge.textContent=wanted;
    if(badge.className!==cls)badge.className=cls;
  });
  return true;
}
let observer=null,running=false;
function patch(){if(running)return;running=true;try{if(observer)observer.disconnect();apply()}finally{const body=document.getElementById('neRows');if(body){observer=new MutationObserver(()=>patch());observer.observe(body,{childList:true})}running=false}}
function boot(){
  if(document.getElementById('neRows')){patch();return;}
  const page=new MutationObserver(()=>{if(document.getElementById('neRows')){page.disconnect();patch()}});
  page.observe(document.body,{childList:true,subtree:true});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
document.addEventListener('bocaina:remote-sync',()=>setTimeout(patch,0));
})();
