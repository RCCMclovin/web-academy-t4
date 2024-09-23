import express, { Request, Response, NextFunction } from "express";
import validateEnv from "./utils/validateEnv";
import dotenv from "dotenv";
import logger, {LogType} from "./middlewares/logger"

dotenv.config({ path: "./env/.env" });
validateEnv();

const app = express();
const PORT = process.env.PORT || 3333;
const LOGS_PATH = process.env.LOGS_PATH || "./logs/"
const LOGS_TYPE = (process.env.LOGS_TYPE || "simples") as LogType

app.use(logger( LOGS_PATH, LOGS_TYPE));
   
app.get("/", (req: Request, res: Response) => {
    res.send("Hello World!");
});

app.listen(PORT, () => {
    console.log(`Express app iniciado na porta ${PORT}.`);
});