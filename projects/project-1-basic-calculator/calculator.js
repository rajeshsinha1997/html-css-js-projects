const Calculator = {
  needToClearScreen: true,
  reset() {
    this.needToClearScreen = true;
    lastPressedButtonWasOperator = true;
    previousOperand = "";
    operatorToBeUsed = "";
    inputBoxElement.value = "0";
  },
};

let previousOperand = "";
let operatorToBeUsed = "";
let lastPressedButtonWasOperator = true;

function performPendingCalculation() {
  const currentOperand = parseFloat(inputBoxElement.value);
  const previousValue = parseFloat(previousOperand);

  let result = 0;

  switch (operatorToBeUsed) {
    case "+":
      result = previousValue + currentOperand;
      break;
    case "-":
      result = previousValue - currentOperand;
      break;
    case "*":
      result = previousValue * currentOperand;
      break;
    case "/":
      result = currentOperand === 0 ? "Cannot divide by zero" : previousValue / currentOperand;
      break;
    case "%":
      result = previousValue % currentOperand;
      break;
    default:
      result = currentOperand;
  }

  previousOperand = (Number.isInteger(result)) ? parseInt(result) : result;
}

function setOperator(operatorValue) {
  if (previousOperand === "") {
    previousOperand = inputBoxElement.value;
  } else {
    if (!lastPressedButtonWasOperator) {
      performPendingCalculation();
    }
  }

  operatorToBeUsed = operatorValue;
}

function displayResult() {
  if (operatorToBeUsed !== "" && !Calculator.needToClearScreen) {
    performPendingCalculation();

    operatorToBeUsed = "";
  }

  inputBoxElement.value = previousOperand;
  previousOperand = "";
}
