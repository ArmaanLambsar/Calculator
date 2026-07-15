const display = document.getElementById('display');
const historyList = document.getElementById('historyList');
const modeToggle = document.getElementById('modeToggle');
const clearHistoryBtn = document.getElementById('clearHistory');

const basicButtons = document.querySelector('.basic-mode');
const scientificButtons = document.querySelector('.scientific-mode');

let isScientific = false;
let history = [];

//Append number
function appendNumber(num) {
    display.value += num;
}

//Append operator
function appendOperator(op) {
    if (display.value === '' || /[+\-*/]$/.test(display.value)) return;
    display.value += op;
}

//Append scientific function
function appendFunction(func) {
    display.value += func;
}

//Clear display
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
        const result = Function('"use strict";return (' + display.value + ')')();
        if (!isFinite(result)) throw new Error("Math Error");
        addToHistory(display.value, result);
        display.value = result;
    } catch {
        display.value
    }
}