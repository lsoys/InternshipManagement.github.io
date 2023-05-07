export default {
    getCookieJWT() {
        const jwtCookie = document.cookie.split(';').find(cookie => cookie.includes('jwt='));
        if (!jwtCookie) {
            // Handle error when cookie is not found
            return null;
        }
        return jwtCookie.split('=')[1];
    }
}