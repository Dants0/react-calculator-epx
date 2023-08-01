"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Calculator_1 = require("./Calculator");
describe('Calculator', () => {
    test('sum() should return the sum of num_1 and num_2', () => {
        const calculator = new Calculator_1.Calculator({ num_1: 5, num_2: 10 });
        expect(calculator.sum()).toBe(15);
    });
    test('minus() should return the difference between num_1 and num_2', () => {
        const calculator = new Calculator_1.Calculator({ num_1: 10, num_2: 3 });
        expect(calculator.minus()).toBe(7);
    });
    test('multiply() should return the product of num_1 and num_2', () => {
        const calculator = new Calculator_1.Calculator({ num_1: 4, num_2: 5 });
        expect(calculator.multiply()).toBe(20);
    });
    test('division() should return the division of num_1 by num_2', () => {
        const calculator = new Calculator_1.Calculator({ num_1: 20, num_2: 4 });
        expect(calculator.division()).toBe(5);
    });
    test('division() should return the division when num_1 is 0', () => {
        const calculator = new Calculator_1.Calculator({ num_1: 0, num_2: 10 });
        expect(calculator.division()).toBe(0);
    });
    test('division() should return num_1 when num_2 is 0', () => {
        const calculator = new Calculator_1.Calculator({ num_1: 10, num_2: 0 });
        expect(() => calculator.division()).toThrowError('Division by zero is not possible');
    });
});
describe('Calculator - showResults()', () => {
    test('showResults() should throw an error when no results are available', () => {
        const calculator = new Calculator_1.Calculator({ num_1: 0, num_2: 0 });
        expect(() => calculator.showResults()).toThrowError('It is not possible to present results without calculating first');
    });
    test('showResults() should return formatted correctly', () => {
        const calculator = new Calculator_1.Calculator({ num_1: 20, num_2: 10 });
        const resultsExpected = `Sum: 30\nMinus: 10\nMultiply: 200\nDivision: 2`;
        expect(calculator.showResults()).toBe(resultsExpected);
    });
});
describe('Calculator Fibonacci And Factorial features', () => {
    test('fibonacci() should return the fibonacci correctly sequence for n = 2', () => {
        const calculator = new Calculator_1.Calculator({ num_1: 0, num_2: 0 });
        expect(calculator.fibonacci(2)).toBe(1);
    });
    test('fibonacci() should return the fibonacci correctly sequence for n = 10', () => {
        const calculator = new Calculator_1.Calculator({ num_1: 0, num_2: 0 });
        expect(calculator.fibonacci(10)).toBe(55);
    });
    test('fibonacci() should return the fibonacci correctly sequence for n = 8', () => {
        const calculator = new Calculator_1.Calculator({ num_1: 0, num_2: 0 });
        expect(calculator.fibonacci(8)).toBe(21);
    });
    test('fibonacci() should return the fibonacci correctly sequence for n = 1', () => {
        const calculator = new Calculator_1.Calculator({ num_1: 0, num_2: 0 });
        expect(calculator.fibonacci(1)).toBe(1);
    });
    test('fibonacci() should return the fibonacci correctly sequence for n = 20', () => {
        const calculator = new Calculator_1.Calculator({ num_1: 0, num_2: 0 });
        expect(calculator.fibonacci(20)).toBe(6765);
    });
    test('fibonacci() throws an error if the fibonacci sequence is invalid when n = -1', () => {
        const calculator = new Calculator_1.Calculator({ num_1: 0, num_2: 0 });
        expect(() => calculator.fibonacci(-1)).toThrowError('Enter a positive integer');
    });
    test('fibonacci() throws an error if the fibonacci sequence is invalid when n = 0', () => {
        const calculator = new Calculator_1.Calculator({ num_1: 0, num_2: 0 });
        expect(() => calculator.fibonacci(0)).toThrowError('Enter a positive integer');
    });
    test('factorial() should return the correctly factorial value when n = 4', () => {
        const calculator = new Calculator_1.Calculator({ num_1: 0, num_2: 0 });
        expect(calculator.factorial(4)).toBe(24);
    });
    test('factorial() should return 1 when n = 0', () => {
        const calculator = new Calculator_1.Calculator({ num_1: 0, num_2: 0 });
        expect(calculator.factorial(0)).toBe(1);
    });
    test('factorial() should return 1 when n = 1', () => {
        const calculator = new Calculator_1.Calculator({ num_1: 0, num_2: 0 });
        expect(calculator.factorial(1)).toBe(1);
    });
    test('factorial() throws an error when n is negative number', () => {
        const calculator = new Calculator_1.Calculator({ num_1: 0, num_2: 0 });
        expect(() => calculator.factorial(-1)).toThrowError('Factorial is not possible for negative numbers');
    });
});
describe('Calculator geometry tests', () => {
    test('Triangle area should be return the correct value', () => {
        const calculator = new Calculator_1.Calculator({ num_1: 0, num_2: 0 });
        expect(calculator.trianglearea(4, 3)).toBe(6);
    });
    test('Triangle area should throw an error for invalid input', () => {
        const calculator = new Calculator_1.Calculator({ num_1: 0, num_2: 0 });
        expect(() => calculator.trianglearea(0, 5)).toThrowError('Invalid base and height specified for Area triangles');
    });
    test('Perfect square should be return the correct value', () => {
        const calculator = new Calculator_1.Calculator({ num_1: 0, num_2: 0 });
        expect(calculator.perfectsquare(5)).toBe(25);
        expect(calculator.perfectsquare(7)).toBe(49);
    });
    test('Perfect square should be return the correct value', () => {
        const calculator = new Calculator_1.Calculator({ num_1: 0, num_2: 0 });
        expect(() => calculator.perfectsquare(0)).toThrowError('Invalid square specified');
        expect(() => calculator.perfectsquare(-1)).toThrowError('Invalid square specified');
    });
    test('Square root should be return the correct value', () => {
        const calculator = new Calculator_1.Calculator({ num_1: 0, num_2: 0 });
        expect(calculator.squareroot(64)).toBe(8);
        expect(calculator.squareroot(49)).toBe(7);
    });
    test('Square root should be throw error', () => {
        const calculator = new Calculator_1.Calculator({ num_1: 0, num_2: 0 });
        expect(() => calculator.squareroot(0)).toThrowError('Invalid square root specified');
        expect(() => calculator.squareroot(-1)).toThrowError('Invalid square root specified');
    });
    test('Rectangle should calculate the correct area for valid input', () => {
        const calculator = new Calculator_1.Calculator({ num_1: 0, num_2: 0 });
        expect(calculator.rectangle(6, 4)).toBe(24);
        expect(calculator.rectangle(8, 3)).toBe(24);
    });
    test('Rectangle should throw an error for invalid input', () => {
        const calculator = new Calculator_1.Calculator({ num_1: 0, num_2: 0 });
        expect(() => calculator.rectangle(0, 4)).toThrow('Invalid base and height specified for rectangle');
        expect(() => calculator.rectangle(6, 0)).toThrow('Invalid base and height specified for rectangle');
        expect(() => calculator.rectangle(-1, 4)).toThrow('Invalid base and height specified for rectangle');
        expect(() => calculator.rectangle(6, -1)).toThrow('Invalid base and height specified for rectangle');
        expect(() => calculator.rectangle(-1, 0)).toThrow('Invalid base and height specified for rectangle');
        expect(() => calculator.rectangle(0, -1)).toThrow('Invalid base and height specified for rectangle');
    });
    test('Diamond should calculate the correct area for valid input', () => {
        const calculator = new Calculator_1.Calculator({ num_1: 0, num_2: 0 });
        expect(calculator.diamond(6, 4)).toBe(12);
        expect(calculator.diamond(8, 3)).toBe(12);
    });
    test('Diamond should throw an error for invalid input', () => {
        const calculator = new Calculator_1.Calculator({ num_1: 0, num_2: 0 });
        expect(() => calculator.diamond(-1, 4)).toThrow('Invalid max_diagonal and min_diagonal specified');
        expect(() => calculator.diamond(6, -1)).toThrow('Invalid max_diagonal and min_diagonal specified');
        expect(() => calculator.diamond(-1, -1)).toThrow('Invalid max_diagonal and min_diagonal specified');
    });
    test('Circle area should calculate the correct area for valid input', () => {
        const calculator = new Calculator_1.Calculator({ num_1: 0, num_2: 0 });
        expect(calculator.areacircle(4)).toBeCloseTo(50.2655, 4);
        expect(calculator.areacircle(6)).toBeCloseTo(113.0973, 4);
    });
    test('Circle area should throw an error for invalid input', () => {
        const calculator = new Calculator_1.Calculator({ num_1: 0, num_2: 0 });
        expect(() => calculator.areacircle(-1)).toThrow('Invalid radius specified');
        expect(() => calculator.areacircle(0)).toThrow('Invalid radius specified');
    });
    test('Trapeze should calculate the correct area for valid input', () => {
        const calculator = new Calculator_1.Calculator({ num_1: 0, num_2: 0 });
        expect(calculator.trapeze(6, 4, 5)).toBe(25);
        expect(calculator.trapeze(8, 3, 7)).toBe(38.5);
    });
    test('Trapeze should throw an error for invalid input', () => {
        const calculator = new Calculator_1.Calculator({ num_1: 0, num_2: 0 });
        expect(() => calculator.trapeze(0, 4, 5)).toThrow('Invalid max_base, min_base, height specified. They must be greater than zero.');
        expect(() => calculator.trapeze(6, 0, 5)).toThrow('Invalid max_base, min_base, height specified. They must be greater than zero.');
        expect(() => calculator.trapeze(6, 4, 0)).toThrow('Invalid max_base, min_base, height specified. They must be greater than zero.');
    });
});
