(()=>{'use strict';
const q=s=>document.querySelector(s);
function css(){
  if(q('#daFinalLayoutCss'))return;
  const s=document.createElement('style');s.id='daFinalLayoutCss';
  s.textContent=`
  .da-v3 .da-bottom{display:grid!important;grid-template-columns:minmax(0,1fr) minmax(0,1fr)!important;gap:14px!important;align-items:start!important}
  .da-v3 .da-bottom>.da-box{display:block!important;width:100%!important;margin:0!important}
  .da-v3 .da-bottom>.da-box.da-legacy-hidden{display:none!important}
  .da-v3 .da-bottom>#daDailyCalc{display:block!important;grid-column:2!important;grid-row:1!important;width:100%!important;margin:0!important}
  .da-v3 .da-bottom>.da-bank-box{grid-column:1!important;grid-row:1!important}
  @media(max-width:950px){.da-v3 .da-bottom{grid-template-columns:1fr!important}.da-v3 .da-bottom>.da-bank-box{grid-column:1!important;grid-row:1!important}.da-v3 .da-bottom>#daDailyCalc{grid-column:1!important;grid-row:2!important}}
  `;document.head.appendChild(s)
}
function apply(){
  const panel=q('.stock-panel[data-panel="expense"]');if(!panel)return false;
  const root=panel.querySelector('.da-v3');if(!root)return false;
  const bottom=root.querySelector('.da-bottom');if(!bottom)return false;
  css();
  const bank=Array.from(bottom.children).find(el=>el.querySelector?.('#daBankRows'));
  const daily=bottom.querySelector('#daDailyCalc');
  if(bank){bank.classList.add('da-bank-box');bottom.appendChild(bank)}
  if(daily){daily.style.setProperty('display','block','important');bottom.appendChild(daily)}
  Array.from(bottom.children).forEach(el=>{
    if(el===bank||el===daily)return;
    if(el.classList.contains('da-box'))el.classList.add('da-legacy-hidden');
  });
  bottom.style.setProperty('display','grid','important');
  return true;
}
function wait(){if(!apply())setTimeout(wait,200);else setTimeout(apply,500)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',wait);else wait();
new MutationObserver(()=>setTimeout(apply,80)).observe(document.body,{childList:true,subtree:true});
document.addEventListener('click',()=>setTimeout(apply,180));
})();
