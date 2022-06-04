function add(a,b) {
    return a+b;
}

function subtract(a,b) {
    return a-b;
}

function multiply(a,b) {
    return a*b;
}

function divide(a,b) {
    if(b == 0) return null;
    return a/b;
}


function operate(a,b,operator) {
    if(operator == '+') return add(a,b);
    else if(operator == '-') return subtract(a,b);
    else if(operator == 'x') return multiply(a,b);
    else if(operator == '÷') return divide(a,b);
    else return null;

}

let valuesArray = [];


const keys = document.querySelectorAll('button.key');

keys.forEach((key) => {
    key.addEventListener('click', () => {
        let userClick = key.textContent;
        valuesArray.push(userClick);
        console.log(userClick);
    })
})

let equalSign = document.querySelector('.equalSign');

equalSign.addEventListener('click', () => {
    calculate();
})


let operators = ['+', '-', 'x', '÷'];

function calculate() {
    let operator;

    let operatorIndex = valuesArray.findIndex((value) => {
        for(let i = 0; i < operators.length; i++) {

            if(operators[i] == value) {
                operator = value;
                return true;
            } 
        }
    });

    let operand1 = +valuesArray.slice(0,operatorIndex).join("");
    let operand2 = +valuesArray.slice(operatorIndex+1, valuesArray.length).join("");

    let result = operate(operand1, operand2, operator);
    console.log(result);

}

