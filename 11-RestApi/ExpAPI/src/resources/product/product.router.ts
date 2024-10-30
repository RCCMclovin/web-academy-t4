import { Router } from 'express';
import productController from './product.controller';
import { productSchema } from './product.schema';
import { validate } from '../../midlewares/validate';
import isAdmin from '../../midlewares/isAdmin';

const router = Router();

router.get('/', productController.index);
router.post('/', isAdmin, validate(productSchema), productController.create);
router.get('/:id', productController.read);
router.delete('/:id', isAdmin, productController.remove);
router.put('/:id', isAdmin, productController.update);

export default router;
