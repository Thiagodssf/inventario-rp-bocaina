(()=>{ 'use strict';
function init(){
 const qs=s=>document.querySelector(s);
 const rpSub=qs('#rpSubnav');
 if(rpSub&&!qs('.rp-aniversariantes')){
   const inv=rpSub.querySelector('[data-view="inventory"]');
   const b=document.createElement('button');
   b.type='button'; b.className='nav rp-aniversariantes'; b.dataset.view='anivDataPanel';
   b.innerHTML='<span class="ico">🎂</span> Aniversariantes';
   if(inv) inv.insertAdjacentElement('afterend',b); else rpSub.prepend(b);
 }
 if(!qs('#aniversariantes')&&!qs('#anivDataPanel')){
   const page=qs('.page');
   if(page){
     const sec=document.createElement('section');
     sec.id='aniversariantes'; sec.className='view';
     sec.innerHTML='<div class="section-title"><div><span class="section-icon">🎂</span><h2>ANIVERSARIANTES</h2><p>Área de aniversariantes das Relações-Públicas.</p></div></div>';
     page.appendChild(sec);
   }
 }
 const show=v=>{const current=[...document.querySelectorAll('.view')];current.forEach(x=>x.classList.toggle('active',x.id===v));document.querySelectorAll('.nav[data-view]').forEach(b=>b.classList.toggle('active',b.dataset.view===v));if(v==='summary'&&typeof window.renderSummary==='function')window.renderSummary();if(v==='inventory'&&typeof window.renderTable==='function')window.renderTable();};
 document.querySelectorAll('.nav[data-view]').forEach(b=>{b.onclick=e=>{e.preventDefault();e.stopPropagation();show(b.dataset.view)}});
 document.querySelectorAll('.loc-btn').forEach(b=>{b.onclick=e=>{e.preventDefault();e.stopPropagation();const loc=b.dataset.loc;show('inventory');const f=qs('#locationFilter');if(f){f.value=loc;f.dispatchEvent(new Event('change'))}}});
 const mm=qs('#mobileMenu');if(mm)mm.onclick=e=>{e.preventDefault();e.stopPropagation();const s=qs('#sidebar');if(s)s.classList.toggle('open')};
 if(!window.__anivLoaded){window.__anivLoaded=true;const s=document.createElement('script');s.src='aniversariantes-v2.js?v=2';s.defer=true;document.head.appendChild(s);}
 const adjustAnivSubtitle=()=>{document.querySelectorAll('#anivDataPanel p,#aniversariantes p').forEach(p=>{if(p.closest('.aniv-hero')||p.closest('.section-title'))p.textContent='Militares/ Organizações Militares';});};
 adjustAnivSubtitle();
 new MutationObserver(adjustAnivSubtitle).observe(document.body,{childList:true,subtree:true});
 show('inventory');
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
