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

  appendNumber(number) {
    if (this.baixo.includes(".") && number === ".") {
      return;
    }
    this.baixo = `${this.baixo}${number.toString()}`;
  }
  clear() {
    this.cima = "";
    this.baixo = "";
    this.operation = undefined;
  }

  updateDisplay() {
    this.parteCimaText.innerHTML = this.cima;
    this.parteBaixoText.innerHTML = this.baixo;
  }
}

const Calculator = new Calc(parteCimaText, parteBaixoText);

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
