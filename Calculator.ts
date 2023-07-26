interface CalculatorProps {
  num_1: number;
  num_2: number;
}

export class Calculator {
  private num_1: number;
  private num_2: number;

  constructor({ num_1, num_2 }: CalculatorProps) {
    this.num_1 = num_1;
    this.num_2 = num_2;
  }

  sum(): number {
    return this.num_1 + this.num_2;
  }

  minus(): number {
    return this.num_1 - this.num_2;
  }

  multiply(): number {
    return this.num_1 * this.num_2;
  }

  division(): number {
    if (this.num_1 === 0) {
      return 0;
    }

    if (this.num_2 === 0) {
      throw new Error(`${this.num_2} Division by zero is not possible`);
    }

    return this.num_1 / this.num_2;
  }

  showResults(): string {
    const sumResult = `Sum: ${this.sum()}`;
    const minusResult = `Minus: ${this.minus()}`;
    const multiplyResult = `Multiply: ${this.multiply()}`;
    const divisionResult = `Division: ${this.division()}`;

    return `${sumResult}\n${minusResult}\n${multiplyResult}\n${divisionResult}`;
  }
}
