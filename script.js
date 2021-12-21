/** Global variables */

let firstOperand = "0";
let secondOperand = "";
let operationChosen = null;

const instructionsArrowElement = document.querySelector("#instructionsArrow");
const instructionsElement = document.querySelector("#instructionsContainer");
const buttonElements = document.querySelectorAll(".button");
const numberElements = document.querySelectorAll(".number");
const operatorElements = document.querySelectorAll(".operator");
const powerElement = document.querySelector("#power");
const factorialElement = document.querySelector("#factorial");
const decimalElement = document.querySelector("#decimal");
const equalElement = document.querySelector("#equals");
const clearElement = document.querySelector("#clear");
const undoElement = document.querySelector("#undo");
const displayInput = document.querySelector("#displayInput");
const displayResult = document.querySelector("#displayResult");




/** Math Functions */

function add(firstNumber, secondNumber) {
    return firstNumber + secondNumber;
}

function subtract(firstNumber, secondNumber) {
    return firstNumber - secondNumber;
}

function multiply(firstNumber, secondNumber) {
    return firstNumber * secondNumber;
}

function divide(firstNumber, secondNumber) {
    return firstNumber / secondNumber;
}

function power(base, exponent) {

    let powerSum = base;

    // Negative exponentiation
    if (secondOperand.includes("-")) {
        for (let i = 0; i > exponent + 1; i--) {
            powerSum = powerSum * base;
        }
        return powerSum = divide(1, powerSum);
    }

    // Positive exponentiation
    for (let i = 0; i < exponent - 1; i++) {
        powerSum = powerSum * base;
    }
    return powerSum;
}

function factorial(number) {
    let sum = number;

    if (number === 0) return 1;

    while (number > 1) {
        number--;
        sum = sum * number;
    }

    return sum;
}




/** Calculator functions */

// Reads which operation the user chose and calculates
function operate(operation, number1, number2) {

    // Convert operands from strings to numbers
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
        case "xy":
            operation = power;
            // If user input a negative exponent, don't limit decimal amount
            if (secondOperand.includes("-")) return operation(number1, number2);
            break;
        case "x!":
            operation = factorial;
            break;
    }

    return Math.round(operation(number1, number2) * 1000) / 1000;
}

numberElements.forEach((number) => {
    number.addEventListener("click", () => handleNumbers(number.textContent))
})

function handleNumbers(number) {

    if (displayInput.textContent === "0") {
        displayInput.textContent = number;
        firstOperand = number;
        return;
    }

    if (displayInput.textContent.length >= 20) {
        return;
    }

    if (secondOperand === "0" && number !== "0") {
        secondOperand = number;
        displayInput.textContent = displayInput.textContent.slice(0, -1) + secondOperand;
        return;
    }

    if (operationChosen !== null) {
        secondOperand += number;

    } else {
        firstOperand += number;
    }

    if (operationChosen === "xy") {
        displayInput.innerHTML += `<sup>${number}</sup`;
        return;
    }

    displayInput.textContent += number;
}

operatorElements.forEach((operator) => {
    operator.addEventListener("click", () => handleOperators(operator.textContent))
})

function handleOperators(operator) {

    if (operationChosen === "xy" && operator === "-") {
        if (secondOperand.includes("-") || secondOperand !== "") return;
        console.log(secondOperand)
        secondOperand += operator;
        displayInput.innerHTML += `<sup>${operator}</sup`;
        console.log(secondOperand)
        return;
    }

    if (firstOperand === "" && operator !== "-") return;
    if (firstOperand === "-" || firstOperand === "-" && operator !== "") return;
    if (secondOperand === "-" && operator !== "") return;

    if (operationChosen !== "-" && operationChosen !== null && operator === "-") {
        secondOperand = operator;
        displayInput.textContent = firstOperand + operationChosen + secondOperand;
        return;
    }

    if (firstOperand === "" && operator === "-" || firstOperand === "0" && operator === "-") {
        firstOperand = operator;
        displayInput.textContent = operator
        return;
    }

    if (firstOperand === "0") return;

    if (secondOperand === "" && operator !== "-") {
        operationChosen = operator;
        displayInput.textContent = firstOperand + operator;
        return;
    }

    if (secondOperand === "" && operationChosen === "-" && firstOperand !== "-") {
        secondOperand = operator;
        displayInput.textContent += operator;
        return;
    }

    if (operationChosen !== null) {

        if (operationChosen == "/" && secondOperand === "0") {
            handleInvalidMath();
            return;
        }

        if (secondOperand === "") {
            operationChosen = operator;
            displayInput.textContent = firstOperand + operator;
            return;
        }

        const calculatedNumber = operate(operationChosen, firstOperand, secondOperand);
        displayResult.textContent = calculatedNumber;
        displayInput.textContent = calculatedNumber + operator;
        firstOperand = calculatedNumber;
        secondOperand = "";
        operationChosen = operator;
    }
    else {
        displayInput.textContent += operator;
        operationChosen = operator;
    }
}

factorialElement.addEventListener("click", handleFactorial);

function handleFactorial() {

    const number = Number(firstOperand);

    if (firstOperand < 0 || !Number.isInteger(number) || operationChosen !== null) return handleInvalidMath();

    if (operationChosen === null) {
        operationChosen = "x!";
        const calculatedNumber = operate(operationChosen, firstOperand);
        displayResult.textContent = calculatedNumber;
        displayInput.textContent = calculatedNumber;
        firstOperand = calculatedNumber;
        secondOperand = "";
        operationChosen = null;
    }
}

powerElement.addEventListener("click", handlePower);

function handlePower() {

    if (operationChosen !== null || firstOperand === "0") {
        return;
    }
    else if (firstOperand !== "") {
        operationChosen = powerElement.textContent;
    }
}

equalElement.addEventListener("click", handleEquals);

function handleEquals() {

    if (operationChosen !== null && secondOperand !== "") {

        if (operationChosen == "/" && secondOperand === "0") {
            handleInvalidMath();
            return;
        }

        const calculatedNumber = operate(operationChosen, firstOperand, secondOperand);
        displayResult.textContent = calculatedNumber;
        displayInput.textContent = calculatedNumber;
        firstOperand = calculatedNumber;
        secondOperand = "";
        operationChosen = null;
    }
}

decimalElement.addEventListener("click", handleDecimal);

function handleDecimal() {

    if (operationChosen === "xy") return;

    if (secondOperand !== "" && !secondOperand.includes(".")) {
        secondOperand = secondOperand + ".";
        displayInput.textContent += ".";
    }
    else if (firstOperand !== "" && !firstOperand.includes(".") && operationChosen === null) {
        firstOperand = firstOperand + ".";
        displayInput.textContent += ".";
    }
}

clearElement.addEventListener("click", handleClear);

function handleClear() {
    firstOperand = "0";
    secondOperand = "";
    operationChosen = null;
    displayInput.textContent = "0";
    displayResult.textContent = "";
}

undoElement.addEventListener("click", handleUndo);

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

function handleInvalidMath() {
    displayResult.textContent = "MATH";
    displayInput.textContent = "ERROR";
    setTimeout(() => {
        handleClear();
    }, 2000)
}




/** Keyboard support functions */

window.addEventListener("keydown", handleKeyboard);

let keysPressed = {}

function handleKeyboard(event) {

    let buttonToAnimate;

    buttonElements.forEach((button) => {
        if (button.textContent == event.key.toString()) {
            buttonToAnimate = button;
        }
    })

    keysPressed[event.key] = true;

    if (event.key >= 0 && event.key <= 9) handleNumbers(event.key), handlePulseAnimation(buttonToAnimate);
    if (event.key === ".") handleDecimal(), handlePulseAnimation(buttonToAnimate);
    if (event.key === "Escape") handleClear(), handlePulseAnimation(clear);
    if (event.key === "Backspace") handleUndo(), handlePulseAnimation(undo);
    if (event.key === "Enter") handleEquals(), handlePulseAnimation(equals);
    if (keysPressed["Shift"] && event.key === "!") handleFactorial(), handlePulseAnimation(factorialElement);
    if (keysPressed["Shift"] && event.key === "n" || event.key === "N") handlePower(), handlePulseAnimation(powerElement);
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

window.addEventListener("keyup", () => keysPressed["Shift"] = false);




/** Animation functions */

buttonElements.forEach((button) => { button.addEventListener("click", () => handlePulseAnimation(button)) })

function handlePulseAnimation(button) {
    button.classList.remove("active");
    button.offsetWidth;
    button.classList.add("active");
}

instructionsArrowElement.addEventListener("click", handleInstructionsAnimation);

let rotationDegrees = 180;

function handleInstructionsAnimation() {
    if (instructionsElement.className === "activeInstructions") {
        instructionsElement.classList.remove("activeInstructions");
        instructionsElement.classList.add("activeInstructionsReverse");
        instructionsArrowElement.style.transform = `rotate(${rotationDegrees}deg)`;
        rotationDegrees += 180;
    } else if (instructionsElement.className === "activeInstructionsReverse") {
        instructionsElement.classList.remove("activeInstructionsReverse");
        instructionsElement.classList.add("activeInstructions");
        instructionsArrowElement.style.transform = `rotate(${rotationDegrees}deg)`;
        rotationDegrees += 180;
    } else {
        instructionsElement.classList.add("activeInstructions");
        instructionsArrowElement.style.transform = `rotate(${rotationDegrees}deg)`;
        rotationDegrees += 180;
    }
}