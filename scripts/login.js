document.getElementById('login-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    try {
        const response = await fetch('http://localhost:8080/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        if (response.status === 200) {
            // Attempt to parse the response based on its content type
            const contentType = response.headers.get('Content-Type');
            let data;

            if (contentType && contentType.includes('application/json')) {
                data = await response.json();
            } else {
                data = await response.text(); // Fallback to plain text
            }

            alert('Login successful!');
            console.log(data); // Debug to check what the server sent back
            window.location.href = 'home.html';
            localStorage.setItem('token', data.token || data); // Adjust depending on response
        } else {
            alert('Login failed! Check your credentials.');
        }
    } catch (error) {
        console.error('Error during login:', error);
        alert('An error occurred. Please try again.');
    }
});
