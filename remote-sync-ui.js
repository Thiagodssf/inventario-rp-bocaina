(()=>{'use strict';
const KEY='bocaina_commitment';
const norm=v=>String(v??'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').trim().toLowerCase();
const rows=()=>{try{const v=JSON.parse(localStorage.getItem(KEY)||'[]');return Array.isArray(v)?v:[]}catch{return[]}};
function payment(r){
 const p=norm(r?.paymentStatus),s=norm(r?.statusOrigem||r?.status),sent=norm(r?.sent);
 if(r?.paid===true||p==='pago'||p.includes('pago'))return'pago';
 if(p==='enviado'||p.includes('enviado')||p.includes('enviada')||s.includes('enviado para pagamento')||s.includes('enviada para pagamento')||sent.includes('enviado para pagamento')||sent.includes('enviada para pagamento')||sent==='true')return'enviado';
 return'pendente';
}
function fix(){
 const body=document.getElementById('neRows');if(!body)return;
 const data=rows();
 body.querySelectorAll('tr.ne-row').forEach(row=>{
  const c=row.children;if(c.length<8)return;
  const i=Number(row.dataset.i),r=data[i];let state=r?payment(r):'pendente';
  if(!r){const t=norm(c[6].textContent);if(t.includes('enviado')||t.includes('enviada'))state='enviado';else if(t.includes('pago'))state='pago'}
  const badge=c[7].querySelector('.ne-badge');if(!badge)return;
  const sem=state==='enviado'||state==='pago',text=sem?'Sem crédito':'Com crédito',cls=sem?'ne-badge problema':'ne-badge pago';
  if(badge.textContent.trim()!==text)badge.textContent=text;
  if(badge.className!==cls)badge.className=cls;
 });
}
let timer=0,bodyObserver=null;
function schedule(){clearTimeout(timer);timer=setTimeout(fix,0)}
function attach(){const body=document.getElementById('neRows');if(!body)return false;if(bodyObserver)bodyObserver.disconnect();bodyObserver=new MutationObserver(schedule);bodyObserver.observe(body,{childList:true,subtree:true});fix();return true}
function boot(){if(attach())return;const page=new MutationObserver(()=>{if(attach())page.disconnect()});page.observe(document.body,{childList:true,subtree:true})}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
document.addEventListener('bocaina:remote-sync',()=>setTimeout(fix,0));
window.addEventListener('storage',e=>{if(e.key===KEY)setTimeout(fix,0)});
})();