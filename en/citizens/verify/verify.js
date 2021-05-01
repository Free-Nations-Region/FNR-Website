// noinspection JSJQueryEfficiency

async function verification()
{
    // UI
    let submitBtn = document.getElementById('submitButton');
    submitBtn.disabled = true;
    submitBtn.innerHTML = 'Please wait...'

    // Gather data from website.
    let name = $('#nationName').val();
    let code = $('#verificationCode').val();
    let discord = $('#discordID').val();
    // Build URL
    let url = `https://www.nationstates.net/cgi-bin/api.cgi?userAgent=verify%20script%20by%20Heaveria%20(In%20use%20by:%20${name})&a=verify&nation=${name}&checksum=${code}`;
    // API Request. Returns integer.
    let request = await fetch(url);
    // Parse Result and Convert to Integer
    request = await request.text();
    let result = parseInt(request.trim());
    console.log(`Verification Result: ${result}`);

    switch(result)
    {
        case 0:
            await sleep(650);
            $('#successMessage').hide();
            $('.errorHandling').show();
            submitBtn.disabled = false;
            submitBtn.innerHTML = 'Submit';
            break;
        case 1:
            await sleep(650);
            $('#errorMessage').hide();
            $('#successMessage').show();
            $('.errorHandling').show();
            submitBtn.innerHTML = 'Thnx! :)';

    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
