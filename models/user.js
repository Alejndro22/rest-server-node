// const { Schema, model } = require('mongoose');
import { Schema, model } from 'mongoose';

const UserSchema = Schema({
  name: {
    type: String,
    required: [true, 'name is required'],
  },
  email: {
    type: String,
    required: [true, 'email is required'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'password is required'],
  },
  img: {
    type: String,
  },
  role: {
    type: String,
    required: true,
    // enum: ['ADMIN_ROLE', 'USER_ROLE'],
  },
  state: {
    type: Boolean,
    default: true,
  },
  fromGoogle: {
    type: Boolean,
    default: false,
  },
});

UserSchema.methods.toJSON = function () {
  const { __v, password, ...user } = this.toObject();
  return user;
};

const Users = model('Users', UserSchema);
export default Users;
// module.exports = model('Users', UserSchema);
