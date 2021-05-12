/* On website load, checks session if user is logged in.
 * If logged in, changes user interface is adapted.
 * If failed, nothing happens and event is logged.
 */
$(document).ready(function ()
{
    try
    {
        let jwt = JSON.parse(localStorage.getItem('user'));
        if(jwt.isValid === true)
        {
            console.log(`${jwt.nation} is logged in.`)
            $('#loginBtn').text(jwt.nation);
        }
    }
    catch(err)
    {
        console.log(`No user is logged in. `)
    }
})
