(()=>{
'use strict';

const SUPABASE_URL='https://kgfcyfdmvbpjdqycmoft.supabase.co';
const SUPABASE_PUBLISHABLE_KEY='sb_publishable_4ahPTqCNfA7-ouDYIZ_cSg_9gUjeYK5';
const TABLE='app_state';
const KEYS_PREFIX='bocaina_';
const EXTRA_KEYS=['bocainaFoods'];

let client=null;
let suppress=false;
let syncTimer=null;
let pollTimer=null;
let lastRemoteUpdated='';

const trackedKey=k=>k.startsWith(KEYS_PREFIX)||EXTRA_KEYS.includes(k);
const snapshot=()=>{
  const data={};
  for(let i=0;i<localStorage.length;i++){
    const k=localStorage.key(i);
    if(k&&trackedKey(k)) data[k]=localStorage.getItem(k);
  }
  return data;
};
const localHasData=()=>Object.keys(snapshot()).length>0;
const applySnapshot=data=>{
  suppress=true;
  try{
    for(let i=localStorage.length-1;i>=0;i--){
      const k=localStorage.key(i);
      if(k&&trackedKey(k)) localStorage.removeItem(k);
    }
    Object.entries(data||{}).forEach(([k,v])=>localStorage.setItem(k,String(v)));
  }finally{suppress=false;}
  document.dispatchEvent(new Event('bocaina:remote-sync'));
};

function injectStyle(){
  if(document.getElementById('supabaseSyncCss'))return;
  const s=document.createElement('style');s.id='supabaseSyncCss';s.textContent=`
#cloudSyncStatus{position:fixed;right:16px;bottom:16px;z-index:99990;background:#0b2d52;color:#fff;border:1px solid #315477;border-radius:12px;padding:9px 12px;font:700 12px system-ui;box-shadow:0 8px 24px #0003;display:flex;align-items:center;gap:8px}
#cloudSyncStatus.ok{background:#176b3a}#cloudSyncStatus.warn{background:#8a5a00}#cloudSyncStatus.err{background:#9b1c1c}
#cloudSyncModal{position:fixed;inset:0;z-index:100000;background:#071b30cc;display:flex;align-items:center;justify-content:center;padding:18px}
#cloudSyncCard{width:min(440px,100%);background:#fff;border-radius:18px;padding:24px;box-shadow:0 20px 60px #0005;font-family:system-ui;color:#102f50}
#cloudSyncCard h2{margin:0 0 6px;font-size:22px}#cloudSyncCard p{margin:0 0 18px;color:#667085;font-size:13px;line-height:1.5}
#cloudSyncCard label{display:block;font-size:11px;font-weight:900;margin:10px 0 5px}#cloudSyncCard input{width:100%;box-sizing:border-box;height:42px;border:1px solid #b7c7d6;border-radius:8px;padding:8px 10px;font-size:15px}
#cloudSyncLogin{width:100%;height:44px;margin-top:16px;border:0;border-radius:8px;background:#0b2d52;color:#fff;font-weight:900;font-size:14px;cursor:pointer}
#cloudSyncMsg{min-height:18px;margin-top:10px;color:#9b1c1c;font-size:12px}.cloudSync-small{font-size:11px;color:#667085;margin-top:12px}
@media(max-width:600px){#cloudSyncStatus{right:10px;bottom:10px;font-size:11px}#cloudSyncCard{padding:20px;border-radius:14px}}
`;
  document.head.appendChild(s);
}
function status(text,kind=''){
  let el=document.getElementById('cloudSyncStatus');
  if(!el){el=document.createElement('div');el.id='cloudSyncStatus';document.body.appendChild(el)}
  el.className=kind;el.innerHTML=`<span>☁️</span><span>${text}</span>`;
}
function modal(){
  if(document.getElementById('cloudSyncModal'))return;
  const m=document.createElement('div');m.id='cloudSyncModal';m.innerHTML=`<div id="cloudSyncCard"><h2>☁️ Sincronizar NPa Bocaina</h2><p>Entre com o usuário criado no Supabase. Depois disso, os dados salvos no PC e no iPhone serão compartilhados pelo mesmo banco.</p><label>E-MAIL</label><input id="cloudEmail" type="email" autocomplete="username" placeholder="seu e-mail"><label>SENHA</label><input id="cloudPassword" type="password" autocomplete="current-password" placeholder="Sua senha"><button id="cloudSyncLogin" type="button">Entrar e sincronizar</button><div id="cloudSyncMsg"></div><div class="cloudSync-small">Seus dados atuais deste navegador serão enviados ao banco somente se ainda não houver dados cadastrados para este usuário.</div></div>`;
  document.body.appendChild(m);
  const submit=()=>login();
  m.querySelector('#cloudSyncLogin').onclick=submit;
  m.querySelector('#cloudPassword').addEventListener('keydown',e=>{if(e.key==='Enter')submit()});
}
function closeModal(){const m=document.getElementById('cloudSyncModal');if(m)m.remove()}
function msg(t){const el=document.getElementById('cloudSyncMsg');if(el)el.textContent=t}
async function login(){
  const email=document.getElementById('cloudEmail')?.value.trim();
  const password=document.getElementById('cloudPassword')?.value||'';
  if(!email||!password){msg('Informe o e-mail e a senha.');return}
  const btn=document.getElementById('cloudSyncLogin');btn.disabled=true;btn.textContent='Conectando...';msg('');
  const {data,error}=await client.auth.signInWithPassword({email,password});
  if(error||!data.session){btn.disabled=false;btn.textContent='Entrar e sincronizar';msg(error?.message||'Não foi possível entrar.');return}
  closeModal();await initialSync();
}
async function initialSync(){
  const {data:{user}}=await client.auth.getUser();
  if(!user)return;
  status('Sincronizando...','warn');
  const {data:row,error}=await client.from(TABLE).select('id,data,updated_at').eq('id',user.id).maybeSingle();
  if(error){status('Banco ainda não configurado','warn');console.error('[Bocaina Sync]',error);return}
  if(!row){
    await writeRemote(user.id,snapshot());
    lastRemoteUpdated=new Date().toISOString();
  }else if(row.data&&Object.keys(row.data).length){
    applySnapshot(row.data);lastRemoteUpdated=row.updated_at||'';
  }else{
    await writeRemote(user.id,snapshot());lastRemoteUpdated=new Date().toISOString();
  }
  status('Sincronizado','ok');
  installWatchers();startPolling();
}
async function writeRemote(userId,data){
  const {data:row,error}=await client.from(TABLE).upsert({id:userId,data,updated_at:new Date().toISOString()},{onConflict:'id'}).select('updated_at').single();
  if(error){status('Erro ao salvar','err');console.error('[Bocaina Sync]',error);return false}
  lastRemoteUpdated=row?.updated_at||new Date().toISOString();return true;
}
function schedulePush(){
  if(suppress||!client)return;
  clearTimeout(syncTimer);syncTimer=setTimeout(async()=>{
    const {data:{session}}=await client.auth.getSession();if(!session)return;
    status('Salvando...','warn');
    const ok=await writeRemote(session.user.id,snapshot());
    if(ok)status('Sincronizado','ok');
  },700);
}
function installWatchers(){
  if(window.__bocainaSyncWatchers)return;window.__bocainaSyncWatchers=true;
  const proto=Storage.prototype,setItem=proto.setItem,removeItem=proto.removeItem,clear=proto.clear;
  proto.setItem=function(k,v){const r=setItem.call(this,k,v);if(this===localStorage&&trackedKey(String(k)))schedulePush();return r};
  proto.removeItem=function(k){const r=removeItem.call(this,k);if(this===localStorage&&trackedKey(String(k)))schedulePush();return r};
  proto.clear=function(){const r=clear.call(this);if(this===localStorage)schedulePush();return r};
  window.addEventListener('beforeunload',()=>{clearTimeout(syncTimer)});
}
function startPolling(){
  clearInterval(pollTimer);
  pollTimer=setInterval(async()=>{
    const {data:{session}}=await client.auth.getSession();if(!session)return;
    const {data:row,error}=await client.from(TABLE).select('data,updated_at').eq('id',session.user.id).maybeSingle();
    if(error||!row||!row.updated_at||row.updated_at===lastRemoteUpdated)return;
    lastRemoteUpdated=row.updated_at;applySnapshot(row.data||{});status('Atualizado do servidor','ok');setTimeout(()=>status('Sincronizado','ok'),1600);
  },8000);
}
async function boot(){
  injectStyle();
  if(!window.supabase?.createClient){status('Sincronização indisponível','warn');return}
  client=window.supabase.createClient(SUPABASE_URL,SUPABASE_PUBLISHABLE_KEY);
  const {data:{session}}=await client.auth.getSession();
  if(session){await initialSync();return}
  status('Faça login para sincronizar','warn');modal();
  client.auth.onAuthStateChange(async(event)=>{if(event==='SIGNED_IN')await initialSync()});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();