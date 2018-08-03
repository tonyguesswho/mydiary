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
  it("should delete an entry if the correct id is provided", done => {
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
    const updatedEntry = {
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
                .get(`/api/v1/entries/${id}`)
                .set("Authorization", token)
                .send(updatedEntry)
                .end((err,res)=>{
                    res.should.have.status(200);
                    res.body.should.have.property("message");
                    res.body.message.should.eql("successfully Got one entry");
                    done()
                })
              });
          });
      });
  });
});
