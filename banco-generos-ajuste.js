(()=>{'use strict';
function aplicar(){
 const sec=document.querySelector('.stock-panel[data-panel="pricebank"]');
 if(sec&&!sec.dataset.ajusteQuantidade){
  sec.dataset.ajusteQuantidade='1';
  if(!document.querySelector('#bancoSelecaoCss')){const s=document.createElement('style');s.id='bancoSelecaoCss';s.textContent='.banco-selecao{background:#f2c300;border-radius:8px;padding:12px;margin-bottom:10px}.banco-selecao-title{font-size:10px;font-weight:900;color:#17324f;margin-bottom:8px}.banco-selecao-grid{display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:10px}.banco-selecao-grid label{font-size:9px;font-weight:900;color:#17324f}.banco-selecao-grid input{display:block;width:100%;height:35px;margin-top:4px;border:1px solid #9fb2c6;border-radius:6px;padding:5px 8px;background:#fff;box-sizing:border-box}.banco-selecao-help{font-size:9px;color:#17324f;margin-top:7px}@media(max-width:700px){.banco-selecao-grid{grid-template-columns:1fr}}';document.head.appendChild(s)}
  const tools=sec.querySelector('.stock-tools');
  if(tools){const box=document.createElement('div');box.className='banco-selecao';box.innerHTML='<div class="banco-selecao-title">GÊNERO SELECIONADO</div><div class="banco-selecao-grid"><label>Gênero<input id="bancoGeneroSelecionado" type="text" readonly placeholder="Clique em Adicionar ao cardápio"></label><label>Unidade<input id="bancoUnidadeSelecionada" type="text" readonly placeholder="—"></label><label>Quantidade necessária<input id="bancoQuantidade" type="number" min="0" step="0.01" placeholder="Informe a quantidade"></label><label>Preço unitário<input id="bancoPrecoSelecionado" type="text" readonly placeholder="—"></label></div><div class="banco-selecao-help">Selecionar um gênero não define quantidade. Informe manualmente a quantidade necessária.</div>';tools.parentNode.insertBefore(box,tools)}
  sec.addEventListener('click',e=>{const btn=e.target.closest('[data-add]');if(!btn)return;e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();const row=btn.closest('tr'),cells=row?row.querySelectorAll('td'):[],g=document.querySelector('#bancoGeneroSelecionado'),u=document.querySelector('#bancoUnidadeSelecionada'),p=document.querySelector('#bancoPrecoSelecionado'),q=document.querySelector('#bancoQuantidade');if(g)g.value=btn.dataset.add||'';if(u)u.value=cells[1]?.textContent.trim()||'';if(p)p.value=cells[2]?.textContent.trim()||'';if(q){q.value='';q.defaultValue='';q.removeAttribute('value');q.focus()}},true);
 }
 if(!document.documentElement.dataset.qtdCardapioCorrigida){
  document.documentElement.dataset.qtdCardapioCorrigida='1';
  document.addEventListener('click',e=>{const btn=e.target.closest('[data-select],[data-add]');if(!btn)return;const qty=document.querySelector('#menuQty');const genre=document.querySelector('#menuGenre');const idx=btn.dataset.select;if(idx!=null&&genre)genre.value=String(idx);if(qty){qty.value='';qty.defaultValue='';qty.removeAttribute('value');}if(btn.dataset.select!=null){e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();if(qty)qty.focus()}},true);
 }
 if(!document.documentElement.dataset.mensalRP){
  document.documentElement.dataset.mensalRP='1';
  const money=v=>Number(v||0).toLocaleString('pt-BR',{style:'currency',currency:'BRL'});
  const monthKey=v=>{if(!v)return '';const m=String(v).slice(0,7);return m};
  const atualizarMensal=()=>{const panel=document.querySelector('.stock-panel[data-panel="semanal"]');if(!panel)return;const totalWeek=panel.querySelector('.weekly-total');if(!totalWeek)return;let box=panel.querySelector('#monthlyForecast');if(!box){box=document.createElement('div');box.id='monthlyForecast';box.style.cssText='background:#e8f5ec;border:1px solid #9ed0ad;border-radius:7px;margin-top:8px;padding:12px;display:flex;justify-content:space-between;align-items:center;gap:12px;color:#176b3a;font-weight:900;flex-wrap:wrap';totalWeek.insertAdjacentElement('afterend',box)}const start=panel.querySelector('#weekStart')?.value||'';const month=monthKey(start);const saved=JSON.parse(localStorage.getItem('bocaina_weeklyPlans')||'[]');const weeks=saved.filter(w=>monthKey(w.start)===month).slice(0,4);const sum=weeks.reduce((a,w)=>a+Number(w.total||0),0);box.innerHTML='<span><b>TOTAL PREVISTO MENSAL</b><small style="display:block;font-weight:600;margin-top:3px">'+weeks.length+' de 4 semanas salvas em '+(month?month.split('-').reverse().join('/'):'mês selecionado')+'</small></span><strong style="font-size:20px">'+money(sum)+'</strong>'};
  const watch=()=>{atualizarMensal();setTimeout(watch,500)};watch();document.addEventListener('input',atualizarMensal);document.addEventListener('change',atualizarMensal);window.addEventListener('storage',atualizarMensal);
 }
 return true;
}
function wait(){if(aplicar())return;setTimeout(wait,150)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',wait);else wait();
})();