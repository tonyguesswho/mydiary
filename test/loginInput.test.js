import chai from "chai";
import chaiHttp from "chai-http";
import app from "../server/index";
import { db } from "../models/connect";

chai.should();
chai.use(chaiHttp);


describe("POST: /auth/login", () => {
  before(done => {
    db.manyOrNone("delete from users")
      .then(() => {}).then(()=>{
        db.manyOrNone("delete from entries")
      },done())
      .catch(e => {});
  });
  it("should respond with an error if the email is invalid", done => {
    const signupData = {
      password: "password",
      email: "notanemail"
    };
    chai
      .request(app)
      .post("/auth/login")
      .send(signupData)
      .end((err, res) => {
        res.should.have.status(400);
        res.should.be.json;
        res.body.should.be.a("object");
        res.body.should.have.property("message");
        res.body.message.should.be.a("string");
        done();
      });
  });
});

