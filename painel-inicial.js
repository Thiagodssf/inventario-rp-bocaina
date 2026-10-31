(()=>{'use strict';
const $=s=>document.querySelector(s);
const read=k=>{try{const v=JSON.parse(localStorage.getItem(k)||'[]');return Array.isArray(v)?v:[]}catch{return[]}};
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const norm=s=>String(s??'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
function render(){
 const root=$('#home');if(!root)return;
 const inv=read('bocaina_rp_inventory_items_v1'),foods=read('bocainaFoods'),agenda=read('bocaina_agendaEvents');
 const low=foods.filter(x=>Number(x.min??x.min_qty??0)>0&&Number(x.qty??x.current_qty??0)<Number(x.min??x.min_qty??0));
 const now=new Date();now.setHours(0,0,0,0);
 const future=agenda.filter(e=>e.date&&new Date(e.date+'T12:00:00')>=now).sort((a,b)=>a.date.localeCompare(b.date)).slice(0,5);
 const todayKey=[now.getFullYear(),String(now.getMonth()+1).padStart(2,'0'),String(now.getDate()).padStart(2,'0')].join('-');
 const today=agenda.filter(e=>e.date===todayKey).length,overdue=agenda.filter(e=>e.date&&e.date<todayKey).length;
 const locations=new Set(inv.map(x=>x.local).filter(Boolean));
 root.innerHTML=`<div class="hd-wrap"><section class="hd-hero"><div class="hd-kicker">CENTRAL DE CONTROLE • P-62</div><h2>Bem-vindo ao NPa Bocaina</h2><p>Painel geral de acompanhamento administrativo e operacional.</p><div class="hd-date">📅 ${now.toLocaleDateString('pt-BR',{weekday:'long',day:'2-digit',month:'long',year:'numeric'})}</div></section><h3 class="hd-section-title">VISÃO GERAL</h3><section class="hd-kpis">
${[['ITENS DO INVENTÁRIO',inv.length,'Materiais cadastrados','▤'],['GÊNEROS',foods.length,'Produtos no estoque','🍽️'],['ESTOQUE BAIXO',low.length,'Gêneros abaixo do mínimo','⚠️'],['LOCALIZAÇÕES',locations.size,'Compartimentos e gavetas','📍'],['COMPROMISSOS HOJE',today,'Eventos para hoje','📅'],['AGENDA ATRASADA',overdue,'Eventos com data anterior','⏰']].map(x=>'<div class="hd-kpi"><div class="hd-kpi-top">'+x[0]+' <span class="hd-kpi-icon">'+x[3]+'</span></div><strong>'+x[1]+'</strong><small>'+x[2]+'</small></div>').join('')}
</section><div class="hd-grid"><section class="hd-card"><h3>⚡ ACESSO RÁPIDO</h3><div class="hd-shortcuts"><button class="hd-shortcut" data-go="inventory">▤ <b>Inventário RP</b></button><button class="hd-shortcut" data-go="stock">🍽️ <b>Municiamento</b></button><button class="hd-shortcut" data-go="agenda">📅 <b>Agenda Administrativa</b></button><button class="hd-shortcut" data-go="aniversariantes">🎂 <b>Aniversariantes</b></button></div></section><section class="hd-card"><h3>📌 PRÓXIMOS COMPROMISSOS</h3><div class="hd-list">${future.length?future.map(e=>'<div class="hd-event"><b>'+esc(new Date(e.date+'T12:00:00').toLocaleDateString('pt-BR'))+'</b><span>'+esc(e.title||e.name||'Compromisso')+'</span></div>').join(''):'<div class="hd-empty">Nenhum compromisso futuro cadastrado.</div>'}</div><button type="button" data-go="agenda">Abrir agenda →</button></section></div><section class="hd-card"><h3>🔎 PESQUISA RÁPIDA</h3><div class="hd-search"><input id="hdSearch" type="search" placeholder="Pesquise um material ou gênero..."><button type="button" id="hdSearchBtn">Pesquisar</button></div><div id="hdSearchHint" class="hd-hint">Pesquisa nos dados já disponíveis neste navegador.</div></section><div class="hd-footer">Indicadores locais • A sincronização continua sendo controlada exclusivamente pelo módulo próprio.</div></div>`;
 root.querySelectorAll('[data-go]').forEach(b=>b.addEventListener('click',()=>document.querySelector('.nav[data-view="'+b.dataset.go+'"]')?.click()));
 const run=()=>{const q=norm($('#hdSearch')?.value||'');if(!q)return;const a=inv.filter(x=>norm(x.material).includes(q)),b=foods.filter(x=>norm(x.name).includes(q));$('#hdSearchHint').textContent=a.length+b.length?([...a.slice(0,4).map(x=>'Inventário: '+x.material),...b.slice(0,4).map(x=>'Gênero: '+x.name)].join(' • ')):'Nenhum resultado encontrado.'};
 $('#hdSearchBtn')?.addEventListener('click',run);$('#hdSearch')?.addEventListener('keydown',e=>{if(e.key==='Enter')run()});
}
function boot(){render();document.addEventListener('bocaina:agenda-updated',render);document.addEventListener('bocaina:remote-sync',render);window.addEventListener('storage',render);document.querySelector('.nav[data-view="home"]')?.addEventListener('click',()=>setTimeout(render,30))}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();