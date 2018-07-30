import chai from "chai";
import chaiHttp from "chai-http";
import app from "../server/index";

chai.should();
chai.use(chaiHttp);

describe("POST: /api/v1/entries", () => {
  it("should respond with an error if token is undefined", done => {
    const entryData = {
      title: "test title",
      descripton:'test description'
    };
    chai
      .request(app)
      .post("/api/v1/entries")
      .send(entryData)
      .end((err, res) => {
        res.should.have.status(401);
        res.should.be.json;
        res.body.should.be.a("object");
        res.body.should.have.property("message");
        res.body.message.should.be.eql("Invalid token");
        done();
      });
  });
});