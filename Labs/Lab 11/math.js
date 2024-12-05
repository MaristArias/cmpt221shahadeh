function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function asyncAdd(a, b, callback) {
    setTimeout(() => {
        callback(null, a + b);
    }, 100);
}

module.exports = { 
    add, 
    subtract, 
    asyncAdd 
};
