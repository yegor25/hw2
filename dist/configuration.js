"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.configuration = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.configuration = {
    ACCESS_SECRET: process.env.ACCESS_SECRET || "1ds1ew",
    REFRESH_SECRET: process.env.REFRESH_SECRET || "1ds1ewWQQW",
};
