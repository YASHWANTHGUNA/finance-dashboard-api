import * as TransactionService from '../services/transaction.service.js';
import {
  createTransactionValidator,
  updateTransactionValidator,
} from '../validators/transaction.validator.js';

export const createTransaction = async (req, res, next) => {
  try {
    const validatedData = createTransactionValidator.parse(req.body);
    const transaction = await TransactionService.createTransaction(
      validatedData,
      req.user.id
    );
    res.status(201).json({
      success: true,
      message: 'Transaction created successfully',
      data: transaction,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllTransactions = async (req, res, next) => {
  try {
    const result = await TransactionService.getAllTransactions(req.query);
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const getTransactionById = async (req, res, next) => {
  try {
    const transaction = await TransactionService.getTransactionById(
      req.params.id
    );
    res.status(200).json({
      success: true,
      data: transaction,
    });
  } catch (error) {
    next(error);
  }
};

export const updateTransaction = async (req, res, next) => {
  try {
    const validatedData = updateTransactionValidator.parse(req.body);
    const transaction = await TransactionService.updateTransaction(
      req.params.id,
      validatedData
    );
    res.status(200).json({
      success: true,
      message: 'Transaction updated successfully',
      data: transaction,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteTransaction = async (req, res, next) => {
  try {
    const result = await TransactionService.deleteTransaction(req.params.id);
    res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    next(error);
  }
};