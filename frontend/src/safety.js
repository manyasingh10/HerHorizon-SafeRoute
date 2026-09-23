/* SOS */
$('btnSOS').onclick=()=>{$('sosModal').classList.add('show');$('sosCoords').textContent=`${S.coords.lat.toFixed(5)}, ${S.coords.lng.toFixed(5)}`;$('sosAcc').textContent=`±${S.coords.acc} m`;if(navigator.getBattery)navigator.getBattery().then(b=>$('sosBattery').textContent=`${Math.round(b.level*100)}%`).catch(()=>$('sosBattery').textContent='Nominal');else $('sosBattery').textContent='Nominal';};
$('btnBroadcastSOS').onclick=()=>{$('sosModal').classList.remove('show');toast('SOS broadcast to patrol & guardians');};
renderCalc();
