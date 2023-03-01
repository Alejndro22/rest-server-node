import { Schema, model } from 'mongoose';

const RoleSchema = Schema({
  role: {
    type: String,
    required: [true, 'Role is required'],
  },
});

const Roles = model('Roles', RoleSchema);
export default Roles;
