const textArea = document.querySelector(".text-area");
const result = document.querySelector(".output");
const inputArray = [];

//BUTTONS
const numbers = document.querySelectorAll(".num");
const signs = document.querySelectorAll(".sign");
const del = document.querySelector(".del");
const equal = document.querySelector(".equal");
const pow = document.querySelector(".pow");
const fraction = document.querySelector(".fra");

const newArray = [];
numbers.forEach((number) => {
  number.addEventListener("click", () => {
    if (/<sup>/.test(inputArray[inputArray.length - 1])) {
      number.setAttribute("disabled");
    }

    if (
      /numerator/.test(inputArray[inputArray.length - 1]) &&
      newArray.length === 0
    ) {
      newArray.push(parseInt(number.innerHTML));

      inputArray[
        inputArray.length - 1
      ] = `<div class="fraction-main"><div class="numerator">${newArray[0]}</div><div class="denominator"></div></div>`;

      textArea.innerHTML = inputArray.join("");
    } else if (inputArray[inputArray.length - 1] === "^") {
      inputArray[inputArray.length - 1] = `<sup>${number.innerHTML}</sup>`;
      textArea.innerHTML = inputArray.join("");
    } else {
      inputArray.push(parseInt(number.innerHTML));
      textArea.innerHTML = inputArray.join("");
    }

    if (newArray.length === 1) {
      newArray.push(parseInt(number.innerHTML));
      // alert(newArray);
      inputArray[
        inputArray.length - 1
      ] = `<div class="fraction-main"><div class="numerator">${newArray[0]}</div><div class="denominator">${newArray[1]}</div></div>`;

      textArea.innerHTML = inputArray.join("");
    }
  });
});

del.addEventListener("click", () => {
  inputArray.pop();
  newArray.splice(0);
  textArea.innerHTML = inputArray.join("");
});

pow.addEventListener("click", () => {
  if (/[0-9]/.test(inputArray[inputArray.length - 1]) === true) {
    inputArray.push(pow.innerHTML);
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
    `<div class="fraction-main"><div class="numerator"></div><div class="denominator"></div></div>`
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
    /*	for(let i = 0; i < newOp.length;i++){
			if(newOp[i] === "+"){
				runningTotal += prev;
			}
			if(newOp[i] === "-"){
				runningTotal -= prev - currentValue;
			}
			if(newOp[i] === "÷"){
			runningTotal /= prev / currentValue;
			}
			if(newOp[i] === "×"){
			runningTotal *= prev * currentValue;
			}
		}
		}
	*/
    return runningTotal + currentValue;
  }

  let sum = final.reduce(add);

  if (/[0-9]/.test(inputArray[inputArray.length - 1]) === true) {
    result.innerHTML = sum;
  }
});

function rowInput() {
  let results = "";
  for (let i = 0; i < inputArray.length; i++) {
    if (/<sup>/.test(inputArray[i])) {
      results.push(Math.pow(inputArray[i - 1], inputArray[i].match(/\d/)));
    }
    if (inputArray[i] === "+") {
      results = parseInt(inputArray[i - 1] + inputArray[i + 1]);
    }
    if (inputArray[i] === "×") {
      results.push(inputArray[i - 1] * inputArray[i + 1]);
    }
  }
  document.querySelector(".row-input").innerHTML = inputArray;
  document.querySelector(".calculations").innerHTML = results;
}

setInterval(rowInput, 100);
