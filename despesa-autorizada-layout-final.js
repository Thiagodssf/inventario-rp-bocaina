(()=>{'use strict';
const q=s=>document.querySelector(s);
const money=v=>Number(v||0).toLocaleString('pt-BR',{style:'currency',currency:'BRL'});
const read=(k,d=[])=>{try{const x=JSON.parse(localStorage.getItem(k));return x??d}catch{return d}};
function css(){
 if(q('#daFinalLayoutCss'))return;
 const s=document.createElement('style');s.id='daFinalLayoutCss';s.textContent=`
 .da-v3 .da-bottom{display:grid!important;grid-template-columns:minmax(0,1fr) minmax(0,1fr)!important;gap:14px!important;align-items:start!important}
 .da-v3 .da-bottom>.da-box:first-child{display:block!important;grid-column:1!important;grid-row:1!important;width:100%!important;margin:0!important}
 .da-v3 .da-bottom>.da-box:nth-child(2){display:none!important}
 .da-v3 .da-bottom>.da-daily-calc{display:block!important;grid-column:2!important;grid-row:1!important;width:100%!important}
 .da-v3 .da-bottom>#daMonthly{display:none!important}
 .da-v3 .da-new-form{display:grid!important;grid-template-columns:1fr 1fr 1fr 1.15fr!important;gap:9px!important;background:#f2c300;padding:11px;border-radius:8px}
 .da-v3 .da-new-form label{display:block;font-size:8px;font-weight:900;color:#17324f}
 .da-v3 .da-new-form input,.da-v3 .da-new-form select{width:100%;height:35px;margin-top:4px;border:1px solid #b7c7d6;border-radius:6px;background:#fff;padding:5px 8px;font:inherit}
 .da-v3 .da-new-form button{height:35px;margin-top:16px;border:0;border-radius:6px;background:#0b2d52;color:#fff;font-weight:900;cursor:pointer}
 .da-v3 .da-new-total{display:flex;justify-content:space-between;align-items:center;background:#082e53;color:#fff;border-radius:8px;padding:9px 11px;margin-top:8px;font-weight:900;grid-column:1/-1}
 .da-v3 .da-new-total strong{font-size:16px}
 @media(max-width:950px){.da-v3 .da-bottom{grid-template-columns:1fr!important}.da-v3 .da-bottom>.da-box:first-child{grid-column:1!important}.da-v3 .da-bottom>.da-daily-calc{grid-column:1!important;grid-row:2!important}.da-v3 .da-new-form{grid-template-columns:1fr 1fr!important}}
 @media(max-width:600px){.da-v3 .da-new-form{grid-template-columns:1fr!important}.da-v3 .da-new-form button{margin-top:0}}
 `;document.head.appendChild(s)
}
function bank(){return read('bocaina_expense_types',[{name:'Etapas de Porto',value:16.10},{name:'Etapas de Viagem',value:32.10},{name:'Tripulantes de Lancha',value:2.00}])}
function buildForm(root){
 const main=root.querySelector('.da-main');if(!main)return false;
 let form=root.querySelector('#daNewForm');
 if(form)return true;
 const title=main.querySelector('.da-title');if(title)title.textContent='👜 NOVA DESPESA AUTORIZADA';
 const old=[...main.children].filter(el=>el!==title);old.forEach(el=>el.remove());
 form=document.createElement('div');form.id='daNewForm';form.className='da-new-form';
 form.innerHTML=`<label>Data<input id="daDateNew" type="date"></label><label>Etapa<select id="daStageNew"><option value="">Selecione a etapa...</option></select></label><label>Militares<input id="daPeopleNew" type="number" min="1" step="1" placeholder="Qtd. militares"></label><label>Dias<input id="daDaysNew" type="number" min="1" step="1" placeholder="Qtd. dias"></label><div class="da-new-total"><span>DESPESA AUTORIZADA</span><strong id="daTotalNew">R$ 0,00</strong></div><button id="daSaveNew">＋ Adicionar registro</button>`;
 main.appendChild(form);
 const sel=form.querySelector('#daStageNew');bank().forEach(x=>{const o=document.createElement('option');o.value=x.name;o.textContent=x.name+' — '+money(x.value)+'/militar/dia';sel.appendChild(o)});
 const calc=()=>{const x=bank().find(v=>v.name===sel.value);const p=Number(form.querySelector('#daPeopleNew').value||0),d=Number(form.querySelector('#daDaysNew').value||0);return x?Number(x.value)*p*d:0};
 ['daStageNew','daPeopleNew','daDaysNew'].forEach(id=>form.querySelector('#'+id).addEventListener('input',()=>form.querySelector('#daTotalNew').textContent=money(calc())));
 form.querySelector('#daSaveNew').onclick=()=>{const date=form.querySelector('#daDateNew').value,stage=sel.value,p=Number(form.querySelector('#daPeopleNew').value||0),d=Number(form.querySelector('#daDaysNew').value||0),total=calc();if(!date||!stage||p<=0||d<=0){alert('Preencha data, etapa, quantidade de militares e dias.');return}if(total<=0){alert('Não foi possível calcular a despesa para a etapa selecionada.');return}let a=read('bocaina_authorized_expenses',[]);a.unshift({id:Date.now(),date,authorization:'Despesa diária',purpose:stage,authorized:total,used:0,status:'Pendente',obs:p+' militar(es) × '+d+' dia(s)'});localStorage.setItem('bocaina_authorized_expenses',JSON.stringify(a));form.querySelector('#daDateNew').value='';sel.value='';form.querySelector('#daPeopleNew').value='';form.querySelector('#daDaysNew').value='';form.querySelector('#daTotalNew').textContent=money(0);document.dispatchEvent(new Event('da-expense-updated'));if(typeof window.daRefresh==='function')window.daRefresh()};
 return true;
}
function apply(){css();const roots=[...document.querySelectorAll('.stock-panel[data-panel="expense"] .da-v3')];if(!roots.length)return false;const main=roots.find(r=>r.querySelector('.da-bottom>.da-daily-calc'))||roots[0];roots.forEach(root=>{if(root!==main){root.style.setProperty('display','none','important');return}root.style.setProperty('display','block','important');buildForm(root);const bottom=root.querySelector(':scope > .da-bottom');if(!bottom)return;bottom.style.setProperty('display','grid','important');bottom.style.setProperty('grid-template-columns','minmax(0,1fr) minmax(0,1fr)','important');bottom.querySelectorAll(':scope > .da-box:nth-child(2)').forEach(el=>el.style.setProperty('display','none','important'));bottom.querySelectorAll(':scope > #daMonthly').forEach(el=>el.style.setProperty('display','none','important'));const daily=bottom.querySelector(':scope > .da-daily-calc');if(daily){daily.style.setProperty('display','block','important');daily.style.setProperty('grid-column','2','important');daily.style.setProperty('grid-row','1','important')}});return true}
function wait(){if(apply())setTimeout(apply,500);else setTimeout(wait,200)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',wait);else wait();
new MutationObserver(()=>setTimeout(apply,100)).observe(document.body,{childList:true,subtree:true});
document.addEventListener('click',()=>setTimeout(apply,150));
})();