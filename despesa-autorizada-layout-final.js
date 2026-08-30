(()=>{'use strict';
const q=s=>document.querySelector(s);
function css(){
 if(q('#daFinalLayoutCss'))return;
 const s=document.createElement('style');s.id='daFinalLayoutCss';
 s.textContent=`
 .da-final-row{display:grid!important;grid-template-columns:minmax(0,1fr) minmax(0,1fr)!important;gap:14px!important;align-items:start!important;margin-top:12px!important}
 .da-final-row>.da-box,.da-final-row>.da-daily-calc{display:block!important;width:100%!important;margin:0!important}
 .da-final-row>.da-daily-calc{grid-column:2!important;grid-row:1!important}
 .da-final-row>.da-box{grid-column:1!important;grid-row:1!important}
 .da-v3 .da-bottom{display:none!important}
 .da-v3 .da-bottom>#daMonthly{display:none!important}
 .da-final-duplicate{display:none!important}
 @media(max-width:950px){.da-final-row{grid-template-columns:1fr!important}.da-final-row>.da-box,.da-final-row>.da-daily-calc{grid-column:1!important;grid-row:auto!important}}
 `;
 document.head.appendChild(s)
}
function apply(){
 css();
 const panels=[...document.querySelectorAll('.stock-panel[data-panel="expense"]')];
 if(!panels.length)return false;
 const candidates=[];
 panels.forEach(panel=>panel.querySelectorAll('.da-v3').forEach(root=>candidates.push({panel,root})));
 if(!candidates.length)return false;
 const main=candidates.find(x=>x.root.querySelector('#daDailyCalc,.da-daily-calc'))||candidates[0];
 panels.forEach(panel=>{if(panel!==main.panel)panel.classList.add('da-final-duplicate')});
 candidates.forEach(({root})=>{
   if(root!==main.root){root.classList.add('da-final-duplicate');return}
   root.classList.remove('da-final-duplicate');
   const bottom=root.querySelector('.da-bottom');
   if(!bottom)return;
   bottom.style.setProperty('display','none','important');
   let row=root.querySelector(':scope > .da-final-row');
   if(!row){row=document.createElement('div');row.className='da-final-row';root.appendChild(row)}
   let bank=row.querySelector(':scope > .da-box');
   if(!bank)bank=bottom.querySelector(':scope > .da-box:first-child');
   let daily=row.querySelector(':scope > .da-daily-calc');
   if(!daily)daily=bottom.querySelector(':scope > .da-daily-calc');
   if(bank&&bank.parentElement!==row)row.appendChild(bank);
   if(daily&&daily.parentElement!==row)row.appendChild(daily);
   if(bank)bank.style.setProperty('display','block','important');
   if(daily){daily.style.setProperty('display','block','important');daily.style.setProperty('grid-column','2','important');daily.style.setProperty('grid-row','1','important')}
   row.style.setProperty('display','grid','important');
 });
 return true;
}
function wait(){if(!apply())setTimeout(wait,200);else setTimeout(apply,700)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',wait);else wait();
new MutationObserver(()=>setTimeout(apply,120)).observe(document.body,{childList:true,subtree:true});
document.addEventListener('click',()=>setTimeout(apply,200));
})();