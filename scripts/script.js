const REPORT_API_URL = "http://localhost:8080/reports/generate";

// Fetch report data
async function fetchReportData(month, year) {
  const token = localStorage.getItem('token'); // Get token from localStorage

  if (!token) {
    alert("Token is missing. Please log in again.");
    return;
  }

  try {
    // Construct the query parameters
    const queryParams = new URLSearchParams();
    if (month) queryParams.append("month", month);
    if (year) queryParams.append("year", year);

    const response = await fetch(`${REPORT_API_URL}?${queryParams}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`, // Include token in header
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Error fetching report: ${response.statusText}`);
    }

    const reportData = await response.json();
    populateSummary(reportData);
    populateBreakdown(reportData);
    populateVisualizations(reportData);

  } catch (error) {
    console.error("Error fetching report data:", error.message);
  }
}

// Populate the dropdown filter
document.getElementById("filter-btn").addEventListener("click", () => {
  const month = document.getElementById("month-select").value;
  const year = document.getElementById("year-select").value;
  fetchReportData(month, year); // Call the fetch function with selected filters
});

// Existing populate methods
function populateSummary(reportData) {
  const summaryContainer = document.getElementById('summary');
  summaryContainer.innerHTML = '';
  const summaryItems = [
    { title: 'Total Income', value: `$${reportData.totalIncome.toLocaleString()}`, color: 'green' },
    { title: 'Total Expenses', value: `$${reportData.totalExpenses.toLocaleString()}`, color: 'red' },
    { title: 'Savings', value: `$${reportData.savings.toLocaleString()}`, color: 'blue' }
  ];
  summaryItems.forEach(item => {
    const card = document.createElement('div');
    card.className = 'summary-card';
    card.innerHTML = `<h2>${item.title}</h2><p style="color: ${item.color};">${item.value}</p>`;
    summaryContainer.appendChild(card);
  });
}

function populateBreakdown(reportData) {
  const breakdownContainer = document.getElementById('category-breakdown');
  breakdownContainer.innerHTML = '';
  Object.entries(reportData.categoryBreakdown).forEach(([key, value]) => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `<span>${key}</span><span>$${value.toLocaleString()}</span>`;
    breakdownContainer.appendChild(listItem);
  });
}

function populateVisualizations(reportData) {
  document.getElementById('pie-chart').src = `data:image/png;base64,${reportData.visualRepresentation.pieChart}`;
  document.getElementById('bar-graph').src = `data:image/png;base64,${reportData.visualRepresentation.barGraph}`;
}

// Initial load without filters
fetchReportData(); // Load report without month/year as default
