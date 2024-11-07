// index.js
const math = require('./mathOperations');

math.add(5, 3)
    .then(result => {
        console.log("Add:", result); // 8
        return math.subtract(result, 3);
    })
    .then(result => {
        console.log("Subtract:", result); // 5
        return math.multiply(result, 3);
    })
    .then(result => {
        console.log("Multiply:", result); // 15
        return math.divide(result, 3);
    })
    .then(result => {
        if (typeof result === "string") {
            console.log(result); // "Division by zero is undefined"
        } else {
            console.log("Divide:", result);
        }
    })
    .catch(err => {
        console.error("An error occurred:", err.message);
    });


/* 
1. a Promise is useful because it allows async code to be easier to read and manage, especially when things can be done in parallel. in this case, math can be done in parallel to be more efficient.
2. it allows you to make a "chain" or "ladder" when a promise is complete, allowing actions to be taken place once an initial promise is complete.
3. the chain would "break" and it would be up to whatever catch block you have set up to handle the error. the promise will be rejected.
4. see above. It checks if a string is outputted, signifying an error happened, if it isnt a string then it continues the operation.
5. first task, being the addition starts and finishes, the then function takes over and moves that to subtract, rinse and repeat through all the functions. if an error happens, the error catcher takes over if availible and the then functions end.
*/