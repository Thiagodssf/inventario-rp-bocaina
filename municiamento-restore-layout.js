(()=>{'use strict';
const apply=()=>{
  if(!document.querySelector('#stock'))return;
  let s=document.querySelector('#munRestoreLayout');
  if(!s){
    s=document.createElement('style');s.id='munRestoreLayout';
    s.textContent=`
/* Restaura o layout completo do sistema quando Municiamento está ativo. */
body.stock-focus .sidebar{display:flex!important;visibility:visible!important}
body.stock-focus .content{margin-left:175px!important}
body.stock-focus .top{height:auto!important;padding:0!important;background:initial!important;box-shadow:initial!important}
body.stock-focus .top>*{display:initial!important;visibility:visible!important}
body.stock-focus .top:after{display:none!important;content:none!important}
body.stock-focus .page{padding:18px 20px 30px!important}
body.stock-focus #stock>.section-title{display:flex!important;visibility:visible!important;opacity:1!important}
body.stock-focus #stock>.stock-subtabs{display:flex!important;visibility:visible!important;opacity:1!important}
body.stock-focus #stock>.stock-panel{display:none!important;visibility:hidden!important}
body.stock-focus #stock>.stock-panel.active{display:block!important;visibility:visible!important;opacity:1!important}
body.stock-focus #stock{display:block!important;visibility:visible!important}
body.stock-focus #munDashboard{display:block!important;visibility:visible!important}
@media(max-width:800px){body.stock-focus .content{margin-left:0!important}body.stock-focus .sidebar{display:none!important}body.stock-focus .page{padding:10px!important}}
`;
    document.head.appendChild(s);
  }
  const stock=document.querySelector('#stock');
  if(!stock)return;
  const nav=stock.querySelector('.stock-subtabs');
  if(nav){nav.style.setProperty('display','flex','important');nav.style.setProperty('visibility','visible','important');nav.style.setProperty('opacity','1','important')}
  stock.querySelectorAll('.stock-panel').forEach(p=>{const active=p.classList.contains('active');p.style.setProperty('display',active?'block':'none','important');p.style.setProperty('visibility',active?'visible':'hidden','important');p.style.setProperty('opacity',active?'1':'0','important')});
  const sidebar=document.querySelector('.sidebar');if(sidebar){sidebar.style.setProperty('display','flex','important');sidebar.style.setProperty('visibility','visible','important')}
  const content=document.querySelector('.content');if(content)content.style.setProperty('margin-left','175px','important');
  const top=document.querySelector('.top');if(top){top.style.setProperty('height','auto','important');top.style.setProperty('padding','0','important')}
};
const boot=()=>{apply();setTimeout(apply,100);setTimeout(apply,500);setTimeout(apply,1200)};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
new MutationObserver(()=>apply()).observe(document.documentElement,{childList:true,subtree:true,attributes:true,attributeFilter:['class','style']});
})();
