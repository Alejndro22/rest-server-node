const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../middlewares/validate-fields');
const {
  isValidRole,
  isRegistered,
  userExistsById,
} = require('../helpers/db-validators');

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
      'Password is required and must contain at least 6 chars'
    ).isLength({ min: 6 }),
    check('email', 'This is not a valid email').isEmail(),
    check('email').custom(isRegistered),
    // check('role', 'Role not valid').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('role').custom(isValidRole),
    validateFields,
  ],
  postUsers
);

// Parámetros de segmento
router.put(
  '/:id',
  [
    check('id', 'This is not a valid id').isMongoId(),
    check('id').custom(userExistsById),
    check('role').custom(isValidRole),
    validateFields,
  ],
  putUsers
);

router.patch('/', patchUsers);

// Parámetros de query
router.delete('/', deleteUsers);

module.exports = router;
