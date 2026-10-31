(()=>{'use strict';
const norm=s=>String(s??'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim();
const esc=s=>String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
const money=v=>Number(v||0).toLocaleString('pt-BR',{style:'currency',currency:'BRL'});
function setup(){
 const stock=document.querySelector('#stock'),nav=stock?.querySelector('.stock-subtabs'),content=stock?.querySelector('#stockSubContent');
 if(!nav||!content)return false;
 if(!nav.querySelector('[data-tab="searchFoods"]')){
  const b=document.createElement('button');b.type='button';b.className='stock-subtab';b.dataset.tab='searchFoods';b.textContent='🔎 Pesquisar Gênero';b.title='Pesquisar gênero alimentício';nav.insertBefore(b,nav.children[1]||null);
 }
 if(!content.querySelector('[data-panel="searchFoods"]')){
  const p=document.createElement('section');p.className='stock-panel';p.dataset.panel='searchFoods';
  p.innerHTML='<div class="sp"><div style="background:#fff;border:1px solid #cbd9e7;border-radius:9px;padding:14px;margin-bottom:12px"><strong style="display:block;color:#0b2d52;font-size:16px;margin-bottom:5px">🔎 Pesquisar gênero alimentício</strong><p class="stock-note">Digite o nome ou parte do nome para localizar rapidamente um gênero cadastrado.</p><input id="gSearchInput" type="search" placeholder="Ex.: arroz, açúcar, carne..." style="width:100%;box-sizing:border-box;height:42px;border:1px solid #9fb2c6;border-radius:7px;padding:8px 12px;font-size:14px"></div><div id="gSearchResults"></div></div>';
  content.appendChild(p);
 }
 const input=content.querySelector('#gSearchInput');
 if(input&&!input.dataset.bound){input.dataset.bound='1';input.addEventListener('input',render)}
 const b=nav.querySelector('[data-tab="searchFoods"]');
 if(b&&!b.dataset.bound){b.dataset.bound='1';b.addEventListener('click',()=>{nav.querySelectorAll('.stock-subtab').forEach(x=>x.classList.toggle('active',x===b));content.querySelectorAll('.stock-panel').forEach(x=>x.classList.toggle('active',x===content.querySelector('[data-panel="searchFoods"]')));render();setTimeout(()=>input?.focus(),30)})}
 return true;
}
function render(){
 const input=document.querySelector('#gSearchInput'),out=document.querySelector('#gSearchResults');if(!input||!out)return;
 let d=[];try{d=JSON.parse(localStorage.getItem('bocainaFoods')||'[]')}catch{}
 const q=norm(input.value),a=d.filter(x=>!q||norm(x.name).includes(q));
 out.innerHTML='<div class="stock-note" style="margin:0 0 8px">'+a.length+' gênero(s) encontrado(s)</div><div class="stock-table-box"><table class="stock-table2"><thead><tr><th>Gênero</th><th>Unidade</th><th>Atual</th><th>Mínimo</th><th>Preço</th><th>Status</th></tr></thead><tbody>'+(a.length?a.map(x=>{const low=Number(x.min||0)>0&&Number(x.qty||0)<Number(x.min||0);return '<tr><td>'+esc(x.name)+'</td><td>'+esc(x.unit||'—')+'</td><td>'+Number(x.qty||0)+'</td><td>'+Number(x.min||0)||'—'+'</td><td>'+money(x.cost||0)+'</td><td class="'+(low?'stock-bad':'stock-ok')+'">'+(low?'REPOR':'NORMAL')+'</td></tr>'}).join(''):'<tr><td colspan="6" style="text-align:center;padding:20px">Nenhum gênero encontrado.</td></tr>')+'</tbody></table></div>';
}
function boot(){if(setup())return;const mo=new MutationObserver(()=>{if(setup())mo.disconnect()});mo.observe(document.body,{childList:true,subtree:true});}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();