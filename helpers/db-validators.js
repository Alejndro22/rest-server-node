import Roles from '../models/role.js';
import Users from '../models/user.js';

// const Roles = require('../models/role');
// const Users = require('../models/user');

// Check if role exists in DB
const isValidRole = async (role = '') => {
  const roleExists = await Roles.findOne({ role });
  if (!roleExists) throw new Error(`Role ${role} isn't registered in DB`);
};

// Verify if email already exists
const isRegistered = async (email = '') => {
  const emailExists = await Users.findOne({ email });
  if (emailExists)
    throw new Error(`Email: ${email} is already registered in DB`);
};

const userExistsById = async (id = '') => {
  const userExists = await Users.findById(id);
  if (!userExists)
    throw new Error(`Users with id: ${id} is not registered in DB`);
};

export { isValidRole, isRegistered, userExistsById };
