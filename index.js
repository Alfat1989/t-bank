const authButton = document.querySelector('#auth-button')
const clientId = 'tid_ligafootball'
const clientSecret = 'sNo4lTQ7MiZxsb9Ys9cxzklm0G2Wkr'
const redirectUrl = window.location.origin + './index2.html'

authButton.addEventListener('click', authFn)

function authFn() {
    const state = generateState();
    const authUrl = `https://id.tbank.ru/auth/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUrl}&state=${state}`;
    const authWindow = window.open(authUrl, 'authWindow', 'width=800,height=600');
    const checkAuthWindowClosed = setInterval(function () {
        if (authWindow.closed) {
            clearInterval(checkAuthWindowClosed);

            const urlParams = new URLSearchParams(window.location.search);
            const authCode = urlParams.get('code');

            if (authCode) {
                window.location.href = `./welcome.html?code=${authCode}`;
            } else {
                alert('Ошибка авторизации');
            }

            console.log('authCode', authCode);
            console.log('urlParams', urlParams);
        }
    }, 1000);
}


function generateState() {
    return Math.random().toString(36).substring(2);
}

