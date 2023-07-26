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

  fibonacci(n:number): number {
    if(n<=0){
      throw new Error(`Enter a positive integer`);
    }

    if(n===1){
      return 1;
    }
    const memo: number[] = [0,1]

    for(let i = 2; i<=n; i++){
      memo[i] = memo[i-1] + memo[i-2]
    }
    return memo[n]
  }

  factorial(n:number): number {
    if(n<0){
      throw new Error(`Factorial is not possible for negative numbers`);
    }
    if(n===0){
      return 1;
    }

    let factorial_answer = 1;
    for(let i = 2; i<=n; i++){
      factorial_answer *= i
    }
    return factorial_answer
  }




  showResults(): string {
    const sumResult = `Sum: ${this.sum()}`;
    const minusResult = `Minus: ${this.minus()}`;
    const multiplyResult = `Multiply: ${this.multiply()}`;
    const divisionResult = `Division: ${this.division()}`;

    if(this.num_1 === 0 && this.num_2 === 0){
      throw new Error('It is not possible to present results without calculating first')
    }

    return `${sumResult}\n${minusResult}\n${multiplyResult}\n${divisionResult}`;
  }
}
