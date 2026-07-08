// ============================================================
// CHARTS.JS — Chart.js visualizations
// ============================================================
import { ALGORITHMS, ALGO_ORDER } from './data.js';

let radarChart = null;
let trilemmaChart = null;
let compareRadarChart = null;
let compareBarChart = null;
let tpsChart = null;

const CHART_COLORS = {
  pow: '#f7931a', pos: '#627eea', dpos: '#22c55e', pbft: '#a855f7',
  poa: '#06b6d4', poh: '#14f195', pob: '#ef4444', poc: '#f97316',
  poet: '#84cc16', poact: '#ec4899', pospace: '#8b5cf6', poimp: '#0ea5e9'
};

function getChartDefaults() {
  const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
  return {
    gridColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)',
    textColor: isDark ? '#9fa8da' : '#3949ab',
    bgColor: isDark ? 'rgba(15,22,41,0.8)' : 'rgba(255,255,255,0.9)'
  };
}

export function initTrilemmaChart(algoId) {
  const algo = ALGORITHMS[algoId];
  if (!algo) return;
  const ctx = document.getElementById('trilemmaChart');
  if (!ctx) return;

  const { gridColor, textColor } = getChartDefaults();
  const data = {
    labels: ['Security', 'Scalability', 'Decentralization'],
    datasets: [{
      label: algo.acronym,
      data: [algo.metrics.security, algo.metrics.scalability, algo.metrics.decentralization],
      backgroundColor: hexToRgba(algo.color, 0.2),
      borderColor: algo.color,
      borderWidth: 2,
      pointBackgroundColor: algo.color,
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: algo.color,
      pointRadius: 5,
      pointHoverRadius: 7
    }]
  };

  if (trilemmaChart) {
    trilemmaChart.data = data;
    trilemmaChart.update('active');
  } else {
    trilemmaChart = new Chart(ctx, {
      type: 'radar',
      data,
      options: {
        responsive: true,
        maintainAspectRatio: true,
        scales: {
          r: {
            min: 0,
            max: 10,
            ticks: { stepSize: 2, color: textColor, font: { size: 11 }, backdropColor: 'transparent' },
            grid: { color: gridColor },
            pointLabels: { color: textColor, font: { size: 13, weight: '600' } },
            angleLines: { color: gridColor }
          }
        },
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: 'rgba(10,14,26,0.95)',
            borderColor: algo.color,
            borderWidth: 1,
            titleColor: '#fff',
            bodyColor: '#9fa8da',
            callbacks: {
              label: (ctx) => ` ${ctx.label}: ${ctx.raw}/10`
            }
          }
        },
        animation: { duration: 600, easing: 'easeInOutQuart' }
      }
    });
  }
}

export function initCompareCharts(algo1Id, algo2Id) {
  const a1 = ALGORITHMS[algo1Id];
  const a2 = ALGORITHMS[algo2Id];
  if (!a1 || !a2) return;
  const { gridColor, textColor } = getChartDefaults();

  // Radar comparison
  const radarCtx = document.getElementById('compareRadarChart');
  if (radarCtx) {
    const radarData = {
      labels: ['Security', 'Scalability', 'Decentralization'],
      datasets: [
        {
          label: a1.acronym,
          data: [a1.metrics.security, a1.metrics.scalability, a1.metrics.decentralization],
          backgroundColor: hexToRgba(a1.color, 0.15),
          borderColor: a1.color,
          borderWidth: 2,
          pointBackgroundColor: a1.color,
          pointRadius: 5
        },
        {
          label: a2.acronym,
          data: [a2.metrics.security, a2.metrics.scalability, a2.metrics.decentralization],
          backgroundColor: hexToRgba(a2.color, 0.15),
          borderColor: a2.color,
          borderWidth: 2,
          pointBackgroundColor: a2.color,
          pointRadius: 5
        }
      ]
    };
    if (compareRadarChart) {
      compareRadarChart.data = radarData;
      compareRadarChart.update('active');
    } else {
      compareRadarChart = new Chart(radarCtx, {
        type: 'radar',
        data: radarData,
        options: {
          responsive: true,
          scales: {
            r: {
              min: 0, max: 10,
              ticks: { stepSize: 2, color: textColor, backdropColor: 'transparent', font: { size: 10 } },
              grid: { color: gridColor },
              pointLabels: { color: textColor, font: { size: 12, weight: '600' } },
              angleLines: { color: gridColor }
            }
          },
          plugins: {
            legend: {
              position: 'bottom',
              labels: { color: textColor, boxWidth: 12, font: { size: 12 } }
            }
          },
          animation: { duration: 600, easing: 'easeInOutQuart' }
        }
      });
    }
  }

  // Bar chart comparison
  const barCtx = document.getElementById('compareBarChart');
  if (barCtx) {
    const categories = ['Security', 'Scalability', 'Decentralization'];
    const barData = {
      labels: categories,
      datasets: [
        {
          label: a1.acronym,
          data: [a1.metrics.security, a1.metrics.scalability, a1.metrics.decentralization],
          backgroundColor: hexToRgba(a1.color, 0.7),
          borderColor: a1.color,
          borderWidth: 2,
          borderRadius: 6
        },
        {
          label: a2.acronym,
          data: [a2.metrics.security, a2.metrics.scalability, a2.metrics.decentralization],
          backgroundColor: hexToRgba(a2.color, 0.7),
          borderColor: a2.color,
          borderWidth: 2,
          borderRadius: 6
        }
      ]
    };
    if (compareBarChart) {
      compareBarChart.data = barData;
      compareBarChart.update('active');
    } else {
      compareBarChart = new Chart(barCtx, {
        type: 'bar',
        data: barData,
        options: {
          responsive: true,
          indexAxis: 'y',
          scales: {
            x: {
              min: 0, max: 10,
              grid: { color: gridColor },
              ticks: { color: textColor }
            },
            y: { grid: { display: false }, ticks: { color: textColor } }
          },
          plugins: {
            legend: {
              position: 'bottom',
              labels: { color: textColor, boxWidth: 12, font: { size: 12 } }
            }
          },
          animation: { duration: 500, easing: 'easeInOutQuart' }
        }
      });
    }
  }
}

export function initTpsChart() {
  const ctx = document.getElementById('tpsChart');
  if (!ctx) return;
  const { gridColor, textColor } = getChartDefaults();

  const algos = ALGO_ORDER.map(id => ALGORITHMS[id]);
  const labels = algos.map(a => a.acronym);
  const securityData = algos.map(a => a.metrics.security);
  const scalabilityData = algos.map(a => a.metrics.scalability);
  const decentralizationData = algos.map(a => a.metrics.decentralization);

  tpsChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [
        {
          label: 'Security',
          data: securityData,
          backgroundColor: 'rgba(108, 99, 255, 0.7)',
          borderColor: '#6c63ff',
          borderWidth: 2,
          borderRadius: 4
        },
        {
          label: 'Scalability',
          data: scalabilityData,
          backgroundColor: 'rgba(0, 212, 255, 0.7)',
          borderColor: '#00d4ff',
          borderWidth: 2,
          borderRadius: 4
        },
        {
          label: 'Decentralization',
          data: decentralizationData,
          backgroundColor: 'rgba(20, 241, 149, 0.7)',
          borderColor: '#14f195',
          borderWidth: 2,
          borderRadius: 4
        }
      ]
    },
    options: {
      responsive: true,
      scales: {
        x: {
          grid: { color: gridColor },
          ticks: { color: textColor, font: { size: 11 } }
        },
        y: {
          min: 0, max: 10,
          grid: { color: gridColor },
          ticks: { color: textColor }
        }
      },
      plugins: {
        legend: {
          position: 'bottom',
          labels: { color: textColor, boxWidth: 14, font: { size: 12 } }
        },
        tooltip: {
          backgroundColor: 'rgba(10,14,26,0.95)',
          titleColor: '#fff',
          bodyColor: '#9fa8da',
          borderColor: '#6c63ff',
          borderWidth: 1
        }
      },
      animation: { duration: 800, easing: 'easeInOutQuart' }
    }
  });
}

export function destroyCharts() {
  [radarChart, trilemmaChart, compareRadarChart, compareBarChart, tpsChart].forEach(c => {
    if (c) c.destroy();
  });
  radarChart = null; trilemmaChart = null;
  compareRadarChart = null; compareBarChart = null; tpsChart = null;
}

function hexToRgba(hex, alpha) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
