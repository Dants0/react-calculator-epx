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

  test('division() should throw an error when num_1 is 0', () => {
    const calculator = new Calculator({ num_1: 0, num_2: 10 });
    expect(() => calculator.division()).toThrowError('0 equals to zero');
  });

  test('division() should return num_1 when num_2 is 0', () => {
    const calculator = new Calculator({ num_1: 10, num_2: 0 });
    expect(calculator.division()).toBe(10);
  });
});
