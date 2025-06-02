// get input box element
let inputBoxElement = document.getElementById("inputBox");

// get list of all buttons
const buttonElements = document.querySelectorAll("button");

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
  }
};

/**
 * function to set a value to the input box element
 * @param {string} newValue - value to be set to the input box element
 */
const setValueToInputBox = (newValue) => {
  // check if the screen needed to be cleared
  if (Calculator.needToClearScreen) {
    // clear the screen and place the new value on the screen
    inputBoxElement.value = newValue;
  } 
  // handle special case for decimal point when display is "0" or "00"
  else if (newValue === "." && (inputBoxElement.value === "0" || inputBoxElement.value === "00")) {
    inputBoxElement.value = "0.";
  }
  // check if the existing value is '0' or '00' (but not for decimal point case)
  else if (inputBoxElement.value === "0" || inputBoxElement.value === "00") {
    // clear the screen and place the new value on the screen
    inputBoxElement.value = newValue;
  } else {
    // check if the new value is a period and a period has been added already
    if (newValue === "." && inputBoxElement.value.includes(".")) return;

    // append the new value to the existing value
    inputBoxElement.value += newValue;
  }
};

const handleInput = (input) => {
  switch (input) {
    case "AC":
    case "Escape":
      Calculator.reset();
      break;
    case "DEL":
    case "Backspace":
      deleteLastCharacter();
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
      setValueToInputBox(input);
      lastPressedButtonWasOperator = false;
      Calculator.needToClearScreen = false;
      break;
    case "%":
    case "/":
    case "*":
    case "-":
    case "+":
      setOperator(input);
      lastPressedButtonWasOperator = true;
      Calculator.needToClearScreen = true;
      break;
    case "=":
    case "Enter":
      displayResult();
      lastPressedButtonWasOperator = true;
      break;
  }
};

// add event listener to each button for the 'click' event
buttonElements.forEach((button) => {
  // handle mouse click events
  button.addEventListener("click", (event) => {
    // get button text
    const buttonText = event.target.textContent;
    handleInput(buttonText);
  });
});

// handle keyboard inputs
document.addEventListener("keydown", (e) => {
  const key = e.key;
  handleInput(key);
});
