(()=>{'use strict';
const q=s=>document.querySelector(s);
function css(){
 if(q('#daFinalLayoutCss'))return;
 const s=document.createElement('style');s.id='daFinalLayoutCss';s.textContent=`
 .da-v3{font-family:inherit!important}
 .da-v3 .da-bottom{display:grid!important;grid-template-columns:minmax(0,1fr) minmax(0,1fr)!important;gap:14px!important;align-items:start!important;margin-top:14px!important}
 .da-v3 .da-bottom>.da-box:first-child{display:block!important;grid-column:1!important;grid-row:1!important;width:100%!important;margin:0!important}
 .da-v3 .da-bottom>.da-box:nth-child(2){display:none!important}
 .da-v3 .da-bottom>.da-daily-calc{display:block!important;grid-column:2!important;grid-row:1!important;width:100%!important;margin:0!important}
 .da-v3 .da-bottom>#daMonthly{display:none!important}
 
 /* Formulário principal */
 .da-v3 .da-main{background:#fff!important;border:1px solid #d9e3ec!important;border-radius:11px!important;padding:0!important;overflow:hidden!important;box-shadow:0 2px 8px rgba(16,47,80,.05)!important}
 .da-v3 .da-title{display:flex!important;align-items:center!important;min-height:46px!important;padding:0 14px!important;margin:0!important;background:#fff!important;border-bottom:1px solid #e4eaf0!important;color:#12375d!important;font-size:13px!important;font-weight:900!important;letter-spacing:.1px!important}
 .da-v3 .da-form{display:grid!important;grid-template-columns:minmax(0,.72fr) minmax(0,1.28fr)!important;gap:0!important;background:#fff!important;padding:13px!important;border-radius:0!important;align-items:start!important}
 .da-v3 .da-form>label{display:block!important;min-width:0!important;font-size:9px!important;font-weight:900!important;color:#17324f!important;padding:0 6px!important}
 .da-v3 .da-form>label:has(#daAuthorization),.da-v3 .da-form>label:has(#daPurpose){display:none!important}
 .da-v3 .da-form>label:has(#ddStages){grid-column:2!important;grid-row:1!important}
 .da-v3 .da-form>label:has(#ddPeople){grid-column:1!important;grid-row:2!important;margin-top:10px!important}
 .da-v3 .da-form>label:has(#daAuthorizedValue){grid-column:2!important;grid-row:2!important;margin-top:10px!important}
 .da-v3 .da-form>label:has(#daDate){grid-column:1!important;grid-row:1!important}
 .da-v3 .da-form input{width:100%!important;height:38px!important;margin-top:5px!important;border:1px solid #cbd7e2!important;border-radius:7px!important;background:#fff!important;padding:7px 10px!important;font:inherit!important;box-sizing:border-box!important;outline:none!important}
 .da-v3 .da-form input:focus{border-color:#5b83a8!important;box-shadow:0 0 0 2px rgba(30,75,115,.08)!important}
 .da-v3 .da-form #daAuthorizedValue{font-weight:900!important;background:#f5f8fb!important;color:#173b61!important}
 
 /* Área de etapas */
 .da-v3 .da-form>label:has(#ddStages){background:#fff8d9!important;border:1px solid #f0d34b!important;border-radius:9px!important;padding:9px 10px 10px!important;margin:0 0 0 4px!important}
 .da-v3 .da-form .dd-stages{margin-top:5px!important;background:transparent!important;border:0!important;border-radius:0!important;padding:0!important;min-height:38px!important;display:flex!important;flex-wrap:wrap!important;gap:7px!important}
 .da-v3 .da-form .dd-stage-item{display:flex!important;align-items:center!important;gap:6px!important;flex:1 1 auto!important;min-width:125px!important;margin:0!important;padding:9px 10px!important;background:#fff!important;border:1px solid #d3dee8!important;border-radius:7px!important;font-size:9px!important;font-weight:800!important;color:#17324f!important;cursor:pointer!important;transition:all .15s ease!important;box-shadow:0 1px 2px rgba(16,47,80,.04)!important}
 .da-v3 .da-form .dd-stage-item:hover{border-color:#9fb4c8!important;transform:translateY(-1px)!important}
 .da-v3 .da-form .dd-stage-item input{width:15px!important;height:15px!important;margin:0!important;padding:0!important;box-shadow:none!important;accent-color:#173b61!important}
 .da-v3 .da-form .dd-stage-item:has(input:checked){background:#eef6ef!important;border-color:#62a477!important;color:#145c36!important}
 
 /* Total do dia */
 .da-v3 .da-form .dd-day{grid-column:1/-1!important;grid-row:3!important;margin:12px 6px 0!important;background:#edf3f8!important;color:#173b61!important;border:1px solid #d8e3ec!important;border-radius:8px!important;padding:9px 12px!important;display:flex!important;justify-content:space-between!important;align-items:center!important;font-size:10px!important;font-weight:900!important}
 .da-v3 .da-form .dd-day strong{font-size:17px!important;color:#0b2d52!important}
 
 /* Botão */
 .da-v3 .da-form button#daSave{grid-column:1/-1!important;grid-row:4!important;width:100%!important;height:40px!important;margin:11px 6px 0!important;border:0!important;border-radius:7px!important;background:#0b3159!important;color:#fff!important;font-size:10px!important;font-weight:900!important;cursor:pointer!important;box-shadow:0 2px 4px rgba(11,49,89,.14)!important}
 .da-v3 .da-form button#daSave:hover{background:#092846!important}
 
 /* Oculta o formulário legado, caso ainda exista */
 .da-v3 .da-new-form{display:none!important}
 
 /* Caixa de cálculo inferior */
 .da-v3 .da-daily-calc{background:#fff!important;border:1px solid #d9e3ec!important;border-radius:11px!important;padding:13px!important;box-shadow:0 2px 8px rgba(16,47,80,.05)!important}
 .da-v3 .da-daily-calc .dd-title{font-size:13px!important;font-weight:900!important;color:#12375d!important;margin-bottom:5px!important}
 .da-v3 .da-daily-calc .dd-note{font-size:9px!important;line-height:1.35!important;color:#667085!important;margin-bottom:9px!important}
 .da-v3 .da-daily-calc .dd-form{display:grid!important;grid-template-columns:repeat(3,minmax(0,1fr))!important;gap:9px!important;background:#fff8d9!important;border:1px solid #f0d34b!important;padding:10px!important;border-radius:9px!important}
 .da-v3 .da-daily-calc .dd-form>label{min-width:0!important}
 .da-v3 .da-daily-calc .dd-form>label:has(#ddStages){grid-column:1/-1!important}
 .da-v3 .da-daily-calc label{display:block!important;font-size:8px!important;font-weight:900!important;color:#17324f!important}
 .da-v3 .da-daily-calc input{width:100%!important;height:35px!important;margin-top:4px!important;border:1px solid #cbd7e2!important;border-radius:6px!important;background:#fff!important;padding:5px 8px!important;font:inherit!important;box-sizing:border-box!important}
 .da-v3 .da-daily-calc .dd-total{margin-top:9px!important;background:#0b3159!important;color:#fff!important;border-radius:8px!important;padding:12px 13px!important;display:flex!important;justify-content:space-between!important;align-items:center!important;font-weight:900!important}
 .da-v3 .da-daily-calc .dd-total strong{font-size:19px!important}
 .da-v3 .da-daily-calc .dd-grid{display:grid!important;grid-template-columns:repeat(3,1fr)!important;gap:8px!important;margin-top:8px!important}
 .da-v3 .da-daily-calc .dd-card{border:1px solid #d9e3ec!important;border-radius:7px!important;padding:9px!important;background:#fff!important}
 .da-v3 .da-daily-calc .dd-card small{display:block!important;font-size:7px!important;font-weight:900!important;color:#667085!important}
 .da-v3 .da-daily-calc .dd-card strong{display:block!important;font-size:15px!important;color:#102f50!important;margin-top:3px!important}
 .da-v3 .da-daily-calc .green{color:#18864b!important}.da-v3 .da-daily-calc .red{color:#b42318!important}
 
 /* Banco de valores */
 .da-v3 .da-bottom>.da-box:first-child{background:#fff!important;border:1px solid #d9e3ec!important;border-radius:11px!important;padding:13px!important;box-shadow:0 2px 8px rgba(16,47,80,.05)!important}
 
 @media(max-width:950px){
  .da-v3 .da-bottom{grid-template-columns:1fr!important}
  .da-v3 .da-bottom>.da-box:first-child{grid-column:1!important}
  .da-v3 .da-bottom>.da-daily-calc{grid-column:1!important;grid-row:2!important}
  .da-v3 .da-form{grid-template-columns:1fr 1fr!important}
  .da-v3 .da-form>label:has(#daDate){grid-column:1!important;grid-row:1!important}
  .da-v3 .da-form>label:has(#ddStages){grid-column:1/-1!important;grid-row:2!important;margin:10px 6px 0!important}
  .da-v3 .da-form>label:has(#ddPeople){grid-column:1!important;grid-row:3!important}
  .da-v3 .da-form>label:has(#daAuthorizedValue){grid-column:2!important;grid-row:3!important}
  .da-v3 .da-form .dd-day{grid-row:4!important}
  .da-v3 .da-form button#daSave{grid-row:5!important}
 }
 @media(max-width:600px){
  .da-v3 .da-form{grid-template-columns:1fr!important}
  .da-v3 .da-form>label:has(#daDate),.da-v3 .da-form>label:has(#ddStages),.da-v3 .da-form>label:has(#ddPeople),.da-v3 .da-form>label:has(#daAuthorizedValue){grid-column:1!important;grid-row:auto!important;margin-left:0!important;margin-right:0!important}
  .da-v3 .da-form .dd-day,.da-v3 .da-form button#daSave{grid-column:1!important}
  .da-v3 .da-daily-calc .dd-grid{grid-template-columns:1fr!important}
 }
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