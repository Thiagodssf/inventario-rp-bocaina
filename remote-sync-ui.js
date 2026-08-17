(()=>{'use strict';
// Mantém os módulos já abertos atualizados quando o Supabase traz dados novos.
// O evento remoto é convertido em um evento de armazenamento somente para os
// módulos que já usam esse mecanismo para redesenhar sua interface.
document.addEventListener('bocaina:remote-sync',()=>{
  try{window.dispatchEvent(new Event('storage'))}catch(e){console.error('[Bocaina UI Sync]',e)}
});
})();
