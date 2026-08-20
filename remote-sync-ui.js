(()=>{'use strict';
// Mantém os módulos já abertos atualizados quando o Supabase traz dados novos.
document.addEventListener('bocaina:remote-sync',()=>{
  try{window.dispatchEvent(new Event('storage'))}catch(e){console.error('[Bocaina UI Sync]',e)}
});

// Regra operacional das NEs: a situação é derivada do STATUS REAL de pagamento,
// nunca do saldo antigo que tenha sido desenhado na coluna Situação.
function normalizeStatus(value){
  return String(value||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').trim().toLowerCase().replace(/\s+/g,' ');
}
function patchSituacaoNE(){
  const rows=document.querySelectorAll('#neRows tr.ne-row');
  rows.forEach(row=>{
    const cells=row.children;
    if(!cells||cells.length<8)return;
    const pagamento=normalizeStatus(cells[6]?.textContent);
    const situacao=cells[7]?.querySelector('.ne-badge');
    if(!situacao)return;

    // Pagamento realizado ou enviado para pagamento = crédito consumido.
    // Somente pagamento pendente permanece como Com crédito.
    const semCredito=pagamento.includes('enviado para pagamento') || pagamento==='pago' || pagamento.includes('pago em');
    situacao.textContent=semCredito?'Sem crédito':'Com crédito';
    situacao.className=`ne-badge ${semCredito?'problema':'ok'}`;
  });
}
const neObserver=new MutationObserver(()=>patchSituacaoNE());
function startNEPatch(){
  const body=document.getElementById('neRows');
  if(body){neObserver.observe(body,{childList:true,subtree:true,characterData:true});patchSituacaoNE();}
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',startNEPatch);else startNEPatch();
setInterval(patchSituacaoNE,1000);

// A contagem dos aniversariantes é diária.
function watchAniversariantes(){
  let lastDay=new Date().toDateString();
  setInterval(()=>{
    const now=new Date(),day=now.toDateString();
    if(day!==lastDay){
      lastDay=day;
      const view=document.getElementById('anivDataPanel')||document.getElementById('aniversariantes');
      if(view&&view.classList.contains('active'))location.reload();
    }
  },30000);
}
watchAniversariantes();
})();
