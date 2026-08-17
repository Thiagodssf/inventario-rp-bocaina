(()=>{'use strict';
let stockLoaded=false;
const loaded=new Set();
const loading=new Map();
const files={
  stock:'stock.js',
  menu:'menu-overrides.js',
  cardapio:'cardapio.js?v=23',
  etapas:'cardapio-etapas-multiplas.js?v=9',
  generos:'banco-generos-ajuste.js?v=23',
  semanal:'planejamento-semanal.js?v=23',
  mensal:'planejamento-mensal.js?v=9',
  despesa:'despesa-autorizada-banco.js?v=8',
  layout:'cardapio-layout-final.js?v=4',
  edit:'cardapio-edit-fix.js?v=2'
};
function load(key){
  if(loaded.has(key)) return Promise.resolve();
  if(loading.has(key)) return loading.get(key);
  const src=files[key];
  if(!src) return Promise.resolve();
  const p=new Promise((resolve,reject)=>{
    const s=document.createElement('script');
    s.async=false;
    s.src=src;
    s.onload=()=>{loaded.add(key);loading.delete(key);resolve()};
    s.onerror=()=>{loading.delete(key);console.error('Falha ao carregar '+src);reject(new Error(src))};
    document.body.appendChild(s);
  });
  loading.set(key,p);return p;
}
async function ensureBase(){
  if(stockLoaded)return;
  await load('stock');
  stockLoaded=true;
}
const dependencies={
  menu:['menu'],
  cardapio:['cardapio','etapas','generos','layout','edit'],
  semanal:['cardapio','semanal'],
  mensal:['cardapio','semanal','mensal'],
  expense:['despesa'],
  military:[],commitment:[],invoice:[]
};
async function ensure(tab){
  await ensureBase();
  const list=dependencies[tab]||[];
  for(const key of list) await load(key);
  if(typeof window.initStock==='function') window.initStock();
}
function bind(){
  const main=document.querySelector('.nav[data-view="stock"]');
  if(!main||main.dataset.lazyBound==='1')return;
  main.dataset.lazyBound='1';
  main.addEventListener('click',()=>ensureBase().catch(()=>{}));
  const observer=new MutationObserver(()=>{
    document.querySelectorAll('.stock-subtab').forEach(b=>{
      if(b.dataset.lazyBound==='1')return;
      b.dataset.lazyBound='1';
      b.addEventListener('click',()=>{
        const tab=b.dataset.tab;
        ensure(tab).catch(()=>{});
      });
    });
  });
  observer.observe(document.body,{childList:true,subtree:true});
  document.querySelectorAll('.stock-subtab').forEach(b=>{
    b.dataset.lazyBound='1';
    b.addEventListener('click',()=>ensure(b.dataset.tab).catch(()=>{}));
  });
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',bind);else bind();
})();
