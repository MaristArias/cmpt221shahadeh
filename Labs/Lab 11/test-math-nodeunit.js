const math = require('./math');
const nodeunit = require('nodeunit');

exports.testAdd = function(test) {
    test.equal(math.add(1, 2), 3);
    test.done();
};

exports.testSubtract = function(test) {
    test.equal(math.subtract(2, 1), 1);
    test.done();
};

exports.testAsyncAdd = function(test) {
    math.asyncAdd(1, 2, (err, result) => {
        test.equal(result, 3);
        test.done();
    });
};
