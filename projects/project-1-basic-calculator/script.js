// get input box element
const inputBoxElement = document.getElementById("inputBox");

// get list of all buttons
const buttonElements = document.querySelectorAll("button");

// calculation related variables
let needToClearScreen = true;
let previousOperand = "";
let operatorToBeUsed = "";

/**
 * function to reset the calculator
 */
let resetCalculator = () => {
  // reset everything
  needToClearScreen = true;
  previousOperand = "";
  operatorToBeUsed = "";
  inputBoxElement.value = "0";
};

/**
 * function to delete the last character of the existing input box value
 */
let deleteLastCharacter = () => {
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
  }
};

/**
 * function to set a value to the input box element
 * @param {string} newValue - value to be set to the input box element
 */
let setValueToInputBox = (newValue) => {
  // check if existing value of the input box is 0 or 00
  if (
    inputBoxElement.value === "0" ||
    inputBoxElement.value === "00" ||
    needToClearScreen
  ) {
    // replace the existing value by the new value
    inputBoxElement.value = newValue;
  } else {
    // append the new value to the existing value
    inputBoxElement.value += newValue;
  }
};

/**
 * function to perform required actions when any operator button is clicked
 * @param {string} operatorValue - value of the operator
 */
let setOperator = (operatorValue) => {
  // check if any operator has been set already
  if (operatorToBeUsed !== "") {
    // perform pending calculation
    previousOperand = eval(
      previousOperand + operatorToBeUsed + inputBoxElement.value
    );

    // reset operator
    operatorToBeUsed = "";
  } else {
    // store value from the input box element
    previousOperand = inputBoxElement.value;
  }

  // update operator value
  operatorToBeUsed = operatorValue;
};

/**
 * function to display the result to the input box element
 */
let displayResult = () => {
  // check if any calculation is pending
  if (operatorToBeUsed !== "" && !needToClearScreen) {
    // perform the pending calculation
    previousOperand = eval(
      previousOperand + operatorToBeUsed + inputBoxElement.value
    );

    // reset operator
    operatorToBeUsed = "";
  }

  // display result to the input box element
  inputBoxElement.value = previousOperand;
};

// add event listener to each button for the 'click' event
buttonElements.forEach((button) => {
  button.addEventListener("click", (event) => {
    // get button text
    const buttonText = event.target.textContent;

    // perform required action depending on the button
    switch (buttonText) {
      case "AC":
        resetCalculator();
        break;
      case "DEL":
        deleteLastCharacter();
        break;
      case "00":
        setValueToInputBox("00");
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
        setValueToInputBox(buttonText);
        needToClearScreen = false;
        break;
      case "%":
      case "/":
      case "*":
      case "-":
      case "+":
        setOperator(buttonText);
        needToClearScreen = true;
        break;
      case "=":
        displayResult();
        break;
    }

    // debug statements
    // console.log(`need to clear screen: ${needToClearScreen}`);
    // console.log(`previous operand: ${previousOperand}`);
    // console.log(`operator to be used: ${operatorToBeUsed}`);
  });
});
