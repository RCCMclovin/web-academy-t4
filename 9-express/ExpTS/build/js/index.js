"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validateEnv_1 = __importDefault(require("./utils/validateEnv"));
const dotenv_1 = __importDefault(require("dotenv"));
const logger_1 = __importDefault(require("./middlewares/logger"));
dotenv_1.default.config({ path: "./env/.env" });
(0, validateEnv_1.default)();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3333;
const LOGS_PATH = process.env.LOGS_PATH || "./logs/";
const LOGS_TYPE = (process.env.LOGS_TYPE || "simples");
app.use((0, logger_1.default)(LOGS_PATH, LOGS_TYPE));
app.get("/", (req, res) => {
    res.send("Hello World!");
});
app.listen(PORT, () => {
    console.log(`Express app iniciado na porta ${PORT}.`);
});
