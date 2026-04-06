import express from 'express';
import {
  createTransaction,
  getAllTransactions,
  getTransactionById,
  updateTransaction,
  deleteTransaction,
} from '../controllers/transaction.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';
import { allowRoles } from '../middlewares/role.middleware.js';

const router = express.Router();

// All routes require authentication
router.use(authenticate);

// Read — all authenticated users
router.get('/', getAllTransactions);
router.get('/:id', getTransactionById);

// Write — admin only
router.post('/', allowRoles('admin'), createTransaction);
router.put('/:id', allowRoles('admin'), updateTransaction);
router.delete('/:id', allowRoles('admin'), deleteTransaction);

export default router;