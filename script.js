//seperate functions for each operation is created below. 
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

//operate function takes three input. a and b are numbers and operator is the sign of the operation needed to perform. 
//for example if you want to add 5 and 8 you would call the function like this: and = operate(5,8,'+');
//operate returns null if the correct inputs are not provided. 
function operate(a,b,operator) {
    if(operator == '+') return add(a,b);
    else if(operator == '-') return subtract(a,b);
    else if(operator == 'x') return multiply(a,b);
    else if(operator == '÷') return divide(a,b);
    else return null;

}

//this array will store all the inputs including numbers and signs (operands and operators) in the same order the user clicks
let valuesArray = [];

//refernce to all the keys in the calculator, except equalSign, clear and delete key
const keys = document.querySelectorAll('button.key');


keys.forEach((key) => {
    key.addEventListener('click', () => {
        let userClick = key.textContent; //userClick stores the operators and operands as string the user clicks 
        displayDigit(userClick);    //this displays user selection in the top of the screen
        valuesArray.push(userClick); //adding userClick to the end of the array
        console.log(userClick);
    })
})

//reference to equalSign
let equalSign = document.querySelector('.equalSign');

//when user clicks equalSign, calculate function is triggered
equalSign.addEventListener('click', () => {
    calculate();
})

 //an array of all the operators my calcultor features. If new operations are introduced in the calculator, add it's sign to this array
let operators = ['+', '-', 'x', '÷'];

//this function calculates using th valuesArray
function calculate() {
    let operator;

    //finding the index position in which the operator is stored in. This is so because the number the user wants to perform the operation on can be of any length(any number of digits) 
    let operatorIndex = valuesArray.findIndex((value) => {
        for(let i = 0; i < operators.length; i++) { //using the operators array to check which operator the user has entered 

            if(operators[i] == value) {
                operator = value; //saving the user's operator to use it in the future
                return true;
            } 
        }
    });

    //this code stores the numbers as type Numbers. the slice() method creates an array of just the digits of the number. the join method creates a string of all array elements. the + in the starting converts from string to number. 
    //for example valuesArray = ['5','0','x','2']; slice causes:
    //operand1 = ['5','0']; operand1 = ['2'];     join causes:
    //operand1 = '50';  operand2 = '2';
    let operand1 = +valuesArray.slice(0,operatorIndex).join("");
    let operand2 = +valuesArray.slice(operatorIndex+1, valuesArray.length).join("");


    let result = operate(operand1, operand2, operator);
    displayResult(result);
    valuesArray = []; //deletes all the elements from the array. could have used also: valuesArray.splice(0, valuesArray.length);
    valuesArray.push(result); //adding the result in the array for further calculation(if the user decides)
    
    console.log(valuesArray);
    console.log(result);    
}


function displayDigit(digit) {
    const digitSection = document.querySelector('.digits-section');
    const singleDigit = document.createElement('span');
    singleDigit.textContent = digit;
    digitSection.appendChild(singleDigit);

}

function displayResult(result) {
    const resultSection = document.querySelector('.result-section');
    resultSection.textContent = result;
}

function nextCalculation() {
    
}

function clearAll() {
    //
}

function del() {

}

