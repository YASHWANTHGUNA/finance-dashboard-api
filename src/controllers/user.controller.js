import * as UserService from '../services/user.service.js';
import {
  updateRoleValidator,
  updateStatusValidator,
} from '../validators/user.validator.js';

export const getAllUsers = async (req, res, next) => {
  try {
    const result = await UserService.getAllUsers(req.query);
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (req, res, next) => {
  try {
    const user = await UserService.getUserById(req.params.id);
    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const updateUserRole = async (req, res, next) => {
  try {
    const { role } = updateRoleValidator.parse(req.body);
    const user = await UserService.updateUserRole(
      req.params.id,
      role,
      req.user.id
    );
    res.status(200).json({
      success: true,
      message: 'User role updated successfully',
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const updateUserStatus = async (req, res, next) => {
  try {
    const { isActive } = updateStatusValidator.parse(req.body);
    const user = await UserService.updateUserStatus(
      req.params.id,
      isActive,
      req.user.id
    );
    res.status(200).json({
      success: true,
      message: `User ${isActive ? 'activated' : 'deactivated'} successfully`,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};