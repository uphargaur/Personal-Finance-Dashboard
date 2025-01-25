// Populate the summary section
const summaryContainer = document.getElementById('summary');
const summaryItems = [
  { title: 'Total Income', value: `$${reportData.totalIncome.toLocaleString()}`, color: 'green' },
  { title: 'Total Expenses', value: `$${reportData.totalExpenses.toLocaleString()}`, color: 'red' },
  { title: 'Savings', value: `$${reportData.savings.toLocaleString()}`, color: 'blue' }
];

summaryItems.forEach(item => {
  const card = document.createElement('div');
  card.className = 'summary-card';
  card.innerHTML = `
    <h2>${item.title}</h2>
    <p style="color: ${item.color};">${item.value}</p>
  `;
  summaryContainer.appendChild(card);
});

// Populate the category breakdown
const breakdownContainer = document.getElementById('category-breakdown');
Object.entries(reportData.categoryBreakdown).forEach(([key, value]) => {
  const listItem = document.createElement('li');
  listItem.innerHTML = `
    <span>${key}</span>
    <span>$${value.toLocaleString()}</span>
  `;
  breakdownContainer.appendChild(listItem);
});

// Populate visualizations
document.getElementById('pie-chart').src = `data:image/png;base64,${reportData.visualRepresentation.pieChart}`;
document.getElementById('bar-graph').src = `data:image/png;base64,${reportData.visualRepresentation.barGraph}`;
