$(document).ready(function () {
    if(localStorage.userNation.length > 1)
    {
        $('#loginBtn').text(localStorage.userNation);
    }
})
