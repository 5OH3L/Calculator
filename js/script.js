const input = document.getElementById('input');
const ac = document.getElementById('ac');
const de = document.getElementById('de');
input.value = "";

let firstNum = "";
let step = 1;
let operator = "";
let secondNum = "";


let add = (num1, num2) =>{
    return num1 + num2;
};
let subtract = (num1, num2) =>{
    return num1 - num2;
};
let multiply = (num1, num2) =>{
    return num1 * num2;
};
let divide = (num1, num2) =>{
    return num1 / num2;
};
let operate = (op, num1, num2) =>{
    if (op == "+"){
        return add(+num1, +num2);
    }else if(op == "-"){
        return subtract(+num1, +num2);
    }else if(op == "x"){
        return multiply(+num1, +num2).toFixed(2);
    }else if(op == "÷"){
        if (num2 == 0 ){
            input.placeholder = "Really? -_-";
            input.style.setProperty("--color", "red");
            return input.value = "";
        }
        return divide(+num1, +num2).toFixed(2);
    }
};
let displayNum = (userInput) =>{
    if (userInput.target.dataset.key == "number" && step == 1){
        if(userInput.target.dataset.value != '.'){
            input.value += userInput.target.dataset.value;
            firstNum = input.value;
        }else if ( firstNum.length > 0 || secondNum.length > 0){
            input.value += userInput.target.dataset.value;
            firstNum = input.value;
        }
    }else if (userInput.target.dataset.key == "number" && step == 2){
        input.value += userInput.target.dataset.value;
        secondNum = input.value.slice((firstNum.length+1));
    }else if ((userInput.target.dataset.key == "operator" && step == 1 && firstNum != '') ){
        input.value += userInput.target.dataset.value;
        operator = userInput.target.dataset.value;
        step = 2;
    }else if (userInput.target.dataset.key == "equals" && step == 2){
        input.value = (operate(operator, firstNum, secondNum));
        firstNum = input.value;
        operator = '';
        secondNum = '';
        step = 1;
    }else if(userInput.target.dataset.key == "operator" && step == 2 && secondNum != ""){
        input.value = operate(operator, firstNum, secondNum);
        firstNum = input.value;
        operator = userInput.target.dataset.value;
        input.value += operator;
        secondNum = '';
    }else if(userInput.target.dataset.key == "operator" && step == 2){
        operator = userInput.target.dataset.value;
        input.value = firstNum;
        input.value += operator;
    }
    console.log(`Step : ${step}\nFirstNum : ${firstNum}\nSecondNum : ${secondNum}\nOp : ${operator}`);
};
let numbers = Array.from(document.getElementsByClassName('column'));

numbers.forEach(e => {
    e.addEventListener('click', displayNum);
});

ac.addEventListener('click', ()=>{
    input.value = '';
    firstNum = '';
    secondNum = "";
    input.placeholder = "Type something...";
    input.style.setProperty("--color", "white");
    step = 1;
});
de.addEventListener('click', ()=>{
    if(step == 1){
        input.value = input.value.slice(0,-1);
        firstNum = input.value;
    }else if (step == 2 && operator != ''){
        input.value = input.value.slice(0,-1);
        step = 1;
    }else if (step == 2 && operator != '' && secondNum != ''){
        input.value = input.value.slice(0,-1);
        secondNum = input.value.slice(firstNum.length, -1);
    }
});