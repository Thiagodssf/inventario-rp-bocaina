(()=>{'use strict';
function aplicar(){
 const sec=document.querySelector('.stock-panel[data-panel="pricebank"]');
 if(!sec||sec.dataset.ajusteQuantidade==='1')return false;
 sec.dataset.ajusteQuantidade='1';
 if(!document.querySelector('#bancoSelecaoCss')){const s=document.createElement('style');s.id='bancoSelecaoCss';s.textContent='.banco-selecao{background:#f2c300;border-radius:8px;padding:12px;margin-bottom:10px}.banco-selecao-title{font-size:10px;font-weight:900;color:#17324f;margin-bottom:8px}.banco-selecao-grid{display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:10px}.banco-selecao-grid label{font-size:9px;font-weight:900;color:#17324f}.banco-selecao-grid input{display:block;width:100%;height:35px;margin-top:4px;border:1px solid #9fb2c6;border-radius:6px;padding:5px 8px;background:#fff;box-sizing:border-box}.banco-selecao-help{font-size:9px;color:#17324f;margin-top:7px}@media(max-width:700px){.banco-selecao-grid{grid-template-columns:1fr}}';document.head.appendChild(s)}
 const tools=sec.querySelector('.stock-tools');
 if(tools){
  const box=document.createElement('div');box.className='banco-selecao';
  box.innerHTML='<div class="banco-selecao-title">GÊNERO SELECIONADO</div><div class="banco-selecao-grid"><label>Gênero<input id="bancoGeneroSelecionado" type="text" readonly placeholder="Clique em + para selecionar"></label><label>Unidade<input id="bancoUnidadeSelecionada" type="text" readonly placeholder="—"></label><label>Quantidade necessária<input id="bancoQuantidade" type="number" min="0" step="0.01" placeholder="Informe a quantidade"></label><label>Preço unitário<input id="bancoPrecoSelecionado" type="text" readonly placeholder="—"></label></div><div class="banco-selecao-help">O botão + apenas seleciona o gênero. A quantidade não é preenchida automaticamente.</div>';
  tools.parentNode.insertBefore(box,tools);
 }
 sec.addEventListener('click',e=>{
  const btn=e.target.closest('[data-add]');if(!btn)return;
  e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();
  const nome=btn.dataset.add,row=btn.closest('tr'),cells=row?row.querySelectorAll('td'):[];
  const unidade=cells[1]?.textContent.trim()||'',preco=cells[2]?.textContent.trim()||'';
  const g=document.querySelector('#bancoGeneroSelecionado'),u=document.querySelector('#bancoUnidadeSelecionada'),p=document.querySelector('#bancoPrecoSelecionado'),q=document.querySelector('#bancoQuantidade');
  if(g)g.value=nome;if(u)u.value=unidade;if(p)p.value=preco;if(q){q.value='';q.focus();}
 },true);
 return true;
}
function wait(){if(aplicar())return;setTimeout(wait,150)}if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',wait);else wait();
})();