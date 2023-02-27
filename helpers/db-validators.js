const Roles = require('../models/role');
const User = require('../models/user');

// Check if role exists in DB
const isValidRole = async (role = '') => {
  const roleExists = await Roles.findOne({ role });
  if (!roleExists) throw new Error(`Role ${role} isn't registered in DB`);
};

// Verify if email already exists
const isRegistered = async (email = '') => {
  const emailExists = await User.findOne({ email });
  if (emailExists) throw new Error(`${email} is already registered in DB`);
};

module.exports = {
  isValidRole,
  isRegistered,
};
