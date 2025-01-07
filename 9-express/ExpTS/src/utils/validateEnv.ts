import { cleanEnv, port, str, url } from 'envalid';

const validateEnv = () => {
cleanEnv(process.env, {
NODE_ENV: str(),
PORT: port(),
LOGS_PATH: str(),
LOGS_TYPE: str(),
DB_SERVER: url(),
});
};

export default validateEnv;
