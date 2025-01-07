import request from "supertest";
import app from "../app";

describe("retrieveForNotifications Controller", () => {
  it("should return valid recipients when mentioned students are included in the notification", async () => {
    const response = await request(app)
      .post("/api/retrievefornotifications")
      .send({
        teacher: "teacherclara@gmail.com",
        notification:
          "Hello students! @studentagnes@gmail.com @studentmiche@gmail.com",
      });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      recipients: [
        "student_john@example.com",
        "student_jane@example.com",
        "studentagnes@gmail.com",
        "studentmiche@gmail.com",
      ],
    });
  });

  it("should return valid recipients when no mentioned students are included in the notification", async () => {
    const response = await request(app)
      .post("/api/retrievefornotifications")
      .send({
        teacher: "teacherclara@gmail.com",
        notification: "Hey everybody",
      });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      recipients: ["student_john@example.com", "student_jane@example.com"],
    });
  });

  it("should return 400 if teacher or notification field is missing", async () => {
    const response = await request(app)
      .post("/api/retrievefornotifications")
      .send({
        teacher: "teacherken@gmail.com",
      });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      message: "Teacher and notification must be provided",
    });
  });
});
