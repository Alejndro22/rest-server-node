import { Router } from 'express';
import { check, query } from 'express-validator';
import { login } from '../controllers/auth.js';
import { validateFields } from '../middlewares/validate-fields.js';

const router = Router();

router.post(
  '/login',
  [
    check('email', 'You must send an email').isEmail(),
    check('password', 'You must send a password').notEmpty(),
    validateFields,
  ],
  login
);

export { router as authRouter };
