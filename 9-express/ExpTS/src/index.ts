import express, { Request, Response } from "express";
import validateEnv from "./utils/validateEnv";
import dotenv from "dotenv";

dotenv.config({ path: "./env/.env" });
validateEnv();

const app = express();
const PORT = process.env.PORT || 3333;

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(PORT, () => {
    console.log(`Express app iniciado na porta ${PORT}.`);
});