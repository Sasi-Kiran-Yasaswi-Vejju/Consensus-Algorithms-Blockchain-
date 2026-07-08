// ============================================================
// SIMULATOR.JS — Consensus process animation engine
// ============================================================

const SIMULATIONS = {
  pow: {
    name: 'Proof of Work',
    steps: [
      { icon: '📋', name: 'Transaction', desc: 'User submits a signed transaction to the network mempool.' },
      { icon: '⛏️', name: 'Miners Compete', desc: 'Thousands of miners worldwide begin hashing the block header simultaneously.' },
      { icon: '🔢', name: 'Nonce Search', desc: 'Each miner increments the nonce field and computes SHA-256(SHA-256(header)) billions of times.' },
      { icon: '🎯', name: 'Puzzle Solved', desc: 'One lucky miner finds a hash below the difficulty target. Probability: ~1 in quadrillions per attempt.' },
      { icon: '📡', name: 'Broadcast', desc: 'The winning miner immediately broadcasts the solved block to all network peers.' },
      { icon: '✅', name: 'Verification', desc: 'Every full node verifies the proof in milliseconds by hashing the block once themselves.' },
      { icon: '🔗', name: 'Block Added', desc: 'Valid block is appended to the longest chain. Nodes begin working on the next block.' },
      { icon: '🏆', name: 'Reward Paid', desc: 'Winner receives 3.125 BTC block subsidy + transaction fees. Next round begins.' }
    ],
    logs: [
      '⛏️ 642 exahash/sec of global mining power activated...',
      '🔢 Nonce iteration: 0x00000000 → 0xFFFFFFFF...',
      '💻 Mining pool #1 attempts: 2.4 trillion hashes/sec',
      '💻 Mining pool #2 attempts: 1.8 trillion hashes/sec',
      '⚡ Block found! Hash: 0x0000000000000000000a3e2c...',
      '📡 Block #850,342 broadcast to 15,000+ nodes',
      '✅ Verification passed by 14,892 full nodes',
      '🔗 Block #850,342 confirmed at height 850,342',
      '🏆 Block reward: 3.125 BTC + 0.23 BTC fees = 3.355 BTC'
    ]
  },
  pos: {
    name: 'Proof of Stake',
    steps: [
      { icon: '📋', name: 'Transaction', desc: 'User broadcasts a signed Ethereum transaction to the P2P network.' },
      { icon: '🔒', name: 'Validators Stake', desc: '500,000+ validators have staked ≥32 ETH as collateral in the deposit contract.' },
      { icon: '🎲', name: 'Proposer Selected', desc: 'RANDAO beacon selects one validator pseudo-randomly, weighted by effective stake (32 ETH each).' },
      { icon: '📦', name: 'Block Proposed', desc: 'The selected proposer bundles ~300 transactions and broadcasts the block.' },
      { icon: '🗳️', name: 'Committee Votes', desc: 'An attestation committee of ~128 validators votes on the proposed block.' },
      { icon: '🔏', name: 'BLS Aggregation', desc: 'Attestations are aggregated using BLS signatures into a compact proof.' },
      { icon: '⚓', name: 'Finalization', desc: 'After 2 epochs (~12.8 min), Casper FFG finalizes the block. Irreversible.' },
      { icon: '🏆', name: 'Rewards', desc: 'Proposer gets priority fee. Attesters earn consensus layer rewards (~4% APR).' }
    ],
    logs: [
      '🔒 Active validators: 1,032,891 (32+ ETH staked each)',
      '🎲 RANDAO epoch mix computed: 0x7f3c9e...',
      '✨ Proposer selected: Validator #489,221',
      '📦 Slot 9,543,201 block proposed with 312 txs',
      '🗳️ Attestation committee #47 voting (128 validators)',
      '✅ Attestation threshold reached: 127/128 votes',
      '🔏 BLS aggregate signature verified in 3ms',
      '⚓ Checkpoint finalized: epoch 297,600',
      '🏆 Rewards distributed: 0.0024 ETH to proposer'
    ]
  },
  dpos: {
    name: 'Delegated Proof of Stake',
    steps: [
      { icon: '📋', name: 'Transaction', desc: 'User submits a transaction. It enters the block producer\'s transaction queue.' },
      { icon: '🗳️', name: 'Election', desc: 'Token holders have voted for their preferred block producers. Top 21 are currently active.' },
      { icon: '📅', name: 'Schedule', desc: 'The 21 active BPs follow a deterministic round-robin schedule. Each BP gets 0.5 seconds.' },
      { icon: '📦', name: 'BP Produces Block', desc: 'Scheduled BP #7 (EOS Nation) packages transactions and produces a block in 0.5 sec.' },
      { icon: '📡', name: 'Broadcast', desc: 'Block is broadcast instantly to all other 20 active block producers.' },
      { icon: '✅', name: 'Validation', desc: 'Other BPs verify the block signature and transaction validity.' },
      { icon: '🔗', name: 'Irreversibility', desc: 'After 15/21 BPs have signed subsequent blocks, the block becomes irreversible.' },
      { icon: '🔄', name: 'Next Round', desc: 'Next BP in schedule steps up. The rotation completes every 10.5 seconds.' }
    ],
    logs: [
      '🗳️ Active BPs: EOS Nation, Greymass, ENF... (21 total)',
      '📅 Block schedule: Round 447,821',
      '✨ Current turn: BP #7 (EOS Nation)',
      '📦 Block #300,562,000 produced with 1,847 txs',
      '⚡ Block time: 0.5 seconds (on schedule)',
      '📡 Block relayed to 20 other BPs in <100ms',
      '✅ 20/20 other BPs validated the block',
      '🔗 Block #300,562,000 marked irreversible after 15 BPs',
      '🔄 Next BP: Greymass (#8 in schedule)'
    ]
  },
  pbft: {
    name: 'Practical Byzantine Fault Tolerance',
    steps: [
      { icon: '📋', name: 'Client Request', desc: 'Client sends a transaction request to the primary (leader) node.' },
      { icon: '👑', name: 'Leader Pre-prepare', desc: 'Primary assigns sequence number 1024 and broadcasts PRE-PREPARE to all replicas.' },
      { icon: '📢', name: 'Prepare Phase', desc: 'Each node that accepts the pre-prepare broadcasts PREPARE message to all other nodes.' },
      { icon: '📊', name: 'Prepare Threshold', desc: 'Each node waits for 2f+1 matching PREPARE messages (e.g., 67 of 100 nodes).' },
      { icon: '🤝', name: 'Commit Phase', desc: 'Nodes with sufficient PREPAREs broadcast COMMIT message to all other nodes.' },
      { icon: '✅', name: 'Execute', desc: 'After 2f+1 COMMITs, nodes execute the request and update state.' },
      { icon: '📤', name: 'Reply', desc: 'Each node sends a REPLY to the client. Client accepts after f+1 matching replies.' },
      { icon: '⚡', name: 'Instant Finality', desc: 'Block is finalized. No forks possible. Result is irreversible immediately.' }
    ],
    logs: [
      '👑 Primary node (Leader): Node #1',
      '📤 PRE-PREPARE[seq=1024] broadcast to 99 replicas',
      '📢 PREPARE[seq=1024] messages flying between all 100 nodes...',
      '📊 Node #5: Collected 72/100 PREPARE messages (threshold: 67)',
      '🤝 COMMIT[seq=1024] broadcast from 72 nodes',
      '✅ Node #5: Collected 74/100 COMMIT messages — EXECUTE',
      '📤 REPLY sent to client: "Transaction executed"',
      '⚡ Finality achieved in 120ms (network round-trip × 3 phases)',
      '🛡️ Byzantine tolerance: up to 33 malicious nodes tolerated'
    ]
  },
  poa: {
    name: 'Proof of Authority',
    steps: [
      { icon: '🆔', name: 'Identity Verified', desc: 'Each validator has undergone KYC — their real-world identity is publicly known.' },
      { icon: '📋', name: 'Transaction', desc: 'Enterprise transaction arrives (e.g., product shipment confirmation for VeChain).' },
      { icon: '📅', name: 'Schedule', desc: 'Authority Masternode #42 (Walmart Supply Chain) is scheduled to produce this block.' },
      { icon: '📦', name: 'Block Produced', desc: 'The scheduled authority node creates and signs the block with their verified identity.' },
      { icon: '📡', name: 'Broadcast', desc: 'Signed block broadcast to all other Authority Masternodes for validation.' },
      { icon: '✅', name: 'Peer Validation', desc: 'Other known authorities verify the signature — identity check passes.' },
      { icon: '🔗', name: 'Block Finalized', desc: 'Block finalized and added to chain. Immediate finality, no forks.' },
      { icon: '📊', name: 'Audit Trail', desc: 'Transaction permanently recorded with validator\'s verified identity — fully auditable.' }
    ],
    logs: [
      '🆔 Authority set: 101 verified Masternodes (VeChain Foundation)',
      '📋 Enterprise TX: Walmart product #VIN-2847 scanned at distribution center',
      '📅 Scheduled authority: MN #42 (Verified: Walmart Inc.)',
      '📦 Block #18,500,721 produced with 456 IoT transactions',
      '📡 Block signed with Walmart MN #42 identity certificate',
      '✅ Signature verified by 100 other Masternodes in <50ms',
      '🔗 Block finalized: 10 sec block time achieved',
      '📊 Supply chain record sealed: immutable & auditable'
    ]
  }
};

let simInterval = null;
let currentStep = -1;
let simSteps = [];
let isSimRunning = false;
let currentSimAlgo = 'pow';

export function initSimulator() {
  renderSimAlgoSelector();
  selectSimAlgo('pow');

  document.getElementById('sim-start')?.addEventListener('click', startSim);
  document.getElementById('sim-pause')?.addEventListener('click', togglePause);
  document.getElementById('sim-reset')?.addEventListener('click', resetSim);
  document.getElementById('sim-step')?.addEventListener('click', stepSim);
}

function renderSimAlgoSelector() {
  const container = document.getElementById('sim-algo-selector');
  if (!container) return;

  const algos = [
    { id: 'pow', label: '⛏️ PoW' },
    { id: 'pos', label: '🪙 PoS' },
    { id: 'dpos', label: '🗳️ DPoS' },
    { id: 'pbft', label: '🛡️ PBFT' },
    { id: 'poa', label: '🏛️ PoA' }
  ];

  container.innerHTML = algos.map(a => `
    <button class="sim-pill ${a.id === 'pow' ? 'active' : ''}" 
            data-sim="${a.id}" 
            onclick="window.selectSimAlgo('${a.id}')">
      ${a.label}
    </button>
  `).join('');
}

export function selectSimAlgo(algoId) {
  resetSim();
  currentSimAlgo = algoId;

  // Update pills
  document.querySelectorAll('.sim-pill').forEach(p => {
    p.classList.toggle('active', p.dataset.sim === algoId);
  });

  const sim = SIMULATIONS[algoId];
  if (!sim) return;

  simSteps = sim.steps;
  renderSimSteps();
  clearSimLog();
  addSimLog(`🚀 ${sim.name} simulator loaded. Click "Start" to begin.`, 'active');
}

window.selectSimAlgo = selectSimAlgo;

function renderSimSteps() {
  const container = document.getElementById('sim-stage');
  if (!container) return;

  const arrows = simSteps.map((step, i) => {
    const arrow = i < simSteps.length - 1 ? '<span class="sim-arrow">→</span>' : '';
    return `
      <div class="sim-step" id="sim-step-${i}">
        <span class="step-icon">${step.icon}</span>
        <span class="step-name">${step.name}</span>
      </div>${arrow}
    `;
  }).join('');

  container.innerHTML = arrows;
}

function startSim() {
  if (isSimRunning) return;
  isSimRunning = true;
  currentStep = -1;

  resetStepStyles();

  const sim = SIMULATIONS[currentSimAlgo];
  clearSimLog();
  addSimLog(`▶ Starting ${sim.name} simulation...`, 'active');

  document.getElementById('sim-start').disabled = true;
  document.getElementById('sim-pause').disabled = false;

  runNextStep();
  simInterval = setInterval(() => {
    if (currentStep < simSteps.length - 1) {
      runNextStep();
    } else {
      stopSim();
    }
  }, 1800);
}

function runNextStep() {
  currentStep++;
  if (currentStep >= simSteps.length) return stopSim();

  const stepEl = document.getElementById(`sim-step-${currentStep}`);
  if (!stepEl) return;

  // Mark previous as completed
  if (currentStep > 0) {
    const prev = document.getElementById(`sim-step-${currentStep - 1}`);
    if (prev) { prev.classList.remove('active'); prev.classList.add('completed'); }
  }

  stepEl.classList.add('active');
  stepEl.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });

  const step = simSteps[currentStep];
  const sim = SIMULATIONS[currentSimAlgo];
  const logMsg = sim.logs[currentStep] || `${step.icon} ${step.desc}`;
  addSimLog(logMsg, 'active');

  // Update step description
  const descEl = document.getElementById('sim-step-desc');
  if (descEl) {
    descEl.innerHTML = `<strong>${step.icon} ${step.name}:</strong> ${step.desc}`;
    descEl.style.opacity = '0';
    setTimeout(() => { descEl.style.opacity = '1'; }, 50);
  }

  if (currentStep === simSteps.length - 1) {
    stopSim();
    addSimLog('✅ Simulation complete! All steps executed successfully.', 'success');
  }
}

let isPaused = false;

function togglePause() {
  if (!isSimRunning) return;
  const btn = document.getElementById('sim-pause');
  if (isPaused) {
    // Resume
    isPaused = false;
    btn.innerHTML = '<i class="fas fa-pause me-1"></i>Pause';
    simInterval = setInterval(() => {
      if (currentStep < simSteps.length - 1) runNextStep();
      else stopSim();
    }, 1800);
    addSimLog('▶ Simulation resumed.', 'active');
  } else {
    // Pause
    isPaused = true;
    clearInterval(simInterval);
    btn.innerHTML = '<i class="fas fa-play me-1"></i>Resume';
    addSimLog('⏸ Simulation paused.', '');
  }
}

function stepSim() {
  if (isSimRunning && !isPaused) return;
  if (currentStep >= simSteps.length - 1) resetSim();
  if (!isSimRunning) {
    isSimRunning = true;
    clearSimLog();
    document.getElementById('sim-start').disabled = true;
    document.getElementById('sim-pause').disabled = false;
  }
  clearInterval(simInterval);
  isPaused = true;
  runNextStep();
}

function stopSim() {
  clearInterval(simInterval);
  isSimRunning = false;
  isPaused = false;

  const btn = document.getElementById('sim-pause');
  if (btn) btn.innerHTML = '<i class="fas fa-pause me-1"></i>Pause';
  const startBtn = document.getElementById('sim-start');
  if (startBtn) { startBtn.disabled = false; }
  const pauseBtn = document.getElementById('sim-pause');
  if (pauseBtn) { pauseBtn.disabled = true; }

  // Mark last step as completed
  const lastStep = document.getElementById(`sim-step-${simSteps.length - 1}`);
  if (lastStep) { lastStep.classList.remove('active'); lastStep.classList.add('completed'); }
}

function resetSim() {
  clearInterval(simInterval);
  simInterval = null;
  isSimRunning = false;
  isPaused = false;
  currentStep = -1;
  resetStepStyles();

  const startBtn = document.getElementById('sim-start');
  if (startBtn) startBtn.disabled = false;
  const pauseBtn = document.getElementById('sim-pause');
  if (pauseBtn) {
    pauseBtn.disabled = true;
    pauseBtn.innerHTML = '<i class="fas fa-pause me-1"></i>Pause';
  }

  const descEl = document.getElementById('sim-step-desc');
  if (descEl) descEl.innerHTML = '👆 Select an algorithm above and press <strong>Start</strong> to begin the simulation.';
}

function resetStepStyles() {
  document.querySelectorAll('.sim-step').forEach(el => {
    el.classList.remove('active', 'completed');
  });
}

function clearSimLog() {
  const log = document.getElementById('sim-log');
  if (log) log.innerHTML = '';
}

function addSimLog(msg, type) {
  const log = document.getElementById('sim-log');
  if (!log) return;
  const time = new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
  const entry = document.createElement('div');
  entry.className = `sim-log-entry ${type ? 'log-' + type : ''}`;
  entry.innerHTML = `<span class="log-time">[${time}]</span><span class="log-msg">${msg}</span>`;
  log.appendChild(entry);
  log.scrollTop = log.scrollHeight;
}
