console.clear();
const elemResult = document.querySelector("#result");
let input = "0";
let result = 0;
let prevOperation = "";

function inputNum(num) {
  if (input !== "0" || num === ".") {
    input += num;
  } else {
    input = `${num}`;
  }
  elemResult.innerText = input;
}

function calculate(operation) {
  const temp = parseFloat(input);
  switch (operation) {
    case "+":
      result += temp;
      break;
    case "-":
      result -= temp;
      break;
    case "*":
      result *= temp;
      break;
    case "/":
      result /= temp;
      break;
    default:
      result = temp;
      break;
  }
  elemResult.innerText = result;
}

function operator(operation) {
  calculate(prevOperation);
  prevOperation = operation;
  input = "0";
}

function equal() {
  calculate(prevOperation);
}

function clearCalc() {
  input = "0";
  result = 0;
  prevOperation = "";
  elemResult.innerText = "0";
}
