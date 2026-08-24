(()=>{'use strict';
const URL='https://kgfcyfdmvbpjdqycmoft.supabase.co';
const KEY='sb_publishable_4ahPTqCNF7A-ouDYIZ_cSg_9gUjeYK5';
const originalCreate=window.supabase?.createClient;
if(!originalCreate||window.__bocainaAuthFix)return;
window.__bocainaAuthFix=true;
window.supabase.createClient=(...args)=>{
  const client=originalCreate(...args), auth=client.auth, originalSignIn=auth.signInWithPassword.bind(auth);
  auth.signInWithPassword=async ({email,password})=>{
    try{
      const res=await fetch(`${URL}/auth/v1/token?grant_type=password`,{method:'POST',headers:{'Content-Type':'application/json','apikey':KEY,'Authorization':`Bearer ${KEY}`},body:JSON.stringify({email,password})});
      const body=await res.json().catch(()=>({}));
      if(!res.ok){return {data:{user:null,session:null},error:{message:body.msg||body.message||body.error_description||`Erro de autenticação (${res.status})`}}}
      const saved=await auth.setSession(body);
      if(saved.error)return saved;
      return saved;
    }catch(e){
      console.error('[Bocaina Auth Fix]',e);
      return {data:{user:null,session:null},error:{message:e?.message||'Falha de conexão com o Supabase'}};
    }
  };
  return client;
};
})();
