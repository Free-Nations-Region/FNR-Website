/* On website load, checks session if user is logged in.
 * If logged in, changes user interface is adapted.
 * If failed, it redirects to the login page with a redirect parameter.
 */
$(document).ready(function ()
{
    try
    {
        if(localStorage.userNation.length > 1)
        {
            console.log(`${localStorage.userNation} is authorized to use the backup tool.`)
        }
    }
    catch(err)
    {
        // Redirects user to login page. Adds a dynamic redirect parameter which can be read by the login.js script.
        window.location.replace(`/FNR-Website/en/login.html?redirect=${window.location.href}`);
    }
})

// Copy to Clipboard Function
let clipboardBtn = $('#clipboardBtn');
clipboardBtn.click(function() {
    let copyText = document.querySelector("#resultBox");
    copyText.select();
    document.execCommand("copy");
    console.log(`Text copied to clipboard.`);
    clipboardBtn.popover('show');
    setTimeout(function(){ clipboardBtn.popover('hide');; }, 3000);
})

// Dispatch Backup Tool
async function backup()
{
    // 1. Disable Form & Set jQuery Value for caching efficiency.
    let submitBtn = $('#submitButton');
    let progressAlert = $('.progressAlert');
    let progressBar = $('.progressBar');
    let progressBarPercent = $('#progressBar');
    submitBtn.prop("disabled",true);
    submitBtn.text(`Please wait...`);

    // 2. Get/Set Values
    let uAgent = localStorage.userNation;
    let nName = $('#nationName').val();
    let throttle = $('#throttle').val();
    let url = `https://www.nationstates.net/cgi-bin/api.cgi`;
    let uAgentParam = `userAgent=Script%20by%20Heaveria.%20In%20use%20by%20${uAgent}`;

    // 3. Visual Feedback (Progress)
    progressAlert.show();

    // 4. Try statement to catch errors and stop execution.
    try
    {
        // 5. Get a list of all dispatches.
        let dispatchList = []
        await fetch(`${url}?${uAgentParam}&nation=${nName}&q=dispatchlist`)
            .then(res => {
                if (res.status === 404) {
                    throw Error(`Nation does not exist. (404)`)
                }
                return res.text()
            })
            .then(str => (new window.DOMParser()).parseFromString(str, "text/xml"))
            .then(data => {
                let rawList = data.getElementsByTagName("DISPATCH");
                for (let i = 0; i < rawList.length; i++)
                {
                   dispatchList.push(rawList[i].attributes[0].value);
                }
            });
        await sleep(throttle); // Rate limit

        // 6. Update visual feedback
        progressBar.show();

        // 7. Get text for each dispatch.
        let textList = [];
        for (let i in dispatchList)
        {
            // 8. Update visual feedback
            $('#progressMessage').text(`Getting dispatch ${parseInt(i)+1} of ${dispatchList.length}`);

            // 9. Execute Request
            await fetch(`${url}?${uAgentParam}&q=dispatch;dispatchid=${dispatchList[i]}`)
                .then(res => {
                    if (res.status === 404) {
                        throw Error(`Nation does not exist. (404)`)
                    }
                    return res.text()
                })
                .then(str => (new window.DOMParser()).parseFromString(str, "text/xml"))
                .then(data => {
                    textList.push(data.getElementsByTagName("TEXT")[0].innerHTML);
                });

            // 10. Update visual feedback
            let percentProgress = Math.ceil((i/(dispatchList.length-1))*100)
            progressBarPercent.attr('style',`width: ${percentProgress}%`);
            progressBarPercent.text(`${percentProgress}%`)

            await sleep(throttle); // Rate limit
        }

        // 11. Take raw text in textList and format it properly.
        let outputText = []
        for (let i in textList)
        {
            outputText.push(`Dispatch ID: ${dispatchList[i]}\n${textList[i]
                .replace('<![CDATA[', '')
                .replace(']]>','')} 
                ~~~~ END ~~~\n`);

        }
        console.log(textList);
        console.log(outputText)
        // 12. Modify HTML to show results.
        $('.inputForm').hide();
        $('.resultSec').show();
        $('#resultBox').text(outputText.join('<b>'))
    }
    catch(err)
    {
        console.log(err);
    }

    function sleep(ms) {
        return new Promise((resolve) => {
            setTimeout(resolve, ms);
        });
    }
}
