(()=>{'use strict';
const q=s=>document.querySelector(s);
function css(){
  if(q('#daFinalLayoutCss'))return;
  const s=document.createElement('style');s.id='daFinalLayoutCss';
  s.textContent=`
  /* Mantém somente as janelas novas lado a lado.
     O .da-bottom é a versão antiga e duplicada. */
  .da-v3 .da-bottom{display:none!important}
  `;document.head.appendChild(s)
}
function apply(){
  const panel=q('.stock-panel[data-panel="expense"]');if(!panel)return false;
  const root=panel.querySelector('.da-v3');if(!root)return false;
  css();
  const bottom=root.querySelector('.da-bottom');
  if(bottom)bottom.style.setProperty('display','none','important');
  return true;
}
function wait(){if(!apply())setTimeout(wait,200);else setTimeout(apply,500)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',wait);else wait();
new MutationObserver(()=>setTimeout(apply,80)).observe(document.body,{childList:true,subtree:true});
document.addEventListener('click',()=>setTimeout(apply,180));
})();
