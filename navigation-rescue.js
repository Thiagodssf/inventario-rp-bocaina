(()=>{
'use strict';
function injectMobileLayout(){
 if(document.getElementById('mobileLayoutFix'))return;
 const s=document.createElement('style');s.id='mobileLayoutFix';
 s.textContent=`html,body{max-width:100%;overflow-x:hidden}
@media(max-width:700px){
.sidebar{width:230px!important;max-width:82vw!important;overflow-y:auto;overflow-x:hidden}
.content{width:100%!important;max-width:100vw!important;min-width:0!important;margin-left:0!important;overflow-x:hidden}
.page{width:100%!important;max-width:100%!important;overflow-x:hidden;padding:8px!important}
.top{width:100%!important;max-width:100vw!important;overflow:hidden!important;padding-left:48px!important;padding-right:10px!important}
.header-brand{max-width:58%;min-width:0!important;overflow:hidden}.header-name{min-width:0;overflow:hidden}.header-name span{font-size:18px!important;white-space:nowrap}.header-name strong{font-size:18px!important}.header-crest{width:50px!important;height:70px!important}.header-pr{display:none!important}
.header-ship{position:absolute!important;right:0!important;width:48%!important;min-width:0!important;height:108px!important;opacity:.38!important;pointer-events:none}.header-navy{position:absolute!important;right:7px!important;bottom:8px!important;min-width:0!important;gap:4px!important}.header-navy b{font-size:8px!important}.header-navy strong{font-size:8px!important}.header-navy-logo{width:34px!important;height:34px!important}
.section-title,.filterbar{width:100%!important;max-width:100%!important;overflow:hidden}.table-card,.table-scroll{max-width:100%!important}
#agenda{width:100%!important;max-width:100%!important;overflow:hidden!important}#agenda .agenda-shell{width:100%!important;max-width:100%!important}#agenda .ag-body{display:block!important;min-height:0!important}#agenda .ag-side{display:none!important}#agenda .ag-grid-wrap{width:100%!important;max-width:100%!important;overflow-x:auto!important;overflow-y:hidden!important;-webkit-overflow-scrolling:touch}
#agenda .ag-top{width:100%!important;max-width:100%!important;display:grid!important;grid-template-columns:repeat(4,minmax(0,1fr))!important;gap:5px!important;padding:8px!important;overflow:hidden!important}#agenda .ag-top button{min-width:0!important;padding:8px 4px!important;font-size:11px!important}
#agenda .ag-title{grid-column:1/-1!important;grid-row:2!important;order:initial!important;width:100%!important;text-align:center!important;font-size:16px!important;margin:2px 0!important}#agenda .ag-spacer{display:none!important}#agenda .ag-switch{grid-column:1/-1!important;grid-row:3!important;width:100%!important;display:grid!important;grid-template-columns:repeat(4,1fr)!important}#agenda .ag-switch button{font-size:10px!important;padding:7px 2px!important}
#agenda .ag-week{min-width:0!important;width:100%!important;grid-template-columns:34px repeat(7,minmax(0,1fr))!important}#agenda .ag-head{height:48px!important;padding-top:6px!important;font-size:8px!important}#agenda .ag-head strong{font-size:14px!important}#agenda .ag-head.current strong{width:27px!important;height:27px!important;line-height:27px!important}#agenda .ag-hour{height:52px!important;font-size:8px!important;padding:3px!important}#agenda .ag-slot{height:52px!important}#agenda .ag-event{font-size:8px!important;line-height:1.05!important;padding:3px!important;left:1px!important;right:1px!important;min-height:18px!important}
#agenda .ag-month{min-width:0!important;width:100%!important;grid-template-columns:repeat(7,minmax(0,1fr))!important}#agenda .ag-dow{padding:6px 1px!important;font-size:8px!important}#agenda .ag-month-day{height:78px!important;padding:3px!important;font-size:10px!important;overflow:hidden!important}#agenda .ag-month-day .ag-event{font-size:7px!important;margin-top:2px!important}#agenda .ag-list{padding:10px!important}#agenda .ag-modal{width:calc(100vw - 20px)!important;max-width:none!important;padding:16px!important}
}
@media(max-width:380px){.sidebar{width:218px!important}.header-name span{font-size:16px!important}.header-name strong{font-size:16px!important}#agenda .ag-week{grid-template-columns:30px repeat(7,minmax(0,1fr))!important}#agenda .ag-head{font-size:7px!important}#agenda .ag-hour{font-size:7px!important}}
`;
 document.head.appendChild(s);
}
function init(){
 injectMobileLayout();
 const p=document.getElementById('rpParent');
 const s=document.getElementById('rpSubnav');
 if(!p||!s||p.dataset.rpBound==='1')return;
 p.dataset.rpBound='1';
 p.addEventListener('click',e=>{e.preventDefault();const open=s.classList.toggle('collapsed')===false;p.classList.toggle('open',open);p.setAttribute('aria-expanded',String(open));});
 document.addEventListener('click',e=>{const v=e.target.closest('.nav[data-view="inventory"]');if(v){s.classList.remove('collapsed');p.classList.add('open');p.setAttribute('aria-expanded','true');}});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
