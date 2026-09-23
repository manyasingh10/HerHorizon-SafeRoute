/* HerHorizon map, routes, shelter markers and distance calculations. */
/* map */
let _tileErrCount=0,_tileErrTimer=null;
function noteTileError(){_tileErrCount++;clearTimeout(_tileErrTimer);_tileErrTimer=setTimeout(()=>{_tileErrCount=0;},10000);if(_tileErrCount>12)showMapFallback();}
function initMap(){if(S.map||!$('realMap'))return;if(!hasLeaflet()){showMapFallback();return;}
try{S.map=L.map('realMap',{zoomControl:true,attributionControl:false,fadeAnimation:true,zoomAnimation:true}).setView([S.coords.lat,S.coords.lng],15);
const primary=L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}',{maxZoom:19,attribution:'© Esri',keepBuffer:4,updateWhenIdle:true}).addTo(S.map);
primary.on('tileerror',noteTileError);
  const icon=L.divIcon({className:'',html:`<div style="position:relative;width:28px;height:28px"><div style="position:absolute;inset:0;background:rgba(109,40,217,.25);border-radius:50%"></div><div style="position:absolute;top:5px;left:5px;width:18px;height:18px;background:#6d28d9;border:3px solid #fff;border-radius:50%;box-shadow:0 2px 8px rgba(0,0,0,.35)"></div></div>`,iconSize:[28,28],iconAnchor:[14,14]});
  S.userMarker=L.marker([S.coords.lat,S.coords.lng],{icon}).addTo(S.map).bindPopup('<strong>Your live position</strong><br>Auto-detected start point');
  S.accCircle=L.circle([S.coords.lat,S.coords.lng],{radius:S.coords.acc,color:'#0369a1',fillColor:'#38bdf8',fillOpacity:.14,weight:1.5}).addTo(S.map);
  S.shelterGroup=L.layerGroup().addTo(S.map);S.guardGroup=L.layerGroup().addTo(S.map);drawCorridors();hideMapFallback();recompute();
}catch(e){showMapFallback();}}
function moveMapLight(){if(!S.map||!hasLeaflet())return;try{if(S.userMarker)S.userMarker.setLatLng([S.coords.lat,S.coords.lng]);if(S.accCircle){S.accCircle.setLatLng([S.coords.lat,S.coords.lng]);S.accCircle.setRadius(S.coords.acc);}}catch{}const now=Date.now();if(now-_lastMarkerUpdate>8000){_lastMarkerUpdate=now;try{drawCorridors();recomputeMarkers();}catch{}}}
function moveMap(){moveMapLight();try{drawCorridors();recomputeMarkers();}catch{}}
function centerUser(){try{if(S.map){S.map.invalidateSize(true);S.map.setView([S.coords.lat,S.coords.lng],15,{animate:false});}}catch{}}
function drawCorridors(){if(!S.map||!hasLeaflet())return;try{const uLat=S.coords.lat,uLng=S.coords.lng;
  const safe=[[uLat,uLng],[uLat-.0021,uLng-.0015],[uLat-.0067,uLng-.0029],[uLat-.0094,uLng-.0034]];
  const direct=[[uLat,uLng],[uLat-.0047,uLng-.0008],[uLat-.0094,uLng-.0034]];
  if(S.layers.safe&&S.layers.direct){try{S.layers.safe.setLatLngs(safe);S.layers.direct.setLatLngs(direct);}catch{} }
  else{if(S.layers.safe){try{S.map.removeLayer(S.layers.safe);}catch{}}if(S.layers.direct){try{S.map.removeLayer(S.layers.direct);}catch{}}
  S.layers.safe=L.polyline(safe,{color:'#6d28d9',weight:6,opacity:.9,lineCap:'round'});S.layers.direct=L.polyline(direct,{color:'#d97706',weight:4,dashArray:'6 8',opacity:.85});}
  try{const want=S.corridor==='safe'?S.layers.safe:S.layers.direct;const other=S.corridor==='safe'?S.layers.direct:S.layers.safe;if(other&&S.map.hasLayer(other))S.map.removeLayer(other);if(want&&!S.map.hasLayer(want))want.addTo(S.map);}catch{}}catch{}}
function hav(a,b,c,d){const R=6371,t=x=>x*Math.PI/180;const h=Math.sin(t(c-a)/2)**2+Math.cos(t(a))*Math.cos(t(c))*Math.sin(t(d-b)/2)**2;return 2*R*Math.asin(Math.sqrt(h));}
function recomputeList(){const{lat,lng}=S.coords;const sel=$('txDestinationSelect');const curSel=sel?sel.value:'';if(sel)sel.innerHTML='';
  S.shelters.forEach(s=>{const sla=lat+s.dLat,sln=lng+s.dLng;s.dist=hav(lat,lng,sla,sln).toFixed(1);
    if(sel){const o=document.createElement('option');o.value=s.name;o.textContent=`${s.name} · ${s.dist} km${s.far?' · farther':''}`;sel.appendChild(o);}});
  if(sel&&curSel)sel.value=curSel;
  renderShelters();updateSummary();}
function recomputeMarkers(){if(!hasLeaflet()||!S.map)return;try{S.shelterGroup?.clearLayers();S.guardGroup?.clearLayers();}catch{}const{lat,lng}=S.coords;
  let sIcon=null,gIcon=null;
  try{
  sIcon=L.divIcon({html:`<div style="background:#6d28d9;color:#fff;width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;border:2px solid #fff;font-size:13px">⌂</div>`,iconSize:[28,28],iconAnchor:[14,14]});
  gIcon=L.divIcon({html:`<div style="background:#0369a1;color:#fff;width:24px;height:24px;border-radius:7px;display:flex;align-items:center;justify-content:center;border:2px solid #fff;font-size:12px">✚</div>`,iconSize:[24,24],iconAnchor:[12,12]});
  }catch{sIcon=null;}
  if(!sIcon)return;
  S.shelters.forEach(s=>{const sla=lat+s.dLat,sln=lng+s.dLng;try{L.marker([sla,sln],{icon:sIcon}).addTo(S.shelterGroup).bindPopup(`<strong>${s.name}</strong><br>${s.beds>0?s.beds+' beds open':'At capacity'}`);}catch{}});
  if(gIcon){try{[[lat-.0017,lng+.0032],[lat-.0051,lng+.0004]].forEach(c=>L.marker(c,{icon:gIcon}).addTo(S.guardGroup).bindPopup('<strong>Guard kiosk</strong><br>24/7 monitored'));}catch{}}}
function recompute(){recomputeList();recomputeMarkers();}
$('cardCorridorSafe').onclick=()=>setCorridor('safe');$('cardCorridorDirect').onclick=()=>setCorridor('direct');
function setCorridor(t){S.corridor=t;$('cardCorridorSafe').classList.toggle('active',t==='safe');$('cardCorridorDirect').classList.toggle('active',t!=='safe');if(S.map&&hasLeaflet()){try{try{S.map.removeLayer(S.layers.safe);}catch{}try{S.map.removeLayer(S.layers.direct);}catch{}(t==='safe'?S.layers.safe:S.layers.direct).addTo(S.map);}catch{}}toast(t==='safe'?'Safe corridor engaged · 98% score':'Caution: shortcut uses unlit alleys');}
[['chkShelters','shelterGroup'],['chkGuards','guardGroup']].forEach(([id,grp])=>{$(id).addEventListener('change',e=>{if(!S.map||!hasLeaflet())return;try{e.target.checked?S.map.addLayer(S[grp]):S.map.removeLayer(S[grp]);}catch{}});});
$('chkCorridors').addEventListener('change',e=>{if(!S.map||!hasLeaflet())return;try{if(e.target.checked)(S.corridor==='safe'?S.layers.safe:S.layers.direct).addTo(S.map);else{try{S.map.removeLayer(S.layers.safe);}catch{}try{S.map.removeLayer(S.layers.direct);}catch{}}}catch{}});
$('chkRadius').addEventListener('change',e=>{if(!S.map||!hasLeaflet())return;try{e.target.checked?S.accCircle.addTo(S.map):S.map.removeLayer(S.accCircle);}catch{}});
$('btnMapRetry').onclick=()=>{hideMapFallback();try{S.map?.remove();}catch{}S.map=null;S.userMarker=null;S.accCircle=null;S.shelterGroup=null;S.guardGroup=null;S.layers={safe:null,direct:null};S._fallbackTiles=false;try{initMap();}catch(e){showMapFallback();}if(!S.map)showMapFallback();else toast('Map reloaded');};
$('btnMapOffline').onclick=()=>{hideMapFallback();toast('Offline mode · using list view');};
