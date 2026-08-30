(()=>{'use strict';
const q=s=>document.querySelector(s);
function clean(){
  const panel=q('.stock-panel[data-panel="expense"]');
  if(!panel)return false;
  const root=panel.querySelector('.da-v3');
  if(!root)return false;
  /* O bloco inferior do layout legado (Banco de Valores + Cálculo) é duplicado.
     O layout novo, criado pelos dashboards, deve ser o único exibido. */
  root.querySelector('.da-bottom')?.style.setProperty('display','none','important');
  return true;
}
function wait(){if(clean())setTimeout(clean,300);else setTimeout(wait,200)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',wait);else wait();
new MutationObserver(()=>setTimeout(clean,50)).observe(document.body,{childList:true,subtree:true});
document.addEventListener('click',()=>setTimeout(clean,150));
})();
