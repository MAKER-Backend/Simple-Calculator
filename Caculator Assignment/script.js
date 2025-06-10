// script.js

const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");
const clear = document.getElementById("clear");
const equal = document.getElementById("equal");
const backspace = document.getElementById("backspace");
const history = document.getElementById("history");

let expression = "";

function updateDisplay() {
  display.textContent = expression || "0";
}

function appendToHistory(exp, result) {
  const entry = document.createElement("div");
  entry.textContent = `${exp} = ${result}`;
  history.prepend(entry);
}

buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const value = btn.getAttribute("data-value");
    if (value !== null) {
      expression += value;
      updateDisplay();
    }
  });
});

clear.addEventListener("click", () => {
  expression = "";
  updateDisplay();
});

equal.addEventListener("click", () => {
  try {
    const result = eval(expression);
    appendToHistory(expression, result);
    expression = result.toString();
    updateDisplay();
  } catch {
    expression = "Error";
    updateDisplay();
    expression = "";
  }
});

backspace.addEventListener("click", () => {
  expression = expression.slice(0, -1);
  updateDisplay();
});

document.addEventListener("keydown", (e) => {
  if (
    (e.key >= "0" && e.key <= "9") ||
    ["+", "-", "*", "/", "."].includes(e.key)
  ) {
    expression += e.key;
    updateDisplay();
  } else if (e.key === "Enter") {
    equal.click();
  } else if (e.key === "Backspace") {
    backspace.click();
  } else if (e.key === "Escape") {
    clear.click();
  }
});

updateDisplay();
