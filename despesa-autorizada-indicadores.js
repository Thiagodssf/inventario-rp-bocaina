(()=>{'use strict';
function ajustarIndicadores(){
  const root=document.querySelector('.da-v3');
  if(!root)return false;
  const cards=[...root.querySelectorAll('.da-kpis:first-child .da-kpi')];
  if(cards.length>=4){
    const nomes=['VALOR AUTORIZADO','VALOR UTILIZADO','VALOR DISPONÍVEL'];
    // Mantém o card de registros e renomeia somente os três indicadores financeiros.
    cards.slice(1,4).forEach((card,i)=>{
      const label=card.querySelector('small');
      if(label)label.textContent=nomes[i];
    });
  }
  return true;
}
function aplicar(){if(ajustarIndicadores())setTimeout(ajustarIndicadores,300)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(aplicar,200));else setTimeout(aplicar,200);
new MutationObserver(()=>setTimeout(ajustarIndicadores,80)).observe(document.body,{childList:true,subtree:true});
document.addEventListener('click',()=>setTimeout(ajustarIndicadores,120));
})();