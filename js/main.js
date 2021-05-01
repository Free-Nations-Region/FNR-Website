/* On website load, checks session if user is logged in.
 * If logged in, changes user interface is adapted.
 * If failed, nothing happens and event is logged.
 */
$(document).ready(function () {
    try
    {
        if(localStorage.userNation.length > 1)
        {
            console.log(`${localStorage.userNation} is logged in.`)
            $('#loginBtn').text(localStorage.userNation);
        }
    }
    catch(err)
    {
        console.log(`No user is logged in. `)
    }
})
