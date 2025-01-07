import request from "supertest";
import app from "../app";

describe("Register Controller for api/register", () => {
  it("should register students to a teacher and return 204 status", async () => {
    const response = await request(app)
      .post("/api/register")
      .send({
        teacher: "teacherken@gmail.com",
        students: ["studentjon@gmail.com", "studenthon@gmail.com"],
      })
      .set("Content-Type", "application/json");

    expect(response.status).toBe(204);
  });

  it("should return 400 if request body is invalid", async () => {
    const response = await request(app)
      .post("/api/register")
      .send({
        teacher: "teacherken@gmail.com",
      })
      .set("Content-Type", "application/json");

    expect(response.status).toBe(400);
    expect(response.body.message).toBe(
      "Invalid request. Provide a teacher and a list of students."
    );
  });

  it("should return 500 if there is an internal error", async () => {
    const response = await request(app)
      .post("/api/register")
      .send({
        teacher: "teacherTest@gmail.com",
        students: ["studentjon@gmail.com"],
      })
      .set("Content-Type", "application/json");

    expect(response.status).toBe(500);
    expect(response.body.message).toBe(
      "Teacher with email teacherTest@gmail.com not found."
    );
  });
});
