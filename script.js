//todo: add security

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

 //an array of all the operators the calcultor features. If new operations are introduced in the calculator, add it's sign to this array
 let operators = ['+', '-', 'x', '÷'];

//this array will store all the inputs including numbers and signs (operands and operators) in the same order the user clicks
let valuesArray = [];

//refernce to all the keys in the calculator, EXCEPT equalSign, clear and delete key
const keys = document.querySelectorAll('button.key');

let operatorCount = 0; //keeps track of how many times operators have been pressed in one calculation. Since operations are done in pairs, upon second press of an operator, calculate function will be called
let resultActive = false; 
let userClick;
let syntaxError = false;

keys.forEach((key) => {
    key.addEventListener('click', () => {


        if(syntaxError) {
            clearDigitSection();
            syntaxError = false;
        }

        userClick = key.textContent; //userClick stores the operators and operands as string the user clicks


        //this counts the number of times operator has been pressed and saves it in variable operatorCount
        for(let oper of operators) {
            if(oper == userClick) {
                operatorCount++;
                break;
            }
        }

        //since we have to perform calculations in pairs, if the user presses an operator for the second time, calculate function is called
        if(operatorCount > 1) {
            let result = calculate();
            clearDigitSection();  //clearing digit section and displaying result in it so that the result can be used for further calculations
            displayDigit(result);
            operatorCount = 1;
        }


        //this code was added after result has been calculated using equals sign. calculate funtion makes resultActive = true.
        //so if user presses a key right after a result has been calculated, this will diplay the result in the digit section and change resultActive to false because the result is not active now, since
        //in the code below this if condition, the key pressed will be displayed
        if(resultActive == true) {
            clearDigitSection();
            displayDigit(resultSection.textContent);
            resultActive = false;
        }

        displayDigit(userClick);    //this displays user selection in the top of the screen
        valuesArray.push(userClick); //adding userClick to the end of the array
    })
})

//reference to equalSign
let equalSign = document.querySelector('.equalSign');

//when user clicks equalSign, calculate function is triggered
equalSign.addEventListener('click', calculate)


//this function calculates using the valuesArray. It prints the result in the resultSection and returns it aswell.
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
    console.log(operand1);
    console.log(operator);
    let operand2 = +valuesArray.slice(operatorIndex+1, valuesArray.length).join("");
    console.log(operand2);

    let result = operate(operand1, operand2, operator);

    console.log(result);

    if(result === null || result == NaN) {
        displayError();
        return;
    }

    displayResult(result);
    valuesArray = []; //deletes all the elements from the array. could have used also: valuesArray.splice(0, valuesArray.length);
    valuesArray.push(result); //adding the result in the array for further calculation(if the user decides)

    operatorCount = 0; //useful when equals sign is pressed to calculate
    resultActive = true;    //useful when equals sign is pressed to calculate
    return result;
}


const digitSection = document.querySelector('.digits-section');

function displayDigit(digit) {
    
    const singleDigit = document.createElement('span');
    singleDigit.textContent = digit;
    digitSection.appendChild(singleDigit);

}

const resultSection = document.querySelector('.result-section');

function displayResult(result) {
    resultSection.textContent = result;
}


const clear = document.querySelector('.clear');

clear.addEventListener('click', clearAll)

function clearAll() {
    valuesArray = []; //deletes all elements from valuesArray
    resultSection.textContent = ""; //clears result section

    //clears digitSection
    clearDigitSection(); 

    operatorCount = 0;
    resultActive = false;
}


//todo: for delete function, make a variable to store the last digit entered. check if it is a number or sign and do the calculations accordingly. if none, do not do anything
const dlete = document.querySelector('.delete')

dlete.addEventListener('click', del);

function del() {
    
    //if the last thing done was a calculation, that is in the valuesArray there is only result, do nothing.
    if(resultActive) return;

    let indexOfLastDigit = valuesArray.length - 1;

    for(let oper of operators) {
        if(oper == valuesArray[indexOfLastDigit]) {
            operatorCount--;
            valuesArray.pop()
            digitSection.removeChild(digitSection.lastChild);
            return;
        }
    }

    //nowonwards, code executes when a number was the ast digit entered
    digitSection.removeChild(digitSection.lastChild); //removes display of the last digit entered
    valuesArray.pop(); //removes the last element from the array
}


function clearDigitSection() {
    while(digitSection.lastChild) digitSection.removeChild(digitSection.lastChild); 
}



function displayError() {
    // clearDigitSection();
    // resultSection.textContent = "";
    // valuesArray = [];  
    clearAll();
    displayDigit("Syntax Error");
    syntaxError = true;
}



//testing

// let a = +"+40";

// console.log(typeof(a), a);

// console.log(NaN + 0);




//if operand1 and 2 are NaN syntax error, or even operand,
//