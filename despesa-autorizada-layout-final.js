(()=>{'use strict';
const q=s=>document.querySelector(s);
function css(){
 if(q('#daFinalLayoutCss'))return;
 const s=document.createElement('style');s.id='daFinalLayoutCss';
 s.textContent=`
 /* Mantém somente o bloco superior lado a lado. Remove a duplicação inferior. */
 .da-v3 .da-bottom{display:none!important;height:0!important;margin:0!important;padding:0!important;overflow:hidden!important}
 `;
 document.head.appendChild(s)
}
function apply(){
 css();
 document.querySelectorAll('.da-v3 .da-bottom').forEach(el=>{
   el.style.setProperty('display','none','important');
   el.style.setProperty('height','0','important');
   el.style.setProperty('margin','0','important');
   el.style.setProperty('padding','0','important');
 });
 return true;
}
function wait(){apply();setTimeout(apply,300);setTimeout(apply,1000)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',wait);else wait();
new MutationObserver(()=>setTimeout(apply,80)).observe(document.body,{childList:true,subtree:true});
document.addEventListener('click',()=>setTimeout(apply,180));
})();
