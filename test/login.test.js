import chai from "chai";
import chaiHttp from "chai-http";
import app from "../server/index";
import { db } from "../database/connect";

chai.should();
chai.use(chaiHttp);

describe("POST: /user/signup", () => {
  before(done => {
    db.manyOrNone("delete from users")
      .then(() => {}, done())
      .catch(e => {});
  });
  it("should login a user if there are no error", done => {
    const signupData = {
      username: "tonyguesswho",
      email: "anthonyu234@gmail.com",
      password: "yagilevel"
    };
    const signinData = {
      email: "anthonyu234@gmail.com",
      password: "yagilevel"
    };
    chai
      .request(app)
      .post("/user/signup")
      .send(signupData)
      .end(() => {
        chai
          .request(app)
          .post("/user/signin")
          .send(signinData)
          .end((err, res) => {
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a("object");
            res.body.should.have.property("token");
            res.body.should.have.property("message");
            res.body.message.should.eql("Login successful");
            done();
          });
      });
  });
});