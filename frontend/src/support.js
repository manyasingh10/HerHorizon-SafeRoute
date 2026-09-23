/* HerHorizon support chat and quick-help actions. */
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
