export function handleError(err) {
    const handledError = err.message;
    alert(JSON.stringify(handledError));
    return handledError;
}

export function getCookie(setCookies, value) {
    const cookies = setCookies.split('; ');
    const cookie = [...cookies].find(c => c.startsWith(value));
    return cookie.replace(value, '').substring(1);
}
