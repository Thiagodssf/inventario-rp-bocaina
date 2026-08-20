(()=>{'use strict';
function normalizeStatus(value){return String(value||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').trim().toLowerCase().replace(/\s+/g,' ')}
function patchSituacaoNE(){
  const body=document.getElementById('neRows');if(!body)return false;
  const table=body.closest('table');if(!table)return false;
  const heads=[...table.querySelectorAll('thead th')].map(x=>normalizeStatus(x.textContent));
  const payIdx=heads.indexOf('pagamento'),sitIdx=heads.indexOf('situacao');
  if(payIdx<0||sitIdx<0)return false;
  body.querySelectorAll('tr.ne-row').forEach(row=>{
    const cells=row.children;if(!cells[payIdx]||!cells[sitIdx])return;
    const pagamento=normalizeStatus(cells[payIdx].textContent);
    const badge=cells[sitIdx].querySelector('.ne-badge');if(!badge)return;
    const semCredito=pagamento.includes('enviado para pagamento')||pagamento==='pago'||pagamento.includes('pago em');
    const wanted=semCredito?'Sem crédito':'Com crédito';
    const wantedClass=semCredito?'ne-badge problema':'ne-badge pago';
    if(badge.textContent.trim()!==wanted)badge.textContent=wanted;
    if(badge.className!==wantedClass)badge.className=wantedClass;
  });
  return true;
}
let rowsObserver=null;
function attachNEObserver(){
  const body=document.getElementById('neRows');if(!body)return false;
  if(rowsObserver)rowsObserver.disconnect();
  rowsObserver=new MutationObserver(()=>patchSituacaoNE());
  rowsObserver.observe(body,{childList:true});
  patchSituacaoNE();
  return true;
}
function boot(){
  if(attachNEObserver())return;
  const pageObserver=new MutationObserver(()=>{if(attachNEObserver())pageObserver.disconnect()});
  pageObserver.observe(document.body,{childList:true,subtree:true});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
document.addEventListener('bocaina:remote-sync',()=>setTimeout(patchSituacaoNE,0));
})();
