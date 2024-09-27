"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const envalid_1 = require("envalid");
const validateEnv = () => {
    (0, envalid_1.cleanEnv)(process.env, {
        NODE_ENV: (0, envalid_1.str)(),
        PORT: (0, envalid_1.port)(),
        LOGS_PATH: (0, envalid_1.str)(),
        LOGS_TYPE: (0, envalid_1.str)(),
        DB_SERVER: (0, envalid_1.url)(),
    });
};
exports.default = validateEnv;
