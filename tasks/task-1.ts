type Operations = '+' | '-' | '/' | '*';

const calc = (number1: number, number2: number, base: number, operation: Operations) => {
    const first = parseInt(number1.toString(), base);
    const second = parseInt(number2.toString(), base);

    switch (operation) {
        case '+':
            return parseInt((first + second).toString(base));
        case '-':
            return parseInt((first - second).toString(base));
        case '*':
            return parseInt((first * second).toString(base));
        case '/':
            return parseInt((first / second).toString(base));
    }
}
const add = (number1: number, number2: number, base: number) => {
    return calc(number1, number2, base, '+');
}

const subtract = (number1: number, number2: number, base: number) => {
    return calc(number1, number2, base, '-');
}

const multiply = (number1: number, number2: number, base: number) => {
    return calc(number1, number2, base, '*');
}

const divide = (number1: number, number2: number, base: number) => {
    return calc(number1, number2, base, '/');
}

console.log('Sum of binary numbers:', add(1110,1001,2));
console.log('Subtract of decimal numbers:', subtract(10,5,10));
console.log('Multiply of binary numbers:', multiply(1110,1001,2));
console.log('Sum of hexadecimal numbers:', add(0xF4240,0x7A120,16));
console.log('Divide of hexadecimal numbers', divide(0xF4240,0x7A120,16));

