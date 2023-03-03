import Role from '../models/role.js';
import User from '../models/user.js';

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

export { isValidRole, isRegistered, userExistsById };
