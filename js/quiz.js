// ============================================================
// QUIZ.JS — 20-question MCQ quiz engine
// ============================================================
import { QUIZ_QUESTIONS } from './data.js';

let currentQuestion = 0;
let score = 0;
let answers = [];
let timerInterval = null;
let timeLeft = 30;
let quizStarted = false;
let answered = false;

export function initQuiz() {
  const startBtn = document.getElementById('quiz-start-btn');
  if (startBtn) startBtn.addEventListener('click', startQuiz);
  showQuizIntro();
}

function showQuizIntro() {
  const wrapper = document.getElementById('quiz-wrapper');
  if (!wrapper) return;
  wrapper.innerHTML = `
    <div class="quiz-score-card text-center">
      <div style="font-size: 4rem; margin-bottom: 1.5rem;">🧠</div>
      <h3 style="color: var(--text-heading); font-size: 1.8rem; font-weight: 800; margin-bottom: 0.75rem;">Consensus Algorithm Quiz</h3>
      <p style="color: var(--text-secondary); margin-bottom: 2rem; line-height: 1.7;">
        Test your knowledge with <strong>20 questions</strong> about blockchain consensus algorithms.<br>
        Each question has a <strong>30-second timer</strong>. Good luck! 🎯
      </p>
      <div style="display: flex; gap: 1.5rem; justify-content: center; flex-wrap: wrap; margin-bottom: 2rem;">
        <div class="metric-item"><span class="metric-value">20</span><span class="metric-label">Questions</span></div>
        <div class="metric-item"><span class="metric-value">30s</span><span class="metric-label">Per Question</span></div>
        <div class="metric-item"><span class="metric-value">600s</span><span class="metric-label">Total Time</span></div>
      </div>
      <button class="btn-primary-custom" id="quiz-start-btn" onclick="window.startQuizNow()">
        <i class="fas fa-play me-2"></i>Start Quiz
      </button>
    </div>
  `;
  window.startQuizNow = startQuiz;
}

export function startQuiz() {
  currentQuestion = 0;
  score = 0;
  answers = [];
  quizStarted = true;
  answered = false;
  renderQuestion();
}

function renderQuestion() {
  const wrapper = document.getElementById('quiz-wrapper');
  if (!wrapper) return;

  const q = QUIZ_QUESTIONS[currentQuestion];
  const qNum = currentQuestion + 1;
  const progress = (qNum / QUIZ_QUESTIONS.length) * 100;

  wrapper.innerHTML = `
    <div class="quiz-header">
      <div>
        <span style="color: var(--text-muted); font-size: 0.85rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em;">Question ${qNum} of ${QUIZ_QUESTIONS.length}</span>
        <span style="margin-left: 1rem; background: var(--bg-glass); border: var(--glass-border); border-radius: 9999px; padding: 0.25rem 0.75rem; font-size: 0.8rem; color: var(--success);">
          Score: ${score}/${currentQuestion}
        </span>
      </div>
      <div class="quiz-timer" id="quiz-timer">30s</div>
    </div>
    <div class="quiz-progress-bar">
      <div class="quiz-progress-fill" style="width: ${progress}%"></div>
    </div>
    <div class="quiz-question">${q.q}</div>
    <div class="quiz-options" id="quiz-options">
      ${q.options.map((opt, i) => `
        <button class="quiz-option" id="opt-${i}" onclick="window.selectAnswer(${i})">
          <span class="option-letter">${['A', 'B', 'C', 'D'][i]}</span>
          <span>${opt}</span>
        </button>
      `).join('')}
    </div>
    <div class="quiz-explanation" id="quiz-explanation">
      <strong>💡 Explanation:</strong> ${q.explanation}
    </div>
    <div style="display: flex; gap: 1rem; justify-content: space-between; flex-wrap: wrap;">
      <button class="btn-outline-custom" onclick="window.skipQuestion()" id="skip-btn" style="font-size: 0.875rem; padding: 0.6rem 1.25rem;">
        <i class="fas fa-forward me-1"></i>Skip
      </button>
      <button class="btn-primary-custom" id="next-btn" onclick="window.nextQuestion()" disabled style="font-size: 0.875rem; padding: 0.6rem 1.25rem;">
        ${currentQuestion < QUIZ_QUESTIONS.length - 1 ? 'Next Question <i class="fas fa-arrow-right ms-1"></i>' : 'See Results <i class="fas fa-trophy ms-1"></i>'}
      </button>
    </div>
  `;

  answered = false;
  startTimer();
}

window.selectAnswer = function(selectedIndex) {
  if (answered) return;
  answered = true;
  clearInterval(timerInterval);

  const q = QUIZ_QUESTIONS[currentQuestion];
  const isCorrect = selectedIndex === q.answer;

  if (isCorrect) score++;
  answers.push({ question: currentQuestion, selected: selectedIndex, correct: q.answer, isCorrect });

  // Style options
  q.options.forEach((_, i) => {
    const btn = document.getElementById(`opt-${i}`);
    if (!btn) return;
    btn.disabled = true;
    if (i === q.answer) btn.classList.add('correct');
    else if (i === selectedIndex && !isCorrect) btn.classList.add('incorrect');
  });

  // Show explanation
  const expEl = document.getElementById('quiz-explanation');
  if (expEl) expEl.classList.add('show');

  // Enable next
  const nextBtn = document.getElementById('next-btn');
  if (nextBtn) nextBtn.disabled = false;

  // Skip button becomes continue
  const skipBtn = document.getElementById('skip-btn');
  if (skipBtn) skipBtn.style.display = 'none';
};

window.skipQuestion = function() {
  if (answered) return;
  answered = true;
  clearInterval(timerInterval);

  const q = QUIZ_QUESTIONS[currentQuestion];
  answers.push({ question: currentQuestion, selected: -1, correct: q.answer, isCorrect: false });

  // Reveal correct answer
  const correctBtn = document.getElementById(`opt-${q.answer}`);
  if (correctBtn) correctBtn.classList.add('correct');

  q.options.forEach((_, i) => {
    const btn = document.getElementById(`opt-${i}`);
    if (btn) btn.disabled = true;
  });

  const expEl = document.getElementById('quiz-explanation');
  if (expEl) expEl.classList.add('show');

  const nextBtn = document.getElementById('next-btn');
  if (nextBtn) nextBtn.disabled = false;

  const skipBtn = document.getElementById('skip-btn');
  if (skipBtn) skipBtn.style.display = 'none';
};

window.nextQuestion = function() {
  clearInterval(timerInterval);
  currentQuestion++;
  if (currentQuestion >= QUIZ_QUESTIONS.length) {
    showResults();
  } else {
    renderQuestion();
  }
};

function startTimer() {
  timeLeft = 30;
  updateTimerDisplay();

  timerInterval = setInterval(() => {
    timeLeft--;
    updateTimerDisplay();

    if (timeLeft <= 10) {
      document.getElementById('quiz-timer')?.classList.add('warning');
    }

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      window.skipQuestion();
    }
  }, 1000);
}

function updateTimerDisplay() {
  const el = document.getElementById('quiz-timer');
  if (el) {
    el.textContent = `${timeLeft}s`;
    if (timeLeft <= 5) el.style.color = '#ff5252';
    else if (timeLeft <= 10) el.style.color = '#ffd740';
    else el.style.color = '';
  }
}

function showResults() {
  clearInterval(timerInterval);
  const wrapper = document.getElementById('quiz-wrapper');
  if (!wrapper) return;

  const pct = Math.round((score / QUIZ_QUESTIONS.length) * 100);
  let grade, gradeColor, msg;

  if (pct >= 90) { grade = 'A+'; gradeColor = '#00e676'; msg = '🏆 Outstanding! You\'re a blockchain consensus expert!'; }
  else if (pct >= 80) { grade = 'A'; gradeColor = '#14f195'; msg = '🎉 Excellent! Great understanding of consensus algorithms!'; }
  else if (pct >= 70) { grade = 'B'; gradeColor = '#6c63ff'; msg = '👍 Good job! Solid knowledge of blockchain concepts!'; }
  else if (pct >= 60) { grade = 'C'; gradeColor = '#ffd740'; msg = '📚 Keep studying! Review the sections you struggled with.'; }
  else { grade = 'D'; gradeColor = '#ff5252'; msg = '💪 Don\'t give up! Revisit the fundamentals and try again.'; }

  // Calculate breakdown
  const wrongAns = answers.filter(a => !a.isCorrect);

  wrapper.innerHTML = `
    <div class="quiz-score-card">
      <div style="font-size: 3rem; margin-bottom: 1rem;">${pct >= 70 ? '🏆' : '📚'}</div>
      <div class="score-circle" style="background: linear-gradient(135deg, ${gradeColor}, ${gradeColor}99);">
        <span class="score-num">${score}</span>
        <span class="score-total">/ ${QUIZ_QUESTIONS.length}</span>
      </div>
      <h3 style="color: var(--text-heading); font-size: 1.5rem; font-weight: 800; margin-bottom: 0.5rem;">Grade: ${grade} (${pct}%)</h3>
      <p style="color: var(--text-secondary); margin-bottom: 2rem;">${msg}</p>
      
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin-bottom: 2rem; max-width: 400px; margin-left: auto; margin-right: auto;">
        <div class="metric-item">
          <span class="metric-value" style="color: var(--success);">${score}</span>
          <span class="metric-label">Correct</span>
        </div>
        <div class="metric-item">
          <span class="metric-value" style="color: var(--danger);">${QUIZ_QUESTIONS.length - score}</span>
          <span class="metric-label">Wrong</span>
        </div>
        <div class="metric-item">
          <span class="metric-value">${pct}%</span>
          <span class="metric-label">Score</span>
        </div>
      </div>

      ${wrongAns.length > 0 ? `
        <div style="text-align: left; margin-bottom: 2rem; background: var(--glass-bg); border: var(--glass-border); border-radius: var(--radius-lg); padding: 1.25rem;">
          <h4 style="color: var(--text-heading); font-size: 0.9rem; font-weight: 700; margin-bottom: 1rem; text-transform: uppercase; letter-spacing: 0.06em;">Review Missed Questions</h4>
          ${wrongAns.slice(0, 5).map(a => {
            const q = QUIZ_QUESTIONS[a.question];
            return `
              <div style="margin-bottom: 0.75rem; padding-bottom: 0.75rem; border-bottom: 1px solid rgba(255,255,255,0.05);">
                <p style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 0.25rem;">Q${a.question + 1}: ${q.q.substring(0, 60)}...</p>
                <p style="font-size: 0.8rem; color: var(--success);">✓ ${q.options[q.answer]}</p>
              </div>
            `;
          }).join('')}
        </div>
      ` : ''}

      <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
        <button class="btn-primary-custom" onclick="window.startQuizNow()">
          <i class="fas fa-redo me-2"></i>Restart Quiz
        </button>
        <button class="btn-outline-custom" onclick="document.getElementById('explorer')?.scrollIntoView({behavior:'smooth'})">
          <i class="fas fa-book me-2"></i>Review Material
        </button>
      </div>
    </div>
  `;
  window.startQuizNow = startQuiz;
}
