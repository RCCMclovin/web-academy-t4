const express = require("express");
require("dotenv").config({ path: `./env/.env.${process.env.NODE_ENV}` });

const app = express();
const PORT = process.env.PORT || 3333;

app.get("/", (req, res) => {
res.send("Hello World!");
});

app.listen(PORT, () => {
console.log(`Express app iniciado na porta ${PORT}.`);
});