import { Router } from 'express';
import {
  getContactsController,
  getContactByIdController,
  createContactController,
  patchContactController,
  deleteContactController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateMongoId } from '../middlewares/validateMongoId.js';
import { validateBody } from '../middlewares/validateBody.js';
import { updateContactSchema } from '../validation/updateContactSchema.js';
import { createContactSchema } from '../validation/createContactSchema.js';
import { authenticate } from '../middlewares/authenticate.js';
import { upload } from '../middlewares/multer.js';
import { deleteFileHandler } from '../middlewares/deleteFileHandler.js';
import { convertBoolean } from '../middlewares/convertBoolean.js';

const router = Router();

router.use(authenticate);

router.get('/', ctrlWrapper(getContactsController));

router.get(
  '/:contactId',
  validateMongoId('contactId'),
  ctrlWrapper(getContactByIdController),
);

router.post(
  '/',
  upload.single('photo'),

  validateBody(createContactSchema),
  ctrlWrapper(createContactController),
  deleteFileHandler,
);

router.patch(
  '/:contactId',
  upload.single('photo'),
  validateBody(updateContactSchema),
  ctrlWrapper(patchContactController),
  deleteFileHandler,
);

router.delete(
  '/:contactId',
  validateMongoId('contactId'),
  ctrlWrapper(deleteContactController),
);

export default router;
