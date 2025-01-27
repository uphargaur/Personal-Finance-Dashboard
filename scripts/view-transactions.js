// Get elements from the DOM
const transactionsContainer = document.getElementById('transactions-container');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const currentPageText = document.getElementById('current-page');

// State variables
let currentPage = 0;
const pageSize = 10;
const authToken = localStorage.getItem('token');
/**
 * Fetch transactions with pagination
 * @param {number} page - Current page number
 */
async function fetchTransactions(page) {
  try {
    const response = await fetch(
      `http://localhost:8080/transactions?page=${page}&size=${pageSize}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      renderTransactions(data.transactions);
      togglePaginationButtons(data.hasPreviousPage, data.hasNextPage);
    } else {
      transactionsContainer.innerHTML = `<p>Error: Unable to fetch transactions (${response.status})</p>`;
    }
  } catch (error) {
    transactionsContainer.innerHTML = `<p>Error: ${error.message}</p>`;
  }
}

/**
 * Render transactions on the page
 * @param {Array} transactions - Array of transaction objects
 */
function renderTransactions(transactions) {
  if (!transactions || transactions.length === 0) {
    transactionsContainer.innerHTML = '<p>No transactions available.</p>';
    return;
  }

  const transactionItems = transactions
    .map(
      (txn) => `
    <div class="transaction">
      <p><strong>Amount:</strong> ₹${txn.amount}</p>
      <p><strong>Date:</strong> ${new Date(txn.date).toLocaleDateString()}</p>
      <p><strong>Category:</strong> ${txn.category}</p>
      <p><strong>Description:</strong> ${txn.description || 'N/A'}</p>
    </div>
    <hr />
    `
    )
    .join('');

  transactionsContainer.innerHTML = transactionItems;
}

/**
 * Update pagination button states
 * @param {boolean} hasPreviousPage - Whether there is a previous page
 * @param {boolean} hasNextPage - Whether there is a next page
 */
function togglePaginationButtons(hasPreviousPage, hasNextPage) {
  prevBtn.disabled = !hasPreviousPage;
  nextBtn.disabled = !hasNextPage;
  currentPageText.textContent = `Page: ${currentPage + 1}`;
}

// Event listeners for pagination controls
prevBtn.addEventListener('click', () => {
  if (currentPage > 0) {
    currentPage--;
    fetchTransactions(currentPage);
  }
});

nextBtn.addEventListener('click', () => {
  currentPage++;
  fetchTransactions(currentPage);
});

// Initial fetch to load the first page
fetchTransactions(currentPage);
