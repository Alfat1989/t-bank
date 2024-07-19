const authButton = document.querySelector('#auth-button')
const clientId = 'tid_ligafootball2'
const clientSecret = 'sNo4lTQ7MiZxsb9Ys9cxzklm0G2Wkr'
const redirectUrl = window.location.origin + './index2.html'

authButton.addEventListener('click', authFn2)

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

            console.log(authCode);
        }
    }, 1000);
}

function authFn2() {
    const state = generateState();
    sessionStorage.setItem('auth_state', state); // Сохраняем state в sessionStorage для проверки после редиректа

    const authUrl = `https://id.tbank.ru/auth/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUrl}&state=${state}`;
    window.location.href = authUrl;
}

function generateState() {
    return Math.random().toString(36).substring(2);
}

const authParams = {
    redirectUri: './welcome.html',
    responseType: 'code',
    clientId: 'tid_ligafootball2',
    state: generateState()
};

const uiParams = {
    container: '#container-for-tid-button',
    size: 'm',
    color: 'primary',
    text: 'Т-Банк',
    target: '_self'
};

const tidSdk = new TidSDK(authParams);
tidSdk.addButton(uiParams);