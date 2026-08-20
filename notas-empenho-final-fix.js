(()=>{'use strict';
const KEY='bocaina_commitment';
const norm=v=>String(v??'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').trim().toLowerCase();
function data(){try{const v=JSON.parse(localStorage.getItem(KEY)||'[]');return Array.isArray(v)?v:[]}catch{return[]}}
function payment(r){
 const p=norm(r?.paymentStatus), s=norm(r?.statusOrigem||r?.status), sent=norm(r?.sent);
 if(r?.paid===true || p==='pago' || p.includes('pago')) return 'pago';
 if(p==='enviado'||p.includes('enviado')||p.includes('enviada')||s.includes('enviado para pagamento')||s.includes('enviada para pagamento')||sent.includes('enviado para pagamento')||sent.includes('enviada para pagamento')||sent==='true') return 'enviado';
 return 'pendente';
}
function fix(){
 const body=document.getElementById('neRows'); if(!body)return;
 const rows=[...body.querySelectorAll('tr.ne-row')], d=data();
 rows.forEach(row=>{
   const cells=row.children; if(cells.length<8)return;
   const i=Number(row.dataset.i), r=d[i];
   let state=r?payment(r):'pendente';
   if(!r){const txt=norm(cells[6].textContent);if(txt.includes('enviado')||txt.includes('enviada'))state='enviado';else if(txt.includes('pago'))state='pago';}
   const badge=cells[7].querySelector('.ne-badge'); if(!badge)return;
   const sem=state==='enviado'||state==='pago';
   const text=sem?'Sem crédito':'Com crédito', cls=sem?'ne-badge problema':'ne-badge pago';
   if(badge.textContent.trim()!==text)badge.textContent=text;
   if(badge.className!==cls)badge.className=cls;
 });
}
let scheduled=false;
function schedule(){if(scheduled)return;scheduled=true;queueMicrotask(()=>{scheduled=false;fix()})}
function boot(){
 const obs=new MutationObserver(schedule); obs.observe(document.body,{childList:true,subtree:true});
 fix();
 document.addEventListener('bocaina:remote-sync',()=>setTimeout(fix,0));
 window.addEventListener('storage',e=>{if(e.key===KEY)setTimeout(fix,0)});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();
