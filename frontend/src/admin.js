/* HerHorizon guardian directory and shelter admin controls. */
/* guardians */
function renderGuardians(){$('guardianList').innerHTML=S.guardians.map(g=>{const[bg,fg]=g.color.split(',');return `<div class="card guardian"><div style="display:flex;gap:12px;align-items:center"><div class="avatar" style="background:${bg};color:${fg}">${g.init}</div><div><strong>${g.name}</strong> <span class="badge badge-info">${g.rel}</span><div class="small muted">${g.phone}</div><div class="small" style="color:var(--success);font-weight:700">● ${g.status}</div></div></div><div style="display:flex;gap:8px"><button class="btn btn-success btn-sm" onclick="toast('Calling ${g.name}…')">Call</button><button class="btn btn-ghost btn-sm" onclick="toast('Ping sent to ${g.name}')">Ping</button></div></div>`;}).join('');}

/* admin */
function renderAdmin(){const tb=$('adminMatrixBody');if(!tb)return;tb.innerHTML=S.shelters.map(s=>{const st=s.beds===0?['badge-full','At capacity']:s.beds<=2?['badge-warn','Limited']:['badge-open','Open'];return `<tr><td><strong>${s.name}</strong><div class="small muted">${s.dist||'—'} km · ${s.area}</div></td><td><span class="badge ${s.far?'badge-info':'badge-open'}">${s.far?'Farther':'Nearby'}</span></td>
  <td><span class="stepper"><button onclick="adj(${s.id},'beds',-1)">−</button><b>${s.beds}</b><button onclick="adj(${s.id},'beds',1)">+</button></span></td>
  <td><span class="stepper"><button onclick="adj(${s.id},'familyUnits',-1)">−</button><b>${s.familyUnits}</b><button onclick="adj(${s.id},'familyUnits',1)">+</button></span></td>
  <td><span class="badge ${st[0]}">${st[1]}</span></td><td>${s.far?`<button class="btn btn-primary btn-sm" onclick="goTransit('${s.name}')">Dispatch</button>`:'<span class="small" style="color:var(--success);font-weight:700">Auto-synced</span>'}</td></tr>`;}).join('');}
window.adj=(id,f,d)=>{const s=S.shelters.find(x=>x.id===id);s[f]=Math.max(0,s[f]+d);renderAdmin();renderShelters();updateSummary();toast(`${s.name} synced`);};
$('btnSync').onclick=()=>{renderAdmin();recompute();toast('Sync complete');};
