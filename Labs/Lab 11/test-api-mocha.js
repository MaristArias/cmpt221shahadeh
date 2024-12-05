const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('./server');
const { expect } = chai;

chai.use(chaiHttp);

describe('API Endpoints', function() {
    it('should return the sum of two numbers', function(done) {
        chai.request(app)
            .get('/add')
            .query({ a: 1, b: 2 })
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('result', 3);
                done();
            });
    });

    it('should return the difference of two numbers', function(done) {
        chai.request(app)
            .get('/subtract')
            .query({ a: 5, b: 3 })
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('result', 2);
                done();
            });
    });

    it('should return the product of two numbers', function(done) {
        chai.request(app)
            .get('/multiply')
            .query({ a: 4, b: 3 })
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('result', 12);
                done();
            });
    });

    it('should return the quotient of two numbers', function(done) {
        chai.request(app)
            .get('/divide')
            .query({ a: 10, b: 2 })
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('result', 5);
                done();
            });
    });

    it('should return an error for division by zero', function(done) {
        chai.request(app)
            .get('/divide')
            .query({ a: 10, b: 0 })
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body).to.have.property('error', 'Division by zero is not allowed');
                done();
            });
    });
});
