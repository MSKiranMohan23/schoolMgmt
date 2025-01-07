import { Request, Response } from 'express';
import db from '../config/db';

// Retrieve students for notifications
export const retrieveForNotifications = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { teacher, notification } = req.body;

    if (!teacher || !notification) {
      return res.status(400).json({ message: 'Teacher and notification must be provided' });
    }

    // Extract mentioned students from the notification text
    const mentionedStudents = (notification.match(/@([\w.-]+@[\w.-]+\.[a-zA-Z]+)/g) || []).map(
      (email:string) => email.slice(1)
    );

    // Get students registered with the teacher
    const [registeredStudents] = await db.query(
      `
      SELECT DISTINCT s.email
      FROM students s
      JOIN teacher_student_relationship tsr ON s.student_id = tsr.student_id
      JOIN teachers t ON tsr.teacher_id = t.teacher_id
      WHERE t.email = ? AND s.is_suspended = 0
      `,
      [teacher]
    );

    // Combine registered and mentioned students
    const allRecipients = new Set<string>([
      ...mentionedStudents,
      ...(registeredStudents as any[]).map((student) => student.email),
    ]);

    // Filter recipients to exclude suspended students
    const [validRecipients] = await db.query(
      `
      SELECT email
      FROM students
      WHERE email IN (?) AND is_suspended = 0
      `,
      [[...allRecipients]]
    );

    // Respond with the list of recipients
    return res.status(200).json({
      recipients: (validRecipients as any[]).map((student) => student.email),
    });
  } catch (error) {
    console.error('Error retrieving recipients for notification:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
