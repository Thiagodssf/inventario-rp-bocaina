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
  document.addEventListener('click',e=>{
   const btn=e.target.closest('[data-select],[data-add]');if(!btn)return;
   const qty=document.querySelector('#menuQty');const genre=document.querySelector('#menuGenre');const idx=btn.dataset.select;
   if(idx!=null&&genre)genre.value=String(idx);if(qty){qty.value='';qty.defaultValue='';qty.removeAttribute('value');}
   if(btn.dataset.select!=null){e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();if(qty)qty.focus()}
  },true);
 }
 return !!sec;
}
function wait(){if(aplicar())return;setTimeout(wait,150)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',wait);else wait();

// Total previsto mensal: mostra a soma das quatro semanas salvas do mês selecionado.
function instalarTotalMensal(){
 const footer=document.querySelector('#wkFooter');
 if(!footer)return false;
 if(!document.querySelector('#totalMensalRP')){
  const style=document.createElement('style');style.id='totalMensalRPcss';style.textContent='.total-mensal-rp{background:#fff;border:2px solid #2e8b57;border-radius:8px;padding:13px;margin-top:10px;display:flex;justify-content:space-between;align-items:center;gap:12px}.total-mensal-rp .titulo{font-weight:900;color:#17324f}.total-mensal-rp .detalhe{font-size:9px;color:#667085;margin-top:4px}.total-mensal-rp .valor{font-size:20px;font-weight:900;color:#21864b}.total-mensal-rp .semanas{font-size:9px;color:#21864b;font-weight:700;margin-top:5px}';document.head.appendChild(style);
  const box=document.createElement('div');box.id='totalMensalRP';box.className='total-mensal-rp';footer.closest('.weekly-total')?.parentNode.insertBefore(box,footer.closest('.weekly-total').nextSibling);
 }
 const box=document.querySelector('#totalMensalRP'),input=document.querySelector('#weekStart');if(!box||!input)return false;
 const mes=(input.value||'').slice(0,7), planos=JSON.parse(localStorage.getItem('bocaina_weeklyPlans')||'[]');
 const semanas=planos.filter(w=>String(w.start||'').slice(0,7)===mes).sort((a,b)=>String(a.start).localeCompare(String(b.start))).slice(0,4);
 const total=semanas.reduce((s,w)=>s+Number(w.total||0),0);const nome=mes?new Date(mes+'-01T12:00:00').toLocaleDateString('pt-BR',{month:'long',year:'numeric'}):'mês selecionado';
 box.innerHTML='<div><div class="titulo">TOTAL PREVISTO MENSAL</div><div class="detalhe">'+semanas.length+' de 4 planejamentos semanais salvos em '+nome+'</div><div class="semanas">'+(semanas.map((w,i)=>'Semana '+(i+1)+': '+Number(w.total||0).toLocaleString('pt-BR',{style:'currency',currency:'BRL'})).join(' • ')||'Nenhum planejamento salvo neste mês.')+'</div></div><div class="valor">'+total.toLocaleString('pt-BR',{style:'currency',currency:'BRL'})+'</div>';
 if(!input.dataset.mensalRP){input.dataset.mensalRP='1';input.addEventListener('change',instalarTotalMensal)}return true;
}
function waitMensal(){if(instalarTotalMensal())return;setTimeout(waitMensal,300)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',waitMensal);else waitMensal();
})();