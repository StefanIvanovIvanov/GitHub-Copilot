// @vitest-environment jsdom
import { beforeEach, describe, expect, it, vi } from 'vitest';

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

let Chart;
let showChartTab;

async function loadBudgetTracker() {
  vi.resetModules();
  await import('./Bucks2Bar/script.js');
}

beforeEach(() => {
  document.body.innerHTML = `
    <div id="monthTable"></div>
    <button id="tab-chart-btn"></button>
    <button id="updateChart"></button>
    <button id="updateChart2"></button>
    <button id="clearAll"></button>
    <canvas id="barChart"></canvas>`;

  document.getElementById('barChart').getContext = vi.fn(() => ({}));
  showChartTab = vi.fn();
  vi.stubGlobal('bootstrap', {
    Tab: { getOrCreateInstance: vi.fn(() => ({ show: showChartTab })) },
  });
  Chart = vi.fn(function chartConstructor(context, configuration) {
    this.context = context;
    this.data = structuredClone(configuration.data);
    this.update = vi.fn();
  });
  vi.stubGlobal('Chart', Chart);
});

describe('Bucks2Bar budget tracker', () => {
  it('creates an income and expense input for every month', async () => {
    await loadBudgetTracker();

    expect(document.querySelectorAll('#monthTable .row')).toHaveLength(12);
    expect(document.querySelectorAll('[id^="income-"]')).toHaveLength(12);
    expect(document.querySelectorAll('[id^="expense-"]')).toHaveLength(12);
    const monthTableText = document.getElementById('monthTable').textContent;
    months.forEach((month) => expect(monthTableText).toContain(month));
  });

  it('renders a USD chart using entered values and zero for blank amounts', async () => {
    await loadBudgetTracker();
    document.getElementById('income-0').value = '1500.50';
    document.getElementById('expense-0').value = '425.25';
    document.getElementById('tab-chart-btn').dispatchEvent(new Event('shown.bs.tab'));

    expect(Chart).toHaveBeenCalledTimes(1);
    const chart = Chart.mock.instances[0];
    expect(chart.data.labels).toEqual(months);
    expect(chart.data.datasets[0]).toMatchObject({
      label: 'Income', data: [1500.5, ...new Array(11).fill(0)],
      backgroundColor: 'rgba(75, 192, 96, 0.85)',
    });
    expect(chart.data.datasets[1]).toMatchObject({
      label: 'Expenses', data: [425.25, ...new Array(11).fill(0)],
      backgroundColor: 'rgba(255, 99, 102, 0.85)',
    });
  });

  it('updates the existing chart instead of constructing another one', async () => {
    await loadBudgetTracker();
    const chartTab = document.getElementById('tab-chart-btn');
    chartTab.dispatchEvent(new Event('shown.bs.tab'));
    const chart = Chart.mock.instances[0];

    document.getElementById('income-1').value = '900';
    chartTab.dispatchEvent(new Event('shown.bs.tab'));

    expect(Chart).toHaveBeenCalledTimes(1);
    expect(chart.data.datasets[0].data[1]).toBe(900);
    expect(chart.update).toHaveBeenCalledOnce();
  });

  it('clears input values and resets an already-rendered chart', async () => {
    await loadBudgetTracker();
    document.getElementById('income-0').value = '100';
    document.getElementById('expense-0').value = '25';
    document.getElementById('tab-chart-btn').dispatchEvent(new Event('shown.bs.tab'));
    const chart = Chart.mock.instances[0];

    document.getElementById('clearAll').click();

    expect(document.getElementById('income-0').value).toBe('');
    expect(document.getElementById('expense-0').value).toBe('');
    expect(chart.data.datasets[0].data).toEqual(new Array(12).fill(0));
    expect(chart.data.datasets[1].data).toEqual(new Array(12).fill(0));
    expect(chart.update).toHaveBeenCalledOnce();
  });

  it('opens the chart tab from either update control', async () => {
    await loadBudgetTracker();

    document.getElementById('updateChart').click();
    document.getElementById('updateChart2').click();

    expect(showChartTab).toHaveBeenCalledTimes(2);
  });

  it('shows a success message when a valid username is submitted', async () => {
    document.body.insertAdjacentHTML('beforeend', `
      <form id="usernameForm">
        <input id="usernameInput" />
        <div id="usernameFeedback"></div>
        <div id="usernameSuccess"></div>
      </form>`);
    await loadBudgetTracker();

    const input = document.getElementById('usernameInput');
    input.value = 'Valid!';
    document.getElementById('usernameForm').dispatchEvent(
      new Event('submit', { cancelable: true })
    );

    expect(document.getElementById('usernameSuccess').textContent)
      .toBe('Username submitted successfully.');
    expect(input.classList.contains('is-valid')).toBe(true);
    expect(input.hasAttribute('aria-invalid')).toBe(false);
  });
});
