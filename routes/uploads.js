import { Router } from 'express';
import { check } from 'express-validator';
import { upload } from '../controllers/uploads.js';

import { validateFields } from '../middlewares/validate-fields.js';

const router = Router();

router.post('/', upload);

export { router as uploadsRouter };
