document.getElementById('register-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const name = document.getElementById('register-name').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;

    const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
    });

    if (response.ok) {
        alert('Registration successful!');
        window.location.href = 'login.html';
    } else {
        alert('Registration failed! Please try again.');
    }
});
