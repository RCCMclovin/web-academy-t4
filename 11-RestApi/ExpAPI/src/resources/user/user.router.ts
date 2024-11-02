import { Router } from 'express';
import userController from './user.controller';
import { userSchema } from './user.schema';
import { validate } from '../../midlewares/validate';
import isAdmin from '../../midlewares/isAdmin';
import isAuth from '../../midlewares/isAuth';

const router = Router();

router.get('/', isAdmin, userController.index);
router.post('/', isAdmin, validate(userSchema), userController.create);
router.get('/:id', isAuth, userController.read);
router.put('/:id', isAuth, validate(userSchema), userController.update);
router.delete('/:id', isAuth, userController.remove);

export default router;
