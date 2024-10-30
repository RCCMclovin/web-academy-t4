import { cleanEnv, port, str } from 'envalid';

const validateEnv = () => {
  cleanEnv(process.env, {
    NODE_ENV: str(),
    PORT: port(),
    SESSION_SECRET: str(),
    DEFAULT_LANGUAGE: str({ choices: ['pt-BR', 'en-US'] }),
    HOST: str(),
  });
};

export default validateEnv;
