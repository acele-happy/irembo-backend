const { expect } = require("chai");
const chaiHttp =require ("chai-http");
const dotenv =require ("dotenv");
const chai = require('chai')

dotenv.config();
chai.should();
chai.use(chaiHttp);

const server = require("../app");

describe("POST /user", () => {

  it("It should create a user", (done) => {
    const newUser = {
      firstName: "Acele",
      lastName: "Happy",
      email: "acele@mail.com",
      password: "123",
    };

    chai
      .request(server)
      .post("/user/register")
      .send(newUser)
      .end((err, response) => {
        response.should.have.status(201);
        response.body.should.have.property("success").eq(false);
        response.body.should.have
          .property("message")
          .eq("User Created");
        done();
      });
  });

  it("Should sign in user", (done) => {
    chai
      .request(server)
      .post("/user/login")
      .send({
        email: `acele@mail.com`,
        password: "123",
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property("token");
        done();
      });
  });
});

describe("GET /user", () => {
  /**
   * Test GET route
   */
  describe("GET /user", () => {
    it("It should GET a list of all users", async () => {
      const res = await chai.request(server).get("/user");
      expect(res).to.have.status(200);
      expect(res.body).to.be.a("array");
    });

    it("It should NOT GET a list of all users", async () => {
      const res = await chai.request(server).get("/api/users/all");
      expect(res).to.have.status(404);
    });
  });

  /**
   * Test GET route for specific role
   */
  describe("GET /user/:uuid", () => {
    it("It should GET a specific user by its specific uuid", async () => {
      const uuid = "43acebdf-1679-4ba1-a61a-65b9ba7c296d",
        res = await chai.request(server).get("/user/" + uuid);
      expect(res).to.have.status(200);
      expect(res.body).to.be.a("object");
    });
  });

});
//fix
