/* HerHorizon shelter directory, filtering and reservations. */
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
