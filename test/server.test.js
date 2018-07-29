
const chai = require('chai');
const chaiHttp = require('chai-http')



chai.should();
chai.use(chaiHttp);

describe('POST: /api/v1/auth/signup', () => {
  it('should respond with an error if the email field is empty', (done) => {
    chai.request("localhost:3000")
      .get('/')
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        done();
      });
  });
});