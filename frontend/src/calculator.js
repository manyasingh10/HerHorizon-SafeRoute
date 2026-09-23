/* calculator */

function renderCalc() {
    $('calcDisplay').textContent = S.val;
}


document.querySelectorAll('[data-num]').forEach(button => {
    button.addEventListener('click', () => {
        const d = button.dataset.num;

        S.val =
            (S.val === '0' && d !== '.')
                ? d
                : (d === '.' && S.val.includes('.'))
                    ? S.val
                    : S.val + d;

        S.seq += d;

        renderCalc();
        checkCode();
    });
});


document.querySelectorAll('[data-act]').forEach(button => {
    button.addEventListener('click', () => {
        doCalc(button.dataset.act);
    });
});


function doCalc(op) {
    S.seq += op;

    if (op === 'C') {
        S.val = '0';
        $('calcHistory').innerHTML = '&nbsp;';
    }

    else if (op === '=') {
        try {
            const s = S.val
                .replace(/×/g, '*')
                .replace(/÷/g, '/')
                .replace(/−/g, '-');

            $('calcHistory').textContent = S.val + ' =';

            S.val = String(
                Function(`'use strict'; return (${s})`)()
            );

        } catch {
            S.val = 'Error';
        }
    }

    else if (['+', '-', '*', '/'].includes(op)) {
        S.val += ` ${
            op === '*'
                ? '×'
                : op === '/'
                    ? '÷'
                    : op === '-'
                        ? '−'
                        : '+'
        } `;
    }

    else if (op === '+/-') {
        S.val = S.val.startsWith('-')
            ? S.val.slice(1)
            : '-' + S.val;
    }

    else if (op === '%') {
        S.val = String(parseFloat(S.val) / 100);
    }

    renderCalc();
    checkCode();
}


function checkCode() {
    const s = S.seq;

    if (
        s.includes(S.code) ||
        s.includes('98.6+=') ||
        s.includes('999=') ||
        s.endsWith('911=')
    ) {
        S.seq = '';
        unlock();
    }

    if (S.seq.length > 30) {
        S.seq = S.seq.slice(-12);
    }
}


function unlock() {
    document.title = 'HerHorizon — SafeRoute';

    $('calcStage').style.display = 'none';
    $('haven-persona').style.display = 'flex';

    $('lblToolPasscode').textContent = S.code;

    renderShelters();
    renderAdmin();
    renderGuardians();
    updateSummary();

    startGPS();
    recompute();
    resetRideIdle();

    toast('SafeRoute engaged · GPS live');
}


function lock() {
    if (S.sirenOn) {
        toggleSiren();
    }

    $('visualStrobe').classList.remove('on');

    clearInterval(S.simTimer);

    if (S.watchId !== null) {
        navigator.geolocation?.clearWatch(S.watchId);
        S.watchId = null;
    }

    S.val = '0';
    S.seq = '';

    $('calcHistory').innerHTML = '&nbsp;';

    renderCalc();

    document.title = 'Calculator';

    $('haven-persona').style.display = 'none';
    $('calcStage').style.display = 'flex';
}


$('btnDisguiseTop').onclick = lock;
$('btnExitTop').onclick = lock;


addEventListener('keydown', event => {
    if (
        event.key === 'Escape' &&
        $('haven-persona').style.display === 'flex'
    ) {
        lock();
    }
});
