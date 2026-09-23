/* support chat */

function addMsg(text, who) {
    const message = document.createElement('div');

    message.className = 'msg ' + who;
    message.textContent = text;

    $('chatMsgContainer').appendChild(message);

    $('chatMsgContainer').scrollTop = 1e6;
}


function botReply(question) {
    let reply =
        'Logged anonymously. A specialist is standing by — ' +
        'what should we prioritise next?';

    if (/bed|shelter/i.test(question)) {
        reply =
            'I can lock a 90-minute hold at our ' +
            'highest-security shelter now. ' +
            'Shall I reserve it?';
    }

    else if (/ride|transit|pass|voucher/i.test(question)) {
        reply =
            'Your transit pass covers a zero-cost silent pickup. ' +
            'Want me to dispatch it to your GPS?';
    }

    else if (/802|counsel|trauma/i.test(question)) {
        reply =
            'A counselor is live on Line #802. ' +
            'Want an instant secure connection?';
    }

    setTimeout(() => {
        addMsg(reply, 'bot');
    }, 600);
}


// Send chat message
$('btnSendChat').onclick = () => {
    const input = $('supportChatInput');

    if (!input.value.trim()) return;

    const message = input.value.trim();

    addMsg(message, 'user');

    botReply(message);

    input.value = '';
};


// Send message using Enter key
$('supportChatInput').addEventListener(
    'keydown',
    event => {
        if (event.key === 'Enter') {
            $('btnSendChat').click();
        }
    }
);


// Clear chat
$('btnClearChat').onclick = () => {
    $('chatMsgContainer').innerHTML = `
        <div class="msg bot">
            Hello. You are in a safe, encrypted space.
            How can we help?
        </div>
    `;

    toast('Transcript cleared');
};


// Quick support buttons
document
    .querySelectorAll('[data-q]')
    .forEach(button => {
        button.onclick = () => {
            const messages = {
                bed: 'I need an emergency bed reservation.',
                ride: 'Request a free transit voucher.',
                counselor:
                    'Connect me to a Line #802 counselor.',
                callback:
                    'Request a disguised callback.'
            };

            const message =
                messages[button.dataset.q];

            addMsg(message, 'user');
            botReply(message);

            if (button.dataset.q === 'bed') {
                setTimeout(() => {
                    holdBed(1);
                }, 700);
            }

            if (button.dataset.q === 'ride') {
                setTimeout(() => {
                    $('transitPassModal')
                        .classList.add('show');
                }, 700);
            }
        };
    });


// Connect to counselor
$('btnLine802').onclick = () => {
    toast(
        'Connecting to Line #802 counselor…'
    );
};


// Free ride
$('btnFreeRide').onclick = () => {
    showTab(
        'view-transit',
        document.querySelector(
            '[data-view="view-transit"]'
        )
    );

    toast('Free ride booking opened');
};


// Disguised SMS
document
    .querySelector('[data-sms]')
    .onclick = () => {
        toast('Disguised SMS channel pinged');
    };


// Silent beacon
$('btnBeacon').onclick = () => {
    toast(
        'Silent beacon broadcasting · no sound'
    );
};


