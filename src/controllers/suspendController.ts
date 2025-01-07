import { Request, Response } from 'express';
import db from '../config/db';

// Suspend a specified student
export const suspendStudent = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { student } = req.body;

    if (!student) {
      return res.status(400).json({ message: 'Student email must be provided' });
    }

    // Check if the student exists in the database
    const [existingStudent] = await db.query(
      'SELECT student_id FROM students WHERE email = ?',
      [student]
    );

    if ((existingStudent as any[]).length === 0) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Update the student's suspension status
    await db.query('UPDATE students SET is_suspended = 1 WHERE email = ?', [student]);

    // Return 204 No Content on success
    return res
      .status(200)
      .json({
        success: true,
        message: `Following students is suspended ${student}`,
      });
  } catch (error) {
    console.error('Error suspending student:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
