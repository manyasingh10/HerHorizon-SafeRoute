/* tools */
document.querySelectorAll('[data-passcode]').forEach(b=>b.onclick=()=>{$('customCodeInput').value=S.code;$('passcodeModal').classList.add('show');});
$('btnSaveCode').onclick=()=>{const v=$('customCodeInput').value.trim();if(!v){toast('Passcode required');return;}S.code=v;localStorage.setItem('herhorizon_stealth_code',v);$('lblToolPasscode').textContent=v;$('passcodeModal').classList.remove('show');toast('Stealth passcode updated');};
document.querySelectorAll('[data-close]').forEach(b=>b.onclick=()=>$(b.dataset.close).classList.remove('show'));
$('btnSiren').onclick=toggleSiren;
function toggleSiren(){if(S.sirenOn){S.osc?.stop();S.sirenOn=false;toast('Siren off');return;}const C=window.AudioContext||window.webkitAudioContext;S.actx=new C();const o=S.actx.createOscillator(),g=S.actx.createGain();o.type='sawtooth';o.frequency.setValueAtTime(750,S.actx.currentTime);o.frequency.linearRampToValueAtTime(1300,S.actx.currentTime+.35);o.frequency.linearRampToValueAtTime(750,S.actx.currentTime+.7);g.gain.value=.28;o.connect(g);g.connect(S.actx.destination);o.start();S.osc=o;S.sirenOn=true;toast('Siren active');}
$('btnStrobe').onclick=()=>{$('visualStrobe').classList.add('on');toast('Tap screen to stop strobe');};
$('visualStrobe').onclick=()=>$('visualStrobe').classList.remove('on');
$('btnFakeCall').onclick=()=>{toast('Decoy call in 3s…');setTimeout(()=>{if('speechSynthesis' in window){const u=new SpeechSynthesisUtterance("Hi, I'm outside by the transit point with the car ready.");speechSynthesis.speak(u);}toast('Incoming call: Advocate office');},3000);};
