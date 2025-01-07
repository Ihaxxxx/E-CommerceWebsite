window.onload = async () => {

    
    const cookieName = "token";
    const cookieValue = getCookieValue(cookieName);
    if (cookieValue == "") {
        
    }
}






function getCookieValue(cookieName) {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
        cookie = cookie.trim();
        if (cookie.startsWith(cookieName + "=")) {
            return cookie.substring(cookieName.length + 1);
        }
    }
    return null;
}