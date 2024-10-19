import { Router } from 'express';
import productRouter from '../resources/product/product.router';
import authRouter from '../resources/auth/auth.router'
import languageRouter from '../resources/language/language.router';

const router = Router();

router.use('/auth', authRouter);
router.use('/language', languageRouter);
router.use('/products', productRouter);

export default router;
