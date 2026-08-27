(()=>{'use strict';
let stockLoaded=false;
const loaded=new Set();
const loading=new Map();
const files={stock:'stock.js?v=24',menu:'menu-overrides.js?v=24',cardapio:'cardapio.js?v=24',etapas:'cardapio-etapas-multiplas.js?v=10',generos:'banco-generos-ajuste.js?v=24',semanal:'planejamento-semanal.js?v=24',mensal:'planejamento-mensal.js?v=10',despesa:'despesa-autorizada-banco.js?v=9',layout:'cardapio-layout-final.js?v=5',edit:'cardapio-edit-fix.js?v=3',fix:'municiamento-layout-fix.js?v=1'};
function load(key){if(loaded.has(key))return Promise.resolve();if(loading.has(key))return loading.get(key);const src=files[key];if(!src)return Promise.resolve();const p=new Promise((resolve,reject)=>{const s=document.createElement('script');s.async=false;s.src=src;s.onload=()=>{loaded.add(key);loading.delete(key);resolve()};s.onerror=()=>{loading.delete(key);console.error('Falha ao carregar '+src);reject(new Error(src))};document.body.appendChild(s)});loading.set(key,p);return p}
async function ensureBase(){if(stockLoaded)return;await load('stock');await load('fix');stockLoaded=true}
const dependencies={menu:['menu'],cardapio:['cardapio','etapas','generos','layout','edit'],semanal:['cardapio','semanal'],mensal:['cardapio','semanal','mensal'],expense:['despesa'],military:[],commitment:[],invoice:[]};
function preparePlanningTabs(){
  const stock=document.querySelector('#stock');
  const nav=stock?.querySelector('.stock-subtabs');
  if(!nav)return;
  const oldMenu=nav.querySelector('[data-tab="menu"]');
  if(oldMenu){oldMenu.dataset.tab='cardapio';oldMenu.textContent='🍽️ Cardápios';oldMenu.title='Cadastro e composição de cardápios';}
  const add=(key,label,icon)=>{
    if(nav.querySelector(`[data-tab="${key}"]`))return;
    const b=document.createElement('button');b.type='button';b.className='stock-subtab';b.dataset.tab=key;b.textContent=icon+' '+label;b.title=label;nav.appendChild(b);
  };
  add('semanal','Planejamento Semanal','📅');
  add('mensal','Planejamento Mensal','📊');
}
function activate(tab){
  const stock=document.querySelector('#stock');
  const nav=stock?.querySelector('.stock-subtabs');
  const content=stock?.querySelector('#stockSubContent');
  if(!nav||!content)return;
  const panelTab=tab==='mensal'?'semanal':tab;
  nav.querySelectorAll('.stock-subtab').forEach(b=>b.classList.toggle('active',b.dataset.tab===tab));
  content.querySelectorAll('.stock-panel').forEach(p=>p.classList.toggle('active',p.dataset.panel===panelTab));
}
async function ensure(tab){await ensureBase();preparePlanningTabs();for(const key of (dependencies[tab]||[]))await load(key);if(typeof window.initStock==='function')window.initStock();activate(tab)}
function bind(){
  document.addEventListener('click',e=>{
    const main=e.target.closest('.nav[data-view="stock"]');
    if(main){ensureBase().then(preparePlanningTabs).catch(()=>{});return;}
    const sub=e.target.closest('.stock-subtab[data-tab]');
    if(sub){ensure(sub.dataset.tab).catch(()=>{});}
  },true);
  ensureBase().then(preparePlanningTabs).catch(()=>{});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',bind);else bind();
})();
