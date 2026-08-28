(()=>{'use strict';
function syncDashboardTab(){const stock=document.querySelector('#stock');const dash=document.querySelector('#munDashboard');if(!stock||!dash)return;const activeTab=stock.querySelector('.stock-subtab.active');const show=!!activeTab&&activeTab.dataset.tab==='foods';dash.style.setProperty('display',show?'block':'none','important');dash.style.setProperty('visibility',show?'visible':'hidden','important')}
function bind(){syncDashboardTab();document.addEventListener('click',e=>{if(e.target.closest('#stock .stock-subtab[data-tab]'))setTimeout(syncDashboardTab,0)},true);new MutationObserver(syncDashboardTab).observe(document.body,{subtree:true,childList:true,attributes:true,attributeFilter:['class','style']})}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',bind);else bind();
})();
