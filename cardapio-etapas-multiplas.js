(()=> {
'use strict';
const $ = s => document.querySelector(s);
const STAGES = [['Etapas de Viagem',32.10],['Etapas de Porto',16.10],['Tripulantes de Lancha',2.00]];
const money = v => Number(v||0).toLocaleString('pt-BR',{style:'currency',currency:'BRL'});
const get = () => { try { const x=JSON.parse(localStorage.getItem('bocaina_menus')||'[]'); return Array.isArray(x)?x:[]; } catch(e) { return []; } };
const put = d => localStorage.setItem('bocaina_menus',JSON.stringify(d));
function install(){
 const form=$('.builder-form'), save=$('#saveMenu'), genre=$('#menuGenre'), qty=$('#menuQty'), add=$('#addIngredient');
 if(!form||!save||!genre||!qty||!add) return false;
 if(save.dataset.valeSaveFix==='1') return true;
 save.dataset.valeSaveFix='1';
 // The later layout script replaces the original stage/military controls.
 const setDefaultMeal=()=>{const m=$('#menuMeal');if(m)m.value='vale-diario';};
 setDefaultMeal();
 const saveVale=(e)=>{
   e.preventDefault(); e.stopImmediatePropagation();
   const name=$('#menuName')?.value.trim()||'';
   const checks=[...document.querySelectorAll('.final-stage-check:checked, .menu-stage-check:checked')];
   const stages=checks.map(ch=>{const i=Number(ch.dataset.i ?? ch.dataset.stageIndex);return STAGES[i];}).filter(Boolean);
   const military=Number($('#finalMilitary')?.value || $('#menuMilitary')?.value || 0);
   const rows=[...document.querySelectorAll('#ingredientList tbody tr')];
   const items=rows.map(row=>{
     const cells=row.querySelectorAll('td'); if(cells.length<4)return null;
     const qtext=cells[1].textContent.trim().split(/\s+/);
     const ptext=cells[2].textContent.replace(/[^0-9,.-]/g,'').replace(/\.(?=\d{3}(?:\D|$))/g,'').replace(',','.');
     const item={name:cells[0].textContent.trim(),qty:Number((qtext[0]||'0').replace(',','.')),unit:qtext.slice(1).join(' '),price:Number(ptext)};
     return item.name && item.qty>0 && Number.isFinite(item.price) ? item : null;
   }).filter(Boolean);
   if(!name){alert('Informe o nome do vale.');return;}
   if(!stages.length){alert('Marque pelo menos uma etapa.');return;}
   if(military<=0){alert('Informe a quantidade de militares.');return;}
   if(!items.length){alert('Adicione pelo menos um gênero ao vale.');return;}
   const total=items.reduce((s,x)=>s+x.qty*x.price,0);
   const authorized=stages.reduce((s,x)=>s+x[1],0)*military;
   const d=get();
   const idx=Number.isInteger(window.__editingMenuIndex)?window.__editingMenuIndex:-1;
   const previousRecord=idx>=0&&d[idx]?d[idx]:null;
   const oldItems=previousRecord?.items||[];
   const record={name,meal:'vale-diario',mealLabel:'Vale diário',stages:stages.map(x=>x[0]),stageValues:stages.map(x=>x[1]),stage:stages[0][0],stageValue:stages[0][1],military,militaryCount:military,authorizedExpense:authorized,items,total,updated:new Date().toISOString()};
   if(previousRecord) d[idx]={...previousRecord,...record}; else d.push({...record,created:new Date().toISOString()});
   try {
     // Integração transacional: o vale consome o saldo do Estoque de Gêneros.
     const norm=s=>String(s??'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/\s+/g,' ').trim();
     const stockKey='mun_foods', mirrorKey='bocainaFoods', movesKey='mun_moves';
     const stock=JSON.parse(localStorage.getItem(stockKey)||'[]');
     const mirror=JSON.parse(localStorage.getItem(mirrorKey)||'[]');
     if(!Array.isArray(stock)||!stock.length) throw new Error('O Estoque de Gêneros está vazio ou não foi carregado. Cadastre os gêneros antes de salvar o vale.');
     const aggregate=arr=>{const map=new Map();(arr||[]).forEach(x=>{const k=norm(x.name);if(k)map.set(k,(map.get(k)||0)+Number(x.qty||0))});return map};
     const before=aggregate(oldItems),after=aggregate(items),changes=[];
     const names=new Map();[...oldItems,...items].forEach(x=>names.set(norm(x.name),x.name));
     for(const [key,label] of names){
       const delta=(after.get(key)||0)-(before.get(key)||0);
       if(Math.abs(delta)<0.0000001) continue;
       const si=stock.findIndex(x=>norm(x.name)===key);
       if(si<0) throw new Error('O gênero "'+label+'" não foi encontrado no Estoque de Gêneros. Confira o cadastro antes de salvar.');
       const unit=items.find(x=>norm(x.name)===key)?.unit||oldItems.find(x=>norm(x.name)===key)?.unit||'';
       const stockUnit=stock[si].unit||'';
       if(unit&&stockUnit&&norm(unit)!==norm(stockUnit)) throw new Error('Unidade diferente para "'+label+'": no vale está "'+unit+'" e no estoque "'+stockUnit+'".');
       const current=Number(stock[si].qty??stock[si].current_qty??0);
       if(delta>0&&current+0.0000001<delta) throw new Error('Estoque insuficiente para "'+label+'". Disponível: '+current+' '+stockUnit+'; necessário: '+delta+' '+(stockUnit||unit)+'.');
       changes.push({key,label,si,delta,before:current,after:current-delta,unit:stockUnit||unit});
     }
     const now=new Date().toISOString();
     changes.forEach(ch=>{
       stock[ch.si]={...stock[ch.si],qty:ch.after,current_qty:ch.after};
       const mi=mirror.findIndex(x=>norm(x.name)===ch.key);
       if(mi>=0) mirror[mi]={...mirror[mi],qty:ch.after,current_qty:ch.after};
       else mirror.push({...stock[ch.si],qty:ch.after,current_qty:ch.after});
     });
     const history=JSON.parse(localStorage.getItem(movesKey)||'[]');
     changes.forEach(ch=>history.unshift({id:crypto.randomUUID?crypto.randomUUID():String(Date.now())+'-'+Math.random(),food:ch.label,type:ch.delta>0?'saida':'entrada',qty:Math.abs(ch.delta),before:ch.before,after:ch.after,date:now.slice(0,10),at:now,user:localStorage.getItem('bocaina_usuario')||'Usuário',obs:(ch.delta>0?'Consumo':'Estorno por edição')+' do vale: '+name}));
     // Grave saldo, espelho, histórico e vale; se ocorrer falha, restaure as chaves anteriores.
     const keys=[stockKey,mirrorKey,movesKey,'bocaina_menus'];
     const backup=Object.fromEntries(keys.map(k=>[k,localStorage.getItem(k)]));
     try{
       localStorage.setItem(stockKey,JSON.stringify(stock));
       localStorage.setItem(mirrorKey,JSON.stringify(mirror));
       localStorage.setItem(movesKey,JSON.stringify(history));
       put(d);
     }catch(writeError){
       keys.forEach(k=>backup[k]===null?localStorage.removeItem(k):localStorage.setItem(k,backup[k]));
       throw writeError;
     }
     window.dispatchEvent(new CustomEvent('municiamento:food-updated',{detail:{source:'vale',items:changes}}));
     document.dispatchEvent(new Event('bocaina:menus-updated'));
     const esc=v=>String(v??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
     const money=v=>Number(v||0).toLocaleString('pt-BR',{style:'currency',currency:'BRL'});
     const box=$('#savedMenus');
     if(box) box.innerHTML=d.length?d.map((m,i)=>{const items=(m.items||[]).map(x=>'<div>✓ '+esc(x.name)+' <span>— '+x.qty+' '+esc(x.unit)+' × '+money(x.price)+' = '+money(x.qty*x.price)+'</span></div>').join('');return '<div style="border:1px solid #d4e0eb;border-radius:7px;padding:9px;margin-bottom:7px"><b>'+esc(m.name)+'</b> — <span class="meal-badge">Vale diário</span> <span class="stage-badge">'+esc(m.stage||'Etapa não definida')+' — '+money(m.stageValue)+'/militar/dia</span> — <strong>'+money(m.total)+'</strong><span style="float:right"><button class="saved-menu-edit" data-editmenu="'+i+'">Editar</button><button class="stock-del" data-delmenu="'+i+'">Excluir</button></span><div class="authorized-detail">Despesa autorizada: <b>'+money(m.authorizedExpense)+'</b> = ('+(m.stages||[]).map(esc).join(' + ')+') × '+Number(m.military||0)+' militar(es)</div><div class="saved-menu-items">'+items+'</div></div>'}).join(''):'<div class="builder-empty">Nenhum vale salvo.</div>';
     $('#menuName').value='';
     $('#finalMilitary').value='';
     document.querySelectorAll('.final-stage-check,.menu-stage-check').forEach(x=>x.checked=false);
     const list=$('#ingredientList'); if(list)list.innerHTML='';
     const total=$('#menuTotal'); if(total)total.textContent=money(0);
     const auth=$('#finalAuthorized'); if(auth)auth.textContent='DESPESA AUTORIZADA: '+money(0);
     window.__editingMenuIndex=undefined;
     alert('Vale salvo com sucesso!');
   }
   catch(err){ console.error(err); alert('Não foi possível salvar o vale: '+(err.message||err)); }
 };

 // Exclusão persistente do vale, com devolução do consumo ao estoque.
 document.addEventListener('click',function deleteVale(e){
   const btn=e.target.closest('[data-delmenu]');
   if(!btn)return;
   e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();
   const index=Number(btn.dataset.delmenu);
   const menus=get();
   const menu=menus[index];
   if(!menu)return;
   if(!confirm('Excluir o vale "'+(menu.name||'')+'" e devolver os gêneros ao estoque?'))return;
   const norm=s=>String(s??'').normalize('NFD').replace(/[\\u0300-\\u036f]/g,'').toLowerCase().replace(/\\s+/g,' ').trim();
   const stockKey='mun_foods',mirrorKey='bocainaFoods',movesKey='mun_moves';
   const stock=JSON.parse(localStorage.getItem(stockKey)||'[]');
   const mirror=JSON.parse(localStorage.getItem(mirrorKey)||'[]');
   const history=JSON.parse(localStorage.getItem(movesKey)||'[]');
   const now=new Date().toISOString();
   for(const item of (menu.items||[])){
     const key=norm(item.name);
     const si=stock.findIndex(x=>norm(x.name)===key);
     if(si<0)throw new Error('Gênero não encontrado no estoque: '+item.name);
     const amount=Number(item.qty||0);
     const current=Number(stock[si].qty??stock[si].current_qty??0);
     const next=current+amount;
     stock[si]={...stock[si],qty:next,current_qty:next};
     const mi=mirror.findIndex(x=>norm(x.name)===key);
     if(mi>=0)mirror[mi]={...mirror[mi],qty:next,current_qty:next};
     else mirror.push({...stock[si],qty:next,current_qty:next});
     history.unshift({id:crypto.randomUUID?crypto.randomUUID():String(Date.now())+'-'+Math.random(),food:item.name,type:'entrada',qty:amount,before:current,after:next,date:now.slice(0,10),at:now,user:localStorage.getItem('bocaina_usuario')||'Usuário',obs:'Estorno pela exclusão do vale: '+(menu.name||'Vale')});
   }
   menus.splice(index,1);
   localStorage.setItem(stockKey,JSON.stringify(stock));
   localStorage.setItem(mirrorKey,JSON.stringify(mirror));
   localStorage.setItem(movesKey,JSON.stringify(history));
   put(menus);
   if(Number.isInteger(window.__editingMenuIndex)){
     if(window.__editingMenuIndex===index)window.__editingMenuIndex=undefined;
     else if(window.__editingMenuIndex>index)window.__editingMenuIndex--;
   }
   const box=$('#savedMenus');
   if(box)box.innerHTML=menus.length?menus.map((m,i)=>{
     const items=(m.items||[]).map(x=>'<div>✓ '+String(x.name)+' — '+x.qty+' '+String(x.unit||'')+'</div>').join('');
     return '<div style="border:1px solid #d4e0eb;border-radius:7px;padding:9px;margin-bottom:7px"><b>'+String(m.name||'Vale')+'</b><span style="float:right"><button class="saved-menu-edit" data-editmenu="'+i+'">Editar</button><button class="stock-del" data-delmenu="'+i+'">Excluir</button></span><div class="saved-menu-items">'+items+'</div></div>';
   }).join(''):'<div class="builder-empty">Nenhum vale salvo.</div>';
   window.dispatchEvent(new CustomEvent('municiamento:food-updated',{detail:{source:'vale-delete'}}));
   document.dispatchEvent(new Event('bocaina:menus-updated'));
 },true);
 save.addEventListener('click',saveVale,true);
 return true;
}
function wait(n=0){if(install()||n>60)return;setTimeout(()=>wait(n+1),250);}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>wait());else wait();
})();