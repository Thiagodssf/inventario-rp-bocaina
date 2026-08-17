(()=>{'use strict';
function refreshCardapio(){
  const stock=document.querySelector('#stock');
  const panel=document.querySelector('[data-panel="cardapio"]');
  const tab=document.querySelector('.stock-subtab[data-tab="cardapio"]');
  if(!stock||!panel||!tab||!panel.classList.contains('active'))return;
  tab.click();
}
document.addEventListener('bocaina:remote-sync',()=>{setTimeout(refreshCardapio,50)});
})();
