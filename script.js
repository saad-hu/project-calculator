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
    return a/b;
}


function operate(a,b,operator) {
    if(operator == '+') return add(a,b);
    else if(operator == '-') return subtract(a,b);
    else if(operator == '*') return multiply(a,b);
    else if(operator == '/') return divide(a,b);
    else return null;

}



const keys = document.querySelectorAll('td');

keys.forEach((key) => {
    key.addEventListener('click', () => {

        console.log(key.textContent);
    })

})

