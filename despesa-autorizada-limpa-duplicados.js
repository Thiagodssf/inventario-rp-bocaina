(()=>{'use strict';
const q=s=>document.querySelector(s);
function clean(){
  const panel=q('.stock-panel[data-panel="expense"]');
  if(!panel)return false;
  const bottom=panel.querySelector('.da-v3 .da-bottom');
  if(bottom){
    // O banco de valores antigo não é mais necessário na tela.
    const bank=bottom.children[0];
    if(bank)bank.style.display='none';
    // O cálculo antigo é substituído pelo cálculo diário com etapas + militares.
    const legacy=bottom.children[1];
    if(legacy && legacy.id!=='daDailyCalc')legacy.style.display='none';
  }
  // Remove qualquer cálculo legado que tenha sido criado fora do .da-bottom.
  panel.querySelectorAll('.da-v3 .da-calc-form,.da-v3 .da-calc-table').forEach(el=>{
    const legacy=el.closest('.da-box');
    if(legacy && legacy.id!=='daDailyCalc')legacy.style.display='none';
  });
  return true;
}
function wait(){if(clean())setTimeout(clean,300);else setTimeout(wait,200)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',wait);else wait();
new MutationObserver(()=>setTimeout(clean,50)).observe(document.body,{childList:true,subtree:true});
document.addEventListener('click',()=>setTimeout(clean,150));
})();
