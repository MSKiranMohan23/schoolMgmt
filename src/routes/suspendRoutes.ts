import express from 'express';
import { suspendStudent } from '../controllers/suspendController';
import asyncHandler from '../utils/asyncHandler';

const router = express.Router();

// Define the endpoint
router.post('/suspend', asyncHandler(suspendStudent));

export default router;
