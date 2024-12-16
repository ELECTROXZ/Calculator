const display = document.getElementById('display');
const historyContent = document.getElementById('history-content');

function appendToDisplay(value) {
    if (display.innerText === '0') {
        display.innerText = value; // Replace '0' with the first digit or function
    } else {
        display.innerText += value; // Append the value to the display
    }
}

function clearDisplay() {
    display.innerText = '0'; // Reset display to '0'
}

function deleteLastDigit() {
    let currentDisplay = display.innerText;
    if (currentDisplay.length > 1) {
        display.innerText = currentDisplay.slice(0, -1); // Remove last character
    } else {
        display.innerText = '0'; // Reset to '0' if empty
    }
}

function deleteOneDigit() {
    let currentDisplay = display.innerText;
    if (currentDisplay.length > 0) {
        display.innerText = currentDisplay.slice(0, -1) || '0'; // Remove last character
    }
}

function calculateResult() {
    try {
        // Automatically add parentheses for trigonometric functions
        let expression = display.innerText
            .replace('÷', '/')
            .replace('×', '*') // Corrected multiplication operator
            .replace(/sin(\d+)/g, 'sin($1)') // Add parentheses for sin
            .replace(/cos(\d+)/g, 'cos($1)') // Add parentheses for cos
            .replace(/tan(\d+)/g, 'tan($1)') // Add parentheses for tan
            .replace(/log(\d+)/g, 'log($1)') // Add parentheses for log
            .replace(/sqrt\(([^)]+)\)/g, 'Math.sqrt($1)') // Handle square root
            .replace(/sin\(([^)]+)\)/g, 'Math.sin($1 * Math.PI / 180)') // Convert degrees to radians
            .replace(/cos\(([^)]+)\)/g, 'Math.cos($1 * Math.PI / 180)') // Convert degrees to radians
            .replace(/tan\(([^)]+)\)/g, 'Math.tan($1 * Math.PI / 180)') // Convert degrees to radians
            .replace(/log\(([^)]+)\)/g, 'Math.log10($1)'); // Log base 10

        const result = eval(expression); // Evaluate expression
        display.innerText = result; // Show result in display
        addToHistory(expression + ' = ' + result); // Add expression and result to history
    } catch (error) {
        display.innerText = 'Error'; // Show error if evaluation fails
    }
}

function addToHistory(entry) {
    const historyEntry = document.createElement('div');
    historyEntry.innerText = entry;
    historyContent.appendChild(historyEntry); // Add entry to history
}

function toggleHistory() {
    const history = document.getElementById('history');
    history.style.display = history.style.display === 'none' ? 'block' : 'none'; // Toggle history visibility
}

// New functions for trigonometric and logarithmic functions
function appendFunction(func) {
    if (display.innerText === '0') {
        display.innerText = func; // Replace '0' with the function name
    } else {
        display.innerText += func; // Append the function name to the display
    }
}

// Override the appendToDisplay for specific functions
function appendSin() {
    appendToDisplay('sin(');
}

function appendCos() {
    appendToDisplay('cos(');
}

function appendTan() {
    appendToDisplay('tan(');
}

function appendLog() {
    appendToDisplay('log(');
}

// Theme toggle function
function toggleTheme() {
    const body = document.body;
    const calculator = document.querySelector('.calculator');
    const display = document.querySelector('.display');
    const buttons = document.querySelectorAll('.btn');
    const operators = document.querySelectorAll('.operator');
    const historyIcon = document.querySelector('.history-icon');

    body.classList.toggle('dark');
    calculator.classList.toggle('dark');
    display.classList.toggle('dark');

    buttons.forEach(button => button.classList.toggle('dark'));
    operators.forEach(operator => operator.classList.toggle('dark'));
    historyIcon.classList.toggle('dark');
}
