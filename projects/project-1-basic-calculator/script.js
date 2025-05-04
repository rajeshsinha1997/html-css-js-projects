// get input box element
const inputBoxElement = document.getElementById("inputBox");

// get list of all buttons
const buttonElements = document.querySelectorAll("button");

/**
 * function to reset the calculator
 */
let resetCalculator = () => {
  inputBoxElement.value = "0";
};

/**
 * function to set a value to the input box element
 * @param {value} - value to be set to the input box element
 */
let setValueToInputBox = (value) => {
  inputBoxElement.value = value;
};

// add event listener to each button for the 'click' event
buttonElements.forEach((button) => {
  button.addEventListener("click", (event) => {
    // get button text
    const buttonText = event.target.textContent;

    // perform required action depending on the button
    switch (buttonText) {
      case ".":
      case "00":
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
        setValueToInputBox(Number(buttonText));
        break;
      case "AC":
        resetCalculator();
        break;
    }
  });
});
