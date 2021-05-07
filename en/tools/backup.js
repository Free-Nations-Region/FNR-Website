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
