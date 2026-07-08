// ============================================================
// APP.JS — Main application controller
// ============================================================
import { ALGORITHMS, BLOCKCHAINS, SMART_CONTRACTS, LAYERS, ALGO_ORDER } from './data.js';
import { initTrilemmaChart, initCompareCharts, initTpsChart } from './charts.js';
import { initSimulator } from './simulator.js';
import { initQuiz } from './quiz.js';
import { initTimeline } from './timeline.js';
import { initFilters } from './filters.js';
import { initCompatibilityMatrix } from './compatibility.js';

// ─── GLOBAL STATE ──────────────────────────────────────────
let currentAlgo = 'pow';
let currentTheme = localStorage.getItem('theme') || 'dark';
let heroCanvas, heroCtx, heroNodes = [], heroLinks = [];

// ─── INIT ───────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  applyTheme(currentTheme);
  initScrollProgress();
  initNavbar();
  initHeroCanvas();
  renderFundamentals();
  renderConsensusProblems();
  renderConsensusWorkflow();
  initAlgoExplorer();
  renderBlockchainCards();
  renderSmartContractTable();
  renderLayerDiagram();
  initCompatibilityMatrix();
  initComparisonDashboard();
  initSimulator();
  initFilters();
  initTimeline();
  initQuiz();
  initScrollAnimations();
  initModal();
  initTpsChart();

  // Select default algo
  selectAlgo('pow');
});

// ─── THEME ──────────────────────────────────────────────────
function applyTheme(theme) {
  currentTheme = theme;
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  const btn = document.getElementById('theme-toggle');
  if (btn) btn.innerHTML = theme === 'dark' ? '☀️' : '🌙';
}

document.getElementById('theme-toggle')?.addEventListener('click', () => {
  applyTheme(currentTheme === 'dark' ? 'light' : 'dark');
});

// ─── SCROLL PROGRESS ────────────────────────────────────────
function initScrollProgress() {
  window.addEventListener('scroll', () => {
    const scrollTop = document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const pct = (scrollTop / docHeight) * 100;
    const bar = document.getElementById('scroll-progress');
    if (bar) bar.style.width = pct + '%';
  }, { passive: true });
}

// ─── NAVBAR ─────────────────────────────────────────────────
function initNavbar() {
  window.addEventListener('scroll', () => {
    const nav = document.querySelector('.navbar');
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });

  // Active nav link on scroll
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY + 100;
    sections.forEach(section => {
      if (section.offsetTop <= scrollY && section.offsetTop + section.offsetHeight > scrollY) {
        document.querySelectorAll('.nav-link').forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === '#' + section.id);
        });
      }
    });
  }, { passive: true });
}

// ─── HERO CANVAS ANIMATION ──────────────────────────────────
function initHeroCanvas() {
  heroCanvas = document.getElementById('hero-canvas');
  if (!heroCanvas) return;
  heroCtx = heroCanvas.getContext('2d');

  const resize = () => {
    heroCanvas.width = window.innerWidth;
    heroCanvas.height = window.innerHeight;
    createNodes();
  };

  const createNodes = () => {
    heroNodes = [];
    heroLinks = [];
    const count = Math.min(40, Math.floor(heroCanvas.width / 25));
    for (let i = 0; i < count; i++) {
      heroNodes.push({
        x: Math.random() * heroCanvas.width,
        y: Math.random() * heroCanvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        r: Math.random() * 3 + 2,
        pulse: Math.random() * Math.PI * 2
      });
    }
  };

  const animate = () => {
    heroCtx.clearRect(0, 0, heroCanvas.width, heroCanvas.height);
    const isDark = currentTheme === 'dark';
    const nodeColor = isDark ? 'rgba(108, 99, 255,' : 'rgba(108, 99, 255,';
    const linkColor = isDark ? 'rgba(108, 99, 255,' : 'rgba(108, 99, 255,';

    // Update and draw nodes
    heroNodes.forEach(n => {
      n.x += n.vx;
      n.y += n.vy;
      n.pulse += 0.05;

      if (n.x < 0 || n.x > heroCanvas.width) n.vx *= -1;
      if (n.y < 0 || n.y > heroCanvas.height) n.vy *= -1;

      const pulseR = n.r + Math.sin(n.pulse) * 1.5;
      const alpha = 0.4 + Math.sin(n.pulse) * 0.3;

      // Glow
      const grd = heroCtx.createRadialGradient(n.x, n.y, 0, n.x, n.y, pulseR * 4);
      grd.addColorStop(0, `${nodeColor}${alpha})`);
      grd.addColorStop(1, `${nodeColor}0)`);
      heroCtx.beginPath();
      heroCtx.arc(n.x, n.y, pulseR * 4, 0, Math.PI * 2);
      heroCtx.fillStyle = grd;
      heroCtx.fill();

      // Node
      heroCtx.beginPath();
      heroCtx.arc(n.x, n.y, pulseR, 0, Math.PI * 2);
      heroCtx.fillStyle = `${nodeColor}${alpha + 0.2})`;
      heroCtx.fill();
    });

    // Draw links between close nodes
    for (let i = 0; i < heroNodes.length; i++) {
      for (let j = i + 1; j < heroNodes.length; j++) {
        const dx = heroNodes[i].x - heroNodes[j].x;
        const dy = heroNodes[i].y - heroNodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 150;

        if (dist < maxDist) {
          const alpha = (1 - dist / maxDist) * 0.3;
          heroCtx.beginPath();
          heroCtx.moveTo(heroNodes[i].x, heroNodes[i].y);
          heroCtx.lineTo(heroNodes[j].x, heroNodes[j].y);
          heroCtx.strokeStyle = `${linkColor}${alpha})`;
          heroCtx.lineWidth = 1;
          heroCtx.stroke();
        }
      }
    }

    requestAnimationFrame(animate);
  };

  window.addEventListener('resize', resize);
  resize();
  animate();
}

// ─── BLOCKCHAIN FUNDAMENTALS ─────────────────────────────────
function renderFundamentals() {
  const grid = document.getElementById('fundamentals-grid');
  if (!grid) return;

  const concepts = [
    { icon: '🔗', name: 'Blockchain', desc: 'A distributed, immutable ledger of cryptographically linked blocks containing transaction records.' },
    { icon: '📒', name: 'Distributed Ledger', desc: 'A database shared and synchronized across multiple nodes, locations, and institutions simultaneously.' },
    { icon: '📦', name: 'Block', desc: 'A container holding a set of validated transactions, a timestamp, previous block hash, and nonce.' },
    { icon: '💸', name: 'Transaction', desc: 'A signed instruction to transfer assets or execute a smart contract, broadcast to the P2P network.' },
    { icon: '🌐', name: 'Nodes', desc: 'Individual computers that participate in the blockchain network, storing and validating the blockchain.' },
    { icon: '✅', name: 'Validators', desc: 'Special nodes that participate in consensus by verifying and attesting to new blocks (PoS networks).' },
    { icon: '⛏️', name: 'Miners', desc: 'Nodes that compete to solve cryptographic puzzles (PoW) to earn the right to create new blocks.' },
    { icon: '🔐', name: 'Hash', desc: 'A fixed-length fingerprint of data produced by a one-way cryptographic function (e.g., SHA-256).' },
    { icon: '⛓️', name: 'Previous Hash', desc: 'Each block stores the hash of the preceding block, creating an immutable chain — any alteration breaks all subsequent hashes.' },
    { icon: '✍️', name: 'Digital Signature', desc: 'A cryptographic proof using asymmetric key pairs that authenticates the origin and integrity of a transaction.' },
    { icon: '🔓', name: 'Public Key', desc: 'Your blockchain address — shared publicly so others can send you funds or verify your signatures.' },
    { icon: '🔒', name: 'Private Key', desc: 'Your secret cryptographic key that authorizes transactions. Never share it — losing it means losing access.' }
  ];

  grid.innerHTML = concepts.map((c, i) => `
    <div class="concept-card animate-on-scroll delay-${(i % 5) + 1}">
      <div class="concept-icon">${c.icon}</div>
      <h4>${c.name}</h4>
      <p>${c.desc}</p>
    </div>
  `).join('');
}

// ─── CONSENSUS PROBLEMS ────────────────────────────────────
function renderConsensusProblems() {
  const grid = document.getElementById('consensus-problems-grid');
  if (!grid) return;

  const problems = [
    {
      icon: '🔒',
      title: 'Double-Spending Prevention',
      desc: 'Prevents the same digital asset from being spent more than once across the network.'
    },
    {
      icon: '🌐',
      title: 'Sybil Attack Resistance',
      desc: 'Stops attackers from creating many fake identities to overwhelm honest participants.'
    },
    {
      icon: '🛡️',
      title: 'Byzantine Fault Tolerance',
      desc: 'Keeps the network reliable even when some nodes behave maliciously or fail unpredictably.'
    },
    {
      icon: '📋',
      title: 'Fork Resolution',
      desc: 'Chooses the canonical chain when competing blocks or temporary forks appear.'
    },
    {
      icon: '🔄',
      title: 'Transaction Ordering',
      desc: 'Establishes a consistent order for conflicting transactions across all nodes.'
    }
  ];

  grid.innerHTML = problems.map((problem, index) => `
    <article class="consensus-problem-card animate-on-scroll delay-${(index % 5) + 1}">
      <div class="consensus-problem-icon">${problem.icon}</div>
      <div>
        <h5 class="consensus-problem-title">${problem.title}</h5>
        <p class="consensus-problem-desc">${problem.desc}</p>
      </div>
    </article>
  `).join('');
}

// ─── CONSENSUS WORKFLOW ──────────────────────────────────────
function renderConsensusWorkflow() {
  const container = document.getElementById('consensus-workflow');
  if (!container) return;

  const steps = [
    { icon: '👤', label: 'User' },
    { icon: '💸', label: 'Transaction' },
    { icon: '📡', label: 'Broadcast' },
    { icon: '🔍', label: 'Validation' },
    { icon: '🤝', label: 'Consensus' },
    { icon: '📦', label: 'Block Created' },
    { icon: '🔗', label: 'Blockchain' }
  ];

  container.innerHTML = `
    <div class="blockchain-workflow">
      ${steps.map((s, i) => `
        <div class="workflow-block">
          <div class="icon">${s.icon}</div>
          <div class="label">${s.label}</div>
        </div>
        ${i < steps.length - 1 ? '<span class="workflow-arrow">➡️</span>' : ''}
      `).join('')}
    </div>
  `;
}

// ─── ALGO EXPLORER ───────────────────────────────────────────
function initAlgoExplorer() {
  const pills = document.getElementById('algo-pills');
  if (!pills) return;

  pills.innerHTML = ALGO_ORDER.map(id => {
    const algo = ALGORITHMS[id];
    return `
      <button class="algo-pill ${id === 'pow' ? 'active' : ''}" 
              data-algo="${id}" 
              id="pill-${id}"
              onclick="window.selectAlgo('${id}')">
        ${algo.icon} ${algo.acronym}
      </button>
    `;
  }).join('');

  window.selectAlgo = selectAlgo;
}

export function selectAlgo(algoId) {
  currentAlgo = algoId;
  const algo = ALGORITHMS[algoId];
  if (!algo) return;

  // Update pills
  document.querySelectorAll('.algo-pill').forEach(p => {
    p.classList.toggle('active', p.dataset.algo === algoId);
  });

  renderAlgoDetail(algo);
  renderBlockchainCards(algoId);
  initTrilemmaChart(algoId);
  updateTrilemmaScores(algo);
}

window.selectAlgo = selectAlgo;

function renderAlgoDetail(algo) {
  const panel = document.getElementById('algo-detail-panel');
  if (!panel) return;

  panel.innerHTML = `
    <!-- Header Card -->
    <div class="algo-header-card" style="border-left-color: ${algo.color};">
      <div class="algo-icon-large" style="background: ${algo.gradient}; box-shadow: 0 8px 24px ${algo.color}44;">
        ${algo.icon}
      </div>
      <div class="algo-meta">
        <div class="algo-name">${algo.name}</div>
        <div class="algo-acronym">${algo.acronym} — Consensus Algorithm</div>
        <div class="algo-description">${algo.overview}</div>
        <div class="algo-badges">
          <span class="algo-badge" style="color: ${algo.color}; border-color: ${algo.color}44; background: ${algo.color}11;">
            ⚡ ${algo.metrics.tps} TPS
          </span>
          <span class="algo-badge">⏱️ ${algo.metrics.blockTime}</span>
          <span class="algo-badge">🏁 ${algo.metrics.finality}</span>
          <span class="algo-badge">🔋 ${algo.metrics.energy}</span>
          <span class="algo-badge">👥 ${algo.metrics.participation}</span>
        </div>
      </div>
    </div>

    <!-- Metrics -->
    <div class="glass-card" style="padding: 1.5rem;">
      <div class="steps-title">📊 Performance Metrics</div>
      <div class="metrics-grid">
        <div class="metric-item">
          <span class="metric-value" style="background: ${algo.gradient}; -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">${algo.metrics.security}/10</span>
          <span class="metric-label">Security</span>
        </div>
        <div class="metric-item">
          <span class="metric-value" style="background: ${algo.gradient}; -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">${algo.metrics.scalability}/10</span>
          <span class="metric-label">Scalability</span>
        </div>
        <div class="metric-item">
          <span class="metric-value" style="background: ${algo.gradient}; -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">${algo.metrics.decentralization}/10</span>
          <span class="metric-label">Decentralization</span>
        </div>
      </div>
      <div class="divider"></div>
      <div style="margin-top: 1rem;">
        <div style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 0.75rem; font-weight: 600;">Real-world Applications</div>
        <div style="display: flex; flex-wrap: wrap; gap: 0.4rem;">
          ${algo.apps.map(app => `
            <span style="background: var(--glass-bg); border: var(--glass-border); border-radius: 9999px; padding: 0.2rem 0.6rem; font-size: 0.75rem; color: var(--text-secondary);">${app}</span>
          `).join('')}
        </div>
      </div>
    </div>

    <!-- Steps -->
    <div class="steps-card">
      <div class="steps-title">⚙️ How It Works — Step by Step</div>
      ${algo.steps.map((step, i) => `
        <div class="step-item">
          <div class="step-number">${i + 1}</div>
          <div class="step-text">${step}</div>
        </div>
      `).join('')}
    </div>

    <!-- Pros & Cons -->
    <div class="pros-cons-card">
      <div style="margin-bottom: 1.25rem;">
        <div class="steps-title" style="color: var(--success);">✅ Advantages</div>
        <div class="pros-list">
          ${algo.advantages.map(a => `<div class="item">${a}</div>`).join('')}
        </div>
      </div>
      <div class="divider"></div>
      <div>
        <div class="steps-title" style="color: var(--danger);">❌ Disadvantages</div>
        <div class="cons-list">
          ${algo.disadvantages.map(d => `<div class="item">${d}</div>`).join('')}
        </div>
      </div>
    </div>

    <!-- Why It Exists -->
    <div class="glass-card" style="padding: 1.5rem; grid-column: 1 / -1;">
      <div class="steps-title">💡 Why ${algo.acronym} Was Created</div>
      <p style="color: var(--text-secondary); line-height: 1.8; font-size: 0.95rem;">${algo.whyExists}</p>
      <div style="margin-top: 1rem; padding: 1rem; background: ${algo.color}11; border: 1px solid ${algo.color}33; border-radius: var(--radius-md);">
        <div style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 0.5rem;">Core Mechanism</div>
        <p style="color: var(--text-secondary); font-size: 0.875rem; line-height: 1.7; margin: 0;">${algo.mechanism}</p>
      </div>
    </div>
  `;

  panel.querySelectorAll('.glass-card, .steps-card, .pros-cons-card, .algo-header-card').forEach(el => {
    el.style.animation = 'fadeInUp 0.4s ease forwards';
  });
}

// ─── TRILEMMA SCORES ────────────────────────────────────────
function updateTrilemmaScores(algo) {
  const dims = [
    { id: 'score-security', key: 'security', label: 'Security' },
    { id: 'score-scalability', key: 'scalability', label: 'Scalability' },
    { id: 'score-decentralization', key: 'decentralization', label: 'Decentralization' }
  ];

  dims.forEach(dim => {
    const card = document.getElementById(dim.id);
    if (!card) return;
    const val = algo.metrics[dim.key];
    const pct = (val / 10) * 100;
    card.innerHTML = `
      <div class="score-name">${dim.label}</div>
      <div class="score-bar-wrapper">
        <div style="height: 8px; background: var(--glass-bg); border-radius: 9999px; overflow: hidden; margin-bottom: 0.25rem;">
          <div style="height: 100%; border-radius: 9999px; background: ${algo.gradient}; width: 0%; transition: width 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);" 
               data-width="${pct}%"
               class="score-bar-animated">
          </div>
        </div>
        <div style="display: flex; justify-content: space-between; font-size: 0.7rem; color: var(--text-muted);">
          <span>${val}/10</span>
          <span>${pct}%</span>
        </div>
      </div>
    `;
    // Animate bar
    requestAnimationFrame(() => {
      const bar = card.querySelector('.score-bar-animated');
      if (bar) setTimeout(() => { bar.style.width = bar.dataset.width; }, 50);
    });
  });

  // Update TPS/finality summary
  const summaryEl = document.getElementById('trilemma-summary');
  if (summaryEl) {
    summaryEl.innerHTML = `
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 0.75rem; margin-top: 1.5rem;">
        <div class="metric-item"><span class="metric-value">${algo.metrics.tps}</span><span class="metric-label">TPS</span></div>
        <div class="metric-item"><span class="metric-value">${algo.metrics.blockTime}</span><span class="metric-label">Block Time</span></div>
        <div class="metric-item"><span class="metric-value">${algo.metrics.finality}</span><span class="metric-label">Finality</span></div>
        <div class="metric-item"><span class="metric-value">${algo.metrics.energy}</span><span class="metric-label">Energy</span></div>
      </div>
    `;
  }
}

// ─── BLOCKCHAIN CARDS ────────────────────────────────────────
function renderBlockchainCards(filterAlgo) {
  const grid = document.getElementById('bc-cards-grid');
  if (!grid) return;

  const chains = filterAlgo
    ? BLOCKCHAINS.filter(bc => bc.consensus === filterAlgo || bc.consensus.startsWith(filterAlgo))
    : BLOCKCHAINS;

  if (chains.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 3rem; color: var(--text-muted);">
        <div style="font-size: 2.5rem; margin-bottom: 1rem;">🔍</div>
        <p>No blockchains found for this consensus algorithm in our database.</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = chains.map(bc => {
    const algo = ALGORITHMS[bc.consensus];
    const color = algo?.color || '#6c63ff';
    const gradient = algo?.gradient || 'var(--grad-primary)';

    return `
      <div class="bc-card animate-on-scroll visible" style="border-top: 3px solid ${color};">
        <div class="card-glow" style="background: ${color};"></div>
        <div class="bc-card-header">
          <div class="bc-logo" style="background: ${gradient};">${bc.logo}</div>
          <div>
            <div class="bc-name">${bc.name}</div>
            <div class="bc-ticker">${bc.ticker} · Layer ${bc.layer}</div>
          </div>
          <div style="margin-left: auto; text-align: right;">
            <div style="font-size: 0.7rem; color: var(--text-muted);">Since</div>
            <div style="font-weight: 700; color: var(--text-heading);">${bc.year}</div>
          </div>
        </div>
        <div class="bc-info-grid">
          <div class="bc-info-item">
            <div class="bc-info-label">Consensus</div>
            <div class="bc-info-value" style="color: ${color};">${bc.consensusLabel}</div>
          </div>
          <div class="bc-info-item">
            <div class="bc-info-label">Founder</div>
            <div class="bc-info-value">${bc.founder.split(' ').slice(0,2).join(' ')}</div>
          </div>
          <div class="bc-info-item">
            <div class="bc-info-label">Block Time</div>
            <div class="bc-info-value">${bc.blockTime}</div>
          </div>
          <div class="bc-info-item">
            <div class="bc-info-label">TPS</div>
            <div class="bc-info-value">${bc.tps}</div>
          </div>
          <div class="bc-info-item">
            <div class="bc-info-label">Smart Contract</div>
            <div class="bc-info-value">${bc.language}</div>
          </div>
          <div class="bc-info-item">
            <div class="bc-info-label">Use Case</div>
            <div class="bc-info-value">${bc.useCase.split(',')[0]}</div>
          </div>
        </div>
        <div class="bc-use-case">
          <strong>Why ${bc.consensusLabel.split(' ').slice(0,3).join(' ')}?</strong> ${bc.suitability.substring(0, 120)}...
        </div>
      </div>
    `;
  }).join('');
}

// ─── SMART CONTRACT TABLE ─────────────────────────────────────
function renderSmartContractTable() {
  const wrapper = document.getElementById('sc-table-wrapper');
  if (!wrapper) return;

  wrapper.innerHTML = `
    <div class="sc-table-wrapper">
      <table class="sc-table">
        <thead>
          <tr>
            <th>⛓️ Blockchain</th>
            <th>🤝 Consensus</th>
            <th>📝 Language(s)</th>
            <th>⚙️ Compiler</th>
            <th>🖥️ Virtual Machine</th>
          </tr>
        </thead>
        <tbody>
          ${SMART_CONTRACTS.map(row => `
            <tr>
              <td><strong style="color: var(--text-heading);">${row.blockchain}</strong></td>
              <td><span style="color: var(--primary-light); font-size: 0.8rem; font-weight: 600;">${row.consensus}</span></td>
              <td>
                ${row.languages.map(l => `<span class="lang-badge">${l}</span>`).join(' ')}
              </td>
              <td style="font-size: 0.8rem;">${row.compiler}</td>
              <td style="font-size: 0.8rem; font-family: monospace;">${row.vm}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;
}

// ─── LAYER DIAGRAM ──────────────────────────────────────────
function renderLayerDiagram() {
  const container = document.getElementById('layer-diagram');
  if (!container) return;

  const layerOrder = [3, 2, 1, 0];
  const layerColors = { 0: '#ec4899', 1: '#6c63ff', 2: '#00d4ff', 3: '#14f195' };

  container.innerHTML = layerOrder.map(lNum => {
    const layer = LAYERS[lNum];
    const color = layerColors[lNum];
    return `
      <div class="layer-item layer-${lNum}" onclick="window.toggleLayerDetail(${lNum})" id="layer-${lNum}">
        <div class="layer-header">
          <span class="layer-label" style="color: ${color};">${layer.label}</span>
          <span class="layer-purpose" style="color: ${color}88;">${layer.purpose}</span>
        </div>
        <p style="color: var(--text-secondary); font-size: 0.875rem; margin: 0.5rem 0; line-height: 1.6;">${layer.description}</p>
        <div class="layer-chains">
          ${layer.examples.map(ex => `
            <span class="layer-chain-badge" style="border-color: ${color}33; color: ${color}cc;"
                  title="${ex.desc}">
              ${ex.icon} ${ex.name}
            </span>
          `).join('')}
        </div>
      </div>
    `;
  }).join('');

  window.toggleLayerDetail = (lNum) => {
    const el = document.getElementById(`layer-${lNum}`);
    if (el) el.classList.toggle('active');
  };
}

// ─── COMPARISON DASHBOARD ────────────────────────────────────
function initComparisonDashboard() {
  const sel1 = document.getElementById('compare-sel-1');
  const sel2 = document.getElementById('compare-sel-2');

  if (!sel1 || !sel2) return;

  ALGO_ORDER.forEach(id => {
    const algo = ALGORITHMS[id];
    const opt1 = document.createElement('option');
    const opt2 = document.createElement('option');
    opt1.value = opt2.value = id;
    opt1.textContent = opt2.textContent = `${algo.icon} ${algo.name} (${algo.acronym})`;
    sel1.appendChild(opt1.cloneNode(true));
    sel2.appendChild(opt2);
  });

  sel1.value = 'pow';
  sel2.value = 'pos';

  const updateComparison = () => {
    const a1 = sel1.value;
    const a2 = sel2.value;
    initCompareCharts(a1, a2);
    renderCompareCards(a1, a2);
  };

  sel1.addEventListener('change', updateComparison);
  sel2.addEventListener('change', updateComparison);

  updateComparison();
}

function renderCompareCards(a1Id, a2Id) {
  const container = document.getElementById('compare-cards');
  if (!container) return;

  const a1 = ALGORITHMS[a1Id];
  const a2 = ALGORITHMS[a2Id];

  const compareFields = [
    { label: 'Security', k: 'security', suffix: '/10' },
    { label: 'Scalability', k: 'scalability', suffix: '/10' },
    { label: 'Decentralization', k: 'decentralization', suffix: '/10' },
    { label: 'Energy', k: 'energy', suffix: '' },
    { label: 'TPS', k: 'tps', suffix: '' },
    { label: 'Block Time', k: 'blockTime', suffix: '' },
    { label: 'Finality', k: 'finality', suffix: '' },
    { label: 'Participants', k: 'participation', suffix: '' }
  ];

  container.innerHTML = `
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-top: 1.5rem;">
      <div class="glass-card" style="border-top: 3px solid ${a1.color};">
        <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1.25rem;">
          <div style="width: 52px; height: 52px; border-radius: 0.75rem; background: ${a1.gradient}; display: flex; align-items: center; justify-content: center; font-size: 1.75rem;">
            ${a1.icon}
          </div>
          <div>
            <div style="font-size: 1.1rem; font-weight: 800; color: var(--text-heading);">${a1.name}</div>
            <div style="font-size: 0.8rem; color: ${a1.color}; font-weight: 600;">${a1.acronym}</div>
          </div>
        </div>
        ${compareFields.map(f => `
          <div style="display: flex; justify-content: space-between; padding: 0.5rem 0; border-bottom: 1px solid rgba(255,255,255,0.05); font-size: 0.875rem;">
            <span style="color: var(--text-muted);">${f.label}</span>
            <span style="color: var(--text-heading); font-weight: 600;">${a1.metrics[f.k]}${f.suffix}</span>
          </div>
        `).join('')}
      </div>

      <div class="glass-card" style="border-top: 3px solid ${a2.color};">
        <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1.25rem;">
          <div style="width: 52px; height: 52px; border-radius: 0.75rem; background: ${a2.gradient}; display: flex; align-items: center; justify-content: center; font-size: 1.75rem;">
            ${a2.icon}
          </div>
          <div>
            <div style="font-size: 1.1rem; font-weight: 800; color: var(--text-heading);">${a2.name}</div>
            <div style="font-size: 0.8rem; color: ${a2.color}; font-weight: 600;">${a2.acronym}</div>
          </div>
        </div>
        ${compareFields.map(f => `
          <div style="display: flex; justify-content: space-between; padding: 0.5rem 0; border-bottom: 1px solid rgba(255,255,255,0.05); font-size: 0.875rem;">
            <span style="color: var(--text-muted);">${f.label}</span>
            <span style="color: var(--text-heading); font-weight: 600;">${a2.metrics[f.k]}${f.suffix}</span>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

// ─── SCROLL ANIMATIONS ───────────────────────────────────────
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
}

// ─── MODAL ──────────────────────────────────────────────────
function initModal() {
  const overlay = document.getElementById('modal-overlay');
  if (!overlay) return;

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeModal();
  });

  window.closeModal = () => {
    overlay.classList.remove('show');
    document.body.style.overflow = '';
  };

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
}
