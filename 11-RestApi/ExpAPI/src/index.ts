import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import session from "express-session";
import { v4 as uuidV4 } from "uuid";

import router from './router/index';
import validateEnv from './utils/validateEnv';
import setLangCookie from './midlewares/setLangCookie';

dotenv.config();
validateEnv();

const app = express();
const PORT = process.env.PORT || 3333;

app.use(cookieParser());
app.use(setLangCookie);

app.use(session({
  genid: () => uuidV4(),
  secret: process.env.SESSION_SECRET as string,
  resave: true,
  saveUninitialized: true,
}))

app.use(express.json());
app.use(router);

app.listen(PORT, () => {
  console.log(`Express app iniciado na porta ${PORT}.`);
});
