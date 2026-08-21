(()=>{'use strict';
const KEY='bocaina_commitment';
const norm=v=>String(v??'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').trim().toLowerCase();
const rows=()=>{try{const v=JSON.parse(localStorage.getItem(KEY)||'[]');return Array.isArray(v)?v:[]}catch{return[]}};
function payment(r){
 const sent=norm(r?.sent);
 if(r?.paid===true)return'pago';
 if(r?.sourceSheet){
  if(/^nao\b/.test(sent))return'pendente';
  if(sent==='sim'||sent.startsWith('sim ')||sent.includes('enviado para pagamento')||sent.includes('enviada para pagamento'))return'enviado';
  return'pendente';
 }
 const p=norm(r?.paymentStatus),s=norm(r?.statusOrigem||r?.status);
 if(p==='pago'||p.includes('pago'))return'pago';
 if(p==='pendente'||p==='pending')return'pendente';
 if(p==='enviado'||p.includes('enviado')||p.includes('enviada'))return'enviado';
 if(s.includes('enviado para pagamento')||s.includes('enviada para pagamento')||sent==='true'||sent==='sim'||sent.startsWith('sim '))return'enviado';
 return'pendente';
}
function fix(){
 const body=document.getElementById('neRows');if(!body)return;
 const data=rows();
 body.querySelectorAll('tr.ne-row').forEach(row=>{
  const c=row.children;if(c.length<8)return;
  const i=Number(row.dataset.i),r=data[i];if(!r)return;
  const state=payment(r),payBadge=c[6].querySelector('.ne-badge'),sitBadge=c[7].querySelector('.ne-badge');if(!payBadge||!sitBadge)return;
  let payText='Pendente',payClass='ne-badge pendente';
  if(state==='pago'){payText='Pago';payClass='ne-badge pago'}else if(state==='enviado'){payText='Enviado para pagamento';payClass='ne-badge envio'}
  const sitText=(state==='pago'||state==='enviado')?'Sem crédito':(!r.nf?'Sem NF':Number(r.saldoPlanilha||0)>0?'Com crédito':'Sem crédito');
  const sitClass=sitText==='Com crédito'?'ne-badge pago':sitText==='Sem NF'?'ne-badge pendente':'ne-badge problema';
  if(payBadge.textContent.trim()!==payText)payBadge.textContent=payText;
  if(payBadge.className!==payClass)payBadge.className=payClass;
  if(sitBadge.textContent.trim()!==sitText)sitBadge.textContent=sitText;
  if(sitBadge.className!==sitClass)sitBadge.className=sitClass;
 });
}
let timer=0,observer=null;
function schedule(){clearTimeout(timer);timer=setTimeout(fix,0)}
function attach(){const body=document.getElementById('neRows');if(!body)return false;if(observer)observer.disconnect();observer=new MutationObserver(schedule);observer.observe(body,{childList:true,subtree:true});fix();return true}
function boot(){if(attach())return;const page=new MutationObserver(()=>{if(attach())page.disconnect()});page.observe(document.body,{childList:true,subtree:true})}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
document.addEventListener('bocaina:remote-sync',schedule);
window.addEventListener('storage',e=>{if(e.key===KEY)schedule()});
})();