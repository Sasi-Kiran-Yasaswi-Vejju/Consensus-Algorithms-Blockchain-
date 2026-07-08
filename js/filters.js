// ============================================================
// FILTERS.JS — Search & filter functionality
// ============================================================
import { BLOCKCHAINS, ALGORITHMS } from './data.js';

export function initFilters() {
  populateFilterOptions();
  setupFilterListeners();
  renderSearchResults(BLOCKCHAINS);
}

function populateFilterOptions() {
  const consensusFilter = document.getElementById('filter-consensus');
  const layerFilter = document.getElementById('filter-layer');
  const langFilter = document.getElementById('filter-lang');

  if (consensusFilter) {
    const algos = [...new Set(BLOCKCHAINS.map(b => b.consensus))];
    algos.forEach(id => {
      const algo = ALGORITHMS[id];
      if (algo) {
        const opt = document.createElement('option');
        opt.value = id;
        opt.textContent = algo.acronym;
        consensusFilter.appendChild(opt);
      }
    });
  }

  if (layerFilter) {
    [0, 1, 2, 3].forEach(l => {
      const opt = document.createElement('option');
      opt.value = l;
      opt.textContent = `Layer ${l}`;
      layerFilter.appendChild(opt);
    });
  }

  if (langFilter) {
    const langs = ['Solidity', 'Rust', 'Go', 'Java', 'C++', 'Plutus'];
    langs.forEach(lang => {
      const opt = document.createElement('option');
      opt.value = lang;
      opt.textContent = lang;
      langFilter.appendChild(opt);
    });
  }
}

function setupFilterListeners() {
  const searchInput = document.getElementById('search-input');
  const consensusFilter = document.getElementById('filter-consensus');
  const layerFilter = document.getElementById('filter-layer');

  const doFilter = () => {
    const query = searchInput?.value?.toLowerCase() || '';
    const consensus = consensusFilter?.value || '';
    const layer = layerFilter?.value || '';

    let results = BLOCKCHAINS.filter(bc => {
      const matchQuery = !query ||
        bc.name.toLowerCase().includes(query) ||
        bc.ticker.toLowerCase().includes(query) ||
        bc.consensus.toLowerCase().includes(query) ||
        (bc.useCase && bc.useCase.toLowerCase().includes(query));

      const matchConsensus = !consensus || bc.consensus === consensus;
      const matchLayer = !layer || bc.layer.toString() === layer;

      return matchQuery && matchConsensus && matchLayer;
    });

    renderSearchResults(results);
  };

  searchInput?.addEventListener('input', doFilter);
  consensusFilter?.addEventListener('change', doFilter);
  layerFilter?.addEventListener('change', doFilter);

  // Clear filters button
  document.getElementById('clear-filters')?.addEventListener('click', () => {
    if (searchInput) searchInput.value = '';
    if (consensusFilter) consensusFilter.value = '';
    if (layerFilter) layerFilter.value = '';
    renderSearchResults(BLOCKCHAINS);
  });
}

function renderSearchResults(results) {
  const grid = document.getElementById('search-results');
  if (!grid) return;

  const countEl = document.getElementById('results-count');
  if (countEl) countEl.textContent = `${results.length} result${results.length !== 1 ? 's' : ''}`;

  if (results.length === 0) {
    grid.innerHTML = `
      <div class="no-results animate-on-scroll visible">
        <div style="font-size: 3rem; margin-bottom: 1rem;">🔍</div>
        <h4 style="color: var(--text-heading); margin-bottom: 0.5rem;">No results found</h4>
        <p style="color: var(--text-muted);">Try adjusting your search or filters</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = results.map(bc => {
    const algo = ALGORITHMS[bc.consensus];
    return `
      <div class="glass-card animate-on-scroll visible" style="padding: 1.5rem; border-left: 3px solid ${algo?.color || '#6c63ff'};">
        <div style="display: flex; align-items: center; gap: 0.875rem; margin-bottom: 1rem;">
          <div style="width: 44px; height: 44px; border-radius: 0.75rem; background: ${algo?.gradient || 'var(--grad-primary)'}; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; font-weight: 700; color: white; flex-shrink: 0;">
            ${bc.logo}
          </div>
          <div>
            <div style="font-weight: 700; color: var(--text-heading); font-size: 1rem;">${bc.name}</div>
            <div style="font-size: 0.75rem; color: var(--text-muted); font-family: monospace;">${bc.ticker} • Layer ${bc.layer}</div>
          </div>
          <div style="margin-left: auto;">
            <span style="background: ${algo?.color || '#6c63ff'}22; border: 1px solid ${algo?.color || '#6c63ff'}44; border-radius: 9999px; padding: 0.2rem 0.6rem; font-size: 0.7rem; font-weight: 700; color: ${algo?.color || '#6c63ff'};">
              ${algo?.acronym || bc.consensus.toUpperCase()}
            </span>
          </div>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; margin-bottom: 0.875rem;">
          <div style="background: var(--glass-bg); border-radius: 0.375rem; padding: 0.4rem 0.625rem;">
            <div style="font-size: 0.65rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.05em;">TPS</div>
            <div style="font-size: 0.8rem; color: var(--text-primary); font-weight: 600;">${bc.tps}</div>
          </div>
          <div style="background: var(--glass-bg); border-radius: 0.375rem; padding: 0.4rem 0.625rem;">
            <div style="font-size: 0.65rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.05em;">Block Time</div>
            <div style="font-size: 0.8rem; color: var(--text-primary); font-weight: 600;">${bc.blockTime}</div>
          </div>
        </div>
        <div style="font-size: 0.8rem; color: var(--text-secondary); line-height: 1.5; margin-bottom: 0.875rem;">${bc.useCase}</div>
        <button class="btn-outline-custom" style="width: 100%; font-size: 0.8rem; padding: 0.5rem 1rem; justify-content: center;"
                onclick="window.selectAlgo('${bc.consensus}'); document.getElementById('explorer').scrollIntoView({behavior:'smooth'})">
          Explore ${algo?.acronym || bc.consensus.toUpperCase()} Algorithm →
        </button>
      </div>
    `;
  }).join('');
}
