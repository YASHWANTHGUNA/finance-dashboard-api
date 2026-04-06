import Transaction from '../models/Transaction.js';

// Create a transaction
export const createTransaction = async (data, userId) => {
  const transaction = await Transaction.create({
    ...data,
    createdBy: userId,
  });
  return transaction;
};

// Get all transactions with filtering + pagination
export const getAllTransactions = async (query) => {
  const {
    type,
    category,
    startDate,
    endDate,
    page = 1,
    limit = 10,
  } = query;

  // Build filter object dynamically
  const filter = { isDeleted: false };

  if (type) {
    filter.type = type;
  }

  if (category) {
    filter.category = { $regex: category, $options: 'i' };
  }

  if (startDate || endDate) {
    filter.date = {};
    if (startDate) filter.date.$gte = new Date(startDate);
    if (endDate) filter.date.$lte = new Date(endDate);
  }

  // Pagination calculations
  const pageNumber = parseInt(page);
  const limitNumber = parseInt(limit);
  const skip = (pageNumber - 1) * limitNumber;

  // Execute query
  const [transactions, total] = await Promise.all([
    Transaction.find(filter)
      .populate('createdBy', 'name email role')
      .sort({ date: -1 })
      .skip(skip)
      .limit(limitNumber),
    Transaction.countDocuments(filter),
  ]);

  return {
    transactions,
    pagination: {
      total,
      page: pageNumber,
      limit: limitNumber,
      totalPages: Math.ceil(total / limitNumber),
    },
  };
};

// Get single transaction
export const getTransactionById = async (id) => {
  const transaction = await Transaction.findOne({
    _id: id,
    isDeleted: false,
  }).populate('createdBy', 'name email role');

  if (!transaction) {
    const error = new Error('Transaction not found');
    error.status = 404;
    throw error;
  }

  return transaction;
};

// Update transaction
export const updateTransaction = async (id, data) => {
  const transaction = await Transaction.findOneAndUpdate(
    { _id: id, isDeleted: false },
    { $set: data },
    { new: true, runValidators: true }
  );

  if (!transaction) {
    const error = new Error('Transaction not found');
    error.status = 404;
    throw error;
  }

  return transaction;
};

// Soft delete transaction
export const deleteTransaction = async (id) => {
  const transaction = await Transaction.findOneAndUpdate(
    { _id: id, isDeleted: false },
    { $set: { isDeleted: true } },
    { new: true }
  );

  if (!transaction) {
    const error = new Error('Transaction not found');
    error.status = 404;
    throw error;
  }

  return { message: 'Transaction deleted successfully' };
};