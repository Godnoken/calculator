let firstOperand = "";
let secondOperand = "";
let operationChosen = null;

const buttons = document.querySelectorAll(".button");
const clear = document.querySelector("#clear");
const undo = document.querySelector("#undo");
const equals = document.querySelector("#equals");
let displayInput = document.querySelector("#displayInput");
let displayResult = document.querySelector("#displayResult");

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(operation, number1, number2) {
    number1 = Number(number1);
    number2 = Number(number2);
    
    switch (operation) {
        case "+":
            operation = add;
            break;
        case "-":
            operation = subtract;
            break;
        case "*":
            operation = multiply;
            break;
        case "/":
            operation = divide;
            break;
    }

    return Math.round(operation(number1, number2) * 1000) / 1000;
}

document.querySelectorAll(".number").forEach((number) => {
    number.addEventListener("click", () => handleNumbers(number.textContent))
})

function handleNumbers(number) {

    if (displayInput.textContent === "0") {
        displayInput.textContent = "";
    }

    if (displayInput.textContent.length >= 20) {
        return;
    }
    
    if (operationChosen !== null) {
        secondOperand += number;
    } else {
        firstOperand += number;
    }

    displayInput.textContent += number.toString();
}

document.querySelectorAll(".operator").forEach((operator) => {
    operator.addEventListener("click", () => handleOperators(operator.textContent))
})

function handleOperators(operator) {

    if (operationChosen !== null) {

        if (operationChosen == "/", secondOperand === "0") {
            handleInvalidMath();
            return;
        }

        if (secondOperand === "") {
            operationChosen = operator;
            displayInput.textContent = firstOperand + operator;
            return;
        }

        calculatedNumber = operate(operationChosen, firstOperand, secondOperand);
        displayResult.textContent = calculatedNumber;
        displayInput.textContent = calculatedNumber + operator;
        firstOperand = calculatedNumber;
        secondOperand = "";
        operationChosen = operator;
    }
    else {
        operationChosen = operator;
        displayInput.textContent += operator;
    }
}

document.querySelector("#equals").addEventListener("click", handleEquals);

function handleEquals() {

    if (operationChosen !== null && secondOperand !== "") {

        if (operationChosen == "/", secondOperand === "0") {
            handleInvalidMath();
            return;
        }

        calculatedNumber = operate(operationChosen, firstOperand, secondOperand);
        displayResult.textContent = calculatedNumber;
        displayInput.textContent = calculatedNumber;
        firstOperand = calculatedNumber;
        secondOperand = "";
        operationChosen = null;
    }
}

document.querySelector("#decimal").addEventListener("click", handleDecimal);

function handleDecimal() {

    if (secondOperand === "" && !firstOperand.includes(".")) {
        firstOperand = firstOperand + ".";
        displayInput.textContent += ".";
    }
    else if (secondOperand !== "" && !secondOperand.includes(".")) {
        secondOperand = secondOperand + ".";
        displayInput.textContent += ".";
    }

}

document.querySelector("#clear").addEventListener("click", handleClear);

function handleClear() {
    firstOperand = "";
    secondOperand = "";
    operationChosen = null;
    displayInput.textContent = "0";
    displayResult.textContent = "";
}

document.querySelector("#undo").addEventListener("click", handleUndo);

function handleUndo() {

    if (operationChosen === null) {
        firstOperand = firstOperand.toString().slice(0, -1);
    }
    else if (displayInput.textContent.indexOf(operationChosen) === displayInput.textContent.length - 1) {
        operationChosen = null;
    }
    else {
        secondOperand = secondOperand.slice(0, -1);
    }

    displayInput.textContent = displayInput.textContent.slice(0, -1);
}

function handleInvalidMath()  {
        displayResult.textContent ="MATH";
        displayInput.textContent = "ERROR";
        setTimeout(() => {
            handleClear();
        }, 2000)
}

window.addEventListener("keydown", handleKeyboard);

function handleKeyboard(event) {

    let buttonToAnimate;

    buttons.forEach((button) => {
        if (button.textContent == event.key.toString()) {
            buttonToAnimate = button;
        }
    })

    if (event.key >= 0 && event.key <= 9) handleNumbers(event.key), handlePulseAnimation(buttonToAnimate);
    if (event.key === ".") handleDecimal(), handlePulseAnimation(buttonToAnimate);
    if (event.key === "Escape") handleClear(), handlePulseAnimation(clear);
    if (event.key === "Backspace") handleUndo(), handlePulseAnimation(undo);
    if (event.key === "Enter") handleEquals(), handlePulseAnimation(equals);
    if (
        event.key === "/"
        ||
        event.key === "+"
        ||
        event.key === "-"
        ||
        event.key === "*"
        ) handleOperators(event.key), handlePulseAnimation(buttonToAnimate);
}

document.querySelectorAll(".button").forEach((button) => {
    button.addEventListener("click", () => handlePulseAnimation(button))
})

function handlePulseAnimation(button) {
    button.classList.remove("active");
    button.offsetWidth;
    button.classList.add("active");
}