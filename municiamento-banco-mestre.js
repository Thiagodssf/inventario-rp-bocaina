(()=>{'use strict';
/* Banco de Gêneros mestre: mesma lista usada em Cardápios, sem apagar estoque já lançado. */
const BANK=[
['AÇUCAR REFINADO SC 1 KG','KG',4.17],['ALCATRA','KG',36.95],['ARROZ BRANCO TIPO 1 SC 1 KG FA 10 KG','KG',3.56],['AZEITE OLIVA','LI',44.60],['BACON DEFUMADO','KG',29],['BATATA PALHA EMB. COM 500G','UN',22],['BISCOITO CREAM CRACKER','KG',2],['BISCOITO DOCE','KG',2],['CHOCOLATE PO','KG',11.40],['COCADA BRANCA','UN',40],['CONTRA-FILE','KG',39.39],['COXA FRANGO','KG',8.04],['CREME DE LEITE 200G','UN',8.50],['EMPANADO DE FRANGO','KG',19.30],['EXTRATO TOMATE','KG',5.52],['FEIJAO PRETO TIPO 1 SA 1 KG FA 10 KG','KG',3.48],['FERMENTO QUÍMICO EM PÓ, EMB. 100G','UN',26.22],['FILÉ DE DOURADA','KG',37],['GELEIA','KG',8.97],['LEITE EM PÓ INTEGRAL 1KG','PA',37.80],['LEITE PO INSTANTANEO','KG',30.39],['LIMÃO (HTM)','KG',3.16],['LOMBO DE PORCO','KG',18.08],['MACARRÃO ESPAGUETE','KG',3.98],['MANTEIGA COM SAL EMB. 10KG','UN',350],['MORTADELA BOLONHA','KG',25.90],['OVO TIPO EXTRA','DZ',8],['PIMENTÃO VERDE (HTM)','KG',5.27],['POLPA DE CUPUAÇU','UN',12.80],['POLPA DE TAPEREBÁ','KG',7.90],['PRESUNTO COZIDO','KG',22],['PÃO DE FORMA C/500G','UN',8.40],['PÃO FRANCÊS','KG',15.90],['REFRIGERANTE COLA 2L','UN',3.90],['REFRIGERANTE COLA ZERO','UN',6.70],['SAL MESA','KG',1.31],['SUCO CAJU','LI',3.50],['SUCO MARACUJA','LI',6.49],['SUCO UVA','LI',6.41],['ÓLEO VEGETAL','GA',6.85]
];
const norm=s=>String(s??'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim();
const esc=s=>String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
const read=(k,d=[])=>{try{return JSON.parse(localStorage.getItem(k)||JSON.stringify(d))}catch{return d}};
const write=(k,v)=>localStorage.setItem(k,JSON.stringify(v));
function sync(){
 const old=read('bocainaFoods',[]);const map=new Map(old.map(x=>[norm(x.name||x.description||x.food),x]));
 BANK.forEach(([name,unit,cost])=>{const k=norm(name),x=map.get(k)||{};map.set(k,{...x,name,unit:x.unit||unit,qty:Number(x.qty??x.current_qty??0),min:Number(x.min??x.min_qty??0),cost:Number(x.cost??x.unit_cost??x.price??cost),category:x.category||'Banco de Gêneros',source:'Banco de Gêneros'});});
 const foods=BANK.map(([name])=>map.get(norm(name))).filter(Boolean);const extras=[...map.values()].filter(x=>!BANK.some(b=>norm(b[0])===norm(x.name||'')));const merged=[...foods,...extras];
 write('bocainaFoods',merged);write('mun_foods',merged.map(x=>({...x,current_qty:Number(x.qty||0),min_qty:Number(x.min||0)})));localStorage.setItem('mun_bank_master_version','1');localStorage.setItem('mun_bank_master_at',new Date().toISOString());
 refreshFoods();try{window.dispatchEvent(new CustomEvent('municiamento:bank-updated',{detail:{count:foods.length}}));document.body.classList.toggle('mun-bank-refresh');}catch{}
}
function refreshFoods(){
 const panel=document.querySelector('#stock .stock-panel[data-panel="foods"]');if(!panel)return;const foods=read('bocainaFoods',[]);const low=foods.filter(x=>Number(x.min||0)>0&&Number(x.qty||0)<Number(x.min||0));const total=foods.reduce((s,x)=>s+Number(x.qty||0),0);
 const count=panel.querySelector('#gCount'),l=panel.querySelector('#gLow'),t=panel.querySelector('#gTotal'),d=panel.querySelector('#gDate'),list=panel.querySelector('#gList');if(count)count.textContent=foods.length;if(l)l.textContent=low.length;if(t)t.textContent=total.toLocaleString('pt-BR');if(d)d.textContent=foods.length?new Date().toLocaleDateString('pt-BR'):'—';
 if(list)list.innerHTML=`<div class="stock-table-box"><table class="stock-table2"><thead><tr><th>Gênero</th><th>Unidade</th><th>Atual</th><th>Mínimo</th><th>Preço</th><th>Status</th></tr></thead><tbody>${foods.map(x=>{const q=Number(x.qty||0),m=Number(x.min||0),critical=m>0&&q<m;return`<tr><td>${esc(x.name)}</td><td>${esc(x.unit)}</td><td>${q}</td><td>${m||'—'}</td><td>${Number(x.cost||0).toLocaleString('pt-BR',{style:'currency',currency:'BRL'})}</td><td class="${critical?'stock-bad':'stock-ok'}">${critical?'REPOR':'NORMAL'}</td></tr>`}).join('')}</tbody></table></div>`;
}
window.bocainaGenreBank=BANK.map(x=>({name:x[0],unit:x[1],cost:x[2]}));window.municiamentoSyncBank=sync;window.municiamentoRefreshFoods=refreshFoods;
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',sync);else sync();
setInterval(refreshFoods,2000);
})();