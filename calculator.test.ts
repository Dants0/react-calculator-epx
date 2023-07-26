import { Calculator } from "./Calculator";

describe('Calculator', () => {

  test('sum() should return the sum of num_1 and num_2', () => {
    const calculator = new Calculator({ num_1: 5, num_2: 10 });
    expect(calculator.sum()).toBe(15);
  });

  test('minus() should return the difference between num_1 and num_2', () => {
    const calculator = new Calculator({ num_1: 10, num_2: 3 });
    expect(calculator.minus()).toBe(7);
  });

  test('multiply() should return the product of num_1 and num_2', () => {
    const calculator = new Calculator({ num_1: 4, num_2: 5 });
    expect(calculator.multiply()).toBe(20);
  });

  test('division() should return the division of num_1 by num_2', () => {
    const calculator = new Calculator({ num_1: 20, num_2: 4 });
    expect(calculator.division()).toBe(5);
  });

  test('division() should return the division when num_1 is 0', () => {
    const calculator = new Calculator({ num_1: 0, num_2: 10 });
    expect(calculator.division()).toBe(0);
  });

  test('division() should return num_1 when num_2 is 0', () => {
    const calculator = new Calculator({ num_1: 10, num_2: 0 });
    expect(()=>calculator.division()).toThrowError('Division by zero is not possible');
  });
});

describe('Calculator - showResults()', () => {

  test('showResults() should throw an error when no results are available',()=>{
    const calculator = new Calculator({num_1:0, num_2:0})
    expect(()=>calculator.showResults()).toThrowError('It is not possible to present results without calculating first')
  })
  
  test('showResults() should return formatted correctly', ()=>{
    const calculator = new Calculator({num_1:20, num_2:10})

    const resultsExpected = `Sum: 30\nMinus: 10\nMultiply: 200\nDivision: 2`

    expect(calculator.showResults()).toBe(resultsExpected)
  })

})


describe('Calculator Plus Features', () => {
  
  test('fibonacci() should return the fibonacci correctly sequence for n = 2', () => {
    const calculator = new Calculator({ num_1: 0, num_2:0})
    expect(calculator.fibonacci(2)).toBe(1)
  })

  test('fibonacci() should return the fibonacci correctly sequence for n = 10', () => {
    const calculator = new Calculator({ num_1: 0, num_2:0})
    expect(calculator.fibonacci(10)).toBe(55)
  })

  test('fibonacci() should return the fibonacci correctly sequence for n = 8', () => {
    const calculator = new Calculator({ num_1: 0, num_2:0})
    expect(calculator.fibonacci(8)).toBe(21)
  })

  test('fibonacci() should return the fibonacci correctly sequence for n = 1', () => {
    const calculator = new Calculator({ num_1: 0, num_2:0})
    expect(calculator.fibonacci(1)).toBe(1)
  })

  test('fibonacci() should return the fibonacci correctly sequence for n = 20', () => {
    const calculator = new Calculator({ num_1: 0, num_2:0})
    expect(calculator.fibonacci(20)).toBe(6765)
  })
  
  test('fibonacci() throws an error if the fibonacci sequence is invalid when n = -1', () => {
    const calculator = new Calculator({ num_1: 0, num_2:0})
    expect(()=>calculator.fibonacci(-1)).toThrowError('Enter a positive integer')
  })

  test('fibonacci() throws an error if the fibonacci sequence is invalid when n = 0', ()=>{
    const calculator = new Calculator({ num_1: 0, num_2:0})
    expect(()=>calculator.fibonacci(0)).toThrowError('Enter a positive integer')
  })

  test('factorial() should return the correctly factorial value when n = 4', () =>{
    const calculator = new Calculator({ num_1: 0, num_2: 0})
    expect(calculator.factorial(4)).toBe(24)
  })

  test('factorial() should return 1 when n = 0', () =>{
    const calculator = new Calculator({ num_1: 0, num_2: 0})
    expect(calculator.factorial(0)).toBe(1)
  })

  test('factorial() should return 1 when n = 1', () =>{
    const calculator = new Calculator({ num_1: 0, num_2: 0})
    expect(calculator.factorial(1)).toBe(1)
  })

  test('factorial() throws an error when n is negative number', () =>{
    const calculator = new Calculator({ num_1: 0, num_2: 0})
    expect(()=>calculator.factorial(-1)).toThrowError('Factorial is not possible for negative numbers')
  })


})