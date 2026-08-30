(()=>{'use strict';
const q=s=>document.querySelector(s);
function css(){
 if(q('#daFinalLayoutCss'))return;
 const s=document.createElement('style');s.id='daFinalLayoutCss';s.textContent=`
 .da-v3 .da-bottom{display:grid!important;grid-template-columns:minmax(0,1fr) minmax(0,1fr)!important;gap:14px!important;align-items:start!important}
 .da-v3 .da-bottom>.da-box:first-child{display:block!important;grid-column:1!important;grid-row:1!important;width:100%!important;margin:0!important}
 .da-v3 .da-bottom>.da-box:nth-child(2){display:none!important}
 .da-v3 .da-bottom>.da-daily-calc{display:block!important;grid-column:2!important;grid-row:1!important;width:100%!important}
 .da-v3 .da-bottom>#daMonthly{display:none!important}
 .da-v3 .da-form{display:grid!important;grid-template-columns:minmax(0,.78fr) minmax(0,1.22fr)!important;gap:10px!important;background:#f2c300!important;padding:12px!important;border-radius:9px!important}
 .da-v3 .da-form>label{display:block!important;min-width:0!important;font-size:8px!important;font-weight:900!important;color:#17324f!important}
 .da-v3 .da-form>label:has(#daAuthorization),.da-v3 .da-form>label:has(#daPurpose){display:none!important}
 .da-v3 .da-form>label:has(#ddStages){grid-column:2!important;grid-row:1!important}
 .da-v3 .da-form>label:has(#ddPeople){grid-column:1!important;grid-row:2!important}
 .da-v3 .da-form>label:has(#daAuthorizedValue){grid-column:2!important;grid-row:2!important}
 .da-v3 .da-form input{width:100%!important;height:36px!important;margin-top:4px!important;border:1px solid #b7c7d6!important;border-radius:6px!important;background:#fff!important;padding:5px 8px!important;font:inherit!important}
 .da-v3 .da-form #daAuthorizedValue{font-weight:900!important;background:#f7fafc!important}
 .da-v3 .da-form .dd-stages{margin-top:4px!important;background:rgba(255,255,255,.72)!important;border:1px solid #b7c7d6!important;border-radius:7px!important;padding:7px 9px!important;min-height:36px!important;display:flex!important;flex-wrap:wrap!important;gap:7px!important}
 .da-v3 .da-form .dd-stage-item{display:flex!important;align-items:center!important;gap:7px!important;margin:0!important;padding:7px 10px!important;background:#fff!important;border:1px solid #d5e0ea!important;border-radius:6px!important;font-size:9px!important;font-weight:700!important;color:#17324f!important;cursor:pointer!important}
 .da-v3 .da-form .dd-stage-item input{width:15px!important;height:15px!important;margin:0!important}
 .da-v3 .da-form .dd-stage-item:has(input:checked){background:#eaf5ee!important;border-color:#18864b!important;color:#145c36!important}
 .da-v3 .da-form .dd-day{grid-column:1/-1!important;margin-top:0!important;background:#082e53!important;color:#fff!important;border-radius:8px!important;padding:11px 14px!important;display:flex!important;justify-content:space-between!important;align-items:center!important;font-weight:900!important}
 .da-v3 .da-form .dd-day strong{font-size:20px!important}
 .da-v3 .da-new-form{display:none!important}
 @media(max-width:950px){.da-v3 .da-bottom{grid-template-columns:1fr!important}.da-v3 .da-bottom>.da-box:first-child{grid-column:1!important}.da-v3 .da-bottom>.da-daily-calc{grid-column:1!important;grid-row:2!important}.da-v3 .da-form{grid-template-columns:1fr 1fr!important}.da-v3 .da-form>label:has(#ddStages){grid-column:1/-1!important;grid-row:auto!important}.da-v3 .da-form>label:has(#ddPeople){grid-column:1!important;grid-row:auto!important}.da-v3 .da-form>label:has(#daAuthorizedValue){grid-column:2!important;grid-row:auto!important}}
 @media(max-width:600px){.da-v3 .da-form{grid-template-columns:1fr!important}.da-v3 .da-form>label:has(#ddStages),.da-v3 .da-form>label:has(#ddPeople),.da-v3 .da-form>label:has(#daAuthorizedValue){grid-column:1!important;grid-row:auto!important}}
 `;document.head.appendChild(s)
}
function apply(){
 css();
 const roots=[...document.querySelectorAll('.stock-panel[data-panel="expense"] .da-v3')];
 if(!roots.length)return false;
 const main=roots.find(r=>r.querySelector('.da-bottom>.da-daily-calc'))||roots[0];
 roots.forEach(root=>{
  if(root!==main){root.style.setProperty('display','none','important');return}
  root.style.setProperty('display','block','important');
  const newForm=root.querySelector('#daNewForm');if(newForm)newForm.style.setProperty('display','none','important');
  const bottom=root.querySelector(':scope > .da-bottom');
  if(!bottom)return;
  bottom.style.setProperty('display','grid','important');
  bottom.style.setProperty('grid-template-columns','minmax(0,1fr) minmax(0,1fr)','important');
  bottom.querySelectorAll(':scope > .da-box:nth-child(2)').forEach(el=>el.style.setProperty('display','none','important'));
  bottom.querySelectorAll(':scope > #daMonthly').forEach(el=>el.style.setProperty('display','none','important'));
  const daily=bottom.querySelector(':scope > .da-daily-calc');
  if(daily){daily.style.setProperty('display','block','important');daily.style.setProperty('grid-column','2','important');daily.style.setProperty('grid-row','1','important')}
 });
 return true
}
function wait(){if(apply())setTimeout(apply,500);else setTimeout(wait,200)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',wait);else wait();
new MutationObserver(()=>setTimeout(apply,100)).observe(document.body,{childList:true,subtree:true});
document.addEventListener('click',()=>setTimeout(apply,150));
})();