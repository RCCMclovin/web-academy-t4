import { Router } from 'express';

import mainController from '../controllers/main';
import productController from '../controllers/product';

const router = Router();

router.get('/', mainController.hello);
router.get('/about', mainController.about);
router.get('/lorem/:num', mainController.loremParam);
router.get('/lorem', mainController.loremQuery);
router.get('/hb1', mainController.hb1);
router.get('/hb2', mainController.hb2);
router.get('/hb3', mainController.hb3);
router.get('/hb4', mainController.hb4);
router.get('/profs', mainController.profs);

router.get('/produtos', productController.index);
router.all('/produtos/create', productController.create);
router.all('/produtos/update/:id', productController.update);
router.get('/produtos/:id', productController.read);
router.get('/produtos/delete/:id', productController.remove);

export default router;
