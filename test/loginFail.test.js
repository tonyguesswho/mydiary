import chai from "chai";
import chaiHttp from "chai-http";
import app from "../server/index";
import { db } from "../database/connect";

chai.should();
chai.use(chaiHttp);

describe("POST: /auth/login", () => {
  before(done => {
    db.manyOrNone("delete from users")
      .then(() => {}, done())
      .catch(e => {});
  });
  it("should return an error message if email is not in database", done => {
    const signupData = {
      username: "tonyguesswho",
      email: "anthonyu234@gmail.com",
      password: "yagilevel"
    };
    const signinData = {
      email: "anthonyu23@gmail.com", // wrong email
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
            res.should.have.status(400);
            res.should.be.json;
            res.body.should.be.a("object");
            res.body.should.have.property("message");
            res.body.message.should.eql("Wrong email or password");
            
          });
          done();
      });
  });
});

describe("POST: /auth/login", () => {
  before(done => {
    db.manyOrNone("delete from users")
      .then(() => {}, done())
      .catch(e => {});
  });
  it("should return an error message if password is not correct", done => {
    const signupData = {
      username: "tonyguesswho",
      email: "anthonyu234@gmail.com",
      password: "yagilevel"
    };
    const signinData = {
      email: "anthonyu234@gmail.com",
      password: "yagilevel12" // wrong password
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
            res.should.have.status(400);
            res.should.be.json;
            res.body.should.be.a("object");
            res.body.should.have.property("message");
            res.body.message.should.eql("Wrong email or password");
          });
        done();
      });
  });
});
