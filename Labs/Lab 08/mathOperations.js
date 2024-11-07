// mathOperations.js
// This module demonstrates using Promises in basic math operations

function add(a, b) {
    return Promise.resolve(a + b);
}

function subtract(a, b) {
    return Promise.resolve(a - b);
}

function multiply(a, b) {
    return Promise.resolve(a * b);
}

function divide(a, b) {
    if (b === 0) {
        return Promise.reject(new Error("Division by zero"));
    } else {
        return Promise.resolve(a / b);
    }
}

module.exports = {
    add,
    subtract,
    multiply,
    divide
};
