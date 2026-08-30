(()=>{'use strict';
const q=s=>document.querySelector(s);
function css(){
 if(q('#daFinalLayoutCss'))return;
 const s=document.createElement('style');s.id='daFinalLayoutCss';
 s.textContent=`
 /* Layout final: somente Banco de Valores + Cálculo Diário lado a lado. */
 .da-v3 .da-bottom{
   display:grid!important;
   grid-template-columns:minmax(0,1fr) minmax(0,1fr)!important;
   gap:14px!important;
   align-items:start!important;
 }
 /* Mantém o Banco de Valores. */
 .da-v3 .da-bottom>.da-box:first-child{
   display:block!important;
   grid-column:1!important;
   grid-row:1!important;
   width:100%!important;
   margin:0!important;
 }
 /* Esconde o cálculo antigo que está repetido. */
 .da-v3 .da-bottom>.da-box:nth-child(2){
   display:none!important;
 }
 /* Mostra o novo cálculo diário ao lado do Banco de Valores. */
 .da-v3 .da-bottom>.da-daily-calc{
   display:block!important;
   grid-column:2!important;
   grid-row:1!important;
   width:100%!important;
   margin:0!important;
 }
 /* Remove o resumo mensal duplicado da parte inferior. */
 .da-v3 .da-bottom>#daMonthly{
   display:none!important;
 }
 @media(max-width:950px){
   .da-v3 .da-bottom{grid-template-columns:1fr!important}
   .da-v3 .da-bottom>.da-box:first-child{
     grid-column:1!important;
     grid-row:1!important;
   }
   .da-v3 .da-bottom>.da-daily-calc{
     grid-column:1!important;
     grid-row:2!important;
   }
 }
 `;
 document.head.appendChild(s)
}
function apply(){
 const panel=q('.stock-panel[data-panel="expense"]');if(!panel)return false;
 const root=panel.querySelector('.da-v3');if(!root)return false;
 const bottom=root.querySelector('.da-bottom');if(!bottom)return false;
 css();
 bottom.style.setProperty('display','grid','important');
 bottom.querySelectorAll(':scope > .da-box:nth-child(2)').forEach(el=>el.style.setProperty('display','none','important'));
 bottom.querySelectorAll(':scope > #daMonthly').forEach(el=>el.style.setProperty('display','none','important'));
 const daily=bottom.querySelector(':scope > .da-daily-calc');
 if(daily){
   daily.style.setProperty('display','block','important');
   daily.style.setProperty('grid-column','2','important');
   daily.style.setProperty('grid-row','1','important');
 }
 return true;
}
function wait(){if(!apply())setTimeout(wait,200);else setTimeout(apply,500)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',wait);else wait();
new MutationObserver(()=>setTimeout(apply,80)).observe(document.body,{childList:true,subtree:true});
document.addEventListener('click',()=>setTimeout(apply,180));
})();
