import { Request, Response } from "express";
import db from "../config/db";

// POST /api/register
export const registerStudents = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { teacher, students } = req.body;

  if (!teacher || !Array.isArray(students)) {
    return res
      .status(400)
      .json({
        message: "Invalid request. Provide a teacher and a list of students.",
      });
  }

  try {
    // Fetch the teacher ID from the database
    const [teacherResult] = await db.query(
      "SELECT teacher_id FROM teachers WHERE email = ?",
      [teacher]
    );
    if (!Array.isArray(teacherResult) || teacherResult.length === 0) {
      return res
        .status(500)
        .json({ message: `Teacher with email ${teacher} not found.` });
    }
    const teacherId = (teacherResult as any)[0].teacher_id;

    // Fetch the student IDs for the provided emails
    const studentPlaceholders = students.map(() => "?").join(",");
    const [studentResults] = await db.query(
      `SELECT student_id, email FROM students WHERE email IN (${studentPlaceholders})`,
      students
    );

    if (!Array.isArray(studentResults) || studentResults.length === 0) {
      return res
        .status(400)
        .json({ message: "Invalid request. Provide a teacher and a list of students." });
    }

    const validStudentEmails = (studentResults as any[]).map((s) => s.email);
    const invalidStudents = students.filter(
      (s: string) => !validStudentEmails.includes(s)
    );
    if (invalidStudents.length > 0) {
      return res
        .status(400)
        .json({ message: `Invalid students: ${invalidStudents.join(", ")}` });
    }

    // Insert teacher-student relationships
    const studentIds = (studentResults as any[]).map((s) => s.student_id);
    const relationshipValues = studentIds.map((studentId) => [
      teacherId,
      studentId,
    ]);
    await db.query(
      "INSERT IGNORE INTO teacher_student_relationship (teacher_id, student_id) VALUES ?",
      [relationshipValues]
    );

    return res
      .status(204)
      .json({
        success: true,
        message: `Students are registered to ${teacher}`,
      });
  } catch (error) {
    console.error("Error registering students:", error);
    return res
      .status(500)
      .json({ message: "An internal server error occurred." });
  }
};
