import chai from "chai";
import chaiHttp from "chai-http";
import app from "../server/index";
import { db } from "../models/connect";

chai.should();
chai.use(chaiHttp);

describe("POST: /auth/signup", () => {
  before(done => {
    db.manyOrNone("delete from users")
      .then(() => {}, done())
      .catch(e => {});
  });
  it("should register a user if there are no errors", done => {
    const signupData = {
      username: "tonyguesswho",
      email: "anthonyu234@gmail.com",
      password: "yagilevel"
    };
    chai
      .request(app)
      .post("/auth/signup")
      .send(signupData)
      .end((err, res) => {
        res.should.have.status(201);
        res.should.be.json;
        res.body.should.be.a("object");
        res.body.should.have.property("message");
        res.body.message.should.eql("Signup successful");
        done();
      });
  });
});
