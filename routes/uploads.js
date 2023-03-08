import { Router } from 'express';
import { check } from 'express-validator';
import { updateImage, upload } from '../controllers/uploads.js';
import { allowedCollections, userExistsById } from '../helpers/index.js';
import { validateFields, validateFileToUpload } from '../middlewares/index.js';

const router = Router();

router.post('/', validateFileToUpload, upload);
router.put(
  '/:collection/:id',
  [
    validateFileToUpload,
    check('id', 'This is not a valid id').isMongoId(),
    check('collection').custom((collection) =>
      allowedCollections(collection, ['users', 'products'])
    ),
    validateFields,
  ],
  updateImage
);

export { router as uploadsRouter };
