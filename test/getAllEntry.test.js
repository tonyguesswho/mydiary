import chai from "chai";
import chaiHttp from "chai-http";
import app from "../server/index";
import { db } from "../models/connect";

chai.should();
chai.use(chaiHttp);

describe("POST: /api/v1/entries", () => {
  before(done => {
    db.manyOrNone("delete from users")
      .then(() => {}).then(()=>{
        db.manyOrNone("delete from entries")
      },done())
      .catch(e => {});
  });
    
  it("should add a diary entry when there is no error", done => {
    const signupData = {
      username: "madiba",
      password: "Password",
      confirmPassword: "Password",
      email: "sample@gmail.com"
    };
    const entryData = {
      title: "test title",
      description: "test description"
    };
    const loginData = {
      password: "Password",
      email: "sample@gmail.com"
    };
    chai
      .request(app)
      .post("/auth/signup")
      .send(signupData)
      .end((err, res) => {
        chai
          .request(app)
          .post("/auth/login")

          .send(loginData)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property("token");
            const { token } = res.body;
            chai
              .request(app)
              .get("/api/v1/entries")
              .set("Authorization", token)
              .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.have.property("status");
                res.body.status.should.eql("success");
                res.body.should.have.property("data");
            done()
               });
              
          });
      });
  });
});