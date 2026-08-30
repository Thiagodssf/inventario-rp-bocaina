(()=>{'use strict';
function clean(){
 const root=document.querySelector('#daV3Root');
 if(!root)return false;
 const auth=root.querySelector('#daAuthorization');
 const purpose=root.querySelector('#daPurpose');
 if(auth){
  auth.value=auth.value||'Despesa diária';
  const label=auth.closest('label');
  if(label)label.style.display='none';
 }
 if(purpose){
  purpose.value=purpose.value||'Aquisição de gêneros alimentícios';
  const label=purpose.closest('label');
  if(label)label.style.display='none';
 }
 const form=root.querySelector('.da-form');
 if(form){form.style.gridTemplateColumns='1fr 1fr';}
 return true;
}
function run(){if(clean())setTimeout(clean,150);else setTimeout(run,200)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(run,300));else setTimeout(run,300);
document.addEventListener('click',e=>{if(e.target.closest('.ms-tab'))setTimeout(run,250)});
})();