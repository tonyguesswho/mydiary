import chai from "chai";
import chaiHttp from "chai-http";
import app from "../server/index";
import { db } from "../database/connect";

chai.should();
chai.use(chaiHttp);

describe("POST: /api/v1/entries", () => {
  before(done => {
    db.manyOrNone("delete from users")
      .then(() => {}, done())
      .catch(e => {});
  });
  it("should add a diary entry when there is no error", done => {
    const signupData = {
      username: "madiba",
      password: "Password",
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
              .post("/api/v1/entries")
              .set("Authorization", token)
              .send(entryData)
              .end((err, res) => {
                res.should.have.status(201);
                res.should.be.json;
                res.body.should.have.property("message");
                res.body.message.should.eql("Entry Created succesfully");
                res.body.should.have.property("data");
                res.body.data.title.should.eql("test title");
                res.body.data.should.have.property("description");
                res.body.data.description.should.be.a("string");
                res.body.data.description.should.eql("test description");
                done();
              });
          });
      });
  });
});
