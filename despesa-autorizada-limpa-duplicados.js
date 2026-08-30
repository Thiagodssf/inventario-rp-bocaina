(()=>{'use strict';
const q=s=>document.querySelector(s);
function clean(){
  const panel=q('.stock-panel[data-panel="expense"]');
  if(!panel)return false;

  // Mantém as duas janelas novas que o usuário quer:
  // 1) Cálculo da Despesa Autorizada (#daDailyCalc)
  // 2) Resumo da Despesa Autorizada (criado pelo resumo mensal)
  //
  // Remove SOMENTE os blocos antigos/duplicados dentro de .da-bottom:
  // Banco de Valores e o cálculo antigo Tipo/Militares/Dias.
  const bottom=panel.querySelector('.da-v3 .da-bottom');
  if(bottom){
    bottom.style.display='block';
    Array.from(bottom.children).forEach(child=>{
      if(child.id==='daDailyCalc') child.style.display='block';
      else child.style.display='none';
    });
  }

  // Segurança: se algum cálculo legado for criado fora do .da-bottom,
  // esconde somente o bloco que contém os controles antigos.
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
