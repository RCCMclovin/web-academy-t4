import { Router } from 'express';
import productController from './produc.controller';

const router = Router();

router.get('/', productController.index);
router.post('/', productController.create);
router.get('/:id', productController.read);
router.delete('/:id', productController.remove);
router.put('/:id', productController.update);

export default router;
