function decodeToken(token) {
    const payload = token.split('.')[1];
    const decoded = JSON.parse(atob(payload));
    return decoded;
}

document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');

    if (!token) {
        window.location.href = 'login.html';
        return;
    }

    const user = decodeToken(token);

    document.getElementById('userEmail').textContent = user.email;
    document.getElementById('userRole').textContent = user.role;
});