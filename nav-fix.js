(()=>{
'use strict';
function ensureAnivStructure(){
  const rpSub=document.getElementById('rpSubnav'); if(!rpSub)return;
  if(!rpSub.querySelector('.rp-aniversariantes')){const b=document.createElement('button');b.type='button';b.className='nav rp-aniversariantes';b.dataset.view='aniversariantes';b.innerHTML='<span class="ico">🎂</span> Aniversariantes';const inv=rpSub.querySelector('[data-view="inventory"]');if(inv)inv.insertAdjacentElement('afterend',b);else rpSub.prepend(b)}
  if(!document.getElementById('aniversariantes')){const page=document.querySelector('.page');if(page){const sec=document.createElement('section');sec.id='aniversariantes';sec.className='view';sec.innerHTML='<div class="section-title"><div><span class="section-icon">🎂</span><h2>ANIVERSARIANTES</h2><p>Militares/ Organizações Militares</p></div></div>';page.appendChild(sec)}}
}
function loadAniv(){if(window.__anivLoaded)return;window.__anivLoaded=true;const s=document.createElement('script');s.src='aniversariantes-v2.js?v=4';s.async=false;s.onerror=()=>{window.__anivLoaded=false};document.body.appendChild(s)}
function loadInventoryManagement(){if(window.__invMgmtLoaded)return;window.__invMgmtLoaded=true;const s=document.createElement('script');s.src='inventario-gestao.js?v=1';s.async=false;s.onerror=()=>{window.__invMgmtLoaded=false};document.body.appendChild(s)}
function activate(view){
  if(view==='agenda'){
    if(typeof window.initAgendaAdministrativa==='function')window.initAgendaAdministrativa();
    const agenda=document.getElementById('agenda');
    if(!agenda)return;
    document.querySelectorAll('.view').forEach(v=>v.classList.remove('active'));
    agenda.classList.add('active');
    document.querySelectorAll('.nav[data-view]').forEach(b=>b.classList.toggle('active',b.dataset.view==='agenda'));
    window.scrollTo({top:0,behavior:'smooth'});
    if(window.innerWidth<701)document.getElementById('sidebar')?.classList.remove('open');
    return;
  }
  const target=view==='aniversariantes'?'aniversariantes':view,targetEl=document.getElementById(target);if(!targetEl)return;
  document.querySelectorAll('.view').forEach(v=>v.classList.toggle('active',v===targetEl||(view==='aniversariantes'&&v.id==='anivDataPanel')));
  document.querySelectorAll('.nav[data-view]').forEach(b=>b.classList.toggle('active',b.dataset.view===view));
  if(view==='stock'&&typeof window.initStock==='function')window.initStock();
  if(view==='aniversariantes')loadAniv();
  if(view==='inventory')loadInventoryManagement();
  window.scrollTo({top:0,behavior:'smooth'});
  if(window.innerWidth<701)document.getElementById('sidebar')?.classList.remove('open');
}
function bind(){
  ensureAnivStructure();
  document.querySelectorAll('.nav[data-view]').forEach(b=>{if(b.dataset.navBound==='1')return;b.dataset.navBound='1';b.onclick=e=>{e.preventDefault();e.stopImmediatePropagation();activate(b.dataset.view)}});
  document.querySelectorAll('#locationNav .loc-btn').forEach(b=>{if(b.dataset.navBound==='1')return;b.dataset.navBound='1';b.onclick=e=>{e.preventDefault();e.stopImmediatePropagation();activate('inventory');const f=document.getElementById('locationFilter');if(f){f.value=b.dataset.loc||'';f.dispatchEvent(new Event('change',{bubbles:true))}}});
  const menu=document.getElementById('mobileMenu');if(menu&&!menu.dataset.navBound){menu.dataset.navBound='1';menu.onclick=e=>{e.preventDefault();e.stopImmediatePropagation();document.getElementById('sidebar')?.classList.toggle('open')}}
  if(document.getElementById('inventory'))loadInventoryManagement();
}
function agendaDelegation(e){const b=e.target.closest?.('.nav[data-view="agenda"]');if(!b)return;e.preventDefault();e.stopImmediatePropagation();activate('agenda')}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',bind);else bind();setTimeout(bind,500);document.addEventListener('click',agendaDelegation,true);
})();