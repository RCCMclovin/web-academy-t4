import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import { engine } from 'express-handlebars';
import sass from 'node-sass-middleware';

import logger, { LogType } from './middlewares/logger';
import router from './router/router';
import validateEnv from './utils/validateEnv';

dotenv.config({ path: './env/.env' });
validateEnv();

const app = express();
const PORT = process.env.PORT || 3333;
const LOGS_PATH = process.env.LOGS_PATH || './logs/';
const LOGS_TYPE = (process.env.LOGS_TYPE || 'simples') as LogType;

app.engine(
  'handlebars',
  engine({ helpers: require(`${__dirname}/views/helper/helper.ts`) }),
);
app.set('view engine', 'handlebars');
app.set('views', `${__dirname}/views`);

app.use(
  sass({
    src: `${process.cwd()}/public/scss`,
    dest: `${process.cwd()}/public/css`,
    outputStyle: 'compressed',
    prefix: '/css',
  }),
);

app.use(logger(LOGS_PATH, LOGS_TYPE));

app.use('/img', express.static(`${process.cwd()}/public/img`));
app.use('/css', express.static(`${process.cwd()}/public/css`));
app.use('/js', express.static(`${process.cwd()}/public/js`));

app.use(router);

app.use((req: Request, res: Response) => {
  res.send('404!');
});

app.listen(PORT, () => {
  console.log(`Express app iniciado na porta ${PORT}.`);
});
