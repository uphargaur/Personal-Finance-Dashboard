// Get form and input elements from the DOM
const transactionForm = document.getElementById('add-transaction-form');
const authToken = localStorage.getItem('token');// Retrieve token from localStorage or other storage

/**
 * Redirect to the login page if the token is missing or invalid.
 */
function checkAuthToken() {
  if (!authToken) {
    alert('Authorization token is missing. Redirecting to login page.');
    window.location.href = 'login.html'; // Redirect to the login page
  }
}

/**
 * Submit form data to the API
 * @param {Event} event - The form submit event
 */
async function submitTransaction(event) {
  event.preventDefault(); // Prevent default form submission behavior

  // Extract values from form fields
  const formData = new FormData(transactionForm);
  const transactionData = {
    date: formData.get('date'),
    amount: parseFloat(formData.get('amount')),
    category: formData.get('category'),
    description: formData.get('description'),
  };

  try {
    // Send POST request to the API
    const response = await fetch('http://localhost:8080/transactions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify(transactionData),
    });

    if (response.ok) {
      // Successfully added transaction
      alert('Transaction added successfully!');
      transactionForm.reset(); // Reset the form
    } else if (response.status === 401 || response.status === 403) {
      // Redirect to login on unauthorized or forbidden error
      alert('Authorization failed. Redirecting to login.');
      localStorage.removeItem('authToken'); // Remove invalid token
      window.location.href = 'login.html'; // Redirect to the login page
    } else {
      // Handle other error responses
      const errorData = await response.json();
      alert(`Error: ${errorData.message || 'Failed to add transaction.'}`);
    }
  } catch (error) {
    // Handle network or other errors
    console.error('Error:', error);
    alert('An unexpected error occurred. Please try again.');
  }
}

// Check the token and add event listener for form submission
checkAuthToken();
transactionForm.addEventListener('submit', submitTransaction);
