import { Router } from 'express';
import { getCommonStudents } from '../controllers/commonStudentsController';
import asyncHandler from '../utils/asyncHandler';

const router = Router();

// Define the endpoint
router.get('/commonstudents', asyncHandler(getCommonStudents));

export default router;
