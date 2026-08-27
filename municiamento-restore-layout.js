(()=>{'use strict';
const apply=()=>{
  if(!document.querySelector('#stock'))return;
  let s=document.querySelector('#munRestoreLayout');
  if(!s){
    s=document.createElement('style');s.id='munRestoreLayout';
    s.textContent=`
/* Correção definitiva: Municiamento respeita a coluna lateral e o cabeçalho original. */
body.stock-focus .sidebar{display:block!important;visibility:visible!important;opacity:1!important;width:205px!important;position:fixed!important;left:0!important;top:0!important;bottom:0!important}
body.stock-focus .content{margin-left:205px!important;width:calc(100% - 205px)!important;min-width:0!important}
body.stock-focus .top{height:118px!important;padding:0 24px!important;background:#08294b!important;box-shadow:0 2px 10px #08294b55!important}
body.stock-focus .top>*{display:flex!important;visibility:visible!important;opacity:1!important}
body.stock-focus .top .mobile-menu{display:none!important}
body.stock-focus .top:after{display:none!important;content:none!important}
body.stock-focus .page{width:100%!important;max-width:none!important;margin:0!important;padding:14px 24px 28px!important}
body.stock-focus #stock{width:100%!important;max-width:none!important;margin:0!important;display:block!important;visibility:visible!important}
body.stock-focus #stock>.section-title{display:flex!important;visibility:visible!important;opacity:1!important}
body.stock-focus #stock>.stock-subtabs{display:flex!important;visibility:visible!important;opacity:1!important;width:100%!important}
body.stock-focus #stock>.stock-panel{display:none!important;visibility:hidden!important}
body.stock-focus #stock>.stock-panel.active{display:block!important;visibility:visible!important;opacity:1!important;width:100%!important}
body.stock-focus #stock #munDashboard{display:block!important;visibility:visible!important;width:100%!important;max-width:none!important}
@media(max-width:700px){
 body.stock-focus .sidebar{display:none!important}
 body.stock-focus .content{margin-left:0!important;width:100%!important}
 body.stock-focus .top{height:108px!important;padding:12px 14px 12px 52px!important;display:block!important}
 body.stock-focus .top .mobile-menu{display:block!important}
 body.stock-focus .page{padding:10px!important}
}
`;
    document.head.appendChild(s);
  }
  const stock=document.querySelector('#stock');
  if(!stock)return;
  const nav=stock.querySelector('.stock-subtabs');
  if(nav){nav.style.setProperty('display','flex','important');nav.style.setProperty('visibility','visible','important');nav.style.setProperty('opacity','1','important')}
  stock.querySelectorAll('.stock-panel').forEach(p=>{const active=p.classList.contains('active');p.style.setProperty('display',active?'block':'none','important');p.style.setProperty('visibility',active?'visible':'hidden','important');p.style.setProperty('opacity',active?'1':'0','important')});
  const sidebar=document.querySelector('.sidebar');if(sidebar){sidebar.style.setProperty('display','block','important');sidebar.style.setProperty('width','205px','important');sidebar.style.setProperty('visibility','visible','important');sidebar.style.setProperty('opacity','1','important')}
  const content=document.querySelector('.content');if(content){content.style.setProperty('margin-left','205px','important');content.style.setProperty('width','calc(100% - 205px)','important')}
  const top=document.querySelector('.top');if(top){top.style.setProperty('height','118px','important');top.style.setProperty('padding','0 24px','important')}
};
const boot=()=>{apply();setTimeout(apply,100);setTimeout(apply,500);setTimeout(apply,1200)};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
new MutationObserver(()=>apply()).observe(document.documentElement,{childList:true,subtree:true,attributes:true,attributeFilter:['class','style']});
})();
