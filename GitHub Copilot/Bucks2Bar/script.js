const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

let chartInstance = null;

// Expose chart instance on window for external handlers
window.chartInstance = chartInstance;

// --- List/grid generation (replaces table) ---
(function buildList() {
  const container = document.getElementById('monthTable');
  container.innerHTML = '';
  MONTHS.forEach((month, i) => {
    const row = document.createElement('div');
    row.className = 'row align-items-center py-2 border-bottom';
    row.innerHTML = `
      <div class="col-4 col-lg-3 text-muted fw-semibold">${month}</div>
      <div class="col-8 col-lg-4 mb-2 mb-lg-0">
        <div class="input-group input-group-sm">
          <span class="input-group-text">$</span>
          <input type="number" id="income-${i}" class="form-control"
            min="0" step="0.01" placeholder="" />
        </div>
      </div>
      <div class="col-12 col-lg-5">
        <div class="input-group input-group-sm">
          <span class="input-group-text">$</span>
          <input type="number" id="expense-${i}" class="form-control"
            min="0" step="0.01" placeholder="" />
        </div>
      </div>`;
    container.appendChild(row);
  });
})();

// --- Data reading ---
function readData() {
  const incomes  = [];
  const expenses = [];
  MONTHS.forEach((_, i) => {
    incomes.push(parseFloat(document.getElementById(`income-${i}`).value)  || 0);
    expenses.push(parseFloat(document.getElementById(`expense-${i}`).value) || 0);
  });
  return { incomes, expenses };
}

// --- Chart rendering ---
function buildChart() {
  const { incomes, expenses } = readData();

  // Update existing chart instead of destroying and recreating
  if (chartInstance) {
    chartInstance.data.datasets[0].data = incomes;
    chartInstance.data.datasets[1].data = expenses;
    chartInstance.update();
    return;
  }

  const ctx = document.getElementById('barChart').getContext('2d');
  chartInstance = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: MONTHS,
      datasets: [
        {
          label: 'Income',
          data: incomes,
          backgroundColor: 'rgba(75, 192, 96, 0.85)',
          borderColor:     'rgb(34, 139, 34)',
          borderWidth: 1,
        },
        {
          label: 'Expenses',
          data: expenses,
          backgroundColor: 'rgba(255, 99, 102, 0.85)',
          borderColor:     'rgb(220, 53, 69)',
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: 'top' },
        tooltip: {
          callbacks: {
            // USD-formatted tooltip values
            label: (item) =>
              ` ${item.dataset.label}: $${item.parsed.y.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
          },
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: (val) => `$${Number(val).toLocaleString('en-US')}`,
          },
        },
      },
    },
  });
  // mirror to window for global access
  window.chartInstance = chartInstance;
}

// Auto-render when the Chart tab becomes visible
document.getElementById('tab-chart-btn').addEventListener('shown.bs.tab', buildChart);

// "Update Chart" button — also switches to the Chart tab for immediate feedback
document.getElementById('updateChart').addEventListener('click', () => {
  bootstrap.Tab.getOrCreateInstance(
    document.getElementById('tab-chart-btn')
  ).show();
});

// secondary Update button (for updated layout) — open chart and build
const updateBtn2 = document.getElementById('updateChart2');
if (updateBtn2) {
  updateBtn2.addEventListener('click', () => {
    bootstrap.Tab.getOrCreateInstance(
      document.getElementById('tab-chart-btn')
    ).show();
  });
}

// Clear all inputs and reset chart data
document.getElementById('clearAll').addEventListener('click', () => {
  MONTHS.forEach((_, i) => {
    document.getElementById(`income-${i}`).value  = '';
    document.getElementById(`expense-${i}`).value = '';
  });
  if (chartInstance) {
    chartInstance.data.datasets[0].data = new Array(12).fill(0);
    chartInstance.data.datasets[1].data = new Array(12).fill(0);
    chartInstance.update();
  }
});

const usernameForm = document.getElementById('usernameForm');
const usernameInput = document.getElementById('usernameInput');
const usernameFeedback = document.getElementById('usernameFeedback');
const usernameSuccess = document.getElementById('usernameSuccess');

if (usernameForm && usernameInput && usernameFeedback && usernameSuccess) {
  function validateUsername(value) {
    if (!value || value.length < 5) return 'Username must be at least 5 characters.';
    if (!/[A-Z]/.test(value)) return 'Username must contain at least one uppercase letter.';
    if (!/[!@#$%^&*()_+\-=[\]{};:\"\\|,.<>/?]/.test(value)) return 'Username must contain at least one special character.';
    return '';
  }

  usernameForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const error = validateUsername(usernameInput.value.trim());
    if (error) {
      usernameInput.classList.add('is-invalid');
      usernameInput.classList.remove('is-valid');
      usernameFeedback.textContent = error;
      usernameSuccess.textContent = '';
      usernameInput.setAttribute('aria-invalid', 'true');
      return;
    }

    usernameInput.classList.remove('is-invalid');
    usernameInput.classList.add('is-valid');
    usernameFeedback.textContent = '';
    usernameSuccess.textContent = 'Username submitted successfully.';
    usernameInput.removeAttribute('aria-invalid');
  });

  usernameInput.addEventListener('input', () => {
    if (!validateUsername(usernameInput.value.trim())) {
      usernameInput.classList.remove('is-invalid');
    }
  });
}
