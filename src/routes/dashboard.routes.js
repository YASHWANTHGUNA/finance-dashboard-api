import express from 'express';
import {
  getSummary,
  getByCategory,
  getMonthlyTrend,
  getRecentTransactions,
} from '../controllers/dashboard.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';

const router = express.Router();

// All dashboard routes require authentication
router.use(authenticate);

router.get('/summary', getSummary);
router.get('/by-category', getByCategory);
router.get('/monthly-trend', getMonthlyTrend);
router.get('/recent', getRecentTransactions);

export default router;