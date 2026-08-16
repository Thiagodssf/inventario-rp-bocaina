(()=>{
'use strict';
function activate(view){
  const views=document.querySelectorAll('.view');
  views.forEach(v=>v.classList.toggle('active',v.id===view));
  document.querySelectorAll('.nav[data-view]').forEach(b=>b.classList.toggle('active',b.dataset.view===view));
  if(view==='stock' && typeof window.initStock==='function') window.initStock();
  window.scrollTo({top:0,behavior:'smooth'});
  const sidebar=document.getElementById('sidebar');
  if(window.innerWidth<701 && sidebar) sidebar.classList.remove('open');
}
function bind(){
  document.querySelectorAll('.nav[data-view]').forEach(b=>{
    b.onclick=e=>{e.preventDefault();e.stopPropagation();activate(b.dataset.view)};
  });
  document.querySelectorAll('#locationNav .loc-btn').forEach(b=>{
    b.onclick=e=>{e.preventDefault();e.stopPropagation();
      activate('inventory');
      const f=document.getElementById('locationFilter');
      if(f){f.value=b.dataset.loc||'';f.dispatchEvent(new Event('change',{bubbles:true}));}
    };
  });
  const menu=document.getElementById('mobileMenu');
  if(menu) menu.onclick=e=>{e.preventDefault();e.stopPropagation();document.getElementById('sidebar')?.classList.toggle('open')};
}
if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',bind); else bind();
setTimeout(bind,500);
})();