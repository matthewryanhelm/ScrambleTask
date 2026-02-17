// Wordle-style anagram prototype: multiple items, multiple attempts, skip after attempt+delay

// 1) Configuration
const LETTERS_PER_WORD = 5;
const SKIP_DELAY_MS = 3000; // 3 seconds

// Global task duration (for testing: 1 minute)
const TOTAL_TASK_MS = 1 * 60 * 1000; // 1 minute for testing

// 2) Define a small set of test items
const urlParams = new URLSearchParams(window.location.search);
const condition = urlParams.get("cond") || "Easy";

const ITEMS = [
  { trialIndex: 0, itemId: 1, scramble: "TAPEL", solution: "PLATE", difficulty: "Easy", condition, isUnsolvable: false },
  { trialIndex: 1, itemId: 2, scramble: "NOGAR", solution: "ORGAN", difficulty: "Easy", condition, isUnsolvable: false },
  { trialIndex: 2, itemId: 3, scramble: "TRIAC", solution: "CRAIT", difficulty: "Hard", condition, isUnsolvable: false }, // placeholder
  { trialIndex: 3, itemId: 4, scramble: "MIRAG", solution: "GRAIM", difficulty: "Hard", condition, isUnsolvable: true },  // unsolvable example
  { trialIndex: 4, itemId: 5, scramble: "SNELO", solution: "NOELS", difficulty: "Easy", condition, isUnsolvable: false }
];

// 3) Global state
let trials = [];
let currentItemIndex = 0;

let attempts = 0;
let trialStartMs = Date.now();
let firstAttemptMs = null;
let finishedCurrentItem = false;
let skipTimerId = null;

// Global task timer state
let globalTaskTimeoutId = null;
let taskEndedByTime = false;

// Current editable row inputs
let currentRowInputs = [];

// 4) DOM references
const scrambleDiv = document.getElementById("scramble");
const boardDiv = document.getElementById("board");
const messageDiv = document.getElementById("message");
const skipBtn = document.getElementById("skipBtn");
const timerDiv = document.getElementById("timer");

// 5) Helper to get current item
function getCurrentItem() {
  return ITEMS[currentItemIndex];
}

// 6) Helper to send data to Qualtrics (or any parent frame) safely
function sendTaskDataToParent(reason) {
  const payload = {
    type: "ScrambleTaskComplete",
    reason, // "block_complete" or "time_limit"
    data: trials
  };

  try {
    // Only attempt if there is a different parent (i.e., we are in an iframe)
    if (window.parent && window.parent !== window && typeof window.parent.postMessage === "function") {
      window.parent.postMessage(payload, "*");
    } else {
      console.log("No parent window for postMessage. Payload:", payload);
    }
  } catch (e) {
    console.error("postMessage failed:", e, payload);
  }
}

// 7) Build attempt rows
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

      // Attach per-input handlers
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

// 8) Trial start / next item

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
    // All items done (but global timer might still be running)
    stopTimerDisplay();
    messageDiv.textContent = "Block complete.";

    console.log("All trials:", trials);
    // Notify parent (Qualtrics) that the block is complete
    sendTaskDataToParent("block_complete");
  } else {
    startCurrentItem();
  }
}

// 9) Get current guess
function getCurrentGuess() {
  if (!currentRowInputs || currentRowInputs.length !== LETTERS_PER_WORD) return null;
  let letters = currentRowInputs.map(inp => (inp.value || "").trim().toUpperCase());
  if (letters.some(l => l === "")) {
    return null; // incomplete
  }
  return letters.join("");
}

// 10) Lock current row and keep only last attempt
function lockCurrentRow(guess) {
  // Remove the last row (current editable)
  const lastRow = boardDiv.lastElementChild;
  if (lastRow) boardDiv.removeChild(lastRow);

  // Add readonly row with the guess
  const letters = guess.split("");
  createAttemptRow(true, letters);

  // Keep only the most recent incorrect attempt on screen
  while (boardDiv.children.length > 1) {
    boardDiv.removeChild(boardDiv.firstElementChild);
  }
}

// 11) New editable row
function addNewAttemptRow() {
  createAttemptRow(false, null);
}

// 12) Finish current item
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
    timestampEnd: new Date(endMs).toISOString()
  };

  trials.push(trialRecord);

  messageDiv.textContent = correct ? "Correct! Moving to next anagram..." : "Moving to next anagram...";
  stopTimerDisplay();

  console.log("Trial complete:", trialRecord);

  // Brief pause so they can see the feedback, then move on
  setTimeout(() => {
    goToNextItemOrFinishBlock();
  }, 800);
}

// 13) Handle submission of an attempt
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
    // Start skip delay after first attempt
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
    messageDiv.textContent = "That is not correct. Try again or use Skip if you cannot solve this one.";
    addNewAttemptRow();
  }
}

// 14) Skip logic
skipBtn.addEventListener("click", () => {
  if (finishedCurrentItem || taskEndedByTime) return;
  const guess = getCurrentGuess() || "";
  attempts += 1;
  finishCurrentItem({ response: guess, correct: false, skipped: true });
});

// 15) On-screen timer (per item)
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

// 16) Global task timer

function startGlobalTaskTimer() {
  globalTaskTimeoutId = setTimeout(() => {
    taskEndedByTime = true;
    endTaskDueToTime();
  }, TOTAL_TASK_MS);
}

function endTaskDueToTime() {
  // Prevent any further per-item progression
  finishedCurrentItem = true;

  // Hide skip button and stop per-item timer
  skipBtn.style.display = "none";
  stopTimerDisplay();

  // Clear pending skip timer if any
  if (skipTimerId) {
    clearTimeout(skipTimerId);
    skipTimerId = null;
  }

  messageDiv.textContent = "Task complete.";

  console.log("Task ended by global time limit.", { trials });

  // Notify parent (Qualtrics) that the task ended due to time
  sendTaskDataToParent("time_limit");
}

// 17) Start the first item and the global task timer
startCurrentItem();
startGlobalTaskTimer();
