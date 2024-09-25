"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const main_1 = __importDefault(require("../controllers/main"));
const router = (0, express_1.Router)();
router.get('/', main_1.default.hello);
router.get('/about', main_1.default.about);
router.get('/lorem/:num', main_1.default.loremParam);
router.get('/lorem', main_1.default.loremQuery);
router.get('/hb1', main_1.default.hb1);
router.get('/hb2', main_1.default.hb2);
router.get('/hb3', main_1.default.hb3);
router.get('/hb4', main_1.default.hb4);
router.get('/profs', main_1.default.profs);
exports.default = router;
