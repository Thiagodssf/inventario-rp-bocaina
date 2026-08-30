(()=>{'use strict';
const q=s=>document.querySelector(s);
function apply(){
  const panel=q('.stock-panel[data-panel="expense"]');
  if(!panel)return false;
  const root=panel.querySelector('.da-v3');
  if(!root)return false;
  const bottom=root.querySelector('.da-bottom');
  if(bottom) bottom.style.setProperty('display','none','important');
  return true;
}
function wait(){if(!apply())setTimeout(wait,250);else setTimeout(apply,500)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',wait);else wait();
new MutationObserver(()=>setTimeout(apply,50)).observe(document.body,{childList:true,subtree:true});
document.addEventListener('click',()=>setTimeout(apply,150));
})();
