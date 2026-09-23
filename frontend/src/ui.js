/* tabs */
document.querySelectorAll('.tab').forEach(t=>t.addEventListener('click',()=>showTab(t.dataset.view,t)));
function showTab(id,btn){document.querySelectorAll('.view').forEach(v=>v.classList.remove('active'));document.querySelectorAll('.tab').forEach(b=>b.classList.remove('active'));const el=$(id);if(!el)return;el.classList.add('active');if(btn)btn.classList.add('active');if(id==='view-map'){try{initMap();}catch(e){showMapFallback();}setTimeout(()=>{try{S.map?.invalidateSize(true);}catch{}},150);setTimeout(()=>{try{S.map?.invalidateSize(true);}catch{}},450);}window.scrollTo({top:0});}
function hasLeaflet(){return typeof L!=='undefined'&&L&&L.map&&L.tileLayer;}
function showMapFallback(){$('mapFallback')?.classList.add('show');toast('Map offline · list + GPS still work');}
function hideMapFallback(){$('mapFallback')?.classList.remove('show');}
