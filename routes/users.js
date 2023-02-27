const { Router } = require('express');
const { check } = require('express-validator');
const Roles = require('../models/role');

const { validateFields } = require('../middlewares/validate-fields');

const {
  getUsers,
  postUsers,
  putUsers,
  patchUsers,
  deleteUsers,
} = require('../controllers/users');

const router = Router();

router.get('/', getUsers);

router.post(
  '/',
  [
    check('name', 'Name is required').notEmpty(),
    check(
      'password',
      'Password is required, and must contain at least 6 chars'
    ).isLength({ min: 6 }),
    check('email', 'This is not a valid email').isEmail(),
    // check('role', 'Role not valid').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('role').custom(async (role = '') => {
      const roleExists = await Roles.findOne({ role });
      if (!roleExists) throw new Error(`Role ${role} isn't registered in DB`);
    }),
    validateFields,
  ],
  postUsers
);

// Parámetros de segmento
router.put('/:id', putUsers);

router.patch('/', patchUsers);

// Parámetros de query
router.delete('/', deleteUsers);

module.exports = router;
