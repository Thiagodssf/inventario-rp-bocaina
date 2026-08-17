(()=>{
'use strict';
function init(){
 const p=document.getElementById('rpParent');
 const s=document.getElementById('rpSubnav');
 if(!p||!s||p.dataset.rpBound==='1')return;
 p.dataset.rpBound='1';
 p.addEventListener('click',e=>{
   e.preventDefault();
   const open=s.classList.toggle('collapsed')===false;
   p.classList.toggle('open',open);
   p.setAttribute('aria-expanded',String(open));
 });
 document.addEventListener('click',e=>{
   const v=e.target.closest('.nav[data-view="inventory"]');
   if(v){s.classList.remove('collapsed');p.classList.add('open');p.setAttribute('aria-expanded','true');}
 });
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
