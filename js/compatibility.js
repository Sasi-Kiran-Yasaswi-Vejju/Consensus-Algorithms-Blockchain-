// ============================================================
// COMPATIBILITY.JS — Compatibility heatmap matrix
// ============================================================
import { BLOCKCHAINS, ALGORITHMS } from './data.js';

export function initCompatibilityMatrix() {
  renderMatrix();
}

function renderMatrix() {
  const container = document.getElementById('compatibility-matrix');
  if (!container) return;

  // Use a subset of main blockchains
  const chains = BLOCKCHAINS.slice(0, 9);

  let html = '<div class="matrix-container"><table class="matrix-table">';

  // Header row
  html += '<thead><tr><th></th>';
  chains.forEach(chain => {
    html += `<th title="${chain.name}" style="font-size: 0.7rem; max-width: 60px; white-space: normal; text-align: center;">
      <div style="writing-mode: vertical-lr; transform: rotate(180deg); padding: 0.5rem 0; white-space: nowrap; font-size: 0.65rem;">
        ${chain.logo} ${chain.name.length > 8 ? chain.name.substring(0,8)+'.' : chain.name}
      </div>
    </th>`;
  });
  html += '</tr></thead><tbody>';

  // Data rows
  chains.forEach((rowChain, ri) => {
    html += `<tr>`;
    html += `<td style="min-width: 100px;">${rowChain.logo} ${rowChain.name}</td>`;

    chains.forEach((colChain, ci) => {
      if (ri === ci) {
        html += `<td class="self" style="background: rgba(255,255,255,0.03);">—</td>`;
      } else {
        const compat = rowChain.consensus === colChain.consensus;
        const tooltip = generateTooltip(rowChain, colChain, compat);
        html += `<td 
          class="${compat ? 'compat' : 'incompat'}" 
          data-chain-a="${rowChain.id}" 
          data-chain-b="${colChain.id}"
          title="${tooltip}"
          onclick="window.showCompatModal('${rowChain.id}', '${colChain.id}')"
          style="cursor: pointer; transition: all 0.15s ease;">
          ${compat ? '🟢' : '🔴'}
        </td>`;
      }
    });

    html += '</tr>';
  });

  html += '</tbody></table></div>';

  // Legend
  html += `
    <div style="display: flex; gap: 2rem; justify-content: center; margin-top: 1.5rem; flex-wrap: wrap;">
      <div style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.875rem; color: var(--text-secondary);">
        <span>🟢</span> Same Consensus Algorithm
      </div>
      <div style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.875rem; color: var(--text-secondary);">
        <span>🔴</span> Different Consensus Algorithm
      </div>
      <div style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.875rem; color: var(--text-muted);">
        <i class="fas fa-mouse-pointer" style="font-size: 0.75rem;"></i> Click cell for details
      </div>
    </div>
  `;

  container.innerHTML = html;
  window.showCompatModal = showCompatModal;
}

function generateTooltip(a, b, compat) {
  const algoA = ALGORITHMS[a.consensus];
  const algoB = ALGORITHMS[b.consensus];
  return compat
    ? `${a.name} & ${b.name}: Both use ${algoA?.name || a.consensusLabel} — Compatible!`
    : `${a.name} (${algoA?.acronym || a.consensus.toUpperCase()}) vs ${b.name} (${algoB?.acronym || b.consensus.toUpperCase()}) — Different consensus`;
}

function showCompatModal(chainAId, chainBId) {
  const chainA = BLOCKCHAINS.find(b => b.id === chainAId);
  const chainB = BLOCKCHAINS.find(b => b.id === chainBId);
  if (!chainA || !chainB) return;

  const algoA = ALGORITHMS[chainA.consensus];
  const algoB = ALGORITHMS[chainB.consensus];
  const compat = chainA.consensus === chainB.consensus;

  const overlay = document.getElementById('modal-overlay');
  const modal = document.getElementById('modal-content');
  if (!overlay || !modal) return;

  modal.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1.5rem;">
      <h3 style="color: var(--text-heading); font-size: 1.3rem; font-weight: 800;">Compatibility Analysis</h3>
      <button class="modal-close" onclick="window.closeModal()">✕</button>
    </div>

    <div style="display: grid; grid-template-columns: 1fr auto 1fr; gap: 1rem; align-items: center; margin-bottom: 1.5rem;">
      <div style="background: var(--glass-bg); border: var(--glass-border); border-radius: var(--radius-lg); padding: 1.25rem; text-align: center;">
        <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">${chainA.logo}</div>
        <div style="font-weight: 700; color: var(--text-heading);">${chainA.name}</div>
        <div style="font-size: 0.8rem; color: var(--text-muted); font-family: monospace;">${chainA.ticker}</div>
        <div style="margin-top: 0.75rem; padding: 0.3rem 0.75rem; background: ${algoA?.color || '#6c63ff'}22; border: 1px solid ${algoA?.color || '#6c63ff'}44; border-radius: 9999px; font-size: 0.75rem; font-weight: 600; color: ${algoA?.color || '#6c63ff'};">
          ${algoA?.acronym || chainA.consensusLabel}
        </div>
      </div>
      
      <div style="text-align: center; font-size: 2rem;">${compat ? '🟢' : '🔴'}</div>
      
      <div style="background: var(--glass-bg); border: var(--glass-border); border-radius: var(--radius-lg); padding: 1.25rem; text-align: center;">
        <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">${chainB.logo}</div>
        <div style="font-weight: 700; color: var(--text-heading);">${chainB.name}</div>
        <div style="font-size: 0.8rem; color: var(--text-muted); font-family: monospace;">${chainB.ticker}</div>
        <div style="margin-top: 0.75rem; padding: 0.3rem 0.75rem; background: ${algoB?.color || '#6c63ff'}22; border: 1px solid ${algoB?.color || '#6c63ff'}44; border-radius: 9999px; font-size: 0.75rem; font-weight: 600; color: ${algoB?.color || '#6c63ff'};">
          ${algoB?.acronym || chainB.consensusLabel}
        </div>
      </div>
    </div>

    <div style="background: ${compat ? 'rgba(0,230,118,0.08)' : 'rgba(255,82,82,0.08)'}; border: 1px solid ${compat ? 'rgba(0,230,118,0.3)' : 'rgba(255,82,82,0.3)'}; border-radius: var(--radius-lg); padding: 1.25rem; margin-bottom: 1.25rem;">
      <h4 style="color: ${compat ? 'var(--success)' : 'var(--danger)'}; font-weight: 700; margin-bottom: 0.5rem;">
        ${compat ? '✅ Compatible Consensus Mechanisms' : '❌ Incompatible Consensus Mechanisms'}
      </h4>
      <p style="color: var(--text-secondary); font-size: 0.875rem; line-height: 1.7; margin: 0;">
        ${compat
          ? `Both ${chainA.name} and ${chainB.name} use ${algoA?.name || chainA.consensusLabel}. They share the same validator incentive structure, security model, and block production mechanism. Cross-chain bridges between these networks can assume compatible trust models.`
          : `${chainA.name} uses ${algoA?.name || chainA.consensusLabel} while ${chainB.name} uses ${algoB?.name || chainB.consensusLabel}. These chains have fundamentally different validator sets, security models, and finality guarantees. Cross-chain interaction requires trustless bridges or relay mechanisms to handle the security model differences.`
        }
      </p>
    </div>

    ${!compat ? `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1.25rem;">
        <div style="background: var(--glass-bg); border: var(--glass-border); border-radius: var(--radius-md); padding: 1rem;">
          <div style="font-size: 0.7rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 0.5rem;">Security Model</div>
          <div style="font-size: 0.85rem; color: var(--text-secondary);">${chainA.name}: ${algoA?.metrics?.energy || 'N/A'} energy</div>
          <div style="font-size: 0.85rem; color: var(--text-secondary);">${chainB.name}: ${algoB?.metrics?.energy || 'N/A'} energy</div>
        </div>
        <div style="background: var(--glass-bg); border: var(--glass-border); border-radius: var(--radius-md); padding: 1rem;">
          <div style="font-size: 0.7rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 0.5rem;">TPS Comparison</div>
          <div style="font-size: 0.85rem; color: var(--text-secondary);">${chainA.name}: ${chainA.tps}</div>
          <div style="font-size: 0.85rem; color: var(--text-secondary);">${chainB.name}: ${chainB.tps}</div>
        </div>
      </div>
    ` : ''}

    <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
      <button class="btn-primary-custom" style="font-size: 0.85rem; padding: 0.6rem 1.25rem;"
              onclick="window.closeModal(); window.selectAlgo('${chainA.consensus}'); document.getElementById('explorer').scrollIntoView({behavior:'smooth'})">
        Explore ${algoA?.acronym || chainA.consensus.toUpperCase()} →
      </button>
      ${!compat ? `
        <button class="btn-outline-custom" style="font-size: 0.85rem; padding: 0.6rem 1.25rem;"
                onclick="window.closeModal(); window.selectAlgo('${chainB.consensus}'); document.getElementById('explorer').scrollIntoView({behavior:'smooth'})">
          Explore ${algoB?.acronym || chainB.consensus.toUpperCase()} →
        </button>
      ` : ''}
    </div>
  `;

  overlay.classList.add('show');
  document.body.style.overflow = 'hidden';
}
