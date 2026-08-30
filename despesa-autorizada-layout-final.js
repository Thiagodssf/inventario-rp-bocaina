(()=>{'use strict';
const q=s=>document.querySelector(s);
function css(){
 if(q('#daFinalLayoutCss'))return;
 const s=document.createElement('style');s.id='daFinalLayoutCss';
 s.textContent=`
 .da-v3 .da-bottom{display:grid!important;grid-template-columns:minmax(0,1fr) minmax(0,1fr)!important;gap:14px!important;align-items:start!important}
 .da-v3 .da-bottom>.da-box:first-child{display:block!important;grid-column:1!important;grid-row:1!important;width:100%!important;margin:0!important}
 .da-v3 .da-bottom>.da-box:nth-child(2){display:none!important}
 .da-v3 .da-bottom>.da-daily-calc{display:block!important;grid-column:2!important;grid-row:1!important;width:100%!important;margin:0!important}
 .da-v3 .da-bottom>#daMonthly{display:none!important}
 .da-v3 #daAuthorization,.da-v3 #daPurpose{display:none!important}
 .da-v3 #daAuthorization:where(input),.da-v3 #daPurpose:where(select){display:none!important}
 .da-v3 .da-form{grid-template-columns:1fr 1fr!important}
 .da-v3 .da-form>label:has(#daAuthorization),.da-v3 .da-form>label:has(#daPurpose){display:none!important}
 @media(max-width:950px){
   .da-v3 .da-bottom{grid-template-columns:1fr!important}
   .da-v3 .da-bottom>.da-box:first-child{grid-column:1!important;grid-row:1!important}
   .da-v3 .da-bottom>.da-daily-calc{grid-column:1!important;grid-row:2!important}
 }
 `;
 document.head.appendChild(s)
}
function apply(){
 css();
 const roots=[...document.querySelectorAll('.stock-panel[data-panel="expense"] .da-v3')];
 if(!roots.length)return false;
 const main=roots.find(r=>r.querySelector('.da-bottom>.da-daily-calc'))||roots[0];
 roots.forEach(root=>{
   if(root!==main){root.style.setProperty('display','none','important');return}
   root.style.setProperty('display','block','important');
   const auth=root.querySelector('#daAuthorization');
   const purpose=root.querySelector('#daPurpose');
   if(auth){auth.value=auth.value||'Despesa diária';const label=auth.closest('label');if(label)label.style.setProperty('display','none','important')}
   if(purpose){purpose.value=purpose.value||'Aquisição de gêneros alimentícios';const label=purpose.closest('label');if(label)label.style.setProperty('display','none','important')}
   const form=root.querySelector('.da-form');
   if(form)form.style.setProperty('grid-template-columns','1fr 1fr','important');
   const bottom=root.querySelector(':scope > .da-bottom');
   if(!bottom)return;
   bottom.style.setProperty('display','grid','important');
   bottom.style.setProperty('grid-template-columns','minmax(0,1fr) minmax(0,1fr)','important');
   bottom.querySelectorAll(':scope > .da-box:nth-child(2)').forEach(el=>el.style.setProperty('display','none','important'));
   bottom.querySelectorAll(':scope > #daMonthly').forEach(el=>el.style.setProperty('display','none','important'));
   const daily=bottom.querySelector(':scope > .da-daily-calc');
   if(daily){daily.style.setProperty('display','block','important');daily.style.setProperty('grid-column','2','important');daily.style.setProperty('grid-row','1','important')}
 });
 return true;
}
function wait(){if(apply())setTimeout(apply,700);else setTimeout(wait,200)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',wait);else wait();
new MutationObserver(()=>setTimeout(apply,120)).observe(document.body,{childList:true,subtree:true});
document.addEventListener('click',()=>setTimeout(apply,220));
})();