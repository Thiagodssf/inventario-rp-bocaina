(()=>{'use strict';
document.addEventListener('bocaina:remote-sync',()=>{setTimeout(patchSituacaoNE,50)});
function normalizeStatus(value){return String(value||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').trim().toLowerCase().replace(/\s+/g,' ')}
function patchSituacaoNE(){
  const body=document.getElementById('neRows'); if(!body)return;
  const table=body.closest('table'); if(!table)return;
  const heads=[...table.querySelectorAll('thead th')].map(x=>normalizeStatus(x.textContent));
  const payIdx=heads.indexOf('pagamento'); const sitIdx=heads.indexOf('situacao');
  if(payIdx<0||sitIdx<0)return;
  body.querySelectorAll('tr.ne-row').forEach(row=>{
    const cells=row.children; if(!cells[payIdx]||!cells[sitIdx])return;
    const pagamento=normalizeStatus(cells[payIdx].textContent);
    const badge=cells[sitIdx].querySelector('.ne-badge'); if(!badge)return;
    const semCredito=pagamento.includes('enviado para pagamento')||pagamento==='pago'||pagamento.includes('pago em');
    const wanted=semCredito?'Sem crédito':'Com crédito';
    const wantedClass=semCredito?'ne-badge problema':'ne-badge ok';
    if(badge.textContent.trim()!==wanted)badge.textContent=wanted;
    if(badge.className!==wantedClass)badge.className=wantedClass;
  });
}
const observer=new MutationObserver(()=>patchSituacaoNE());
function start(){
  const body=document.getElementById('neRows');
  if(body)observer.observe(body,{childList:true});
  patchSituacaoNE();
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start);else start();
function watchAniversariantes(){let lastDay=new Date().toDateString();setInterval(()=>{const day=new Date().toDateString();if(day!==lastDay){lastDay=day;const view=document.getElementById('anivDataPanel')||document.getElementById('aniversariantes');if(view&&view.classList.contains('active'))location.reload()}},30000)}
watchAniversariantes();
})();
