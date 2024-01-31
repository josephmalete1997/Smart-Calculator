const textArea = document.querySelector(".text-area");
const result = document.querySelector(".output");
const inputArray = [];
const currentFraction = { numerator: "", denominator: "" };

// BUTTONS
const numbers = document.querySelectorAll(".num");
const signs = document.querySelectorAll(".sign");
const del = document.querySelector(".del");
const equal = document.querySelector(".equal");
const pow = document.querySelector(".pow");
const fraction = document.querySelector(".fra");

numbers.forEach((number) => {
  number.addEventListener("click", () => {
    const lastInput = inputArray[inputArray.length - 1];

    if (lastInput === "▲" || lastInput === "▼") {
      // If the last input is an arrow, add a number to the numerator
      currentFraction.numerator += number.innerHTML;
      updateFractionDisplay();
    } else if (/numerator/.test(lastInput)) {
      // If the last input is in the numerator, add a number to it
      const currentNumerator = currentFraction.numerator || "";
      currentFraction.numerator = currentNumerator + number.innerHTML;
      updateFractionDisplay();
    } else if (lastInput === "^") {
      // If the last input is '^', create a superscript for the number
      inputArray[inputArray.length - 1] = `<sup>${number.innerHTML}</sup>`;
      textArea.innerHTML = inputArray.join("");
    } else if (
      lastInput ===
        '<div class="fraction-main"><div class="numerator"></div><div class="denominator"></div></div>' &&
      !currentFraction.numerator
    ) {
      // If the last input is the fraction structure and numerator is empty, add a number to the numerator
      currentFraction.numerator += number.innerHTML;
      updateFractionDisplay();
    } else if (
      lastInput ===
        '<div class="fraction-main"><div class="numerator"></div><div class="denominator"></div></div>' &&
      currentFraction.numerator
    ) {
      // If the last input is the fraction structure and numerator is not empty, add a number to the denominator
      currentFraction.denominator += number.innerHTML;
      updateFractionDisplay();
    } else {
      // Otherwise, add the number to the input array
      inputArray.push(number.innerHTML);
      textArea.innerHTML = inputArray.join("");
    }
  });
});

// ... (rest of the code remains the same)

// ... (rest of the code remains the same)

del.addEventListener("click", () => {
  if (/numerator/.test(inputArray[inputArray.length - 1])) {
    currentFraction.numerator = currentFraction.numerator.slice(0, -1);
    updateFractionDisplay();
    if (currentFraction.numerator === "") {
      inputArray.pop(); // Remove the empty numerator
    }
  } else if (/denominator/.test(inputArray[inputArray.length - 1])) {
    currentFraction.denominator = currentFraction.denominator.slice(0, -1);
    updateFractionDisplay();
    if (currentFraction.denominator === "") {
      inputArray.pop(); // Remove the empty denominator
      inputArray.pop(); // Remove the closing div
    }
  } else {
    inputArray.pop();
  }
  textArea.innerHTML = inputArray.join("");
});

pow.addEventListener("click", () => {
  if (/[0-9]/.test(inputArray[inputArray.length - 1]) === true) {
    inputArray.push("^");
  }
  textArea.innerHTML = inputArray.join("");
});

signs.forEach((sign) => {
  sign.addEventListener("click", () => {
    if (/[0-9]/.test(inputArray[inputArray.length - 1])) {
      inputArray.push(sign.innerHTML);
    }
    textArea.innerHTML = inputArray.join("");
  });
});

document.querySelectorAll(".arrows button").forEach((sign) => {
  sign.addEventListener("click", () => {
    if (sign.innerHTML === "sin") {
      inputArray.push(sign.innerHTML + "(");
    } else {
      inputArray.push(sign.innerHTML);
    }
    textArea.innerHTML = inputArray.join("");
  });
});

fraction.addEventListener("click", () => {
  inputArray.push(
    '<div class="fraction-main"><div class="numerator"></div><div class="denominator"></div></div>'
  );
  textArea.innerHTML = inputArray.join("");
});

equal.addEventListener("click", () => {
  const newResults = inputArray.join("").toString();
  const empty = newResults.split(/\D/);
  const operations = newResults.split(/\d/).join(",");

  let newOp = [];

  for (let i = 0; i < operations.length; i++) {
    if (
      operations[i] === "+" ||
      operations[i] === "×" ||
      operations[i] === "÷" ||
      operations[i] === "-"
    ) {
      newOp.push(operations[i]);
    }
  }

  const final = [];
  for (let i = 0; i < empty.length; i++) {
    final.push(parseInt(empty[i]));
  }

  function add(runningTotal, currentValue) {
    if (newOp.length > 0) {
      const lastOperator = newOp.shift();
      switch (lastOperator) {
        case "+":
          return runningTotal + currentValue;
        case "-":
          return runningTotal - currentValue;
        case "÷":
          return runningTotal / currentValue;
        case "×":
          return runningTotal * currentValue;
        default:
          return currentValue;
      }
    }
    return runningTotal + currentValue;
  }

  let sum = final.reduce(add);

  if (/numerator/.test(inputArray[inputArray.length - 1])) {
    const fractionValues = inputArray[inputArray.length - 1].match(/(\d+)/g);
    if (fractionValues && fractionValues.length === 2) {
      const numerator = parseInt(fractionValues[0]);
      const denominator = parseInt(fractionValues[1]);
      sum = numerator / denominator;
    }
  }

  if (/[0-9]/.test(inputArray[inputArray.length - 1]) === true) {
    result.innerHTML = sum;
  }
});

function updateFractionDisplay() {
  const fractionDiv = document.querySelector(".fraction-main");
  fractionDiv.innerHTML = `<div class="numerator">${currentFraction.numerator}</div><div class="denominator">${currentFraction.denominator}</div>`;
}

function rowInput() {
  let results = [];
  for (let i = 0; i < inputArray.length; i++) {
    if (/<sup>/.test(inputArray[i])) {
      results.push(
        Math.pow(
          parseInt(inputArray[i - 1]),
          parseInt(inputArray[i].match(/\d/))
        )
      );
    }
    if (inputArray[i] === "+") {
      results = parseInt(inputArray[i - 1]) + parseInt(inputArray[i + 1]);
    }
    if (inputArray[i] === "×") {
      results.push(parseInt(inputArray[i - 1]) * parseInt(inputArray[i + 1]));
    }
  }
  document.querySelector(".row-input").innerHTML = inputArray.join("");
  document.querySelector(".calculations").innerHTML = results.join("");
}

setInterval(rowInput, 100);

// ... (previous code remains the same)
// ... (previous code remains the same)

// Add event listeners for numerator and denominator arrow buttons
const numeratorUp = document.querySelector(".numerator-up");
const numeratorDown = document.querySelector(".numerator-down");
const denominatorUp = document.querySelector(".denominator-up");
const denominatorDown = document.querySelector(".denominator-down");

numeratorUp.addEventListener("click", () => {
  updateFractionInput("numerator", "up");
});

numeratorDown.addEventListener("click", () => {
  updateFractionInput("numerator", "down");
});

denominatorUp.addEventListener("click", () => {
  updateFractionInput("denominator", "up");
});

denominatorDown.addEventListener("click", () => {
  updateFractionInput("denominator", "down");
});

function updateFractionInput(type, direction) {
  if (type === "numerator") {
    if (direction === "up") {
      currentFraction.numerator += "▲";
    } else if (direction === "down") {
      currentFraction.numerator += "▼";
    }
  } else if (type === "denominator") {
    if (direction === "up") {
      currentFraction.denominator += "▲";
    } else if (direction === "down") {
      currentFraction.denominator += "▼";
    }
  }
  updateFractionDisplay();
}

// ...
// ... (previous code remains the same)

// Add event listeners for left and right arrow buttons
const leftArrow = document.querySelector(".left-arrow");
const rightArrow = document.querySelector(".right-arrow");

leftArrow.addEventListener("click", () => {
  moveCursor("left");
});

rightArrow.addEventListener("click", () => {
  moveCursor("right");
});

function moveCursor(direction) {
  const textArea = document.querySelector(".text-area");
  const cursorIndex = getCaretPosition(textArea);

  if (direction === "left" && cursorIndex > 0) {
    setCaretPosition(textArea, cursorIndex - 1);
  } else if (direction === "right" && cursorIndex < textArea.innerHTML.length) {
    setCaretPosition(textArea, cursorIndex + 1);
  }
}

// Function to get the current cursor position
function getCaretPosition(element) {
  let caretOffset = 0;
  const doc = element.ownerDocument || element.document;
  const win = doc.defaultView || doc.parentWindow;
  const sel = win.getSelection();

  if (sel.rangeCount > 0) {
    const range = sel.getRangeAt(0);
    const preCaretRange = range.cloneRange();
    preCaretRange.selectNodeContents(element);
    preCaretRange.setEnd(range.endContainer, range.endOffset);
    caretOffset = preCaretRange.toString().length;
  }

  return caretOffset;
}

// Function to set the cursor position
function setCaretPosition(element, position) {
  const textNode = element.firstChild;
  const range = document.createRange();
  const sel = window.getSelection();

  range.setStart(textNode, position);
  range.setEnd(textNode, position);

  sel.removeAllRanges();
  sel.addRange(range);
}
