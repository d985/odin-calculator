// styling
const container = document.querySelector('#container');
const containerHeight = window.innerHeight - 18 - 37.2; // 37.2 is size of button + header div padding; 18 accounts for borders + ???
container.style.height = `${containerHeight}px`;
container.style.width = `${containerHeight*2/3}px`;

const buttons = document.querySelectorAll('button');
buttons.forEach( (button) => {
    const buttonHeight = button.clientHeight;
    button.style.width = `${buttonHeight}px`;
});

const display = document.querySelector('#display');

// button event listeners and functions
var num1;
var num2;
var operator = '';
var operatorActive = false;

buttons.forEach ( (button) => {
    button.addEventListener("click", () => {
        for(let i = 0; i<10; i++) {
            if (button.textContent == i) { numButton(i) };
        }
        switch(button.textContent) {
            case 'C': 
                clearButton();
                break;
            case '+':
                operatorButton('+');
                break;
            case '-':
                operatorButton('-');
                break;
            case 'x':
                operatorButton('*');
                break;
            case '/':
                operatorButton('/');
                break;
            case '=':
                equalButton();
                break;
            case '+/-':
                signButton();
                break;
            case '%':
                percentButton();
                break;
        }
    });
});

const numButton = (num) => {
    if (display.textContent == '0') {
        display.textContent = num;
    }
    else if (operatorActive === true) {
        display.textContent = num;
        operatorActive = false;
    }
    else {
        display.textContent = `${display.textContent}${num}`;
    }
    return display.textContent;
}

const clearButton = () => {
    display.textContent = '0';
    num1 = '';
    num2 = '';
    operator = '';
}

const operatorButton = (localOperator) => {
    if (operator != '') {
        num2 = display.textContent;
        display.textContent = operate(num1, num2, operator);
    }

    num1 = display.textContent;
    operator = localOperator
    operatorActive = true;
}

const equalButton = () => {
    num2 = display.textContent;
    display.textContent = operate(num1, num2, operator);
    operator = '';
}

const signButton = () => {
    display.textContent = Number(display.textContent) * -1;
    if(operatorActive === true) { num1 = num1 * -1 };
}

const percentButton = () => {
    display.textContent = Number(display.textContent) * .01;
    if(operatorActive === true) { num1 = num1 * .01 };
}

// operator functions
const add = (a, b) => Number(a) + Number(b);
const subtract = (a, b) => Number(a) - Number(b);
const multiply = (a, b) => Number(a) * Number(b);
const divide = (a, b) => Number(a) / Number(b);

const operate = (a, b, operator) => {
    switch(operator) {
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case '*':
            return multiply(a, b);
        case '/':
            return divide(a, b);
        default:
            return "NaN"
        }
};

function isNumber(value) {
    return typeof value === 'number';
}