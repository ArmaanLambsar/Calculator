const display = document.getElementById('display');
const historyList = document.getElementById('historyList');
const modeToggle = document.getElementById('modeToggle');
const clearHistoryBtn = document.getElementById('clearHistory');

const scientificButtons = document.querySelector('.scientific-mode');

let isScientific = false;
let history = [];

// Append number
function appendNumber(num) {
    display.value += num;
}

// Append operator
function appendOperator(op) {
    if (display.value === '' || /[+\-*/]$/.test(display.value)) return;
    display.value += op;
}

// Append scientific function
function appendFunction(func) {
    display.value += func;
}

// Clear display
function clearDisplay() {
    display.value = '';
}

// Delete last character
function deleteLast() {
    display.value = display.value.slice(0, -1);
}

// Calculate result safely
function calculateResult() {
    try {
        if (display.value === '') return;
        // Safe evaluation using Function constructor
        const result = Function('"use strict";return (' + display.value + ')')();
        if (!isFinite(result)) throw new Error("Math Error");

        // Add to history
        addToHistory(display.value, result);

        // Show result immediately
        display.value = result;
    } catch {
        display.value = "Error";
    }
}

// Add calculation to history
function addToHistory(expression, result) {
    const entry = `${expression} = ${result}`;
    history.unshift(entry); // Add to start
    renderHistory();
}

// Render history list
function renderHistory() {
    historyList.innerHTML = '';
    history.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        historyList.appendChild(li);
    });
}

// Toggle between basic and scientific mode
modeToggle.addEventListener('click', () => {
    isScientific = !isScientific;
    if (isScientific) {
        scientificButtons.classList.remove('hidden');
        modeToggle.textContent = "Switch to Basic";
    } else {
        scientificButtons.classList.add('hidden');
        modeToggle.textContent = "Switch to Scientific";
    }
});

// Clear history
clearHistoryBtn.addEventListener('click', () => {
    history = [];
    renderHistory();
});

// Allow pressing Enter to calculate
document.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        calculateResult();
    }
});