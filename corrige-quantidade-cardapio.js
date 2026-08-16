(()=>{'use strict';
function corrigir(){
 const q=document.querySelector('#menuQty'), g=document.querySelector('#menuGenre');
 if(q) q.removeAttribute('value');
 document.addEventListener('click',e=>{
  const btn=e.target.closest('[data-add],[data-select]');
  if(!btn)return;
  const idx=btn.dataset.select ?? null;
  if(idx!==null && g){g.value=String(idx);}
  if(q){q.value='';q.defaultValue='';q.removeAttribute('value');q.focus();}
 },true);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',corrigir);else corrigir();
})();
