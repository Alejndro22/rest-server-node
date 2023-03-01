// const { Schema, model } = require('mongoose');
import { Schema, model } from 'mongoose';

const RoleSchema = Schema({
  role: {
    type: String,
    required: [true, 'Role is required'],
  },
});

const Roles = model('Roles', RoleSchema);
export default Roles;
// module.exports = model('Roles', RoleSchema);
