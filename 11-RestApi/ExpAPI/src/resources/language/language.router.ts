import { Router } from 'express'
import languageController from './language.controller'
import changeLanguageSchema from './language.schema';
import { validate } from '../../midlewares/validate';

const router = Router();

router.post("/", validate(changeLanguageSchema), languageController.changeLanguage);

export default router;