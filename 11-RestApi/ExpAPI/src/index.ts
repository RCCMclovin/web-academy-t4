import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import session from './midlewares/session';
import router from './router/index';
import validateEnv from './utils/validateEnv';
import setLangCookie from './midlewares/setLangCookie';
import swaggerUi from 'swagger-ui-express';
import swaggerFile from './swagger-output.json';

dotenv.config();
validateEnv();

const app = express();
const PORT = process.env.PORT || 3333;
const DEFAULT_LANGUAGE = process.env.DEFAULT_LANGUAGE as string;

app.use(cookieParser());
app.use(setLangCookie(DEFAULT_LANGUAGE));

app.use(session());

app.use(express.json());
app.use('/api', swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(router);

app.listen(PORT, () => {
  console.log(`Express app iniciado na porta ${PORT}.`);
});
