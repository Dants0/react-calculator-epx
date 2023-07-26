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
    fibonacci(n) {
        if (n <= 0) {
            throw new Error(`Enter a positive integer`);
        }
        if (n === 1) {
            return 1;
        }
        const memo = [0, 1];
        for (let i = 2; i <= n; i++) {
            memo[i] = memo[i - 1] + memo[i - 2];
        }
        return memo[n];
    }
    factorial(n) {
        if (n < 0) {
            throw new Error(`Factorial is not possible for negative numbers`);
        }
        if (n === 0) {
            return 1;
        }
        let factorial_answer = 1;
        for (let i = 2; i <= n; i++) {
            factorial_answer *= i;
        }
        return factorial_answer;
    }
    showResults() {
        const sumResult = `Sum: ${this.sum()}`;
        const minusResult = `Minus: ${this.minus()}`;
        const multiplyResult = `Multiply: ${this.multiply()}`;
        const divisionResult = `Division: ${this.division()}`;
        if (this.num_1 === 0 && this.num_2 === 0) {
            throw new Error('It is not possible to present results without calculating first');
        }
        return `${sumResult}\n${minusResult}\n${multiplyResult}\n${divisionResult}`;
    }
}
exports.Calculator = Calculator;
