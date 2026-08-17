(()=>{'use strict';
const rows="+json.dumps(records,ensure_ascii=False,separators=(',',':'))+"";
const key='bocaina_commitment';
try{const existing=JSON.parse(localStorage.getItem(key)||'[]');const map=new Map(existing.map(x=>[String(x.no)+'|'+String(x.ano||''),x]));rows.forEach(r=>{const k=String(r.no)+'|'+String(r.ano);if(!map.has(k))map.set(k,r)});localStorage.setItem(key,JSON.stringify([...map.values()]));localStorage.setItem('bocaina_commitment_import_version','1')}catch(e){console.error('Falha ao importar dados de empenho',e)}})();