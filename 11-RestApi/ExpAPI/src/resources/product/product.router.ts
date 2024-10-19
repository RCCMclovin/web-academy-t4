import { Router } from 'express';
import productController from './product.controller';
import { productSchema } from './product.schema';
import { validate } from '../../midlewares/validate';
import  checkAuth  from '../../midlewares/checkAuth';

const router = Router();

router.get('/', productController.index);
router.post('/', checkAuth(), validate(productSchema), productController.create);
router.get('/:id', productController.read);
router.delete('/:id', checkAuth(), productController.remove);
router.put('/:id', checkAuth(), productController.update);

export default router;
