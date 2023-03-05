import { Category, Role, User } from '../models/index.js';

/**
 *
 * User validators
 */

// Check if role exists in DB
const isValidRole = async (role = '') => {
  const roleExists = await Role.findOne({ role });
  if (!roleExists) throw new Error(`Role ${role} isn't registered in DB`);
};

// Verify if email already exists
const isRegistered = async (email = '') => {
  const emailExists = await User.findOne({ email });
  if (emailExists)
    throw new Error(`Email: ${email} is already registered in DB`);
};

const userExistsById = async (id = '') => {
  const userExists = await User.findById(id);
  if (!userExists)
    throw new Error(`User with id: ${id} is not registered in DB`);
};

/**
 *
 * Category validators
 */

// Verify if category already exists in DB
const categoryRegistered = async (category = '') => {
  const name = category.toUpperCase();
  const categoryExists = await Category.findOne({
    name,
  });
  if (categoryExists)
    throw new Error(`Category: ${name} is already registered in DB`);
};

// Check if category exists in DB
const categoryExistsById = async (id = '') => {
  const category = await Category.findById(id);
  if (!category)
    throw new Error(`Category with id: ${id} is not registered in DB`);
};

export {
  isValidRole,
  isRegistered,
  userExistsById,
  categoryRegistered,
  categoryExistsById,
};
