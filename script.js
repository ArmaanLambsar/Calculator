let currentInput = '';
let currentOperation = '';
let previousInput = '';

function appendNumber(number) {
    currentInput += number;
    UpdateDisplay();
}

function appendOperation(operation) {
    if (currentInput === '') return;
    if (previousInput !== '') calculate();
    currentOperation = operation;
    previousInput = currentInput;
    currentInput = '';
    updateDisplay();
}

function calculate() {
    if (previousInput === '' || currentInput === '') return;

    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    let result;

    switch (currentOperation) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            if (current === 0) {
                alert("Can't Divide by 0");
                return;
            }
            result = prev / current;
            break;
        default:
            return;
    }

     currentInput = result.toString();
     currentOperation = '';
     previousInput = '';
    updateDisplay();
}

    function clearDisplay() {
        currentInput = '';
        previousInput = '';
        currentOperation = '';
        updateDisplay();
    }

    function updateDisplay() {
        document.getElementById('display').value = `${currentInput} ${currentOperation} ${currentInput}`;
    }
