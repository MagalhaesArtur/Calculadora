const numbersBtn = document.querySelectorAll("[data-number]");
const allClearBtn = document.querySelector("[data-all-clear]");
const deleteBtn = document.querySelector("[data-delete]");
const operatorsBtn = document.querySelectorAll("[data-operador]");
const equalsBtn = document.querySelector("[data-igual]");
const previusOperandText = document.querySelector("[data-previusOperand]");
const currentOperandText = document.querySelector("[data-currentOperand]");

class Calc {
  constructor(previusOperandText, currentOperandText) {
    this.previusOperandText = previusOperandText;
    this.currentOperandText = currentOperandText;
    this.clearAll();
  }
  delete() {
    this.currentOperand = this.currentOperand.slice(0, -1);
  }
  calculate() {
    let result;
    const previusOperandFloat = parseFloat(this.previusOperand);
    const currentOperandFloat = parseFloat(this.currentOperand);
    if (this.operator === "+") {
      result = previusOperandFloat + currentOperandFloat;
    }
    if (this.operator === "-") {
      result = previusOperandFloat - currentOperandFloat;
    }
    if (this.operator === "*") {
      result = previusOperandFloat * currentOperandFloat;
    }
    if (this.operator === "÷") {
      result = previusOperandFloat / currentOperandFloat;
    }
    this.currentOperand = result;
    this.operator = undefined;
    this.previusOperand = "";
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
  appendOperator(operator) {
    if (this.currentOperand == "") return;
    if (this.previusOperand != "") {
      this.calculate();
    }
    this.operator = operator;
    this.previusOperand = this.currentOperand;
    this.currentOperand = "";
  }

  appendNumber(number) {
    if (this.currentOperand.indexOf(".") == 0) return;
    if (this.currentOperand.toString().includes(".") && number === ".") return;
    this.currentOperand += number;
  }
  clearAll() {
    this.previusOperand = "";
    this.currentOperand = "";
    this.operator = undefined;
  }
  updateDisplay() {
    this.previusOperandText.innerHTML = `${this.previusOperand} ${
      this.operator || ""
    }`;
    this.currentOperandText.innerHTML = this.formatDisplayNumber(
      this.currentOperand
    );
  }
}

const calculator = new Calc(previusOperandText, currentOperandText);

for (let numberBtn of numbersBtn) {
  numberBtn.addEventListener("click", () => {
    calculator.appendNumber(numberBtn.innerText);
    calculator.updateDisplay();
  });
}

for (let operatorBtn of operatorsBtn) {
  operatorBtn.addEventListener("click", () => {
    calculator.appendOperator(operatorBtn.innerText);
    calculator.updateDisplay();
  });
}

allClearBtn.addEventListener("click", function () {
  calculator.clearAll();
  calculator.updateDisplay();
});
equalsBtn.addEventListener("click", () => {
  calculator.calculate();
  calculator.updateDisplay();
});
deleteBtn.addEventListener("click", () => {
  calculator.delete();
  calculator.updateDisplay();
});
