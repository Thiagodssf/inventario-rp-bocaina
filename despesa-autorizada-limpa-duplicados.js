(()=>{'use strict';
const q=s=>document.querySelector(s);
function clean(){
  const panel=q('.stock-panel[data-panel="expense"]');
  if(!panel)return false;
  const root=panel.querySelector('.da-v3');
  if(!root)return false;
  const bottom=root.querySelector('.da-bottom');
  if(bottom){
    bottom.style.display='grid';
    Array.from(bottom.children).forEach(child=>{
      const keep=child.id==='daDailyCalc' || child===bottom.children[0];
      child.style.setProperty('display',keep?'block':'none','important');
    });
  }
  root.querySelectorAll('.da-calc-form,.da-calc-table').forEach(el=>{
    const box=el.closest('.da-box');
    if(box && box.id!=='daDailyCalc')box.style.setProperty('display','none','important');
  });
  return true;
}
function wait(){if(clean())setTimeout(clean,300);else setTimeout(wait,200)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',wait);else wait();
new MutationObserver(()=>setTimeout(clean,50)).observe(document.body,{childList:true,subtree:true});
document.addEventListener('click',()=>setTimeout(clean,150));
})();
