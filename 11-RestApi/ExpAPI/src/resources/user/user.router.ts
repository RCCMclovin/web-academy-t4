import { Router } from 'express';
import userController from './user.controller';
import { userSchema } from './user.schema';
import { validate } from '../../midlewares/validate';
import isAdmin from '../../midlewares/isAdmin';

const router = Router();

router.get('/', isAdmin, userController.index);
router.post('/', isAdmin, validate(userSchema), userController.create);
router.get('/:id', userController.read);
router.put('/:id', validate(userSchema), userController.update);
router.delete('/:id', userController.remove);

export default router;
