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
//you can simplify a little bit by jsut checking if operator = '' and clearing it appropriately
//maybe even a shorthand like
//const isOperatorActive = (op) => op == '';
var operatorActive = false;


buttons.forEach ( (button) => {
    button.addEventListener("click", () => {
        const buttonText = button.textContent
        //simplified, i don't think you need to be so literal in this case
        // Your logic should be separated from screen text
        // maybe do it based on the class instead

        if (!isNaN(buttonText)) { 
            onNumClicked(buttonText);
        }

        //again, it feels brittle to switch on the text of the UI.
        //perhaps the button id would be better
        switch(buttonText) {

            case '+': //switch statement "fall-through"
            case '-':
            case 'x':
            case '/':
                operatorButton(buttonText);
                break;
            case 'C': 
                clearButton();
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

const onNumClicked = (num) => {
    if (operatorActive || display.textContent == '0') {
        display.textContent = num;
        operatorActive = false;
    } else {
        display.textContent = `${display.textContent}${num}`;
    }

    //return display.textContent; who are you returning for?
}

const clearButton = () => {
    display.textContent = '0';
    num1 = '';
    num2 = '';
    operator = '';
}

const operatorButton = (localOperator) => {

    //Is this the desired behavior?
    //example, user input is
    //2 + + + +
    //2 2 4 8 16
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
    //you're duplicating logic here (needed to *-1 twice)
    //display.textContent = Number(display.textContent) * -1;
    //if(operatorActive === true) { num1 = num1 * -1 };

    if (!operatorActive) { //no need to == true
      num1 = display.textContent;
      //There are many ways to make a string a number which differs language
      //In this case you can actually just multiply it! No need to explicity use Number
      //https://dev.to/sanchithasr/7-ways-to-convert-a-string-to-number-in-javascript-4l

      //here's a need shorthand that many languages use.
      //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Addition_assignment
      num1 *= -1; 
      display.textContent = num1;
    };

    //behavior: why only flip the sign when operatorActive? Shouldn't you flip the sign while not active?
    //Ohh, I think you're actually misusing === here. Recommend reading up on the difference between == and ===.
    // === is a javascript special
}

const percentButton = () => {
    //same comments here as the 'signButton'
    display.textContent = Number(display.textContent) * .01;
    if(operatorActive === true) { num1 = num1 * .01 };
}

//Why arrow functions vs directly having them in the switch statement? Seems verbose unless you intend to reuse these.
// operator functions
const add = (a, b) => Number(a) + Number(b);
const subtract = (a, b) => Number(a) - Number(b);
const multiply = (a, b) => Number(a) * Number(b);
const divide = (a, b) => Number(a) / Number(b);

//you kinda already did a switch, its a repetative to do it again
//Not sure if there is a simpler solution though
const operate = (a, b, operator) => {
    switch(operator) {
        case '+':
            //in the plus case, you need to use Number becuase you can use '+' to concatenate strings.
            return Number(a) + Number(b);
        case '-':
            return subtract(a, b);
        case 'x':
            //in the multiply case, you can actually omit Number. not all languages "infer" types when used in this way though
            return a * b;
        case '/':
            return divide(a, b);
        default:
            return "NaN"
        }
};

//oh i see you are defined but not used, generally should remove unused. Anyway you can use the built in isNaN();
function isNumber(value) {
    return typeof value === 'number';
}
