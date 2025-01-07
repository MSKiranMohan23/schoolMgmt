import { Request, Response } from 'express';
import db from '../config/db';

// Get common students for given teachers
export const getCommonStudents = async (req: Request, res: Response): Promise<Response> => {
  try {
    // Extract teacher emails from the query parameter
    const teacherEmails = req.query.teacher as string | string[];
    
    if (!teacherEmails) {
      return res.status(400).json({ message: 'Teacher email(s) must be provided' });
    }

    // Normalize teacher emails into an array
    const teacherEmailArray = Array.isArray(teacherEmails) ? teacherEmails : [teacherEmails];

    // Fetch teacher IDs from the database
    const [teachers] = await db.query(
      'SELECT teacher_id FROM teachers WHERE email IN (?)',
      [teacherEmailArray]
    );

    if ((teachers as any[]).length !== teacherEmailArray.length) {
      return res.status(500).json({ message: 'One or more teacher emails not found' });
    }

    const teacherIds = (teachers as any[]).map((teacher) => teacher.teacher_id);

    // Query to find common students registered to all teachers
    const [students] = await db.query(
      `
      SELECT s.email
      FROM students s
      JOIN teacher_student_relationship tsr ON s.student_id = tsr.student_id
      WHERE tsr.teacher_id IN (?)
      GROUP BY s.email
      HAVING COUNT(DISTINCT tsr.teacher_id) = ?
      `,
      [teacherIds, teacherIds.length]
    );

    // Extract student emails
    const studentEmails = (students as any[]).map((student) => student.email);

    return res.status(200).json({ students: studentEmails });
  } catch (error) {
    console.error('Error retrieving common students:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
