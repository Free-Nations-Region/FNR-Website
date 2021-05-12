// Sign-In / Login-In System
// noinspection JSJQueryEfficiency
let errorMsg = $('#errorMessage');
let errorSec = $('.errorHandling');

const redirectUrl = new URLSearchParams(window.location.search).get('redirect');
if (redirectUrl != null)
{
    errorSec.show();
    errorMsg.text(`You must be logged in to access the previous page.`);
}


async function loginSubmit() {
    // Visual Feedback
    let button = document.getElementById('submitButton');
    button.innerHTML = 'Please wait...';
    button.focus();
    console.log('Authenticating...')

    // Get token from server-side API.
    let jwt = await validateNewJWT();
    localStorage.setItem('user', JSON.stringify(jwt));
    jwt = JSON.parse(localStorage.getItem('user'));

    // Login Logic
    switch (jwt.isValid) {
        case true:
            switch (redirectUrl) {
                case null:
                    return window.location.replace('/FNR-Website/index.html');
                case 'dispatch':
                    return window.location.replace('/FNR-Website/en/tools/dispatch.html');
            }
            break;
        case 400:
            /* Reset values & show error message(s).
             * Incorrect nation name.
             */
            errorSec.show();
            errorMsg.text('Login failed! <b>Wrong nation name</b>. Please try again.');
            $('#nationName').text('');
            $('#submitButton').text('Submit')
            console.log(`Login failed. Error: ${response}`)
            break;
        case 401:
            /* Reset values & show error message(s).
             * Incorrect verification code.
             */
            errorSec.show();
            $('#errorMessage').text('Login failed! <b>Wrong verification code</b>. Please try again.');
            $('#verificationCode').text('');
            errorMsg.text('Submit')
            console.log(`Login failed. Error: ${response}`)
            break;
    }
}


async function validateNewJWT()
{
    // 1. Setup
    let url = `https://api.the-fnr.com`;
    let apiKey = `18d02a5f-32cd-4b9b-8aae-d32f8469f67a`;
    let pubKey = `-----BEGIN PUBLIC KEY-----
                    MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDiFdVE7Vh4kDdgZnY2sJxnMiwB
                    dTlyWC1q2AsRmdxJq0oJI6obJFclacosx6iMonLK8qMcLSrDozWeALhpsVLkwRmC
                    k9l696s9t8MRI0vUEBaCCCNWvllRKPCrEZ/UUDXBexfFllbP/bXM23AULCfbyB7d
                    pGLCJiv3acFbmJXyFQIDAQAB
                    -----END PUBLIC KEY-----`
    let token;

    /* 2. Validate Token.
     *  Requires the jrsasign library. (https://github.com/kjur/jsrsasign)
     */
    await fetch(`${url}/v1/auth/token`,
        {
            method: 'GET',
            headers: {
                'apiKey': apiKey
            }})
        .then(res => res.json())
        .then(data => {
            token = data.token;
        })
        .catch(err => console.log(err));

    // 3. Validate Token
    let jwtKey = KEYUTIL.getKey(pubKey);
    let isValid = KJUR.jws.JWS.verifyJWT(token, jwtKey, {alg: ['RS256']});

    // 4. Read content of Token
    let headerObj = KJUR.jws.JWS.readSafeJSONString(b64utoutf8(token.split(".")[0]));
    let payloadObj = KJUR.jws.JWS.readSafeJSONString(b64utoutf8(token.split(".")[1]));
    return {
        'nation': $('#nationName').val(),
        'token': token,
        'isValid': isValid,
        'payload': payloadObj
    };
}
