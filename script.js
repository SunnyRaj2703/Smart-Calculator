let current = "";
const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");
const historyList = document.getElementById("history-list");
const historyContainer = document.getElementById("history-container");
const toggleHistoryBtn = document.getElementById("toggle-history");
const clearHistoryBtn = document.getElementById("clear-history");

let history = [];

// Add event listeners for calculator buttons
buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const value = btn.innerText;

    if (btn.classList.contains("num")) {
      current += value;
    } else if (btn.classList.contains("operator")) {
      if (current && !isNaN(current.slice(-1))) {
        current += value;
      }
    } else if (btn.classList.contains("clear")) {
      current = "";
    } else if (btn.classList.contains("del")) {
      current = current.slice(0, -1);
    } else if (btn.classList.contains("equal")) {
      try {
        const result = eval(current);
        history.unshift(`${current} = ${result}`);
        updateHistory();
        current = result.toString();
      } catch {
        current = "Error";
      }
    }

    display.value = current;
  });
});

// Update history list
function updateHistory() {
  historyList.innerHTML = history
    .map((item) => `<li>${item}</li>`)
    .join("");
}

// Toggle show/hide history
toggleHistoryBtn.addEventListener("click", () => {
  const hidden = historyContainer.classList.toggle("hidden");
  toggleHistoryBtn.innerText = hidden ? "Show History" : "Hide History";
});

// Clear history completely
clearHistoryBtn.addEventListener("click", () => {
  history = [];
  updateHistory();
});

// Keyboard support
document.addEventListener("keydown", (e) => {
  const key = e.key;

  if (/[0-9.]/.test(key)) {
    current += key;
  } else if (["+", "-", "*", "/"].includes(key)) {
    if (current && !isNaN(current.slice(-1))) {
      current += key;
    }
  } else if (key === "Enter") {
    try {
      const result = eval(current);
      history.unshift(`${current} = ${result}`);
      updateHistory();
      current = result.toString();
    } catch {
      current = "Error";
    }
  } else if (key === "Backspace") {
    current = current.slice(0, -1);
  } else if (key.toLowerCase() === "c") {
    current = "";
  }

  display.value = current;
});

