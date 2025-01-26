const cookieName = "token";
    const cookieValue = getCookieValue(cookieName);
    document.querySelectorAll(".login-logout-btn").forEach(element => {
        if (cookieValue == "") {
            element.innerHTML = `<a href="/loginPage" class="text-sm/6 font-semibold text-white">Log in <span aria-hidden="true">&rarr;</span></a>`
        }else{
            element.innerHTML = `<a href="/customer/logout" class="text-sm/6 font-semibold text-white">Log Out <span aria-hidden="true">&rarr;</span></a>`
        }
    })



function getCookieValue(cookieName) {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
        cookie = cookie.trim();
        if (cookie.startsWith(cookieName + "=")) {
            return cookie.substring(cookieName.length + 1);
        }
    }
}