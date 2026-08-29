(()=>{'use strict';
const q=s=>document.querySelector(s);
function clean(){
  const panel=q('.stock-panel[data-panel="expense"]');
  if(!panel)return false;
  // O cálculo diário agora acontece diretamente no formulário de Nova Despesa.
  // Remove os blocos inferiores que repetiam esse cálculo e seus totais.
  panel.querySelectorAll('#daDailyCalc,.da-v3 .da-bottom').forEach(el=>{el.style.display='none'});
  // Remove qualquer cálculo legado que tenha sido criado fora dos blocos acima.
  panel.querySelectorAll('.da-v3 .da-calc-form,.da-v3 .da-calc-table').forEach(el=>{
    const box=el.closest('.da-box');
    if(box)box.style.display='none';
  });
  return true;
}
function wait(){if(clean())setTimeout(clean,300);else setTimeout(wait,200)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',wait);else wait();
new MutationObserver(()=>setTimeout(clean,50)).observe(document.body,{childList:true,subtree:true});
document.addEventListener('click',()=>setTimeout(clean,150));
})();
