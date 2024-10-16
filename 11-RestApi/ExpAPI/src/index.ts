import express from 'express';
import dotenv from 'dotenv';

import router from './router/index';
import validateEnv from './utils/validateEnv';

dotenv.config();
validateEnv();

const app = express();
const PORT = process.env.PORT || 3333;

app.use(express.json());
app.use(router);

app.listen(PORT, () => {
  console.log(`Express app iniciado na porta ${PORT}.`);
});
