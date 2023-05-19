import { Component } from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss'],
})
export class CalculatorComponent {
  displayValue: string = '0';
  firstOperand: number | null = null;
  waitingForSecondOperand = false;
  operator: string | null = null;

  inputDigit(digit: string) {
    if (this.waitingForSecondOperand === true) {
      this.displayValue = digit;
      this.waitingForSecondOperand = false;
    } else {
      this.displayValue =
        this.displayValue === '0' ? digit : this.displayValue + digit;
    }
    console.log(this.displayValue);
  }

  inputDecimal(dot: string) {
    console.log(dot);
    if (this.waitingForSecondOperand === true) {
      this.displayValue = '0.';
      this.waitingForSecondOperand = false;
      return;
    }

    if (!this.displayValue.includes(dot)) {
      console.log('I am working');
      this.displayValue += dot;
    }
  }

  handleOperator(nextOperator: string) {
    console.log('nextOperator:' + nextOperator);
    const inputValue = parseFloat(this.displayValue);
    if (this.operator && this.waitingForSecondOperand) {
      this.operator = nextOperator;
      return;
    }

    if (this.firstOperand == null && !isNaN(inputValue)) {
      this.firstOperand = inputValue;
    } else if (this.operator) {
      const result = this.calculate(
        this.firstOperand!,
        inputValue,
        this.operator
      );

      this.displayValue = `${parseFloat(result.toFixed(7))}`;
      this.firstOperand = result;
    }

    this.waitingForSecondOperand = true;
    this.operator = nextOperator;
  }

  calculate(
    firstOperand: number,
    secondOperand: number,
    operators: string
  ): number {
    console.log('firstOperator:' + firstOperand);
    console.log('secondOperator:' + secondOperand);
    console.log('operator:' + operators);
    if (operators === '+') {
      return firstOperand + secondOperand;
    } else if (operators === '-') {
      return firstOperand - secondOperand;
    } else if (operators === '*') {
      return firstOperand * secondOperand;
    } else if (operators === '/') {
      return firstOperand / secondOperand;
    }

    return secondOperand;
  }

  resetCalculator() {
    this.displayValue = '0';
    this.firstOperand = null;
    this.waitingForSecondOperand = false;
    this.operator = null;
  }
  clearOneDigit() {
    if (this.waitingForSecondOperand) {
      return;
    }

    if (
      this.displayValue.length === 1 ||
      (this.displayValue.length === 2 && parseFloat(this.displayValue) < 0)
    ) {
      this.displayValue = '0';
    } else {
      this.displayValue = this.displayValue.slice(0, -1);
    }
  }
}
