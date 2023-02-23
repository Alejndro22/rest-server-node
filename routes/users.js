const { Router } = require('express');
const {
  getUsers,
  postUsers,
  putUsers,
  patchUsers,
  deleteUsers,
} = require('../controllers/users');

const router = Router();

router.get('/', getUsers);

router.post('/', postUsers);

// Parámetros de segmento
router.put('/:id', putUsers);

router.patch('/', patchUsers);

// Parámetros de query
router.delete('/', deleteUsers);

module.exports = router;
