document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorDiv = document.getElementById('loginError');
    errorDiv.style.display = 'none';

    try {
        const response = await fetch(`${AUTH_API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (!response.ok) {
            errorDiv.textContent = data.error || 'Login failed';
            errorDiv.style.display = 'block';
            return;
        }

        localStorage.setItem('token', data.token);
        window.location.href = 'account.html';

    } catch (error) {
        errorDiv.textContent = 'Connection error';
        errorDiv.style.display = 'block';
    }
    
});