"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Calculator = void 0;
class Calculator {
    constructor({ num_1, num_2 }) {
        this.num_1 = num_1;
        this.num_2 = num_2;
    }
    sum() {
        return this.num_1 + this.num_2;
    }
    minus() {
        return this.num_1 - this.num_2;
    }
    multiply() {
        if (this.num_1 === 0) {
            throw new Error(`${this.num_1} equals to zero`);
        }
        return this.num_1 * this.num_2;
    }
    division() {
        if (this.num_1 === 0) {
            return 0;
        }
        if (this.num_2 === 0) {
            throw new Error(`${this.num_2} Division by zero is not possible`);
        }
        return this.num_1 / this.num_2;
    }
    showResults() {
        const sumResult = `Sum: ${this.sum()}`;
        const minusResult = `Minus: ${this.minus()}`;
        const multiplyResult = `Multiply: ${this.multiply()}`;
        const divisionResult = `Division: ${this.division()}`;
        return `${sumResult}\n${minusResult}\n${multiplyResult}\n${divisionResult}`;
    }
}
exports.Calculator = Calculator;
