(()=>{'use strict';
// Mantém os módulos já abertos atualizados quando o Supabase traz dados novos.
document.addEventListener('bocaina:remote-sync',()=>{
  try{window.dispatchEvent(new Event('storage'))}catch(e){console.error('[Bocaina UI Sync]',e)}
});

// Regra operacional das NEs: enviada para pagamento ou paga = sem crédito.
function patchSituacaoNE(){
  const rows=document.querySelectorAll('#neRows tr.ne-row');
  rows.forEach(row=>{
    const cells=row.children;
    if(!cells||cells.length<8)return;
    const pagamento=(cells[6]?.textContent||'').toLowerCase();
    const situacao=cells[7]?.querySelector('.ne-badge');
    if(!situacao)return;
    if(pagamento.includes('enviado para pagamento')||pagamento.includes('pago')){
      situacao.textContent='Sem crédito';
      situacao.className='ne-badge problema';
    }
  });
}
const neObserver=new MutationObserver(()=>patchSituacaoNE());
function startNEPatch(){
  const body=document.getElementById('neRows');
  if(body){neObserver.observe(body,{childList:true,subtree:true});patchSituacaoNE();}
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',startNEPatch);else startNEPatch();
setInterval(patchSituacaoNE,1000);

// A contagem dos aniversariantes é diária. Se a página permanecer aberta,
// recarrega automaticamente na virada do dia para recalcular os dias restantes.
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
