/* tools */

// Open passcode settings
document
    .querySelectorAll('[data-passcode]')
    .forEach(button => {
        button.onclick = () => {
            $('customCodeInput').value = S.code;
            $('passcodeModal').classList.add('show');
        };
    });


// Save new stealth passcode
$('btnSaveCode').onclick = () => {
    const value = $('customCodeInput').value.trim();

    if (!value) {
        toast('Passcode required');
        return;
    }

    S.code = value;

    localStorage.setItem(
        'herhorizon_stealth_code',
        value
    );

    $('lblToolPasscode').textContent = value;

    $('passcodeModal').classList.remove('show');

    toast('Stealth passcode updated');
};


// Close modals
document
    .querySelectorAll('[data-close]')
    .forEach(button => {
        button.onclick = () => {
            $(button.dataset.close)
                .classList.remove('show');
        };
    });


// Siren
$('btnSiren').onclick = toggleSiren;

function toggleSiren() {
    if (S.sirenOn) {
        S.osc?.stop();

        S.sirenOn = false;

        toast('Siren off');
        return;
    }

    const AudioContext =
        window.AudioContext ||
        window.webkitAudioContext;

    S.actx = new AudioContext();

    const oscillator =
        S.actx.createOscillator();

    const gain =
        S.actx.createGain();

    oscillator.type = 'sawtooth';

    oscillator.frequency.setValueAtTime(
        750,
        S.actx.currentTime
    );

    oscillator.frequency.linearRampToValueAtTime(
        1300,
        S.actx.currentTime + 0.35
    );

    oscillator.frequency.linearRampToValueAtTime(
        750,
        S.actx.currentTime + 0.7
    );

    gain.gain.value = 0.28;

    oscillator.connect(gain);
    gain.connect(S.actx.destination);

    oscillator.start();

    S.osc = oscillator;
    S.sirenOn = true;

    toast('Siren active');
}


// Visual strobe
$('btnStrobe').onclick = () => {
    $('visualStrobe').classList.add('on');

    toast('Tap screen to stop strobe');
};

$('visualStrobe').onclick = () => {
    $('visualStrobe').classList.remove('on');
};


// Fake / decoy call
$('btnFakeCall').onclick = () => {
    toast('Decoy call in 3s…');

    setTimeout(() => {
        if ('speechSynthesis' in window) {
            const speech =
                new SpeechSynthesisUtterance(
                    "Hi, I'm outside by the transit point with the car ready."
                );

            speechSynthesis.speak(speech);
        }

        toast('Incoming call: Advocate office');
    }, 3000);
};


