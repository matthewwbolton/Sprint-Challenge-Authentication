const request = require("supertest");

const server = require("../api/server");
const authRouter = require("../auth/auth-router");
const jokesRouter = require("../jokes/jokes-router");

const db = require("../database/dbConfig");

describe("server.js", () => {
  beforeEach(async () => {
    await db("users").truncate();
  });

  describe("/", () => {
    it(`get request to '/' should return status code 200`, async () => {
      const response = await request(server).get("/");

      expect(response.status).toEqual(200);
    });

    it("should return a JSON object from the root route", async () => {
      const response = await request(server).get("/");

      expect(response.body).toEqual({ api: `Up and Running` });
    });

    it("should return a JSON object from the root route", async () => {
      const response = await request(server).get("/");

      expect(response.type).toBe("application/json");
    });
  });

  describe("/api/auth/register", () => {
    it("should return status code 201 upon successful register", async () => {
      const response = await request(server)
        .post("/api/auth/register")
        .send({ username: "test", password: "test123" });
      expect(response.status).toEqual(201);
    });

    it("should receive a JSON object on successful registration", async () => {
      const response = await request(server)
        .post("/api/auth/register")
        .send({ username: "test", password: "test123" });

      expect(response.type).toEqual("application/json");
    });

    //     // it("should return a token when registration is successful", async () => {
    //     //   const response = await request(server)
    //     //     .post("/api/auth/register")
    //     //     .send({ username: "test", password: "test123" });

    //     //   expect(response.token).toEqual({ token: "" });
    //     // });
    //   });
  });
});

describe("server.js", () => {
  describe("/api/auth/login", () => {
    it("should return status code 200 on successful login", async () => {
      const response = await request(server)
        .post("/api/auth/login")
        .send({ username: "test", password: "test123" });

      expect(response.status).toEqual(200);
    });
    it("should return a JSON object upon successful login", async () => {
      const response = await request(server)
        .post("/api/auth/login")
        .send({ username: "test", password: "test123" });

      expect(response.type).toEqual("application/json");
    });
  });

  describe("server.js", () => {
    describe("/api/jokes", () => {
      it("should return a JSON object", async () => {
        const response = await request(server).get("/api/jokes");

        expect(response.type).toEqual("application/json");
      });

      it("should return status code 200 if credentials are valid", async () => {
        const response = request(server).get("/api/jokes", {
          headers: {
            authorization:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjUsInVzZXJuYW1lIjoidGVzdCIsImlhdCI6MTU4Nzc0NTU5MywiZXhwIjoxNTg3ODMxOTkzfQ.utjhBEWni8NRLZy78Bunn1PxC4f8vnb74YQvYfUoyw0",
          },
        });
      });
    });
  });
});
