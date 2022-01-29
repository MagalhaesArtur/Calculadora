const numberBtn = document.querySelectorAll("[data-number]");
const operatorBtn = document.querySelectorAll("[data-operador]");
const equalsBtn = document.querySelector("[data-igual]");
const deleteBtn = document.querySelector("[data-delete]");
const allClearBtn = document.querySelector("[data-all-clear]");
const parteCimaText = document.querySelector("[data-cima]");
const parteBaixoText = document.querySelector("[data-baixo]");

class Calc {
  constructor(parteCimaText, parteBaixoText) {
    this.parteCimaText = parteCimaText;
    this.parteBaixoText = parteBaixoText;
    this.clear();
  }

  formatDisplayNumber(number) {
    const stringNumber = number.toString();

    const integerDigits = parseFloat(stringNumber.split(".")[0]);
    const decimalDigits = stringNumber.split(".")[1];

    let integerDisplay;

    if (isNaN(integerDigits)) {
      integerDisplay = "";
    } else {
      integerDisplay = integerDigits.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    }

    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }

  appendNumber(number) {
    if (this.baixo.includes(".") && number === ".") {
      return;
    }
    this.baixo = `${this.baixo}${number.toString()}`;
  }

  delete() {
    this.baixo = this.baixo.toString().slice(0, -1);
  }

  calculate() {
    let result;

    const cimaFloat = parseFloat(this.cima);
    const baixoFloat = parseFloat(this.baixo);

    if (isNaN(cimaFloat) || isNaN(baixoFloat)) return;

    if (this.operation === "+") {
      result = cimaFloat + baixoFloat;
    }

    if (this.operation === "-") {
      result = cimaFloat - baixoFloat;
    }

    if (this.operation === "*") {
      result = cimaFloat * baixoFloat;
    }

    if (this.operation === "÷") {
      result = cimaFloat / baixoFloat;
    }

    this.baixo = result;
    this.operation = undefined;
    this.cima = "";
  }

  chooseOperation(operation) {
    if (this.baixo === "") return;
    if (this.cima != "") {
      this.calculate();
    }

    this.operation = operation;

    this.cima = this.baixo;
    this.baixo = "";
  }

  clear() {
    this.cima = "";
    this.baixo = "";
    this.operation = undefined;
  }

  updateDisplay() {
    this.parteCimaText.innerText = `${this.formatDisplayNumber(this.cima)} ${
      this.operation || ""
    } `;
    this.parteBaixoText.innerHTML = this.formatDisplayNumber(this.baixo);
  }
}

const Calculator = new Calc(parteCimaText, parteBaixoText);

for (const operatorBt of operatorBtn) {
  operatorBt.addEventListener("click", function () {
    Calculator.chooseOperation(operatorBt.innerText);
    Calculator.updateDisplay();
  });
}

for (const number of numberBtn) {
  number.addEventListener("click", function () {
    Calculator.appendNumber(number.innerText);
    Calculator.updateDisplay();
  });
}

allClearBtn.addEventListener("click", function () {
  Calculator.clear();
  Calculator.updateDisplay();
});

equalsBtn.addEventListener("click", function () {
  Calculator.calculate();
  Calculator.updateDisplay();
});

deleteBtn.addEventListener("click", function () {
  Calculator.delete();
  Calculator.updateDisplay();
});
