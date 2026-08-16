(()=>{'use strict';
function aplicar(){
 const sec=document.querySelector('.stock-panel[data-panel="pricebank"]');
 if(!sec||sec.dataset.ajusteQuantidade==='1')return false;
 sec.dataset.ajusteQuantidade='1';
 const tools=sec.querySelector('.stock-tools');
 if(tools){
  const box=document.createElement('div');
  box.className='banco-selecao';
  box.innerHTML='<div class="banco-selecao-title">GÊNERO SELECIONADO</div><div class="banco-selecao-grid"><label>Gênero<input id="bancoGeneroSelecionado" type="text" readonly placeholder="Clique em + para selecionar"></label><label>Unidade<input id="bancoUnidadeSelecionada" type="text" readonly placeholder="—"></label><label>Quantidade necessária<input id="bancoQuantidade" type="number" min="0" step="0.01" placeholder="Informe a quantidade"></label><label>Preço unitário<input id="bancoPrecoSelecionado" type="text" readonly placeholder="—"></label></div><div class="banco-selecao-help">O botão + apenas seleciona o gênero. A quantidade NÃO é preenchida automaticamente.</div>';
  tools.parentNode.insertBefore(box,tools);
 }
 sec.addEventListener('click',e=>{
  const btn=e.target.closest('[data-add]');
  if(!btn)return;
  e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();
  const nome=btn.dataset.add;
  const row=btn.closest('tr');
  const cells=row?row.querySelectorAll('td'):[];
  const unidade=cells[1]?.textContent.trim()||'';
  const preco=cells[2]?.textContent.trim()||'';
  const g=document.querySelector('#bancoGeneroSelecionado'),u=document.querySelector('#bancoUnidadeSelecionada'),p=document.querySelector('#bancoPrecoSelecionado'),q=document.querySelector('#bancoQuantidade');
  if(g)g.value=nome;if(u)u.value=unidade;if(p)p.value=preco;if(q){q.value='';q.focus();}
 },true);
 return true;
}
function wait(){if(aplicar())return;setTimeout(wait,150)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',wait);else wait();
})();