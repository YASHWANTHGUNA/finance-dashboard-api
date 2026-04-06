import User from '../models/User.js';

// Get all users
export const getAllUsers = async (query) => {
  const { role, isActive, page = 1, limit = 10 } = query;

  const filter = {};

  if (role) filter.role = role;
  if (isActive !== undefined) filter.isActive = isActive === 'true';

  const pageNumber = parseInt(page);
  const limitNumber = parseInt(limit);
  const skip = (pageNumber - 1) * limitNumber;

  const [users, total] = await Promise.all([
    User.find(filter)
      .select('-password')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNumber),
    User.countDocuments(filter),
  ]);

  return {
    users,
    pagination: {
      total,
      page: pageNumber,
      limit: limitNumber,
      totalPages: Math.ceil(total / limitNumber),
    },
  };
};

// Get single user
export const getUserById = async (id) => {
  const user = await User.findById(id).select('-password');

  if (!user) {
    const error = new Error('User not found');
    error.status = 404;
    throw error;
  }

  return user;
};

// Update user role
export const updateUserRole = async (id, role, requestingUserId) => {
  // Prevent admin from changing their own role
  if (id === requestingUserId.toString()) {
    const error = new Error('You cannot change your own role');
    error.status = 400;
    throw error;
  }

  const user = await User.findByIdAndUpdate(
    id,
    { $set: { role } },
    { new: true, runValidators: true }
  ).select('-password');

  if (!user) {
    const error = new Error('User not found');
    error.status = 404;
    throw error;
  }

  return user;
};

// Update user status (active/inactive)
export const updateUserStatus = async (id, isActive, requestingUserId) => {
  // Prevent admin from deactivating themselves
  if (id === requestingUserId.toString()) {
    const error = new Error('You cannot change your own status');
    error.status = 400;
    throw error;
  }

  const user = await User.findByIdAndUpdate(
    id,
    { $set: { isActive } },
    { new: true }
  ).select('-password');

  if (!user) {
    const error = new Error('User not found');
    error.status = 404;
    throw error;
  }

  return user;
};