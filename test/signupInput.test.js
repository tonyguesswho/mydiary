import chai from "chai";
import chaiHttp from "chai-http";
import app from "../server/index";

chai.should();
chai.use(chaiHttp);

describe("POST: /user/signup", () => {
  it("should respond with an error if the email is undefined", done => {
    const signupData = {
      password: "password"
    };
    chai
      .request(app)
      .post("/user/signup")
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

describe("POST: /user/signup", () => {
  it("should respond with an error if the email is invalid", done => {
    const signupData = {
      password: "password",
      email: "notanemail"
    };
    chai
      .request(app)
      .post("/user/signup")
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

describe("POST: /user/signup", () => {
  it("should respond with an error if the password is invalid", done => {
    const signupData2 = {
      email: "anthonyu234@gmail.com",
      password: ""
    };
    chai
      .request(app)
      .post("/user/signup")
      .send(signupData2)
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
