/* HerHorizon stealth lock/unlock controls. */
function unlock(){document.title='HerHorizon — SafeRoute';$('calcStage').style.display='none';$('haven-persona').style.display='flex';$('lblToolPasscode').textContent=S.code;renderShelters();renderAdmin();renderGuardians();updateSummary();startGPS();recompute();resetRideIdle();toast('SafeRoute engaged · GPS live');}
function lock(){if(S.sirenOn)toggleSiren();$('visualStrobe').classList.remove('on');clearInterval(S.simTimer);if(S.watchId!==null){navigator.geolocation?.clearWatch(S.watchId);S.watchId=null;}S.val='0';S.seq='';$('calcHistory').innerHTML='&nbsp;';renderCalc();document.title='Calculator';$('haven-persona').style.display='none';$('calcStage').style.display='flex';}
$('btnDisguiseTop').onclick=lock;$('btnExitTop').onclick=lock;
addEventListener('keydown',e=>{if(e.key==='Escape'&&$('haven-persona').style.display==='flex')lock();});
