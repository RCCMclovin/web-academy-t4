"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
function logger(path, type) {
    if (type === "simples") {
        return ((req, res, next) => {
            fs_1.default.appendFile(path + "log.txt", `${new Date().toISOString()}, ${req.url}, ${req.method}\n`, (err) => {
                if (err)
                    throw err;
            });
            next();
        });
    }
    else if (type === "completo") {
        return ((req, res, next) => {
            fs_1.default.appendFile(path + "log.txt", `${new Date().toISOString()}, ${req.url}, ${req.method}, ${req.httpVersion}, ${req.get("User-Agent")}\n`, (err) => {
                if (err)
                    throw err;
            });
            next();
        });
    }
    else {
        return ((req, res, next) => {
            next();
        });
    }
}
exports.default = logger;
