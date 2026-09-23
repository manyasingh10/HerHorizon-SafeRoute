const S = {
  val:'0', seq:'', code: localStorage.getItem('herhorizon_stealth_code') || '98.6+=',
  coords:{lat:19.250904,lng:73.142782,acc:25}, hasGPS:false, watchId:null,
  corridor:'safe', simOn:false, simStep:0, simTimer:null, sirenOn:false, actx:null, osc:null,
  map:null, userMarker:null, accCircle:null, layers:{safe:null,direct:null}, shelterGroup:null, guardGroup:null,
  scope:'available', tag:'all',
  shelters:[
    {id:1,name:"Emergency Refugee Sanctuary",area:"Central Dadar",address:"Central Transit Corridor · 24/7 priority intake",beds:5,familyUnits:3,sec:"Armed kiosk & CCTV",far:false,dLat:.0032,dLng:-.0016,tags:["women","kids","accessible"]},
    {id:2,name:"Sakha Protect Haven",area:"Colaba",address:"Maritime enclave Sector 4 · 24/7 intake",beds:2,familyUnits:1,sec:"Verified CCTV & escort",far:false,dLat:.0018,dLng:.0045,tags:["women","pets","accessible"]},
    {id:3,name:"St. Jude Sanctuary Point",area:"Transit Riverline",address:"Riverline Station · 24/7 intake",beds:9,familyUnits:4,sec:"Perimeter patrol",far:false,dLat:.0055,dLng:-.0028,tags:["women","kids","pets","accessible"]},
    {id:4,name:"Sakhi One-Stop Shelter",area:"Precinct Sector 3",address:"Municipal precinct Sector 3",beds:0,familyUnits:0,sec:"24/7 monitored node",far:false,dLat:-.0042,dLng:.0062,tags:["women","accessible"]},
    {id:5,name:"Harbor Sanctuary Point",area:"Northern Coast · Farther",address:"Outer highway safe station",beds:14,familyUnits:6,sec:"Armed perimeter",far:true,dLat:.031,dLng:.024,tags:["women","kids","pets","accessible"]},
    {id:6,name:"West Highland Refuge",area:"Western Foothills · Farther",address:"Regional sanctuary Sector 9",beds:8,familyUnits:5,sec:"State police node",far:true,dLat:-.028,dLng:-.031,tags:["women","kids","accessible"]}
  ],
  guardians:[
    {init:"ML",name:"Maya Lin",rel:"Sister",phone:"+1 (555) 349-2918",status:"Active now",color:"#ede9fe,#6d28d9"},
    {init:"EV",name:"Elena Vance",rel:"Advocate",phone:"+1 (555) 782-9011",status:"Online",color:"#ede9fe,#6d28d9"},
    {init:"CP",name:"City Safe Patrol Desk",rel:"Escort unit",phone:"+1 (802) 555-0100",status:"Standby",color:"#e0f2fe,#0369a1"}
  ]
};
const $=id=>document.getElementById(id);
const toast=m=>{const t=$('portalToast');t.textContent=m;t.classList.add('show');clearTimeout(t._h);t._h=setTimeout(()=>t.classList.remove('show'),2800);};

/* calculator */
function renderCalc(){$('calcDisplay').textContent=S.val;}
document.querySelectorAll('[data-num]').forEach(b=>b.addEventListener('click',()=>{const d=b.dataset.num;S.val=(S.val==='0'&&d!=='.')?d:(d==='.'&&S.val.includes('.')?S.val:S.val+d);S.seq+=d;renderCalc();checkCode();}));
document.querySelectorAll('[data-act]').forEach(b=>b.addEventListener('click',()=>doCalc(b.dataset.act)));
function doCalc(op){S.seq+=op;
  if(op==='C'){S.val='0';$('calcHistory').innerHTML='&nbsp;';}
  else if(op==='='){try{const s=S.val.replace(/×/g,'*').replace(/÷/g,'/').replace(/−/g,'-');$('calcHistory').textContent=S.val+' =';S.val=String(Function(`'use strict';return(${s})`)());}catch{S.val='Error';}}
  else if(['+','-','*','/'].includes(op)){S.val+=` ${op==='*'?'×':op==='/'?'÷':op==='-'?'−':'+'} `;}
  else if(op==='+/-'){S.val=S.val.startsWith('-')?S.val.slice(1):'-'+S.val;}
  else if(op==='%'){S.val=String(parseFloat(S.val)/100);}
  renderCalc();checkCode();}
function checkCode(){const s=S.seq;if(s.includes(S.code)||s.includes('98.6+=')||s.includes('999=')||s.endsWith('911=')){S.seq='';unlock();}if(S.seq.length>30)S.seq=S.seq.slice(-12);}
function unlock(){document.title='HerHorizon — SafeRoute';$('calcStage').style.display='none';$('haven-persona').style.display='flex';$('lblToolPasscode').textContent=S.code;renderShelters();renderAdmin();renderGuardians();updateSummary();startGPS();recompute();resetRideIdle();toast('SafeRoute engaged · GPS live');}
function lock(){if(S.sirenOn)toggleSiren();$('visualStrobe').classList.remove('on');clearInterval(S.simTimer);if(S.watchId!==null){navigator.geolocation?.clearWatch(S.watchId);S.watchId=null;}S.val='0';S.seq='';$('calcHistory').innerHTML='&nbsp;';renderCalc();document.title='Calculator';$('haven-persona').style.display='none';$('calcStage').style.display='flex';}
$('btnDisguiseTop').onclick=lock;$('btnExitTop').onclick=lock;
addEventListener('keydown',e=>{if(e.key==='Escape'&&$('haven-persona').style.display==='flex')lock();});

/* tabs */
document.querySelectorAll('.tab').forEach(t=>t.addEventListener('click',()=>showTab(t.dataset.view,t)));
function showTab(id,btn){document.querySelectorAll('.view').forEach(v=>v.classList.remove('active'));document.querySelectorAll('.tab').forEach(b=>b.classList.remove('active'));const el=$(id);if(!el)return;el.classList.add('active');if(btn)btn.classList.add('active');if(id==='view-map'){try{initMap();}catch(e){showMapFallback();}setTimeout(()=>{try{S.map?.invalidateSize(true);}catch{}},150);setTimeout(()=>{try{S.map?.invalidateSize(true);}catch{}},450);}window.scrollTo({top:0});}
function hasLeaflet(){return typeof L!=='undefined'&&L&&L.map&&L.tileLayer;}
function showMapFallback(){$('mapFallback')?.classList.add('show');toast('Map offline · list + GPS still work');}
function hideMapFallback(){$('mapFallback')?.classList.remove('show');}

/* GPS */
let _lastMarkerUpdate=0;
function startGPS(){if(!('geolocation' in navigator)){paintCoords(false);return;}S.watchId=navigator.geolocation.watchPosition(p=>{S.hasGPS=true;S.coords={lat:p.coords.latitude,lng:p.coords.longitude,acc:Math.round(p.coords.accuracy||15)};paintCoords(true);moveMapLight();recomputeList();},()=>{paintCoords(false);recomputeList();},{enableHighAccuracy:true,timeout:10000,maximumAge:5000});}
$('btnGPS').onclick=()=>{toast('Polling GPS…');navigator.geolocation?.getCurrentPosition(p=>{S.coords={lat:p.coords.latitude,lng:p.coords.longitude,acc:Math.round(p.coords.accuracy||15)};paintCoords(true);moveMap();recompute();centerUser();toast('GPS refreshed');},()=>toast('Signal unavailable · keeping last fix'));};
$('btnCenter').onclick=centerUser;
$('linkSample').onclick=e=>{e.preventDefault();S.coords={lat:19.250904,lng:73.142782,acc:12};paintCoords(true);moveMap();recompute();toast('Sample city mesh loaded');};
function paintCoords(live){const{lat,lng,acc}=S.coords;$('lblLat').textContent=lat.toFixed(6);$('lblLng').textContent=lng.toFixed(6);$('lblAcc').textContent=`±${acc} m`;$('gpsModeBadge').textContent=live?'Satellite lock':'Last known';const s=`${lat.toFixed(5)}, ${lng.toFixed(5)}`;$('txPickupPoint').value=`${s} · auto-detected`;$('guardianPingPreview').textContent=`"Safe on corridor · ${s}"`;$('sosCoords').textContent=s;$('sosAcc').textContent=`±${acc} m`;if(live)$('topBarGPSStatus').textContent=`Live GPS · ±${acc}m`;}

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

/* shelters */
document.querySelectorAll('#shelterChips .chip[data-scope]').forEach(c=>c.onclick=()=>{S.scope=c.dataset.scope;document.querySelectorAll('#shelterChips .chip[data-scope]').forEach(x=>x.classList.remove('active'));c.classList.add('active');renderShelters();});
document.querySelectorAll('#shelterChips .chip[data-tag]').forEach(c=>c.onclick=()=>{document.querySelectorAll('#shelterChips .chip[data-tag]').forEach(x=>x.classList.remove('active'));c.classList.add('active');S.tag=c.dataset.tag;renderShelters();});
function renderShelters(){const g=$('shelterListingGrid');if(!g)return;let list=[...S.shelters];if(S.scope==='available')list=list.filter(s=>s.beds>0&&!s.far);if(S.tag&&S.tag!=='all')list=list.filter(s=>s.tags.includes(S.tag));
  g.innerHTML=list.map(s=>{const full=s.beds===0;return `<div class="card shelter ${s.far?'far':''}">
    <div><div class="shelter-top"><span class="badge ${full?'badge-full':'badge-open'}">${full?'At capacity · rerouting':s.beds+' beds open'}</span><span class="small muted"><strong style="color:var(--primary)">${s.dist||'—'} km</strong> away</span></div>
    <h3>${s.name}</h3><div class="meta">${s.area} · ${s.address}</div>
    <div class="pills"><span class="pill">${s.sec}</span><span class="pill">Family: ${s.familyUnits}</span>${s.far?'<span class="pill" style="background:var(--primary-50);color:var(--primary-dark)">Farther location</span>':''}${s.tags.includes('pets')?'<span class="pill">Pets welcome</span>':''}${s.tags.includes('accessible')?'<span class="pill">Step-free</span>':''}</div></div>
    <div><button class="btn btn-primary full" style="width:100%" onclick="holdBed(${s.id})">Hold bed · 90 min</button>
    <div class="actions"><button class="btn btn-dark" onclick="goTransit('${s.name}')">Safe ride</button><button class="btn btn-ghost" onclick="walkTo(${s.id})">Walk route</button></div></div></div>`;}).join('')||'<div class="card">No matches. Try clearing filters.</div>';}
function updateSummary(){$('statOpenBeds').textContent=S.shelters.reduce((a,s)=>a+s.beds,0);$('statFamilyUnits').textContent=S.shelters.reduce((a,s)=>a+s.familyUnits,0);}
window.holdBed=id=>{const s=S.shelters.find(x=>x.id===id);$('holdTokenCode').textContent='#HOLD-'+Math.floor(1000+Math.random()*9000);$('holdModalDesc').textContent=`Confidential bed at ${s.name} (${s.area}) held for 90 minutes. Intake notified.`;$('holdModal').classList.add('show');};
$('btnHoldTransit').onclick=()=>{$('holdModal').classList.remove('show');showTab('view-transit',document.querySelector('[data-view="view-transit"]'));toast('Transit linked to reservation');};
window.goTransit=name=>{showTab('view-transit',document.querySelector('[data-view="view-transit"]'));$('txDestinationSelect').value=name;resetRideIdle();toast(`Transit configured for ${name} — press Request to confirm`);};
window.walkTo=id=>{const s=S.shelters.find(x=>x.id===id);$('lblWalkTargetShelter').textContent='Target: '+s.name;showTab('view-map',document.querySelector('[data-view="view-map"]'));setCorridor('safe');startSim();toast(`Walking route to ${s.name} active`);};

/* simulation + broadcast */
$('btnSimulate').onclick=()=>{S.simOn?stopSim():startSim();};
function startSim(){clearInterval(S.simTimer);S.simOn=true;S.simStep=0;$('btnSimulate').textContent='Pause escort simulation';const{lat,lng}=S.coords;const path=[[lat,lng],[lat-.0012,lng-.0008],[lat-.0024,lng-.0016],[lat-.0048,lng-.0022],[lat-.0072,lng-.003],[lat-.0094,lng-.0034]];
  S.simTimer=setInterval(()=>{S.simStep++;if(S.simStep>=path.length){stopSim();$('btnSimulate').textContent='Restart escort simulation';toast('Arrived at shelter perimeter');return;}const[pla,plo]=path[S.simStep];S.coords.lat=pla;S.coords.lng=plo;paintCoords(S.hasGPS);try{if(S.userMarker){S.userMarker.setLatLng(path[S.simStep]);S.accCircle.setLatLng(path[S.simStep]);S.map?.panTo(path[S.simStep]);}}catch{}},1900);}
function stopSim(){clearInterval(S.simTimer);S.simOn=false;$('btnSimulate').textContent='Resume escort simulation';}
document.querySelectorAll('[data-broadcast]').forEach(b=>b.onclick=()=>{let la=S.coords.lat,lo=S.coords.lng;try{if(S.userMarker){const p=S.userMarker.getLatLng();la=p.lat;lo=p.lng;}}catch{}toast(`GPS ${Number(la).toFixed(5)}, ${Number(lo).toFixed(5)} sent to guardians`);});

/* transit */
function resetRideIdle(){const c=$('driverDetailsCard');if(c){c.classList.remove('show');c.style.display='';}if($('unifiedPIN'))$('unifiedPIN').textContent='····';if($('driverSpokenPin'))$('driverSpokenPin').textContent='····';if($('rideStatusBadge'))$('rideStatusBadge').textContent='Awaiting request';if($('rideStatusHint'))$('rideStatusHint').textContent='No active ride. Select a shelter and press “Request & verify safe ride” to generate your single matching token.';}
function dispatchSafeTransit(){const sel=$('txDestinationSelect');const dest=sel?sel.value:'';const card=$('driverDetailsCard');if(!dest){toast('Please select a safe shelter first.');return;}const singlePin=Math.floor(1000+Math.random()*9000);$('unifiedPIN').textContent=singlePin;$('driverSpokenPin').textContent=singlePin;if($('rideStatusBadge'))$('rideStatusBadge').textContent='Ride confirmed';if($('rideStatusHint'))$('rideStatusHint').textContent='Driver and passenger share this one matching token. Only enter after the driver states it aloud.';if(card){card.style.display='';card.classList.add('show');card.scrollIntoView({behavior:'smooth',block:'nearest'});}toast('Ride requested to '+dest+'. Driver verification completed.');}
$('btnDispatch').onclick=dispatchSafeTransit;
$('txDestinationSelect').addEventListener('change',resetRideIdle);
$('btnFarRide').onclick=()=>{showTab('view-transit',document.querySelector('[data-view="view-transit"]'));$('txDestinationSelect').value='Harbor Sanctuary Point';resetRideIdle();dispatchSafeTransit();};
$('btnVoucherTop').onclick=()=>$('transitPassModal').classList.add('show');
$('btnClaimPass').onclick=()=>{$('transitPassModal').classList.remove('show');showTab('view-transit',document.querySelector('[data-view="view-transit"]'));toast('Voucher applied — press Request to confirm ride');};

/* support chat */
function addMsg(t,who){const d=document.createElement('div');d.className='msg '+who;d.textContent=t;$('chatMsgContainer').appendChild(d);$('chatMsgContainer').scrollTop=1e6;}
function botReply(q){let r='Logged anonymously. A specialist is standing by — what should we prioritise next?';if(/bed|shelter/i.test(q))r='I can lock a 90-minute hold at our highest-security shelter now. Shall I reserve it?';else if(/ride|transit|pass|voucher/i.test(q))r='Your transit pass covers a zero-cost silent pickup. Want me to dispatch it to your GPS?';else if(/802|counsel|trauma/i.test(q))r='A counselor is live on Line #802. Want an instant secure connection?';setTimeout(()=>addMsg(r,'bot'),600);}
$('btnSendChat').onclick=()=>{const i=$('supportChatInput');if(!i.value.trim())return;addMsg(i.value.trim(),'user');botReply(i.value);i.value='';};
$('supportChatInput').addEventListener('keydown',e=>{if(e.key==='Enter')$('btnSendChat').click();});
$('btnClearChat').onclick=()=>{$('chatMsgContainer').innerHTML='<div class="msg bot">Hello. You are in a safe, encrypted space. How can we help?</div>';toast('Transcript cleared');};
document.querySelectorAll('[data-q]').forEach(b=>b.onclick=()=>{const m={bed:'I need an emergency bed reservation.',ride:'Request a free transit voucher.',counselor:'Connect me to a Line #802 counselor.',callback:'Request a disguised callback.'}[b.dataset.q];addMsg(m,'user');botReply(m);if(b.dataset.q==='bed')setTimeout(()=>holdBed(1),700);if(b.dataset.q==='ride')setTimeout(()=>$('transitPassModal').classList.add('show'),700);});
$('btnLine802').onclick=()=>toast('Connecting to Line #802 counselor…');
$('btnFreeRide').onclick=()=>{showTab('view-transit',document.querySelector('[data-view="view-transit"]'));toast('Free ride booking opened');};
document.querySelector('[data-sms]').onclick=()=>toast('Disguised SMS channel pinged');
$('btnBeacon').onclick=()=>toast('Silent beacon broadcasting · no sound');

/* guardians */
function renderGuardians(){$('guardianList').innerHTML=S.guardians.map(g=>{const[bg,fg]=g.color.split(',');return `<div class="card guardian"><div style="display:flex;gap:12px;align-items:center"><div class="avatar" style="background:${bg};color:${fg}">${g.init}</div><div><strong>${g.name}</strong> <span class="badge badge-info">${g.rel}</span><div class="small muted">${g.phone}</div><div class="small" style="color:var(--success);font-weight:700">● ${g.status}</div></div></div><div style="display:flex;gap:8px"><button class="btn btn-success btn-sm" onclick="toast('Calling ${g.name}…')">Call</button><button class="btn btn-ghost btn-sm" onclick="toast('Ping sent to ${g.name}')">Ping</button></div></div>`;}).join('');}

/* admin */
function renderAdmin(){const tb=$('adminMatrixBody');if(!tb)return;tb.innerHTML=S.shelters.map(s=>{const st=s.beds===0?['badge-full','At capacity']:s.beds<=2?['badge-warn','Limited']:['badge-open','Open'];return `<tr><td><strong>${s.name}</strong><div class="small muted">${s.dist||'—'} km · ${s.area}</div></td><td><span class="badge ${s.far?'badge-info':'badge-open'}">${s.far?'Farther':'Nearby'}</span></td>
  <td><span class="stepper"><button onclick="adj(${s.id},'beds',-1)">−</button><b>${s.beds}</b><button onclick="adj(${s.id},'beds',1)">+</button></span></td>
  <td><span class="stepper"><button onclick="adj(${s.id},'familyUnits',-1)">−</button><b>${s.familyUnits}</b><button onclick="adj(${s.id},'familyUnits',1)">+</button></span></td>
  <td><span class="badge ${st[0]}">${st[1]}</span></td><td>${s.far?`<button class="btn btn-primary btn-sm" onclick="goTransit('${s.name}')">Dispatch</button>`:'<span class="small" style="color:var(--success);font-weight:700">Auto-synced</span>'}</td></tr>`;}).join('');}
window.adj=(id,f,d)=>{const s=S.shelters.find(x=>x.id===id);s[f]=Math.max(0,s[f]+d);renderAdmin();renderShelters();updateSummary();toast(`${s.name} synced`);};
$('btnSync').onclick=()=>{renderAdmin();recompute();toast('Sync complete');};

/* tools */
document.querySelectorAll('[data-passcode]').forEach(b=>b.onclick=()=>{$('customCodeInput').value=S.code;$('passcodeModal').classList.add('show');});
$('btnSaveCode').onclick=()=>{const v=$('customCodeInput').value.trim();if(!v){toast('Passcode required');return;}S.code=v;localStorage.setItem('herhorizon_stealth_code',v);$('lblToolPasscode').textContent=v;$('passcodeModal').classList.remove('show');toast('Stealth passcode updated');};
document.querySelectorAll('[data-close]').forEach(b=>b.onclick=()=>$(b.dataset.close).classList.remove('show'));
$('btnSiren').onclick=toggleSiren;
function toggleSiren(){if(S.sirenOn){S.osc?.stop();S.sirenOn=false;toast('Siren off');return;}const C=window.AudioContext||window.webkitAudioContext;S.actx=new C();const o=S.actx.createOscillator(),g=S.actx.createGain();o.type='sawtooth';o.frequency.setValueAtTime(750,S.actx.currentTime);o.frequency.linearRampToValueAtTime(1300,S.actx.currentTime+.35);o.frequency.linearRampToValueAtTime(750,S.actx.currentTime+.7);g.gain.value=.28;o.connect(g);g.connect(S.actx.destination);o.start();S.osc=o;S.sirenOn=true;toast('Siren active');}
$('btnStrobe').onclick=()=>{$('visualStrobe').classList.add('on');toast('Tap screen to stop strobe');};
$('visualStrobe').onclick=()=>$('visualStrobe').classList.remove('on');
$('btnFakeCall').onclick=()=>{toast('Decoy call in 3s…');setTimeout(()=>{if('speechSynthesis' in window){const u=new SpeechSynthesisUtterance("Hi, I'm outside by the transit point with the car ready.");speechSynthesis.speak(u);}toast('Incoming call: Advocate office');},3000);};

/* SOS */
$('btnSOS').onclick=()=>{$('sosModal').classList.add('show');$('sosCoords').textContent=`${S.coords.lat.toFixed(5)}, ${S.coords.lng.toFixed(5)}`;$('sosAcc').textContent=`±${S.coords.acc} m`;if(navigator.getBattery)navigator.getBattery().then(b=>$('sosBattery').textContent=`${Math.round(b.level*100)}%`).catch(()=>$('sosBattery').textContent='Nominal');else $('sosBattery').textContent='Nominal';};
$('btnBroadcastSOS').onclick=()=>{$('sosModal').classList.remove('show');toast('SOS broadcast to patrol & guardians');};
renderCalc();
