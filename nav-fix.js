(()=>{
'use strict';
function ensureAnivStructure(){
  const rpSub=document.getElementById('rpSubnav');
  if(!rpSub)return;
  if(!rpSub.querySelector('.rp-aniversariantes')){
    const b=document.createElement('button');
    b.type='button';
    b.className='nav rp-aniversariantes';
    b.dataset.view='anivDataPanel';
    b.innerHTML='<span class="ico">🎂</span> Aniversariantes';
    const inv=rpSub.querySelector('[data-view="inventory"]');
    if(inv) inv.insertAdjacentElement('afterend',b); else rpSub.prepend(b);
  }
  if(!document.getElementById('anivDataPanel')){
    const page=document.querySelector('.page');
    if(page){
      const sec=document.createElement('section');
      sec.id='anivDataPanel';
      sec.className='view';
      page.appendChild(sec);
    }
  }
}
function loadAniv(){
  if(window.__anivLoaded)return;
  window.__anivLoaded=true;
  const s=document.createElement('script');
  s.src='aniversariantes-v2.js?v=3';
  s.async=false;
  s.onload=()=>{ if(typeof window.initAniversariantes==='function') window.initAniversariantes(); };
  s.onerror=()=>{ window.__anivLoaded=false; console.error('Falha ao carregar Aniversariantes'); };
  document.body.appendChild(s);
}
function activate(view){
  const views=document.querySelectorAll('.view');
  views.forEach(v=>v.classList.toggle('active',v.id===view));
  document.querySelectorAll('.nav[data-view]').forEach(b=>b.classList.toggle('active',b.dataset.view===view));
  if(view==='stock' && typeof window.initStock==='function') window.initStock();
  if(view==='anivDataPanel') loadAniv();
  window.scrollTo({top:0,behavior:'smooth'});
  const sidebar=document.getElementById('sidebar');
  if(window.innerWidth<701 && sidebar) sidebar.classList.remove('open');
}
function bind(){
  ensureAnivStructure();
  document.querySelectorAll('.nav[data-view]').forEach(b=>{
    if(b.dataset.navBound==='1')return;
    b.dataset.navBound='1';
    b.onclick=e=>{e.preventDefault();e.stopPropagation();activate(b.dataset.view)};
  });
  document.querySelectorAll('#locationNav .loc-btn').forEach(b=>{
    if(b.dataset.navBound==='1')return;
    b.dataset.navBound='1';
    b.onclick=e=>{e.preventDefault();e.stopPropagation();activate('inventory');const f=document.getElementById('locationFilter');if(f){f.value=b.dataset.loc||'';f.dispatchEvent(new Event('change',{bubbles:true}));}};
  });
  const menu=document.getElementById('mobileMenu');
  if(menu&&!menu.dataset.navBound){menu.dataset.navBound='1';menu.onclick=e=>{e.preventDefault();e.stopPropagation();document.getElementById('sidebar')?.classList.toggle('open')}}
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',bind);else bind();
setTimeout(bind,500);
})();
