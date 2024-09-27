"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { data: produtos } = yield axios_1.default.get(`${process.env.DB_SERVER}/produtos`);
        res.render('product/index', {
            produtos,
            layout: 'main',
        });
    }
    catch (err) {
        res.status(500).json(err);
    }
});
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.method === 'GET') {
        res.render('product/create', { layout: 'main' });
    }
    else if (req.method === 'POST') {
        const produto = req.body;
        try {
            yield axios_1.default.post(`${process.env.DB_SERVER}/produtos`, produto);
            res.redirect('/produtos');
        }
        catch (err) {
            res.status(500).json(err);
        }
    }
});
const read = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { data: produto } = yield axios_1.default.get(`${process.env.DB_SERVER}/produtos/${req.params.id}`);
        res.render('product/view', { produto, layout: 'main' });
    }
    catch (err) {
        res.status(500).json(err);
    }
});
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.method === 'GET') {
        try {
            const { data: produto } = yield axios_1.default.get(`${process.env.DB_SERVER}/produtos/${req.params.id}`);
            res.render('product/update', { produto, layout: 'main' });
        }
        catch (err) {
            res.status(500).json(err);
        }
    }
    else if (req.method === 'POST') {
        const produto = req.body;
        try {
            yield axios_1.default.patch(`${process.env.DB_SERVER}/produtos/${req.params.id}`, produto);
            res.redirect('/produtos');
        }
        catch (err) {
            res.status(500).json(err);
        }
    }
});
const remove = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield axios_1.default.delete(`${process.env.DB_SERVER}/produtos/${req.params.id}`);
        res.redirect('/produtos');
    }
    catch (err) {
        res.status(500).json(err);
    }
});
exports.default = { index, read, create, update, remove };
