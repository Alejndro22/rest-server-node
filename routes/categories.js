import { Router } from 'express';
import { check, query } from 'express-validator';
import { validateFields } from '../middlewares/validate-fields.js';

const router = Router();

// Get all categories - public
router.get('/', (req, res) => {
  res.json({ msg: 'get' });
});

// Get category by Id - public
router.get('/:id', (req, res) => {
  res.json({ msg: 'get - id' });
});

// Add new category - private (any role with valid token)
router.post('/', (req, res) => {
  res.json({ msg: 'post' });
});

// Update category by Id - private (any role with valid token)
router.put('/:id', (req, res) => {
  res.json({ msg: 'put' });
});

// Update category by Id - private (only if ADMIN_ROLE)
router.delete('/:id', (req, res) => {
  res.json({ msg: 'delete' });
});

export { router as categoriesRouter };
