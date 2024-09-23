import { cleanEnv, port, str } from "envalid";

const validateEnv = () => {
    cleanEnv(process.env, {
        NODE_ENV: str(),
        PORT: port(),
        LOGS_PATH: str(),
        LOGS_TYPE: str(),
    });
};

export default validateEnv;
