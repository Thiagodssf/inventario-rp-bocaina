(()=>{'use strict';
const CSS=`
/* CORREÇÃO DEFINITIVA DE LAYOUT DO MUNICIAMENTO */
body.stock-focus{overflow-x:hidden!important}
body.stock-focus .shell{display:flex!important;min-height:100vh!important}
body.stock-focus .sidebar{display:block!important;visibility:visible!important;opacity:1!important;width:205px!important;position:fixed!important;left:0!important;top:0!important;bottom:0!important;z-index:50!important}
body.stock-focus .content{display:block!important;visibility:visible!important;opacity:1!important;margin-left:205px!important;width:calc(100% - 205px)!important;min-width:0!important}
body.stock-focus .top{display:flex!important;width:100%!important;height:118px!important;margin:0!important;padding:0 24px!important;position:relative!important;overflow:hidden!important}
body.stock-focus .top>*{visibility:visible!important;opacity:1!important}
body.stock-focus .top:after{display:none!important;content:none!important}
body.stock-focus .page{width:100%!important;max-width:none!important;margin:0!important;padding:14px 24px 28px!important}
body.stock-focus #stock{width:100%!important;max-width:none!important;margin:0!important}
body.stock-focus #stock>.section-title{display:flex!important;visibility:visible!important;opacity:1!important}
body.stock-focus #stock>.stock-subtabs{display:flex!important;visibility:visible!important;opacity:1!important;width:100%!important}
body.stock-focus #stock>.stock-panel{display:none!important;visibility:hidden!important}
body.stock-focus #stock>.stock-panel.active{display:block!important;visibility:visible!important;opacity:1!important;width:100%!important}
body.stock-focus #stock #munDashboard{display:block!important;width:100%!important;max-width:none!important;margin:0!important}
@media(max-width:700px){
 body.stock-focus .sidebar{display:none!important}
 body.stock-focus .content{margin-left:0!important;width:100%!important}
 body.stock-focus .top{height:108px!important;padding:12px 14px 12px 52px!important;display:block!important}
 body.stock-focus .page{padding:10px!important}
}
`;
const apply=()=>{if(!document.querySelector('#stock'))return;let s=document.querySelector('#munLayoutFixFinal');if(!s){s=document.createElement('style');s.id='munLayoutFixFinal';s.textContent=CSS;document.head.appendChild(s)}const stock=document.querySelector('#stock');if(stock){stock.querySelectorAll('.stock-subtab').forEach(b=>{b.style.setProperty('visibility','visible','important')});const active=stock.querySelector('.stock-panel.active');if(active){active.style.setProperty('display','block','important');active.style.setProperty('visibility','visible','important')}}};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',apply);else apply();new MutationObserver(apply).observe(document.documentElement,{childList:true,subtree:true,attributes:true,attributeFilter:['class','style']});
})();
