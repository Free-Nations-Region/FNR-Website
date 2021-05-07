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


function loginSubmit()
{
    // Gets the parameter in the URL. Returns null if empty.

    // Visual Feedback
    let button = document.getElementById('submitButton');
    button.innerHTML = 'Please wait...';
    button.focus();
    console.log('Authenticating...')
    // Login Logic
    switch(response)
    {
        case true:
            // TBD: Set JWT/Cookie
            localStorage.userNation = "Heaveria";
            // Uses aforementioned URL parameters to redirect to parameter or go home if null.
            switch (redirectUrl)
            {
                case null:
                    return window.location.replace('/FNR-Website/index.html');
                default:
                    return window.location.replace(redirectUrl);
            }
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
