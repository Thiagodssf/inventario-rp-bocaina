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
   const record={name,meal:'vale-diario',mealLabel:'Vale diário',stages:stages.map(x=>x[0]),stageValues:stages.map(x=>x[1]),stage:stages[0][0],stageValue:stages[0][1],military,militaryCount:military,authorizedExpense:authorized,items,total,updated:new Date().toISOString()};
   if(idx>=0 && d[idx]) d[idx]={...d[idx],...record}; else d.push({...record,created:new Date().toISOString()});
   try { put(d); document.dispatchEvent(new Event('bocaina:menus-updated')); alert('Vale salvo com sucesso!'); location.reload(); }
   catch(err){ console.error(err); alert('Não foi possível salvar o vale: '+(err.message||err)); }
 };
 save.addEventListener('click',saveVale,true);
 return true;
}
function wait(n=0){if(install()||n>60)return;setTimeout(()=>wait(n+1),250);}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>wait());else wait();
})();