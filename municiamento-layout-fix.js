(()=>{'use strict';
const apply=()=>{if(!document.querySelector('#stock'))return;let s=document.querySelector('#munLayoutFix');if(!s){s=document.createElement('style');s.id='munLayoutFix';s.textContent=`/* Mantém o layout completo do Municiamento */
body.stock-focus .sidebar{display:flex!important}
body.stock-focus .content{margin-left:175px!important}
body.stock-focus .top{height:auto!important;padding:0!important;background:initial!important;box-shadow:initial!important}
body.stock-focus .top>*{display:initial!important}
body.stock-focus .top:after{display:none!important;content:none!important}
body.stock-focus .page{padding:18px 20px 30px!important}
body.stock-focus #stock>.section-title{display:flex!important}
body.stock-focus #stock>.stock-subtabs{display:flex!important;visibility:visible!important;opacity:1!important}
body.stock-focus #stock>.stock-panel{display:none!important;visibility:hidden!important}
body.stock-focus #stock>.stock-panel.active{display:block!important;visibility:visible!important}
body.stock-focus #stock #munDashboard{display:block!important}
@media(max-width:800px){body.stock-focus .content{margin-left:0!important}body.stock-focus .sidebar{display:none!important}body.stock-focus .page{padding:10px!important}}
`;document.head.appendChild(s)}
const stock=document.querySelector('#stock');if(stock){stock.querySelectorAll('.stock-subtab').forEach(b=>{b.style.visibility='visible'});const active=stock.querySelector('.stock-panel.active');if(active)active.style.display='block'}};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',apply);else apply();new MutationObserver(apply).observe(document.documentElement,{childList:true,subtree:true,attributes:true,attributeFilter:['class']});
})();