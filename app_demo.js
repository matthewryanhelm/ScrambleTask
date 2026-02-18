// One-condition anagram demo: multiple items, multiple attempts, skip, global time limit

// 1) Configuration
const LETTERS_PER_WORD = 5;
const SKIP_DELAY_MS = 3000; // 3 seconds before Skip appears after first attempt
const TOTAL_TASK_MS = 15 * 60 * 1000; // 15 minute task timer

// 2) Stimuli: simple Easy-only demo set
const STIMULI = {
  Easy: [
    { itemId: 1, scramble: "FITSH", solution: "SHIFT", difficulty: "Easy", isUnsolvable: false },
    { itemId: 2, scramble: "COVRE", solution: "COVER", difficulty: "Easy", isUnsolvable: false },
    { itemId: 3, scramble: "ESFOX", solution: "FOXES", difficulty: "Easy", isUnsolvable: false },
    { itemId: 4, scramble: "POREW", solution: "POWER", difficulty: "Easy", isUnsolvable: false },
    { itemId: 5, scramble: "SCROW", solution: "CROWS", difficulty: "Easy", isUnsolvable: false },
  ],
};

// 3) Condition from URL and ITEMS array (for this demo, effectively only "Easy")
const urlParams = new URLSearchParams(window.location.search);
const condition = urlParams.get("cond") || "Easy";

// Simple Fisher–Yates shuffle copy
function shuffleArray(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// For this demo we ignore MixedFutility logic and just shuffle Easy
const baseList = shuffleArray(STIMULI[condition] || STIMULI["Easy"]);

const ITEMS = baseList.map((stim, idx) => ({
  trialIndex: idx,
  condition: condition,
  ...stim,
}));

// 4) Global state
let trials = [];
let currentItemIndex = 0;

let attempts = 0;
let trialStartMs = Date.now();
let firstAttemptMs = null;
let finishedCurrentItem = false;
let skipTimerId = null;

let globalTaskTimeoutId = null;
let taskEndedByTime = false;

// Current editable row inputs
let currentRowInputs = [];

// 5) DOM references
const scrambleDiv = document.getElementById("scramble");
const boardDiv = document.getElementById("board");
const messageDiv = document.getElementById("message");
const skipBtn = document.getElementById("skipBtn");
const timerDiv = document.getElementById("timer");
const keyboardDiv = document.getElementById("keyboard");

// 6) Helper to get current item
function getCurrentItem() {
  return ITEMS[currentItemIndex];
}

// 7) Helper to send data to Qualtrics (or any parent frame) safely
function sendTaskDataToParent(reason) {
  const payload = {
    type: "ScrambleTaskComplete",
    reason, // "block_complete" or "time_limit"
    data: trials,
  };

  try {
    if (window.parent && window.parent !== window && typeof window.parent.postMessage === "function") {
      window.parent.postMessage(payload, "*");
    } else {
      console.log("No parent window for postMessage. Payload:", payload);
    }
  } catch (e) {
    console.error("postMessage failed:", e, payload);
  }
}

// 8) Build attempt rows
function createAttemptRow(readonly, letters) {
  const row = document.createElement("div");
  row.className = "attempt-row";

  const boxes = [];
  for (let i = 0; i < LETTERS_PER_WORD; i++) {
    const box = document.createElement("div");
    box.className = "letter-box";

    if (readonly) {
      box.classList.add("readonly");
      box.textContent = (letters && letters[i]) ? letters[i].toUpperCase() : "";
    } else {
      const input = document.createElement("input");
      input.type = "text";
      input.maxLength = 1;
      input.autocomplete = "off";
      input.setAttribute("enterkeyhint", "done");

      input.addEventListener("keydown", (e) => {
        if (finishedCurrentItem || taskEndedByTime) return;

        const idx = boxes.indexOf(input);

        if (e.key === "Enter") {
          e.preventDefault();
          handleSubmitAttempt();
        } else if (e.key === "ArrowLeft") {
          e.preventDefault();
          if (idx > 0) boxes[idx - 1].focus();
        } else if (e.key === "ArrowRight") {
          e.preventDefault();
          if (idx < boxes.length - 1) boxes[idx + 1].focus();
        } else if (e.key === "Backspace") {
          e.preventDefault();
          if (input.value) {
            input.value = "";
          } else if (idx > 0) {
            boxes[idx - 1].value = "";
            boxes[idx - 1].focus();
          }
        } else if (e.key.length === 1 && /^[a-zA-Z]$/.test(e.key)) {
          e.preventDefault();
          input.value = e.key.toUpperCase();
          if (idx < boxes.length - 1) {
            boxes[idx + 1].focus();
          }
        }
      });

      box.appendChild(input);
      boxes.push(input);
    }

    row.appendChild(box);
  }

  boardDiv.appendChild(row);

  if (!readonly) {
    currentRowInputs = boxes;
    if (currentRowInputs[0]) currentRowInputs[0].focus();
  }
}

// 9) Trial start / next item
function startCurrentItem() {
  const item = getCurrentItem();
  boardDiv.innerHTML = "";
  messageDiv.textContent = "";
  attempts = 0;
  trialStartMs = Date.now();
  firstAttemptMs = null;
  finishedCurrentItem = false;
  skipBtn.style.display = "none";
  if (skipTimerId) {
    clearTimeout(skipTimerId);
    skipTimerId = null;
  }

  scrambleDiv.textContent = `Unscramble: ${item.scramble}`;
  createAttemptRow(false, null);
  startTimerDisplay();
}

function goToNextItemOrFinishBlock() {
  if (taskEndedByTime) return;

  currentItemIndex += 1;
  if (currentItemIndex >= ITEMS.length) {
    stopTimerDisplay();
    messageDiv.textContent = "Block complete.";
    console.log("All trials:", trials);
    sendTaskDataToParent("block_complete");
  } else {
    startCurrentItem();
  }
}

// 10) Get current guess
function getCurrentGuess() {
  if (!currentRowInputs || currentRowInputs.length !== LETTERS_PER_WORD) return null;
  let letters = currentRowInputs.map(inp => (inp.value || "").trim().toUpperCase());
  if (letters.some(l => l === "")) {
    return null;
  }
  return letters.join("");
}

// 11) Lock current row and keep only last attempt
function lockCurrentRow(guess) {
  const lastRow = boardDiv.lastElementChild;
  if (lastRow) boardDiv.removeChild(lastRow);

  const letters = guess.split("");
  createAttemptRow(true, letters);

  while (boardDiv.children.length > 1) {
    boardDiv.removeChild(boardDiv.firstElementChild);
  }
}

// 12) New editable row
function addNewAttemptRow() {
  createAttemptRow(false, null);
}

// 13) Finish current item
function finishCurrentItem({ response, correct, skipped }) {
  if (finishedCurrentItem || taskEndedByTime) return;
  finishedCurrentItem = true;

  const item = getCurrentItem();
  const endMs = Date.now();
  const rtMs = endMs - trialStartMs;

  const trialRecord = {
    trialIndex: item.trialIndex,
    itemId: item.itemId,
    scramble: item.scramble,
    solution: item.solution,
    difficulty: item.difficulty,
    condition: item.condition,
    isUnsolvable: item.isUnsolvable,
    response: response,
    correct: correct,
    skipped: skipped,
    rtMs: rtMs,
    attempts: attempts,
    timestampStart: new Date(trialStartMs).toISOString(),
    timestampEnd: new Date(endMs).toISOString(),
  };

  trials.push(trialRecord);

  messageDiv.textContent = correct
    ? "Correct! Moving to next anagram..."
    : "Moving to next anagram...";
  stopTimerDisplay();

  console.log("Trial complete:", trialRecord);

  setTimeout(() => {
    goToNextItemOrFinishBlock();
  }, 800);
}

// 14) Handle submission of an attempt
function handleSubmitAttempt() {
  if (finishedCurrentItem || taskEndedByTime) return;

  const guess = getCurrentGuess();
  if (!guess) {
    messageDiv.textContent = "Please fill all 5 letters before submitting.";
    return;
  }
  attempts += 1;

  if (!firstAttemptMs) {
    firstAttemptMs = Date.now();
    skipTimerId = setTimeout(() => {
      if (!finishedCurrentItem && !taskEndedByTime) {
        skipBtn.style.display = "inline-block";
      }
    }, SKIP_DELAY_MS);
  }

  lockCurrentRow(guess);

  const item = getCurrentItem();
  if (!item.isUnsolvable && guess === item.solution.toUpperCase()) {
    finishCurrentItem({ response: guess, correct: true, skipped: false });
  } else {
    messageDiv.textContent =
      "Try again or use the 'Skip' button if you think that you cannot solve this one.";
    addNewAttemptRow();
  }
}

// 15) Skip logic
skipBtn.addEventListener("click", () => {
  if (finishedCurrentItem || taskEndedByTime) return;
  const guess = getCurrentGuess() || "";
  attempts += 1;
  finishCurrentItem({ response: guess, correct: false, skipped: true });
});

// 16) On-screen timer (per item)
let timerIntervalId = null;

function startTimerDisplay() {
  if (timerIntervalId) clearInterval(timerIntervalId);
  timerIntervalId = setInterval(() => {
    const now = Date.now();
    const elapsed = Math.floor((now - trialStartMs) / 1000);
    timerDiv.textContent = `Time: ${elapsed}s`;
  }, 1000);
}

function stopTimerDisplay() {
  if (timerIntervalId) {
    clearInterval(timerIntervalId);
    timerIntervalId = null;
  }
}

// 17) Global task timer
function startGlobalTaskTimer() {
  globalTaskTimeoutId = setTimeout(() => {
    taskEndedByTime = true;
    endTaskDueToTime();
  }, TOTAL_TASK_MS);
}

function endTaskDueToTime() {
  finishedCurrentItem = true;
  skipBtn.style.display = "none";
  stopTimerDisplay();

  if (skipTimerId) {
    clearTimeout(skipTimerId);
    skipTimerId = null;
  }

  messageDiv.textContent = "Task complete.";
  console.log("Task ended by global time limit.", { trials });

  sendTaskDataToParent("time_limit");
}

// 18) On-screen keyboard handler
if (keyboardDiv) {
  keyboardDiv.addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-key]");
    if (!btn || finishedCurrentItem || taskEndedByTime) return;

    const key = btn.getAttribute("data-key");

    if (key === "ENTER") {
      handleSubmitAttempt();
    } else if (key === "BACKSPACE") {
      if (!currentRowInputs || currentRowInputs.length === 0) return;
      // Backspace: delete from rightmost filled box
      let idx = -1;
      for (let i = currentRowInputs.length - 1; i >= 0; i--) {
        if (currentRowInputs[i].value) {
          idx = i;
          break;
        }
      }
      if (idx === -1) {
        currentRowInputs[currentRowInputs.length - 1].focus();
      } else {
        currentRowInputs[idx].value = "";
        currentRowInputs[idx].focus();
      }
    } else {
      // letter key
      const letter = key.toUpperCase();
      if (!currentRowInputs || currentRowInputs.length === 0) return;

      let idx = currentRowInputs.findIndex(inp => document.activeElement === inp);
      if (idx === -1) {
        idx = currentRowInputs.findIndex(inp => !inp.value);
        if (idx === -1) idx = 0;
      }

      if (idx >= 0 && idx < currentRowInputs.length) {
        currentRowInputs[idx].value = letter;
        if (idx < currentRowInputs.length - 1) {
          currentRowInputs[idx + 1].focus();
        }
      }
    }
  });
}

// 19) Start the first item and the global task timer
startCurrentItem();
startGlobalTaskTimer();
