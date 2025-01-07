import express from 'express';
import { retrieveForNotifications } from '../controllers/notificationController';
import asyncHandler from '../utils/asyncHandler';

const router = express.Router();

// Define the endpoint
router.post('/retrievefornotifications', asyncHandler(retrieveForNotifications));

export default router;
