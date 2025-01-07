import request from "supertest";
import app from "../app";

describe("getCommonStudents Controller", () => {
  afterEach(() => {
    jest.clearAllMocks(); // Clear mocks after each test
  });

  it("should return 400 if no teacher emails are provided", async () => {
    const response = await request(app).get("/api/commonstudents");
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      message: "Teacher email(s) must be provided",
    });
  });

  it("should return 400 if one or more teacher emails are not found", async () => {
    const response = await request(app).get(
      "/api/commonstudents?teacher=teacher1@gmail.com"
    );
    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      message: "One or more teacher emails not found",
    });
  });

  it("should return 200 with a list of common students", async () => {
    const response = await request(app).get(
      "/api/commonstudents?teacher=teacherken@gmail.com"
    );

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      students: [
        "studenthon@gmail.com",
        "studentjon@gmail.com",
        "student_john@example.com",
      ],
    });
  });

  it("should handle multiple teacher emails correctly", async () => {
    const response = await request(app).get(
      "/api/commonstudents?teacher=teacheralice@gmail.com&teacher=teacherken@gmail.com"
    );

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      students: ["student_john@example.com"],
    });
  });
});
