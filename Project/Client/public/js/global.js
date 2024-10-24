const loginNav = document.getElementById("loginButton");

if (localStorage.getItem('loggedIn') === 'true') {
    loginNav.textContent = "Logout";
}

function changeStatus() {
    if (loginNav.textContent === "Login") {
        loginNav.textContent = "Logout";
        localStorage.setItem('loggedIn', 'true');
    } else {
        loginNav.textContent = "Login";
        loginNav.href = "/login";
        localStorage.setItem('loggedIn', 'false');
    }
}
