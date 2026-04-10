// ============================================================
// NameDrop - Enhanced Multi-Category Game Engine
// ============================================================

// --------------- GAME STATE ---------------
const GameState = {
  category: null,         // category key from CATEGORIES
  categoryEntries: [],    // deduplicated entries for current category
  mode: 'classic',        // classic | timed | survival
  difficulty: 'medium',   // easy | medium | hard
  currentPlayer: 1,       // 1 = You, 2 = Computer
  scores: { 1: 0, 2: 0 },
  gameHistory: [],
  usedNames: new Set(),
  hintsRemaining: 3,
  currentStreak: 0,
  bestStreak: 0,
  lives: 3,
  timerSeconds: 0,
  timerInterval: null,
  timerMax: 0,
  gameOver: false,
  soundEnabled: true,
  totalCorrect: 0,
  totalWrong: 0,
  computerThinking: false,
  powerUps: { skip: 1, extraTime: 1, reveal: 1 }
};

// --------------- DIFFICULTY CONFIG ---------------
const DifficultyConfig = {
  easy:   { timer: 0,  computerDelay: 2500, computerSkillChance: 0.6,  hintsPerTurn: 3, label: 'Easy' },
  medium: { timer: 30, computerDelay: 1800, computerSkillChance: 0.85, hintsPerTurn: 2, label: 'Medium' },
  hard:   { timer: 15, computerDelay: 1200, computerSkillChance: 0.95, hintsPerTurn: 1, label: 'Hard' }
};

// --------------- CATEGORY DETECTION ---------------
function detectCategory() {
  const params = new URLSearchParams(window.location.search);
  const cat = params.get('cat') || 'nba';
  if (CATEGORIES[cat]) {
    GameState.category = cat;
    GameState.categoryEntries = getCategoryEntries(cat);
    // Apply theme class
    document.body.className = CATEGORIES[cat].theme;
    // Set header text
    const h1 = document.querySelector('.game-header h1');
    if (h1) h1.textContent = CATEGORIES[cat].name;
    // Set input placeholder
    const input = document.getElementById('playerInput');
    if (input) input.placeholder = CATEGORIES[cat].placeholder;
    // Set page title
    document.title = 'NameDrop - ' + CATEGORIES[cat].name;
  } else {
    GameState.category = 'nba';
    GameState.categoryEntries = getCategoryEntries('nba');
    document.body.className = 'theme-nba';
  }
}

// --------------- SOUND SYSTEM (Web Audio API) ---------------
const AudioCtx = window.AudioContext || window.webkitAudioContext;
let audioCtx = null;

function ensureAudioCtx() {
  if (!audioCtx) audioCtx = new AudioCtx();
  if (audioCtx.state === 'suspended') audioCtx.resume();
}

function playTone(freq, duration, type = 'sine', volume = 0.15) {
  if (!GameState.soundEnabled) return;
  try {
    ensureAudioCtx();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    gain.gain.setValueAtTime(volume, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + duration);
  } catch (e) { /* audio not available */ }
}

function playCorrectSound() {
  playTone(523, 0.1, 'sine', 0.12);
  setTimeout(() => playTone(659, 0.1, 'sine', 0.12), 100);
  setTimeout(() => playTone(784, 0.15, 'sine', 0.12), 200);
}

function playWrongSound() {
  playTone(200, 0.3, 'sawtooth', 0.08);
  setTimeout(() => playTone(150, 0.4, 'sawtooth', 0.08), 150);
}

function playTickSound() {
  playTone(800, 0.05, 'square', 0.04);
}

function playGameOverSound() {
  playTone(400, 0.2, 'sine', 0.1);
  setTimeout(() => playTone(350, 0.2, 'sine', 0.1), 200);
  setTimeout(() => playTone(300, 0.2, 'sine', 0.1), 400);
  setTimeout(() => playTone(200, 0.5, 'sine', 0.1), 600);
}

function playStreakSound() {
  playTone(600, 0.08, 'sine', 0.1);
  setTimeout(() => playTone(700, 0.08, 'sine', 0.1), 80);
  setTimeout(() => playTone(800, 0.08, 'sine', 0.1), 160);
  setTimeout(() => playTone(1000, 0.15, 'sine', 0.12), 240);
}

function playComputerSound() {
  playTone(440, 0.08, 'triangle', 0.08);
  setTimeout(() => playTone(550, 0.12, 'triangle', 0.08), 100);
}

// --------------- CONFETTI SYSTEM ---------------
function createConfetti() {
  const container = document.getElementById('confettiContainer');
  if (!container) return;
  const colors = ['#FF6B35', '#17408B', '#C9082A', '#FFD700', '#00D4AA', '#FF47DA'];
  for (let i = 0; i < 50; i++) {
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';
    piece.style.left = Math.random() * 100 + '%';
    piece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    piece.style.animationDelay = Math.random() * 0.5 + 's';
    piece.style.animationDuration = (Math.random() * 1.5 + 1.5) + 's';
    const size = Math.random() * 8 + 4;
    piece.style.width = size + 'px';
    piece.style.height = size + 'px';
    if (Math.random() > 0.5) piece.style.borderRadius = '50%';
    container.appendChild(piece);
  }
  setTimeout(() => { container.innerHTML = ''; }, 3000);
}

// --------------- AUTOCOMPLETE ---------------
let autocompleteVisible = false;

function setupAutocomplete() {
  const input = document.getElementById('playerInput');
  const list = document.getElementById('autocompleteList');
  if (!input || !list) return;

  input.addEventListener('input', function () {
    const val = this.value.trim().toLowerCase();
    list.innerHTML = '';
    if (val.length < 2) { list.classList.remove('visible'); autocompleteVisible = false; return; }

    const requiredLetter = getRequiredLetter();
    const matches = GameState.categoryEntries.filter(p => {
      const lower = p.toLowerCase();
      const matchesSearch = lower.includes(val);
      const matchesLetter = !requiredLetter || p.split(' ')[0][0].toUpperCase() === requiredLetter;
      const notUsed = !GameState.usedNames.has(lower);
      return matchesSearch && matchesLetter && notUsed;
    }).slice(0, 6);

    if (matches.length === 0) { list.classList.remove('visible'); autocompleteVisible = false; return; }

    matches.forEach(name => {
      const item = document.createElement('div');
      item.className = 'autocomplete-item';
      const idx = name.toLowerCase().indexOf(val);
      if (idx >= 0) {
        item.innerHTML = name.substring(0, idx) +
          '<strong>' + name.substring(idx, idx + val.length) + '</strong>' +
          name.substring(idx + val.length);
      } else {
        item.textContent = name;
      }
      item.addEventListener('mousedown', function (e) {
        e.preventDefault();
        input.value = name;
        list.innerHTML = '';
        list.classList.remove('visible');
        autocompleteVisible = false;
        input.focus();
      });
      list.appendChild(item);
    });
    list.classList.add('visible');
    autocompleteVisible = true;
  });

  input.addEventListener('blur', function () {
    setTimeout(() => { list.classList.remove('visible'); autocompleteVisible = false; }, 200);
  });

  input.addEventListener('focus', function () {
    if (this.value.trim().length >= 2) {
      this.dispatchEvent(new Event('input'));
    }
  });
}

// --------------- TIMER ---------------
function startTimer() {
  const config = DifficultyConfig[GameState.difficulty];
  if (config.timer === 0) {
    document.getElementById('timerContainer')?.classList.add('hidden');
    return;
  }

  GameState.timerMax = config.timer;
  GameState.timerSeconds = config.timer;
  updateTimerDisplay();
  document.getElementById('timerContainer')?.classList.remove('hidden');

  clearInterval(GameState.timerInterval);
  GameState.timerInterval = setInterval(() => {
    if (GameState.gameOver || GameState.computerThinking) return;
    GameState.timerSeconds--;
    updateTimerDisplay();

    if (GameState.timerSeconds <= 5 && GameState.timerSeconds > 0) {
      playTickSound();
    }

    if (GameState.timerSeconds <= 0) {
      clearInterval(GameState.timerInterval);
      handleTimeout();
    }
  }, 1000);
}

function updateTimerDisplay() {
  const bar = document.getElementById('timerBar');
  const text = document.getElementById('timerText');
  if (!bar || !text) return;
  const pct = (GameState.timerSeconds / GameState.timerMax) * 100;
  bar.style.width = pct + '%';
  text.textContent = GameState.timerSeconds + 's';
  bar.classList.toggle('timer-warning', GameState.timerSeconds <= 10 && GameState.timerSeconds > 5);
  bar.classList.toggle('timer-critical', GameState.timerSeconds <= 5);
}

function handleTimeout() {
  if (GameState.currentPlayer === 2) return;
  playWrongSound();
  GameState.scores[1] -= 1;
  GameState.totalWrong++;
  GameState.currentStreak = 0;
  updateStreak();

  addHistoryEntry('You', "(Time's up!)", false, 'Ran out of time');

  if (GameState.mode === 'survival') {
    GameState.lives--;
    updateLives();
    if (GameState.lives <= 0) {
      endGame('You ran out of lives!');
      return;
    }
  }

  switchPlayer();
  updateUI();
}

function resetTimer() {
  clearInterval(GameState.timerInterval);
  document.getElementById('timerBar')?.classList.remove('timer-critical', 'timer-warning');
  if (GameState.currentPlayer === 1) {
    startTimer();
  }
}

// --------------- CORE GAME LOGIC ---------------

function getRequiredLetter() {
  if (GameState.gameHistory.length === 0) return null;
  const lastEntry = GameState.gameHistory[GameState.gameHistory.length - 1];
  const parts = lastEntry.name.split(' ');
  const lastName = parts[parts.length - 1];
  return lastName[0].toUpperCase();
}

function validateName(name) {
  if (!name || name.trim() === '') return { valid: false, error: 'Please enter a name' };
  const trimmed = name.trim();
  if (GameState.usedNames.has(trimmed.toLowerCase())) return { valid: false, error: 'Already used! Try another' };

  // Case-insensitive match against current category
  const match = GameState.categoryEntries.find(p => p.toLowerCase() === trimmed.toLowerCase());
  if (!match) return { valid: false, error: 'Not in our database. Check spelling!' };

  const requiredLetter = getRequiredLetter();
  if (requiredLetter) {
    const firstName = match.split(' ')[0];
    if (firstName[0].toUpperCase() !== requiredLetter) {
      return { valid: false, error: `First name must start with "${requiredLetter}"` };
    }
  }
  return { valid: true, correctedName: match };
}

function submitName() {
  if (GameState.gameOver || GameState.computerThinking) return;
  const input = document.getElementById('playerInput');
  const name = input.value.trim();
  const result = validateName(name);

  clearInterval(GameState.timerInterval);

  if (!result.valid) {
    playWrongSound();
    GameState.scores[1] -= 1;
    GameState.totalWrong++;
    GameState.currentStreak = 0;
    updateStreak();
    addHistoryEntry('You', name || '(empty)', false, result.error);
    showError(result.error);

    if (GameState.mode === 'survival') {
      GameState.lives--;
      updateLives();
      if (GameState.lives <= 0) {
        endGame('You ran out of lives!');
        input.value = '';
        updateUI();
        return;
      }
    }

    switchPlayer();
    input.value = '';
    updateUI();
    return;
  }

  // Correct answer
  const streakMultiplier = getStreakMultiplier();
  const points = 1 * streakMultiplier;
  GameState.scores[1] += points;
  GameState.totalCorrect++;
  GameState.currentStreak++;
  if (GameState.currentStreak > GameState.bestStreak) {
    GameState.bestStreak = GameState.currentStreak;
  }
  updateStreak();

  if (GameState.currentStreak >= 3) {
    playStreakSound();
    createConfetti();
  } else {
    playCorrectSound();
  }

  const displayPoints = streakMultiplier > 1 ? `+${points} (${streakMultiplier}x streak!)` : '+1';
  addHistoryEntry('You', result.correctedName, true, displayPoints);
  GameState.usedNames.add(result.correctedName.toLowerCase());

  clearError();
  clearHint();
  input.value = '';
  document.getElementById('autocompleteList')?.classList.remove('visible');
  switchPlayer();
  updateUI();
}

function getStreakMultiplier() {
  if (GameState.currentStreak >= 7) return 4;
  if (GameState.currentStreak >= 5) return 3;
  if (GameState.currentStreak >= 3) return 2;
  return 1;
}

function computerTurn() {
  if (GameState.gameOver) return;
  GameState.computerThinking = true;
  disableInput(true);

  const config = DifficultyConfig[GameState.difficulty];
  const thinkingEl = document.getElementById('computerThinking');
  if (thinkingEl) thinkingEl.classList.remove('hidden');

  setTimeout(() => {
    if (GameState.gameOver) return;
    const requiredLetter = getRequiredLetter();
    let validEntries = GameState.categoryEntries.filter(p => {
      const firstName = p.split(' ')[0];
      return (!requiredLetter || firstName[0].toUpperCase() === requiredLetter) &&
        !GameState.usedNames.has(p.toLowerCase());
    });

    let chosenEntry = null;

    if (validEntries.length > 0 && Math.random() < config.computerSkillChance) {
      if (GameState.difficulty === 'hard') {
        // Try to pick entry that gives the human a hard letter
        const hardLetters = ['Q', 'X', 'U', 'Z', 'Y'];
        const hardPicks = validEntries.filter(p => {
          const parts = p.split(' ');
          const lastInit = parts[parts.length - 1][0].toUpperCase();
          return hardLetters.includes(lastInit);
        });
        chosenEntry = hardPicks.length > 0
          ? hardPicks[Math.floor(Math.random() * hardPicks.length)]
          : validEntries[Math.floor(Math.random() * validEntries.length)];
      } else {
        chosenEntry = validEntries[Math.floor(Math.random() * validEntries.length)];
      }
    }

    if (thinkingEl) thinkingEl.classList.add('hidden');
    GameState.computerThinking = false;

    if (chosenEntry) {
      playComputerSound();
      GameState.scores[2] += 1;
      addHistoryEntry('CPU', chosenEntry, true, '+1');
      GameState.usedNames.add(chosenEntry.toLowerCase());
    } else {
      playWrongSound();
      GameState.scores[2] -= 1;
      addHistoryEntry('CPU', '(gave up)', false, 'Could not find a match');
    }

    switchPlayer();
    updateUI();
    disableInput(false);
    document.getElementById('playerInput')?.focus();
  }, config.computerDelay);
}

function switchPlayer() {
  GameState.currentPlayer = GameState.currentPlayer === 1 ? 2 : 1;
  const config = DifficultyConfig[GameState.difficulty];
  GameState.hintsRemaining = config.hintsPerTurn;
  updateHintButton();

  if (GameState.currentPlayer === 2) {
    clearInterval(GameState.timerInterval);
    computerTurn();
  } else {
    resetTimer();
  }
}

// --------------- HISTORY ---------------
function addHistoryEntry(player, name, correct, detail) {
  GameState.gameHistory.push({ player, name, correct, detail });
  renderHistory();
}

function renderHistory() {
  const container = document.getElementById('gameHistory');
  if (!container) return;

  container.innerHTML = '';
  GameState.gameHistory.forEach((entry, i) => {
    const div = document.createElement('div');
    div.className = 'history-entry ' + (entry.correct === true ? 'correct' : entry.correct === false ? 'incorrect' : 'neutral');
    if (i === GameState.gameHistory.length - 1) div.classList.add('newest');

    const icon = entry.correct === true ? '<span class="entry-icon correct-icon">&#10003;</span>'
      : entry.correct === false ? '<span class="entry-icon wrong-icon">&#10007;</span>'
        : '<span class="entry-icon neutral-icon">&#9679;</span>';

    const playerLabel = entry.player === 'CPU' ? '<span class="cpu-label">CPU</span>'
      : entry.player === 'You' ? '<span class="you-label">YOU</span>'
        : '<span class="auto-label">START</span>';

    div.innerHTML = `
      ${icon}
      ${playerLabel}
      <span class="entry-name">${escapeHtml(entry.name)}</span>
      <span class="entry-detail">${escapeHtml(entry.detail || '')}</span>
    `;
    container.appendChild(div);
  });

  container.scrollTop = container.scrollHeight;
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// --------------- HINTS ---------------
function showHint() {
  if (GameState.hintsRemaining <= 0 || GameState.gameOver || GameState.computerThinking) return;
  const requiredLetter = getRequiredLetter();
  if (!requiredLetter) return;

  const valid = GameState.categoryEntries.filter(p => {
    const firstName = p.split(' ')[0];
    return firstName[0].toUpperCase() === requiredLetter &&
      !GameState.usedNames.has(p.toLowerCase());
  });

  if (valid.length === 0) {
    setHint('No valid entries left for this letter!');
    return;
  }

  const hint = valid[Math.floor(Math.random() * valid.length)];
  const hintsUsedThisTurn = DifficultyConfig[GameState.difficulty].hintsPerTurn - GameState.hintsRemaining;
  let hintText;
  if (hintsUsedThisTurn === 0 && GameState.difficulty !== 'easy') {
    const parts = hint.split(' ');
    hintText = parts.map(p => p[0] + '.').join(' ');
    hintText = `Try: ${hintText}`;
  } else if (hintsUsedThisTurn === 1 && GameState.difficulty === 'hard') {
    hintText = `Try: ${hint.split(' ')[0]} ____`;
  } else {
    hintText = `Try: ${hint}`;
  }

  setHint(hintText);
  GameState.hintsRemaining--;
  updateHintButton();
}

function updateHintButton() {
  const btn = document.getElementById('hintBtn');
  if (!btn) return;
  btn.textContent = `Hint (${GameState.hintsRemaining})`;
  btn.disabled = GameState.hintsRemaining <= 0;
  btn.classList.toggle('disabled', GameState.hintsRemaining <= 0);
}

// --------------- POWER-UPS ---------------
function usePowerUp(type) {
  if (GameState.gameOver || GameState.computerThinking) return;
  if (GameState.powerUps[type] <= 0) return;

  GameState.powerUps[type]--;
  updatePowerUpButtons();

  switch (type) {
    case 'skip':
      addHistoryEntry('You', '(skipped)', null, 'Used Skip');
      switchPlayer();
      updateUI();
      break;

    case 'extraTime':
      if (GameState.timerMax > 0) {
        GameState.timerSeconds = Math.min(GameState.timerSeconds + 15, GameState.timerMax + 15);
        updateTimerDisplay();
        showNotification('+15 seconds!');
      } else {
        showNotification('No timer in Easy mode');
        GameState.powerUps[type]++; // refund
        updatePowerUpButtons();
      }
      break;

    case 'reveal': {
      const requiredLetter = getRequiredLetter();
      if (!requiredLetter) return;
      const valid = GameState.categoryEntries.filter(p => {
        return p.split(' ')[0][0].toUpperCase() === requiredLetter &&
          !GameState.usedNames.has(p.toLowerCase());
      });
      if (valid.length > 0) {
        const shuffled = valid.sort(() => Math.random() - 0.5);
        const revealed = shuffled.slice(0, 3).join(', ');
        setHint(`Revealed: ${revealed}`);
      } else {
        setHint('No entries left for this letter!');
      }
      break;
    }
  }
}

function updatePowerUpButtons() {
  ['skip', 'extraTime', 'reveal'].forEach(type => {
    const btn = document.getElementById(`powerup-${type}`);
    if (btn) {
      const count = GameState.powerUps[type];
      const countEl = btn.querySelector('.powerup-count');
      if (countEl) countEl.textContent = count;
      btn.disabled = count <= 0;
      btn.classList.toggle('used', count <= 0);
    }
  });
}

// --------------- UI UPDATES ---------------
function updateUI() {
  updateScores();
  updateRequiredLetter();
  updateTurnIndicator();
  updateStats();
}

function updateScores() {
  const s1 = document.getElementById('score1');
  const s2 = document.getElementById('score2');
  if (s1) { s1.textContent = GameState.scores[1]; s1.classList.add('score-bump'); setTimeout(() => s1.classList.remove('score-bump'), 300); }
  if (s2) { s2.textContent = GameState.scores[2]; }

  document.getElementById('scoreBox1')?.classList.toggle('active', GameState.currentPlayer === 1);
  document.getElementById('scoreBox2')?.classList.toggle('active', GameState.currentPlayer === 2);
}

function updateRequiredLetter() {
  const el = document.getElementById('requiredLetter');
  const letterEl = document.getElementById('bigLetter');
  const req = getRequiredLetter();
  if (el && letterEl) {
    if (req) {
      letterEl.textContent = req;
      el.classList.remove('hidden');
      letterEl.classList.add('letter-pulse');
      setTimeout(() => letterEl.classList.remove('letter-pulse'), 600);
    } else {
      el.classList.add('hidden');
    }
  }
}

function updateTurnIndicator() {
  const el = document.getElementById('turnIndicator');
  if (!el) return;
  if (GameState.currentPlayer === 1) {
    el.textContent = 'Your Turn';
    el.className = 'turn-indicator your-turn';
  } else {
    el.textContent = "Computer's Turn";
    el.className = 'turn-indicator cpu-turn';
  }
}

function updateStreak() {
  const currentEl = document.getElementById('currentStreak');
  const bestEl = document.getElementById('bestStreak');
  if (currentEl) currentEl.textContent = GameState.currentStreak;
  if (bestEl) bestEl.textContent = GameState.bestStreak;

  const streakBar = document.getElementById('streakIndicator');
  if (streakBar) {
    const mult = getStreakMultiplier();
    if (mult > 1) {
      streakBar.textContent = `${mult}x Streak Bonus!`;
      streakBar.className = 'streak-indicator active streak-' + mult;
    } else {
      streakBar.textContent = '';
      streakBar.className = 'streak-indicator';
    }
  }
}

function updateStats() {
  const correctEl = document.getElementById('statCorrect');
  const wrongEl = document.getElementById('statWrong');
  const usedEl = document.getElementById('statUsed');
  if (correctEl) correctEl.textContent = GameState.totalCorrect;
  if (wrongEl) wrongEl.textContent = GameState.totalWrong;
  if (usedEl) usedEl.textContent = GameState.usedNames.size;
}

function updateLives() {
  const el = document.getElementById('livesContainer');
  if (!el) return;
  el.innerHTML = '';
  for (let i = 0; i < 3; i++) {
    const heart = document.createElement('span');
    heart.className = 'life-heart ' + (i < GameState.lives ? 'alive' : 'dead');
    heart.innerHTML = i < GameState.lives ? '&#9829;' : '&#9825;';
    el.appendChild(heart);
  }
}

function showError(msg) {
  const el = document.getElementById('errorMsg');
  if (el) { el.textContent = msg; el.classList.add('show'); setTimeout(() => el.classList.remove('show'), 3000); }
}

function clearError() {
  const el = document.getElementById('errorMsg');
  if (el) { el.textContent = ''; el.classList.remove('show'); }
}

function setHint(msg) {
  const el = document.getElementById('hintMsg');
  if (el) { el.textContent = msg; el.classList.add('show'); }
}

function clearHint() {
  const el = document.getElementById('hintMsg');
  if (el) { el.textContent = ''; el.classList.remove('show'); }
}

function disableInput(disabled) {
  const input = document.getElementById('playerInput');
  const submitBtn = document.getElementById('submitBtn');
  if (input) input.disabled = disabled;
  if (submitBtn) submitBtn.disabled = disabled;
}

function showNotification(text) {
  const notif = document.createElement('div');
  notif.className = 'notification';
  notif.textContent = text;
  document.body.appendChild(notif);
  setTimeout(() => notif.classList.add('show'), 10);
  setTimeout(() => { notif.classList.remove('show'); setTimeout(() => notif.remove(), 300); }, 2000);
}

// --------------- GAME OVER ---------------
function endGame(reason) {
  GameState.gameOver = true;
  clearInterval(GameState.timerInterval);
  playGameOverSound();
  disableInput(true);
  saveStats();

  const overlay = document.getElementById('gameOverOverlay');
  const reasonEl = document.getElementById('gameOverReason');
  const summaryEl = document.getElementById('gameOverSummary');

  if (reasonEl) reasonEl.textContent = reason;
  if (summaryEl) {
    const winner = GameState.scores[1] >= GameState.scores[2] ? 'You' : 'Computer';
    const winClass = winner === 'You' ? 'win' : 'lose';
    const accuracy = GameState.totalCorrect + GameState.totalWrong > 0
      ? Math.round(GameState.totalCorrect / (GameState.totalCorrect + GameState.totalWrong) * 100) : 0;

    summaryEl.innerHTML = `
      <div class="summary-result ${winClass}">${winner === 'You' ? 'You Win!' : 'Computer Wins!'}</div>
      <div class="summary-grid">
        <div class="summary-item"><span class="summary-label">Your Score</span><span class="summary-value">${GameState.scores[1]}</span></div>
        <div class="summary-item"><span class="summary-label">CPU Score</span><span class="summary-value">${GameState.scores[2]}</span></div>
        <div class="summary-item"><span class="summary-label">Best Streak</span><span class="summary-value">${GameState.bestStreak}</span></div>
        <div class="summary-item"><span class="summary-label">Correct</span><span class="summary-value">${GameState.totalCorrect}</span></div>
        <div class="summary-item"><span class="summary-label">Names Used</span><span class="summary-value">${GameState.usedNames.size}</span></div>
        <div class="summary-item"><span class="summary-label">Accuracy</span><span class="summary-value">${accuracy}%</span></div>
      </div>
    `;
  }
  if (overlay) overlay.classList.add('visible');
}

function shareScore() {
  const catName = CATEGORIES[GameState.category]?.name || 'NameDrop';
  const accuracy = GameState.totalCorrect + GameState.totalWrong > 0
    ? Math.round(GameState.totalCorrect / (GameState.totalCorrect + GameState.totalWrong) * 100) : 0;
  const text = `NameDrop - ${catName} | ${DifficultyConfig[GameState.difficulty].label}
Score: ${GameState.scores[1]} | Streak: ${GameState.bestStreak} | Accuracy: ${accuracy}%
Can you beat my score?`;

  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(() => showNotification('Copied to clipboard!'));
  } else {
    showNotification('Score: ' + GameState.scores[1]);
  }
}

// --------------- LOCAL STORAGE STATS ---------------
function getStatsKey() {
  return 'nameDropStats_' + (GameState.category || 'nba');
}

function saveStats() {
  try {
    const key = getStatsKey();
    const existing = JSON.parse(localStorage.getItem(key) || '{}');
    existing.gamesPlayed = (existing.gamesPlayed || 0) + 1;
    existing.totalCorrect = (existing.totalCorrect || 0) + GameState.totalCorrect;
    existing.bestStreak = Math.max(existing.bestStreak || 0, GameState.bestStreak);
    existing.bestScore = Math.max(existing.bestScore || 0, GameState.scores[1]);
    existing.wins = (existing.wins || 0) + (GameState.scores[1] >= GameState.scores[2] ? 1 : 0);
    localStorage.setItem(key, JSON.stringify(existing));
  } catch (e) { /* localStorage unavailable */ }
}

function loadStats() {
  try {
    const key = getStatsKey();
    const stats = JSON.parse(localStorage.getItem(key) || '{}');
    const el = document.getElementById('allTimeStats');
    if (el && stats.gamesPlayed) {
      el.innerHTML = `
        <div class="alltime-item"><span>Games</span><span>${stats.gamesPlayed}</span></div>
        <div class="alltime-item"><span>Wins</span><span>${stats.wins || 0}</span></div>
        <div class="alltime-item"><span>Best Score</span><span>${stats.bestScore || 0}</span></div>
        <div class="alltime-item"><span>Best Streak</span><span>${stats.bestStreak || 0}</span></div>
      `;
    }
  } catch (e) { /* localStorage unavailable */ }
}

// --------------- SETTINGS ---------------
function toggleSound() {
  GameState.soundEnabled = !GameState.soundEnabled;
  const btn = document.getElementById('soundToggle');
  if (btn) btn.textContent = GameState.soundEnabled ? 'ON' : 'OFF';
}

// --------------- GAME INITIALIZATION ---------------
function selectMode(mode) {
  GameState.mode = mode;
  document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('selected'));
  document.querySelector(`[data-mode="${mode}"]`)?.classList.add('selected');
}

function selectDifficulty(diff) {
  GameState.difficulty = diff;
  document.querySelectorAll('.diff-btn').forEach(b => b.classList.remove('selected'));
  document.querySelector(`[data-diff="${diff}"]`)?.classList.add('selected');
}

function startGame() {
  GameState.currentPlayer = 1;
  GameState.scores = { 1: 0, 2: 0 };
  GameState.gameHistory = [];
  GameState.usedNames = new Set();
  GameState.currentStreak = 0;
  GameState.bestStreak = 0;
  GameState.totalCorrect = 0;
  GameState.totalWrong = 0;
  GameState.gameOver = false;
  GameState.lives = 3;
  GameState.computerThinking = false;
  GameState.powerUps = { skip: 1, extraTime: 1, reveal: 1 };

  const config = DifficultyConfig[GameState.difficulty];
  GameState.hintsRemaining = config.hintsPerTurn;

  document.getElementById('setupScreen').classList.add('hidden');
  document.getElementById('gameScreen').classList.remove('hidden');
  document.getElementById('gameOverOverlay')?.classList.remove('visible');

  // Initial entry
  const entries = GameState.categoryEntries;
  const randomEntry = entries[Math.floor(Math.random() * entries.length)];
  addHistoryEntry('Start', randomEntry, null, 'First name');
  GameState.usedNames.add(randomEntry.toLowerCase());

  updateUI();
  updateHintButton();
  updatePowerUpButtons();
  updateLives();
  disableInput(false);

  if (GameState.mode === 'survival') {
    document.getElementById('livesSection')?.classList.remove('hidden');
  } else {
    document.getElementById('livesSection')?.classList.add('hidden');
  }

  startTimer();
  document.getElementById('playerInput')?.focus();
}

function restartGame() {
  document.getElementById('gameOverOverlay')?.classList.remove('visible');
  document.getElementById('gameScreen').classList.add('hidden');
  document.getElementById('setupScreen').classList.remove('hidden');
  clearInterval(GameState.timerInterval);
}

function quitToMenu() {
  GameState.gameOver = true;
  clearInterval(GameState.timerInterval);
  saveStats();
  document.getElementById('gameOverOverlay')?.classList.remove('visible');
  document.getElementById('gameScreen')?.classList.add('hidden');
  document.getElementById('setupScreen')?.classList.remove('hidden');
}

// --------------- HELP MODAL ---------------
function openHelp() { document.getElementById('helpModal')?.classList.add('visible'); }
function closeHelp() { document.getElementById('helpModal')?.classList.remove('visible'); }

// --------------- EVENT LISTENERS ---------------
document.addEventListener('DOMContentLoaded', function () {
  // Detect category from URL
  detectCategory();

  const input = document.getElementById('playerInput');
  if (input) {
    input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') { e.preventDefault(); submitName(); }
    });
  }

  setupAutocomplete();

  document.addEventListener('keydown', function (e) {
    if (GameState.gameOver) return;
    if (e.key === 'h' && document.activeElement !== input) { e.preventDefault(); showHint(); }
  });

  loadStats();
  selectMode('classic');
  selectDifficulty('medium');
});
