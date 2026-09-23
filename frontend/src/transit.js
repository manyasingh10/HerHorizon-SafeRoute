/* simulation + broadcast */

// Escort simulation
$('btnSimulate').onclick = () => {
    S.simOn
        ? stopSim()
        : startSim();
};


function startSim() {
    clearInterval(S.simTimer);

    S.simOn = true;
    S.simStep = 0;

    $('btnSimulate').textContent =
        'Pause escort simulation';

    const {
        lat,
        lng
    } = S.coords;

    const path = [
        [lat, lng],
        [lat - 0.0012, lng - 0.0008],
        [lat - 0.0024, lng - 0.0016],
        [lat - 0.0048, lng - 0.0022],
        [lat - 0.0072, lng - 0.0030],
        [lat - 0.0094, lng - 0.0034]
    ];

    S.simTimer = setInterval(() => {
        S.simStep++;

        if (S.simStep >= path.length) {
            stopSim();

            $('btnSimulate').textContent =
                'Restart escort simulation';

            toast(
                'Arrived at shelter perimeter'
            );

            return;
        }

        const [
            pathLat,
            pathLng
        ] = path[S.simStep];

        S.coords.lat = pathLat;
        S.coords.lng = pathLng;

        paintCoords(S.hasGPS);

        try {
            if (S.userMarker) {
                S.userMarker.setLatLng(
                    path[S.simStep]
                );

                S.accCircle.setLatLng(
                    path[S.simStep]
                );

                S.map?.panTo(
                    path[S.simStep]
                );
            }
        } catch {}
    }, 1900);
}


function stopSim() {
    clearInterval(S.simTimer);

    S.simOn = false;

    $('btnSimulate').textContent =
        'Resume escort simulation';
}


// Broadcast GPS location
document
    .querySelectorAll('[data-broadcast]')
    .forEach(button => {
        button.onclick = () => {
            let lat = S.coords.lat;
            let lng = S.coords.lng;

            try {
                if (S.userMarker) {
                    const position =
                        S.userMarker.getLatLng();

                    lat = position.lat;
                    lng = position.lng;
                }
            } catch {}

            toast(
                `GPS ${Number(lat).toFixed(5)}, ` +
                `${Number(lng).toFixed(5)} sent to guardians`
            );
        };
    });


// --------------------------------------------------
// Transit
// --------------------------------------------------

function resetRideIdle() {
    const card = $('driverDetailsCard');

    if (card) {
        card.classList.remove('show');
        card.style.display = '';
    }

    if ($('unifiedPIN')) {
        $('unifiedPIN').textContent = '····';
    }

    if ($('driverSpokenPin')) {
        $('driverSpokenPin').textContent = '····';
    }

    if ($('rideStatusBadge')) {
        $('rideStatusBadge').textContent =
            'Awaiting request';
    }

    if ($('rideStatusHint')) {
        $('rideStatusHint').textContent =
            'No active ride. Select a shelter and press ' +
            '“Request & verify safe ride” to generate ' +
            'your single matching token.';
    }
}


function dispatchSafeTransit() {
    const select = $('txDestinationSelect');

    const destination =
        select ? select.value : '';

    const card =
        $('driverDetailsCard');

    if (!destination) {
        toast(
            'Please select a safe shelter first.'
        );

        return;
    }

    const singlePIN =
        Math.floor(
            1000 + Math.random() * 9000
        );

    $('unifiedPIN').textContent =
        singlePIN;

    $('driverSpokenPin').textContent =
        singlePIN;

    if ($('rideStatusBadge')) {
        $('rideStatusBadge').textContent =
            'Ride confirmed';
    }

    if ($('rideStatusHint')) {
        $('rideStatusHint').textContent =
            'Driver and passenger share this one ' +
            'matching token. Only enter after the ' +
            'driver states it aloud.';
    }

    if (card) {
        card.style.display = '';
        card.classList.add('show');

        card.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest'
        });
    }

    toast(
        'Ride requested to ' +
        destination +
        '. Driver verification completed.'
    );
}


$('btnDispatch').onclick =
    dispatchSafeTransit;


$('txDestinationSelect').addEventListener(
    'change',
    resetRideIdle
);


$('btnFarRide').onclick = () => {
    showTab(
        'view-transit',
        document.querySelector(
            '[data-view="view-transit"]'
        )
    );

    $('txDestinationSelect').value =
        'Harbor Sanctuary Point';

    resetRideIdle();
    dispatchSafeTransit();
};


$('btnVoucherTop').onclick = () => {
    $('transitPassModal')
        .classList.add('show');
};


$('btnClaimPass').onclick = () => {
    $('transitPassModal')
        .classList.remove('show');

    showTab(
        'view-transit',
        document.querySelector(
            '[data-view="view-transit"]'
        )
    );

    toast(
        'Voucher applied — press Request to confirm ride'
    );
};


