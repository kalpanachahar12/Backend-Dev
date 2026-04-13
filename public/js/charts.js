/**
 * charts.js — ExpenseIQ
 * ─────────────────────
 * All Chart.js setup for the Dashboard page.
 * 
 * Functions:
 *   initBarChart(data)    — Income vs Expense bar/line chart
 *   initDonutChart(data)  — Category donut chart
 *   switchChartType(type) — Toggle bar ↔ line
 */

// ── Color palette used across all charts
const CHART_COLORS = {
  income:  '#00c896',
  expense: '#ff5c7a',
  balance: '#f59e0b',
  savings: '#4f8dff',
  purple:  '#a78bfa',
  muted:   '#3d526e',
  // Per-category colors
  Food:         '#f59e0b',
  Rent:         '#ff5c7a',
  Travel:       '#4f8dff',
  Shopping:     '#a78bfa',
  Health:       '#00c896',
  Entertainment:'#ff9500',
  Education:    '#00b4d8',
  Utilities:    '#48cae4',
  Other:        '#3d526e',
};

// ── Shared chart style config
const CHART_CONFIG = {
  gridColor:  '#1a2840',
  textColor:  '#7a90b5',
  fontFamily: 'DM Sans',
  bgColor:    '#111827',  // tooltip background
};

// ── Reference to the bar/line chart (used for switching)
let barLineChart = null;


/* ════════════════════════════════════════════
   initBarChart(monthlyData)
   ─────────────────────────
   Creates a bar chart showing income vs expense
   for the last 6 months.
   
   monthlyData format:
   [{ month: 'Jan', income: 42000, expense: 28000 }, ...]
════════════════════════════════════════════ */
function initBarChart(monthlyData, type = 'bar') {
  const ctx = document.getElementById('incomeExpenseChart');
  if (!ctx) return;

  // Destroy old chart before creating new one
  if (barLineChart) {
    barLineChart.destroy();
  }

  const labels  = monthlyData.map(d => d.month);
  const incomes = monthlyData.map(d => d.income);
  const exps    = monthlyData.map(d => d.expense);

  const isLine = type === 'line';

  barLineChart = new Chart(ctx, {
    type: type,
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Income',
          data:  incomes,
          // Bar style
          backgroundColor: isLine ? 'rgba(0,200,150,0.08)' : 'rgba(0,200,150,0.7)',
          // Line style
          borderColor:     CHART_COLORS.income,
          borderWidth:     isLine ? 2.5 : 0,
          fill:            isLine,
          tension:         0.4,
          pointBackgroundColor: CHART_COLORS.income,
          pointRadius:     isLine ? 5 : 0,
          borderRadius:    isLine ? 0 : 6,  // rounded bar corners
        },
        {
          label: 'Expense',
          data:  exps,
          backgroundColor: isLine ? 'rgba(255,92,122,0.08)' : 'rgba(255,92,122,0.7)',
          borderColor:     CHART_COLORS.expense,
          borderWidth:     isLine ? 2.5 : 0,
          fill:            isLine,
          tension:         0.4,
          pointBackgroundColor: CHART_COLORS.expense,
          pointRadius:     isLine ? 5 : 0,
          borderRadius:    isLine ? 0 : 6,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      // Show both datasets' values on hover
      interaction: { mode: 'index', intersect: false },
      plugins: {
        legend: {
          labels: {
            color:         CHART_CONFIG.textColor,
            font:          { family: CHART_CONFIG.fontFamily, size: 12 },
            usePointStyle: true,
            pointStyleWidth: 12,
            padding:       20,
          },
        },
        tooltip: {
          backgroundColor: CHART_CONFIG.bgColor,
          borderColor:     CHART_CONFIG.gridColor,
          borderWidth:     1,
          titleColor:      '#eef2ff',
          bodyColor:       CHART_CONFIG.textColor,
          padding:         12,
          callbacks: {
            label: ctx => '  ₹' + ctx.raw.toLocaleString('en-IN'),
          },
        },
      },
      scales: {
        x: {
          grid:  { color: CHART_CONFIG.gridColor },
          ticks: { color: CHART_CONFIG.textColor, font: { family: CHART_CONFIG.fontFamily } },
        },
        y: {
          grid:  { color: CHART_CONFIG.gridColor },
          ticks: {
            color:    CHART_CONFIG.textColor,
            font:     { family: CHART_CONFIG.fontFamily },
            // Format numbers as ₹42k instead of 42000
            callback: v => '₹' + (v >= 1000 ? (v/1000).toFixed(0) + 'k' : v),
          },
        },
      },
    },
  });
}


/* ════════════════════════════════════════════
   switchChartType(type, btn)
   ─────────────────────────
   Called when user clicks Bar / Line tab buttons.
   Re-creates the chart with the selected type.
════════════════════════════════════════════ */
function switchChartType(type, btn) {
  // Highlight active tab button
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  if (!barLineChart) return;

  // Get existing data from the current chart
  const labels  = barLineChart.data.labels;
  const dataset = barLineChart.data.datasets;

  const monthlyData = labels.map((month, i) => ({
    month:   month,
    income:  dataset[0].data[i],
    expense: dataset[1].data[i],
  }));

  initBarChart(monthlyData, type);
}


/* ════════════════════════════════════════════
   initDonutChart(categoryData)
   ────────────────────────────
   Creates a donut chart for category breakdown.
   Also builds a custom HTML legend below it.
   
   categoryData format:
   [{ category: 'Food', amount: 8960 }, ...]
════════════════════════════════════════════ */
function initDonutChart(categoryData) {
  const ctx = document.getElementById('categoryDonut');
  if (!ctx) return;

  const labels  = categoryData.map(d => d.category);
  const amounts = categoryData.map(d => d.amount);
  const colors  = labels.map(l => CHART_COLORS[l] || CHART_COLORS.Other);

  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: labels,
      datasets: [{
        data:            amounts,
        backgroundColor: colors,
        borderColor:     '#111827',
        borderWidth:     3,
        hoverOffset:     10,
      }],
    },
    options: {
      responsive: false,
      cutout: '68%',  // thickness of the ring
      plugins: {
        legend: { display: false },  // we build our own legend
        tooltip: {
          backgroundColor: CHART_CONFIG.bgColor,
          borderColor:     CHART_CONFIG.gridColor,
          borderWidth:     1,
          titleColor:      '#eef2ff',
          bodyColor:       CHART_CONFIG.textColor,
          padding:         12,
          callbacks: {
            label: ctx => '  ₹' + ctx.raw.toLocaleString('en-IN'),
          },
        },
      },
    },
  });

  // Build custom legend
  buildDonutLegend(labels, amounts, colors);
}


/* ════════════════════════════════════════════
   buildDonutLegend(labels, amounts, colors)
   ─────────────────────────────────────────
   Creates colored dot + label + percentage
   items below the donut chart.
════════════════════════════════════════════ */
function buildDonutLegend(labels, amounts, colors) {
  const container = document.getElementById('donutLegend');
  if (!container) return;

  const total = amounts.reduce((sum, v) => sum + v, 0);

  labels.forEach((label, i) => {
    const pct  = ((amounts[i] / total) * 100).toFixed(1);
    const item = document.createElement('div');
    item.style.cssText = 'display:flex;align-items:center;gap:5px;font-size:12px;';
    item.innerHTML = `
      <div style="width:9px;height:9px;border-radius:50%;background:${colors[i]};flex-shrink:0;"></div>
      <span style="color:#7a90b5;">${label}</span>
      <span style="color:${colors[i]};font-weight:700;">${pct}%</span>
    `;
    container.appendChild(item);
  });
}
