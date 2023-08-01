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
    trianglearea(base, height) {
        if (base == null || height == null || base === 0 || height === 0 || base === -1 || height === -1) {
            throw new Error('Invalid base and height specified for Area triangles');
        }
        let area = base * height / 2;
        return area;
    }
    perfectsquare(a) {
        if (a == null || a == 0 || a == -1) {
            throw new Error(`Invalid square specified`);
        }
        let square = Math.pow(a, 2);
        return square;
    }
    squareroot(number) {
        if (number == null || number == 0 || number == -1) {
            throw new Error(`Invalid square root specified`);
        }
        let result = Math.sqrt(number);
        return result;
    }
    rectangle(base, height) {
        const isValidInput = (n) => n !== null && n !== 0 && n !== -1;
        if (!isValidInput(base) || !isValidInput(height)) {
            throw new Error('Invalid base and height specified for rectangle');
        }
        let result = base * height;
        return result;
    }
    diamond(max_diagonal, min_diagonal) {
        const isValidInput = (n) => n !== -1;
        if (!isValidInput(max_diagonal) || !isValidInput(min_diagonal)) {
            throw new Error('Invalid max_diagonal and min_diagonal specified');
        }
        let result = (max_diagonal * min_diagonal) / 2;
        return result;
    }
    trapeze(max_base, min_base, height) {
        if (max_base <= 0 || min_base <= 0 || height <= 0) {
            throw new Error('Invalid max_base, min_base, height specified. They must be greater than zero.');
        }
        let result = (max_base + min_base) * height / 2;
        return result;
    }
    areacircle(radius) {
        if (radius == -1 || radius == 0) {
            throw new Error(`Invalid radius specified`);
        }
        const pi = Math.PI;
        let result = pi * radius ** 2;
        return result;
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
