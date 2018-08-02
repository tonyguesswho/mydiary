import chai from "chai";
import chaiHttp from "chai-http";
import app from "../server/index";
import { db } from "../models/connect";

chai.should();
chai.use(chaiHttp);

describe("POST: /auth/login", () => {
  before(done => {
    db.manyOrNone("delete from users")
      .then(() => {}, done())
      .catch(e => {});
  });
  it("should login a user if there are no error", done => {
    const signupData = {
      username: "tonyguesswho",
      email: "tonyu234@gmail.com",
      password: "yagilevel",
      confirmPassword: "yagilevel"
    };
    const signinData = {
      email: "tonyu234@gmail.com",
      password: "yagilevel"
    };
    chai
      .request(app)
      .post("/auth/signup")
      .send(signupData)
      .end(() => {
        chai
          .request(app)
          .post("/auth/login")
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
