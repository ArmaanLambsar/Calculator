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
    if (display.value === '' || /[+\-*/^]$/.test(display.value)) return;
    display.value += op;
}

// Append scientific function
function appendFunction(func) {
    display.value += func;
}

function normalizeExpression(expression) {
    if (!expression) return '';

    let normalized = expression
        .trim()
        .replace(/×/g, '*')
        .replace(/÷/g, '/')
        .replace(/\^/g, '**')
        .replace(/π/g, 'Math.PI')
        .replace(/e/g, 'Math.E');

    const openParentheses = (normalized.match(/\(/g) || []).length;
    const closeParentheses = (normalized.match(/\)/g) || []).length;

    if (openParentheses > closeParentheses) {
        normalized += ')'.repeat(openParentheses - closeParentheses);
    }

    return normalized;
}

function calculateExpression(expression) {
    let normalized = normalizeExpression(expression);
    normalized = normalized.replace(/Math\.sin\(/g, 'sin(');
    normalized = normalized.replace(/Math\.cos\(/g, 'cos(');
    normalized = normalized.replace(/Math\.tan\(/g, 'tan(');

    try {
        const result = Function(
            '"use strict"; const sin = (value) => Math.sin(value * Math.PI / 180); const cos = (value) => Math.cos(value * Math.PI / 180); const tan = (value) => Math.tan(value * Math.PI / 180); return (' + normalized + ')'
        )();
        if (!Number.isFinite(result)) throw new Error('Math Error');
        return result;
    } catch {
        return 'Error';
    }
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
    if (display.value === '') return;

    const result = calculateExpression(display.value);

    if (result === 'Error') {
        display.value = 'Error';
        return;
    }

    // Add to history
    addToHistory(display.value, result);

    // Show result immediately
    display.value = result;
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

window.calculateExpression = calculateExpression;