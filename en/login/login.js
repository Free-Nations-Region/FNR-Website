// Sign-In / Login-In System
// noinspection JSJQueryEfficiency

function loginSubmit()
{
    let button = document.getElementById('submitButton');
    button.innerHTML = 'Please wait...';
    button.focus();
    console.log('Authenticating...')

    switch(response)
    {
        case true:
            // TBD: Set JWT/Cookie
            localStorage.userNation = "Heaveria";
            window.location.replace('/FNR-Website/index.html')
            break;
        case 400:
            /* Reset values & show error message(s).
             * Incorrect nation name.
             */
            $('.errorHandling').show();
            $('#errorMessage').text('Login failed! <b>Wrong nation name</b>. Please try again.');
            $('#nationName').text('');
            $('#submitButton').text('Submit')
            console.log(`Login failed. Error: ${response}`)
            break;
        case 401:
            /* Reset values & show error message(s).
             * Incorrect verification code.
             */
            $('.errorHandling').show();
            $('#errorMessage').text('Login failed! <b>Wrong verification code</b>. Please try again.');
            $('#verificationCode').text('');
            $('#submitButton').text('Submit')
            console.log(`Login failed. Error: ${response}`)
            break;
    }
}
