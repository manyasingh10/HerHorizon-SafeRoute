/* tabs */

// Tab navigation
document
    .querySelectorAll('.tab')
    .forEach(tab => {
        tab.addEventListener('click', () => {
            showTab(
                tab.dataset.view,
                tab
            );
        });
    });


// Show selected tab
function showTab(id, button) {
    document
        .querySelectorAll('.view')
        .forEach(view => {
            view.classList.remove('active');
        });

    document
        .querySelectorAll('.tab')
        .forEach(tab => {
            tab.classList.remove('active');
        });

    const element = $(id);

    if (!element) return;

    element.classList.add('active');

    if (button) {
        button.classList.add('active');
    }

    // Initialize and refresh the map
    if (id === 'view-map') {
        try {
            initMap();
        } catch (error) {
            showMapFallback();
        }

        setTimeout(() => {
            try {
                S.map?.invalidateSize(true);
            } catch {}
        }, 150);

        setTimeout(() => {
            try {
                S.map?.invalidateSize(true);
            } catch {}
        }, 450);
    }

    // Scroll to the top
    window.scrollTo({
        top: 0
    });
}


// Check whether Leaflet is available
function hasLeaflet() {
    return (
        typeof L !== 'undefined' &&
        L &&
        L.map &&
        L.tileLayer
    );
}


// Show map fallback message
function showMapFallback() {
    $('mapFallback')?.classList.add('show');

    toast(
        'Map offline · list + GPS still work'
    );
}


// Hide map fallback message
function hideMapFallback() {
    $('mapFallback')?.classList.remove('show');
}
