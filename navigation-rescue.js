(()=>{
'use strict';
function init(){
  const qs=s=>document.querySelector(s);
  const views=[...document.querySelectorAll('.view')];
  const nav=document.getElementById('mainNav');
  const inventory=nav?.querySelector('.nav[data-view="inventory"]');
  const locations=nav?.querySelector('.inventory-locations');

  // Organiza o Inventário do RP como subaba de Relações-Públicas.
  if(nav && inventory && locations && !nav.querySelector('.rp-subnav')){
    const parent=document.createElement('button');
    parent.type='button';
    parent.className='nav nav-parent rp-parent';
    parent.innerHTML='<span class="ico">▣</span> Relações-Públicas <span class="subnav-arrow">▾</span>';

    const sub=document.createElement('div');
    sub.className='rp-subnav';
    sub.appendChild(inventory);
    sub.appendChild(locations);
    nav.insertBefore(parent,sub);
    nav.insertBefore(sub, nav.querySelector('.nav-summary') || null);

    parent.onclick=e=>{
      e.preventDefault();
      e.stopPropagation();
      sub.classList.toggle('open');
      parent.classList.toggle('expanded',sub.classList.contains('open'));
    };
    sub.classList.add('open');
    parent.classList.add('expanded');
  }

  const show=v=>{
    views.forEach(x=>x.classList.toggle('active',x.id===v));
    document.querySelectorAll('.nav[data-view]').forEach(b=>b.classList.toggle('active',b.dataset.view===v));
    const parent=qs('.rp-parent');
    if(parent) parent.classList.toggle('active',v==='inventory' || v==='locations');
    if(v==='inventory' || v==='locations'){
      const sub=qs('.rp-subnav');
      if(sub){sub.classList.add('open');qs('.rp-parent')?.classList.add('expanded');}
    }
    if(v==='summary'&&typeof window.renderSummary==='function')window.renderSummary();
    if(v==='inventory'&&typeof window.renderTable==='function')window.renderTable();
  };

  document.querySelectorAll('.nav[data-view]').forEach(b=>{
    b.onclick=e=>{e.preventDefault();e.stopPropagation();show(b.dataset.view)};
  });
  document.querySelectorAll('.loc-btn').forEach(b=>{
    b.onclick=e=>{
      e.preventDefault();e.stopPropagation();
      const loc=b.dataset.loc;
      show('inventory');
      const f=qs('#locationFilter');
      if(f){f.value=loc;f.dispatchEvent(new Event('change',{bubbles:true}));}
    };
  });
  const mm=qs('#mobileMenu');
  if(mm)mm.onclick=e=>{e.preventDefault();e.stopPropagation();const s=qs('#sidebar');if(s)s.classList.toggle('open')};
  show('inventory');
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
