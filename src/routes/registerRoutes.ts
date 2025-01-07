import { Router } from 'express';
import { registerStudents } from '../controllers/registerController';
import asyncHandler from '../utils/asyncHandler';

const router = Router();

// Register students to a teacher
router.post('/register', asyncHandler(registerStudents));

export default router;
