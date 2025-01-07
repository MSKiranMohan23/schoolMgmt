import request from "supertest";
import app from "../app";

describe("suspendStudent Controller", () => {
  it("should return 400 if request body is invalid", async () => {
    const response = await request(app)
      .post("/api/suspend")
      .set("Content-Type", "application/json");

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Student email must be provided");
  });

  it("should return 400 if request body is invalid", async () => {
    const response = await request(app)
      .post("/api/suspend")
      .send({
        student: "",
      })
      .set("Content-Type", "application/json");

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Student email must be provided");
  });

  it("should return 404 if wrong email id is passed", async () => {
    const response = await request(app)
      .post("/api/suspend")
      .send({
        student: "studentTest@gmail.com",
      })
      .set("Content-Type", "application/json");

    expect(response.status).toBe(404);
    expect(response.body.message).toBe("Student not found");
  });

  it("should return 200 if the valid input is provided", async () => {
    const response = await request(app)
      .post("/api/suspend")
      .send({
        student: "studenthon@gmail.com",
      })
      .set("Content-Type", "application/json");

    expect(response.status).toBe(200);
    expect(response.body.message).toBe(
      "Following students is suspended studenthon@gmail.com"
    );
  });
});
