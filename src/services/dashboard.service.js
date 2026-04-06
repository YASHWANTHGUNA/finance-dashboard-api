import Transaction from '../models/Transaction.js';

// 1. Overall Summary
export const getSummary = async () => {
  const result = await Transaction.aggregate([
    { $match: { isDeleted: false } },
    {
      $group: {
        _id: '$type',
        total: { $sum: '$amount' },
      },
    },
  ]);

  const summary = { totalIncome: 0, totalExpenses: 0, netBalance: 0 };

  result.forEach((item) => {
    if (item._id === 'income') summary.totalIncome = item.total;
    if (item._id === 'expense') summary.totalExpenses = item.total;
  });

  summary.netBalance = summary.totalIncome - summary.totalExpenses;

  return summary;
};

// 2. Totals By Category
export const getByCategory = async () => {
  const result = await Transaction.aggregate([
    { $match: { isDeleted: false } },
    {
      $group: {
        _id: { category: '$category', type: '$type' },
        total: { $sum: '$amount' },
        count: { $sum: 1 },
      },
    },
    { $sort: { total: -1 } },
  ]);

  return result;
};

// 3. Monthly Trend
export const getMonthlyTrend = async () => {
  const result = await Transaction.aggregate([
    { $match: { isDeleted: false } },
    {
      $group: {
        _id: {
          year: { $year: '$date' },
          month: { $month: '$date' },
          type: '$type',
        },
        total: { $sum: '$amount' },
      },
    },
    { $sort: { '_id.year': 1, '_id.month': 1 } },
  ]);

  return result;
};

// 4. Recent Transactions
export const getRecentTransactions = async () => {
  const result = await Transaction.find({ isDeleted: false })
    .populate('createdBy', 'name email')
    .sort({ createdAt: -1 })
    .limit(5);

  return result;
};