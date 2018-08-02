import chai from "chai";
import chaiHttp from "chai-http";
import app from "../server/index";
import { db } from "../models/connect";

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
                const { id } = res.body.data;
                chai
                .request(app)
                .delete("/api/v1/entries/id")
                .set("Authorization", token)
                .end((err,res)=>{
                    res.should.have.status(200);
                    done()
                })
              });
          });
      });
  });
});
