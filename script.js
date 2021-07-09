const numbersBtn = document.querySelectorAll(".number")
const operatorsBtn = document.querySelectorAll(".operator")
const equalsBtn = document.querySelector(".equals")
const clearBtn = document.querySelector(".ac")
const decimalBtn = document.querySelector(".decimal")
const delBtn = document.querySelector(".del")
const screen = document.querySelector(".screen")

let firstNum = null
let secondNum = null
let operators = []
let result = null

numbersBtn.forEach(numberBtn => {
    numberBtn.addEventListener('click', (e) => {
        if (screen.textContent.length > 11 && operators.length === 0) {
            return
        }
        if (operators.length > 0 && secondNum === null) {
            screen.textContent = ""
        }
        number = e.target.dataset.number
        screen.textContent += number
        if (operators.length === 0) {
            firstNum = parseFloat(screen.textContent)
        } else if (operators.length > 0) {
            secondNum = parseFloat(screen.textContent)
        }
    })
})

operatorsBtn.forEach(operatorBtn => {
    operatorBtn.addEventListener('click', (e) => {
        if (operators.length > 0) {
            operator = operators.pop()
            result = operate(operator, firstNum, secondNum)
            if (result === "divide by zero error") {
                screen.textContent = "Error"
                firstNum = null
                secondNum = null
                return
            }
            screen.textContent = result
            firstNum = result
            secondNum = null
            operators.push(e.target.dataset.operator)
        } else if (operators.length === 0) {
            operators.push(e.target.dataset.operator)
        }
    })
})

equalsBtn.addEventListener('click', (e) => {
    if (secondNum === null) {
        return
    }
    if (operators.length > 0) {
        operator = operators.pop()
        result = operate(operator, firstNum, secondNum)
        if (result === "divide by zero error") {
            screen.textContent = "Error"
            firstNum = null
            secondNum = null
            return
        }
        screen.textContent = result
        firstNum = result
        secondNum = null
    }
})

clearBtn.addEventListener('click', () => {
    firstNum = null
    secondNum = null
    operators = []
    result = null
    screen.textContent = ""
})

decimalBtn.addEventListener('click', (e) => {
    decimal = e.target.dataset.point
    if (!screen.textContent.includes('.')) {
        screen.textContent += '.'
    }
})

delBtn.addEventListener('click', () => {
    screen.textContent = screen.textContent.slice(0, -1)
    if (firstNum !== null && secondNum === null) firstNum = screen.textContent
    else if (secondNum !== null) secondNum = screen.textContent
})

function add(a, b) {
    return a + b
}

function subtract(a, b) {
    return a - b
}

function multiply(a, b) {
    return a * b
}

function divide(a, b) {
    return a / b
}

function operate(operator, a, b) {
    switch (operator) {
        case "+":
            return add(a, b)
        case "-":
            return subtract(a, b)
        case "×":
            return multiply(a, b)
        case "÷":
            if (b === 0) return 'divide by zero error'
            return divide(a, b)
    }
}