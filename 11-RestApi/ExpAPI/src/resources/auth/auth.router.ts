import { Router } from 'express'
import authController from './auth.controller'
import authSchema from './auth.schema';
import { validate } from '../../midlewares/validate';

const router = Router();

router.post("/login", validate(authSchema), authController.login);
router.post("/logout", authController.logout);


export default router;