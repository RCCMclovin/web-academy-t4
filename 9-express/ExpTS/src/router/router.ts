import { Router } from 'express';

import mainController from "../controllers/main";

const router = Router();

router.get('/', mainController.hello);
router.get('/about', mainController.about);
router.get('/lorem/:num', mainController.loremParam);
router.get('/hb1', mainController.hb1);
router.get('/hb2', mainController.hb2);
router.get('/hb3', mainController.hb3);
router.get('/hb4', mainController.hb4);
router.get('/profs', mainController.profs);
router.get('/lorem', mainController.loremQuery);

export default router;
