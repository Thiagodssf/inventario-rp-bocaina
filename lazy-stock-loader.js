(()=>{'use strict';
let loaded=false,loading=false;
const files=['stock.js','menu-overrides.js','municiamento-banco.js','cardapio.js?v=23','cardapio-etapas-multiplas.js?v=9','banco-generos-ajuste.js?v=23','planejamento-semanal.js?v=23','planejamento-mensal.js?v=9','despesa-autorizada-banco.js?v=8','cardapio-layout-final.js?v=4','cardapio-edit-fix.js?v=2'];
function load(src){return new Promise((resolve,reject)=>{const s=document.createElement('script');s.src=src;s.onload=resolve;s.onerror=reject;document.body.appendChild(s)})}
async function start(){if(loaded||loading)return;loading=true;try{for(const f of files)await load(f);loaded=true;window.__stockModulesLoaded=true;if(typeof window.initStock==='function')window.initStock()}catch(e){console.error('Falha ao carregar módulos do Municiamento:',e);loading=false}}
function bind(){document.querySelectorAll('.nav[data-view="stock"]').forEach(b=>b.addEventListener('click',start,{once:false}));}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',bind);else bind();
})();
