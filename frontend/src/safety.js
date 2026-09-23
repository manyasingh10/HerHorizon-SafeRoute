/* HerHorizon escort simulation and guardian broadcast controls. */
/* simulation + broadcast */
$('btnSimulate').onclick=()=>{S.simOn?stopSim():startSim();};
function startSim(){clearInterval(S.simTimer);S.simOn=true;S.simStep=0;$('btnSimulate').textContent='Pause escort simulation';const{lat,lng}=S.coords;const path=[[lat,lng],[lat-.0012,lng-.0008],[lat-.0024,lng-.0016],[lat-.0048,lng-.0022],[lat-.0072,lng-.003],[lat-.0094,lng-.0034]];
  S.simTimer=setInterval(()=>{S.simStep++;if(S.simStep>=path.length){stopSim();$('btnSimulate').textContent='Restart escort simulation';toast('Arrived at shelter perimeter');return;}const[pla,plo]=path[S.simStep];S.coords.lat=pla;S.coords.lng=plo;paintCoords(S.hasGPS);try{if(S.userMarker){S.userMarker.setLatLng(path[S.simStep]);S.accCircle.setLatLng(path[S.simStep]);S.map?.panTo(path[S.simStep]);}}catch{}},1900);}
function stopSim(){clearInterval(S.simTimer);S.simOn=false;$('btnSimulate').textContent='Resume escort simulation';}
document.querySelectorAll('[data-broadcast]').forEach(b=>b.onclick=()=>{let la=S.coords.lat,lo=S.coords.lng;try{if(S.userMarker){const p=S.userMarker.getLatLng();la=p.lat;lo=p.lng;}}catch{}toast(`GPS ${Number(la).toFixed(5)}, ${Number(lo).toFixed(5)} sent to guardians`);});

/* Safety tools and SOS. */
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
