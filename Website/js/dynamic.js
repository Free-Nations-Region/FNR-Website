// Navbar
document.querySelector('body').innerHTML = `
<!-- Navigation Bar -->
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <a class="navbar-brand" href="./index.html">
        <img src="../assets/logo.png" width="30" height="33" class="d-inline-block align-top" alt=""
             loading="lazy"> FNR
    </a>
    <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav">
            <li class="nav-item active">
                <a class="nav-link" href="./index.html">Home <span class="sr-only">(current)</span></a>
            </li>
            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button"
                   data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Citizens
                </a>
                <div class="dropdown-menu" aria-labelledby="navbarDropdownCitizens">
                    <a class="dropdown-item" href="./en/citizens/verify.html">Discord Verification</a>
                    <a class="dropdown-item" href="./en/citizens/manage.html">Citizenship Management</a>
                    <a class="dropdown-item" href="https://teamup.com/ksumu31yifi772mqf4" target="_blank">
                        Regional Calendar
                    </a>
                </div>
            </li>
            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownTools" role="button"
                   data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Tools
                </a>
                <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                    <a class="dropdown-item" href="./en/tools/backup.html">Dispatch Backup</a>
                    <a class="dropdown-item" href="#">Dispatch Versioning</a>
                    <a class="dropdown-item" href="#">Something else here</a>
                </div>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="https://www.nationstates.net/nation=heaveria" target="_blank">Help</a>
            </li>
        </ul>
    </div>
    <button type="submit" class="btn navbar-btn login-btn"><a style="text-decoration: none; color: #343A40;"
                                                              href="./en/login.html" id="loginBtn">
        Sign In</a>
    </button>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>
</nav>`


