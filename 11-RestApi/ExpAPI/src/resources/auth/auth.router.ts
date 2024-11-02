import { Router } from 'express'
import authController from './auth.controller';
import authSchemas from './auth.schema';
import { validate } from '../../midlewares/validate';
import isAuth from '../../midlewares/isAuth';

const router = Router();

router.post(
  '/signup',
  validate(authSchemas.signupSchema),
  authController.signUp,
);
router.post('/login', validate(authSchemas.authSchema), authController.login);
router.post('/logout', isAuth, authController.logout);


export default router;