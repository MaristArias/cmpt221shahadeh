const { expect } = require('chai');
const math = require('./math');

describe('Math Functions', function() {
    it('should add two numbers', function() {
        expect(math.add(1, 2)).to.equal(3);
    });

    it('should subtract two numbers', function() {
        expect(math.subtract(2, 1)).to.equal(1);
    });

    it('should asynchronously add two numbers', function(done) {
        math.asyncAdd(1, 2, (err, result) => {
            expect(result).to.equal(3);
            done();
        });
    });
});
