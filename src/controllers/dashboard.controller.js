import * as DashboardService from '../services/dashboard.service.js';

export const getSummary = async (req, res, next) => {
  try {
    const data = await DashboardService.getSummary();
    res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

export const getByCategory = async (req, res, next) => {
  try {
    const data = await DashboardService.getByCategory();
    res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

export const getMonthlyTrend = async (req, res, next) => {
  try {
    const data = await DashboardService.getMonthlyTrend();
    res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

export const getRecentTransactions = async (req, res, next) => {
  try {
    const data = await DashboardService.getRecentTransactions();
    res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
};