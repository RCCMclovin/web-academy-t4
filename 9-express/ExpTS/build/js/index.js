"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_handlebars_1 = require("express-handlebars");
const logger_1 = __importDefault(require("./middlewares/logger"));
const router_1 = __importDefault(require("./router/router"));
const validateEnv_1 = __importDefault(require("./utils/validateEnv"));
dotenv_1.default.config({ path: './env/.env' });
(0, validateEnv_1.default)();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3333;
const LOGS_PATH = process.env.LOGS_PATH || './logs/';
const LOGS_TYPE = (process.env.LOGS_TYPE || 'simples');
app.engine('handlebars', (0, express_handlebars_1.engine)({ helpers: require(`${__dirname}/views/helper/helper.ts`) }));
app.set('view engine', 'handlebars');
app.set('views', `${__dirname}/views`);
app.use((0, logger_1.default)(LOGS_PATH, LOGS_TYPE));
app.use('/img', express_1.default.static(`${process.cwd()}/public/img`));
app.use('/css', express_1.default.static(`${process.cwd()}/public/css`));
app.use(router_1.default);
app.use((req, res) => {
    res.send('404!');
});
app.listen(PORT, () => {
    console.log(`Express app iniciado na porta ${PORT}.`);
});
