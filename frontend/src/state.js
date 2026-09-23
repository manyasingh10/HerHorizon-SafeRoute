
document
    .querySelectorAll('#shelterChips .chip[data-scope]')
    .forEach(chip => {
        chip.onclick = () => {
            S.scope = chip.dataset.scope;

            document
                .querySelectorAll('#shelterChips .chip[data-scope]')
                .forEach(item => {
                    item.classList.remove('active');
                });

            chip.classList.add('active');

            renderShelters();
        };
    });


document
    .querySelectorAll('#shelterChips .chip[data-tag]')
    .forEach(chip => {
        chip.onclick = () => {
            document
                .querySelectorAll('#shelterChips .chip[data-tag]')
                .forEach(item => {
                    item.classList.remove('active');
                });

            chip.classList.add('active');

            S.tag = chip.dataset.tag;

            renderShelters();
        };
    });


function renderShelters() {
    const grid = $('shelterListingGrid');

    if (!grid) return;

    let list = [...S.shelters];

    // Filter by availability
    if (S.scope === 'available') {
        list = list.filter(
            shelter =>
                shelter.beds > 0 &&
                !shelter.far
        );
    }

    // Filter by tag
    if (S.tag && S.tag !== 'all') {
        list = list.filter(
            shelter =>
                shelter.tags.includes(S.tag)
        );
    }

    grid.innerHTML =
        list
            .map(shelter => {
                const full = shelter.beds === 0;

                return `
                    <div class="card shelter ${shelter.far ? 'far' : ''}">
                        
                        <div>
                            <div class="shelter-top">
                                <span class="badge ${
                                    full
                                        ? 'badge-full'
                                        : 'badge-open'
                                }">
                                    ${
                                        full
                                            ? 'At capacity · rerouting'
                                            : `${shelter.beds} beds open`
                                    }
                                </span>

                                <span class="small muted">
                                    <strong style="color:var(--primary)">
                                        ${shelter.dist || '—'} km
                                    </strong>
                                    away
                                </span>
                            </div>

                            <h3>${shelter.name}</h3>

                            <div class="meta">
                                ${shelter.area} · ${shelter.address}
                            </div>

                            <div class="pills">
                                <span class="pill">
                                    ${shelter.sec}
                                </span>

                                <span class="pill">
                                    Family: ${shelter.familyUnits}
                                </span>

                                ${
                                    shelter.far
                                        ? `
                                            <span
                                                class="pill"
                                                style="
                                                    background:var(--primary-50);
                                                    color:var(--primary-dark)
                                                "
                                            >
                                                Farther location
                                            </span>
                                        `
                                        : ''
                                }

                                ${
                                    shelter.tags.includes('pets')
                                        ? `
                                            <span class="pill">
                                                Pets welcome
                                            </span>
                                        `
                                        : ''
                                }

                                ${
                                    shelter.tags.includes('accessible')
                                        ? `
                                            <span class="pill">
                                                Step-free
                                            </span>
                                        `
                                        : ''
                                }
                            </div>
                        </div>

                        <div>
                            <button
                                class="btn btn-primary full"
                                style="width:100%"
                                onclick="holdBed(${shelter.id})"
                            >
                                Hold bed · 90 min
                            </button>

                            <div class="actions">
                                <button
                                    class="btn btn-dark"
                                    onclick="goTransit('${shelter.name}')"
                                >
                                    Safe ride
                                </button>

                                <button
                                    class="btn btn-ghost"
                                    onclick="walkTo(${shelter.id})"
                                >
                                    Walk route
                                </button>
                            </div>
                        </div>

                    </div>
                `;
            })
            .join('') ||
        `
            <div class="card">
                No matches. Try clearing filters.
            </div>
        `;
}


function updateSummary() {
    $('statOpenBeds').textContent =
        S.shelters.reduce(
            (total, shelter) => total + shelter.beds,
            0
        );

    $('statFamilyUnits').textContent =
        S.shelters.reduce(
            (total, shelter) => total + shelter.familyUnits,
            0
        );
}


window.holdBed = id => {
    const shelter = S.shelters.find(
        shelter => shelter.id === id
    );

    $('holdTokenCode').textContent =
        '#HOLD-' +
        Math.floor(1000 + Math.random() * 9000);

    $('holdModalDesc').textContent =
        `Confidential bed at ${shelter.name} ` +
        `(${shelter.area}) held for 90 minutes. ` +
        `Intake notified.`;

    $('holdModal').classList.add('show');
};


$('btnHoldTransit').onclick = () => {
    $('holdModal').classList.remove('show');

    showTab(
        'view-transit',
        document.querySelector(
            '[data-view="view-transit"]'
        )
    );

    toast('Transit linked to reservation');
};


window.goTransit = name => {
    showTab(
        'view-transit',
        document.querySelector(
            '[data-view="view-transit"]'
        )
    );

    $('txDestinationSelect').value = name;

    resetRideIdle();

    toast(
        `Transit configured for ${name} — press Request to confirm`
    );
};


window.walkTo = id => {
    const shelter = S.shelters.find(
        shelter => shelter.id === id
    );

    $('lblWalkTargetShelter').textContent =
        'Target: ' + shelter.name;

    showTab(
        'view-map',
        document.querySelector(
            '[data-view="view-map"]'
        )
    );

    setCorridor('safe');
    startSim();

    toast(
        `Walking route to ${shelter.name} active`
    );
};


