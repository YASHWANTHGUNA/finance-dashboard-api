import * as AuthService from '../services/auth.service.js';
import { registerValidator, loginValidator } from '../validators/auth.validator.js';

export const register = async (req, res, next) => {
  try {
    // Validate input
    const validatedData = registerValidator.parse(req.body);

    // Call service
    const result = await AuthService.registerUser(validatedData);

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    // Validate input
    const validatedData = loginValidator.parse(req.body);

    // Call service
    const result = await AuthService.loginUser(validatedData);

    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};