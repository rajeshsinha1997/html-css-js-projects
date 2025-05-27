// get input box element
const inputBoxElement = document.getElementById("inputBox");

// get list of all buttons
const buttonElements = document.querySelectorAll("button");

// calculation related variables
let needToClearScreen = true;
let previousOperand = "";
let operatorToBeUsed = "";
let lastPressedButtonWasOperator = true;

/**
 * function to reset the calculator
 */
const resetCalculator = () => {
  // reset everything
  needToClearScreen = true;
  lastPressedButtonWasOperator = true;
  previousOperand = "";
  operatorToBeUsed = "";
  inputBoxElement.value = "0";
};

/**
 * function to delete the last character of the existing input box value
 */
const deleteLastCharacter = () => {
  // check if the length of the existing value of the input box is greater than 1
  if (inputBoxElement.value.length > 1) {
    // remove the last character
    inputBoxElement.value = inputBoxElement.value.substring(
      0,
      inputBoxElement.value.length - 1
    );
  } else {
    // set value of the input box to 0
    inputBoxElement.value = "0";

    // update flag to clear screen on next non-operator button press
    needToClearScreen = true;
  }
};

/**
 * function to set a value to the input box element
 * @param {string} newValue - value to be set to the input box element
 */
const setValueToInputBox = (newValue) => {
  // check if the screen needed to be cleared
  // or the existing value is '0' or '00'
  if (
    needToClearScreen ||
    inputBoxElement.value === "0" ||
    inputBoxElement.value === "00"
  ) {
    // clear the screen and place the new value on the screen
    inputBoxElement.value = newValue;
  } else {
    // check if the new value is a period and a period has been added already
    if (newValue === "." && inputBoxElement.value.includes(".")) return;

    // append the new value to the existing value
    inputBoxElement.value += newValue;
  }
};

/**
 * function to perform any pending calculation and store the result
 * as previous operand (safe alternative to eval)
 */
const performPendingCalculation = () => {
  // convert string inputs to floating point numbers
  const currentOperand = parseFloat(inputBoxElement.value);
  const previousValue = parseFloat(previousOperand);

  let result = 0;

  // perform the calculation based on the stored operator
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
      // handle divide-by-zero case
      result = currentOperand === 0 ? "Error" : previousValue / currentOperand;
      break;
    case "%":
      result = previousValue % currentOperand;
      break;
    default:
      // fallback (shouldn't happen)
      result = currentOperand;
  }

  // store the result as the new previous operand (as a string)
  previousOperand = result.toString();
};

/**
 * function to perform required actions when any operator button is clicked
 * @param {string} operatorValue - value of the operator
 */
const setOperator = (operatorValue) => {
  // check if the previous operand value is empty
  if (previousOperand === "") {
    // store the value present on the screen as previous operand
    previousOperand = inputBoxElement.value;
  } else {
    // check if the last button pressed was not an operator
    if (!lastPressedButtonWasOperator) {
      // perform pending calculation
      performPendingCalculation();
    }
  }

  // update operator to be used
  operatorToBeUsed = operatorValue;
};

/**
 * function to display the result to the input box element
 */
const displayResult = () => {
  // check if any calculation is pending
  if (operatorToBeUsed !== "" && !needToClearScreen) {
    performPendingCalculation();

    // reset operator
    operatorToBeUsed = "";
  }

  // display result or error
  inputBoxElement.value = previousOperand;

  // if error occurred, prevent further computation
  if (previousOperand === "Error") {
    previousOperand = "";
    needToClearScreen = true;
  } else {
    // reset previous operand value
    previousOperand = "";
  }
};

// add event listener to each button for the 'click' event
buttonElements.forEach((button) => {
  // handle mouse click events
  button.addEventListener("click", (event) => {
    // get button text
    const buttonText = event.target.textContent;

    // perform required action depending on the button
    switch (buttonText) {
      case "AC":
        resetCalculator();
        lastPressedButtonWasOperator = true;
        break;
      case "DEL":
        deleteLastCharacter();
        lastPressedButtonWasOperator = true;
        break;
      case ".":
      case "0":
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
      case "00":
        setValueToInputBox(buttonText);
        lastPressedButtonWasOperator = false;
        needToClearScreen = false;
        break;
      case "%":
      case "/":
      case "*":
      case "-":
      case "+":
        setOperator(buttonText);
        lastPressedButtonWasOperator = true;
        needToClearScreen = true;
        break;
      case "=":
        displayResult();
        lastPressedButtonWasOperator = true;
        break;
    }

    // debug statements
    // console.log(
    //   `last button pressed was an operator: ${lastPressedButtonWasOperator}`
    // );
    // console.log(`need to clear screen: ${needToClearScreen}`);
    // console.log(`previous operand: ${previousOperand}`);
    // console.log(`operator to be used: ${operatorToBeUsed}`);
  });
});

// handle keyboard inputs
document.addEventListener("keydown", (e) => {
  const key = e.key;

  // perform required action depending on the button
  switch (key) {
    case "Escape":
      resetCalculator();
      lastPressedButtonWasOperator = true;
      break;
    case "Backspace":
      deleteLastCharacter();
      lastPressedButtonWasOperator = true;
      break;
    case ".":
    case "0":
    case "1":
    case "2":
    case "3":
    case "4":
    case "5":
    case "6":
    case "7":
    case "8":
    case "9":
      setValueToInputBox(key);
      lastPressedButtonWasOperator = false;
      needToClearScreen = false;
      break;
    case "%":
    case "/":
    case "*":
    case "-":
    case "+":
      setOperator(key);
      lastPressedButtonWasOperator = true;
      needToClearScreen = true;
      break;
    case "Enter":
      displayResult();
      lastPressedButtonWasOperator = true;
      break;
  }
});
