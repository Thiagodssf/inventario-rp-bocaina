(()=>{'use strict';
function limparDespesaDuplicada(){
  const root=document.querySelector('#daV3Root');
  if(!root)return;
  const styleId='daRemoveOldSectionsV1';
  if(!document.getElementById(styleId)){
    const s=document.createElement('style');s.id=styleId;
    s.textContent=`#daV3Root .da-bottom{display:none!important}`;
    document.head.appendChild(s);
  }
}
limparDespesaDuplicada();
new MutationObserver(limparDespesaDuplicada).observe(document.body,{childList:true,subtree:true});
})();
