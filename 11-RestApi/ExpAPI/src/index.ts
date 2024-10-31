import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import session from './midlewares/session';
import router from './router/index';
import validateEnv from './utils/validateEnv';
import setLangCookie from './midlewares/setLangCookie';

dotenv.config();
validateEnv();

const app = express();
const PORT = process.env.PORT || 3333;
const DEFAULT_LANGUAGE = process.env.DEFAULT_LANGUAGE as string;

app.use(cookieParser());
app.use(setLangCookie(DEFAULT_LANGUAGE));

app.use(session());

app.use(express.json());
app.use(router);

app.listen(PORT, () => {
  console.log(`Express app iniciado na porta ${PORT}.`);
});
