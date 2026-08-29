(()=>{'use strict';
const q=s=>document.querySelector(s);
function clean(){
  const panel=q('.stock-panel[data-panel="expense"]');
  if(!panel)return false;
  // Mantém as duas janelas novas: Cálculo da Despesa Autorizada e Resumo da Despesa Autorizada.
  // Remove somente o bloco legado inferior que contém Banco de Valores,
  // cálculo antigo Tipo/Militares/Dias e os totais duplicados.
  panel.querySelectorAll('.da-v3 .da-bottom').forEach(el=>{el.style.display='none'});
  return true;
}
function wait(){if(clean())setTimeout(clean,300);else setTimeout(wait,200)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',wait);else wait();
new MutationObserver(()=>setTimeout(clean,50)).observe(document.body,{childList:true,subtree:true});
document.addEventListener('click',()=>setTimeout(clean,150));
})();
