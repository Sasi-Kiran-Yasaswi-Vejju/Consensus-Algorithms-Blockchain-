// ============================================================
// TIMELINE.JS — Interactive blockchain history timeline
// ============================================================
import { TIMELINE_EVENTS, ALGORITHMS } from './data.js';

export function initTimeline() {
  renderTimeline();
}

function renderTimeline() {
  const container = document.getElementById('timeline-container');
  if (!container) return;

  container.innerHTML = `
    <div class="timeline-wrapper">
      <div class="timeline-line"></div>
      ${TIMELINE_EVENTS.map((event, i) => {
        const isEven = i % 2 === 1;
        const algo = ALGORITHMS[event.algo];
        const color = algo?.color || '#6c63ff';
        return `
          <div class="timeline-event ${isEven ? 'even' : ''} animate-on-scroll delay-${(i % 5) + 1}" 
               data-year="${event.year}"
               onclick="window.showTimelineDetail(${i})">
            <div class="timeline-dot" style="background: ${color}; box-shadow: 0 0 12px ${color}80;"></div>
            <div class="timeline-card" style="border-color: rgba(${hexToRgb(color)}, 0.2);">
              <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.35rem;">
                <span style="font-size: 1.5rem;">${event.icon}</span>
                <div class="timeline-year">${event.year}</div>
              </div>
              <div class="timeline-title">${event.title}</div>
              <div class="timeline-desc">${event.desc}</div>
              ${algo ? `
                <div style="margin-top: 0.5rem;">
                  <span style="background: ${color}22; border: 1px solid ${color}44; border-radius: 9999px; padding: 0.2rem 0.6rem; font-size: 0.7rem; font-weight: 600; color: ${color};">
                    ${algo.acronym}
                  </span>
                </div>
              ` : ''}
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;

  window.showTimelineDetail = showTimelineDetail;
}

function showTimelineDetail(index) {
  const event = TIMELINE_EVENTS[index];
  if (!event) return;

  const algo = ALGORITHMS[event.algo];
  const color = algo?.color || '#6c63ff';

  const overlay = document.getElementById('modal-overlay');
  const modal = document.getElementById('modal-content');

  if (!overlay || !modal) return;

  modal.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1.5rem;">
      <div style="display: flex; align-items: center; gap: 1rem;">
        <div style="font-size: 3rem;">${event.icon}</div>
        <div>
          <div style="font-size: 0.85rem; color: var(--text-muted); font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 0.25rem;">${event.year}</div>
          <h3 style="color: var(--text-heading); font-size: 1.4rem; font-weight: 800; margin: 0;">${event.title}</h3>
        </div>
      </div>
      <button class="modal-close" onclick="window.closeModal()">✕</button>
    </div>
    
    <div style="background: linear-gradient(135deg, ${color}15, transparent); border: 1px solid ${color}33; border-radius: var(--radius-lg); padding: 1.25rem; margin-bottom: 1.5rem;">
      <p style="color: var(--text-secondary); line-height: 1.7; margin: 0;">${event.desc}</p>
    </div>
    
    ${algo ? `
      <div style="background: var(--glass-bg); border: var(--glass-border); border-radius: var(--radius-lg); padding: 1.25rem;">
        <h4 style="color: var(--text-heading); font-size: 0.875rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 1rem;">Related Consensus Algorithm</h4>
        <div style="display: flex; align-items: center; gap: 1rem;">
          <div style="width: 48px; height: 48px; border-radius: 0.75rem; background: ${algo.gradient}; display: flex; align-items: center; justify-content: center; font-size: 1.5rem;">
            ${algo.icon}
          </div>
          <div>
            <div style="color: var(--text-heading); font-weight: 700;">${algo.name} (${algo.acronym})</div>
            <div style="color: var(--text-muted); font-size: 0.85rem; margin-top: 0.2rem;">${algo.overview.substring(0, 120)}...</div>
          </div>
        </div>
        <div style="margin-top: 1rem;">
          <button class="btn-primary-custom" style="font-size: 0.85rem; padding: 0.6rem 1.25rem;" 
                  onclick="window.closeModal(); window.selectAlgo('${event.algo}'); document.getElementById('explorer').scrollIntoView({behavior:'smooth'})">
            Explore ${algo.acronym} →
          </button>
        </div>
      </div>
    ` : ''}
  `;

  overlay.classList.add('show');
  document.body.style.overflow = 'hidden';
}

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r}, ${g}, ${b}`;
}
