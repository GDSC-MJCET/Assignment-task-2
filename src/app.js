const calciNumbers = document.querySelectorAll(".calciNumber");
const equals = document.querySelector(".equals");
const deleteBtn = document.querySelector(".delete");
const display = document.getElementById("display");
const backButton = document.getElementById("backButton");

let displayString = " ";

backButton.addEventListener("click", (e) => {
  e.preventDefault();
  displayString = displayString.slice(0, displayString.length - 1).trimEnd();
  display.value = displayString.length == 0 ? null : displayString;
});

deleteBtn.addEventListener("click", (e) => {
  e.preventDefault();
  displayString = "";
  display.value = null;
});

calciNumbers.forEach((number) => {
  number.addEventListener("click", (e) => {
    e.preventDefault();
    displayString += e.target.dataset.val;
    display.value = displayString;
  });
});

function factorial(number) {
  if (number == 0 || number == 1) return 1;
  else return number * factorial(number - 1);
}

const regEx = /.*\((.*?)\)!/;

equals.addEventListener("click", (e) => {
  e.preventDefault();
  if (displayString.length) {
    evalString = displayString
      .replace(/x/g, "*")
      .replace(/\^/g, "**")
      .replace(/sin/g, "Math.sin")
      .replace(/cos/g, "Math.cos")
      .replace(/tan/g, "Math.tan")
      .replace(/log/g, "Math.log10")
      .replace(/ln/g, "Math.log")
      .replace(/√/g, "Math.sqrt")
      .replace(/π/g, "Math.PI")
      .replace(/e/g, "Math.E");

    let match = regEx.exec(evalString);
    while (match) {
      // Extract the subexpression within parentheses
      const subexpression = match[1];
      // Evaluate the subexpression and calculate its factorial
      const subexpressionResult = eval(subexpression);

      const factorialResult = factorial(subexpressionResult);

      // Replace the original subexpression with its factorial in the expression
      evalString = evalString.replace(`(${subexpression})!`, factorialResult);

      // Find the next match in the modified expression
      match = regEx.exec(evalString);
    }

    console.log(evalString);
    display.value = eval(evalString);
    displayString = "";
  }
});
