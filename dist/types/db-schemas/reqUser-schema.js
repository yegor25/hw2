"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reqUserSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongodb_1 = require("mongodb");
exports.reqUserSchema = new mongoose_1.default.Schema({
    _id: { type: mongodb_1.ObjectId },
    IP: { type: String },
    URL: { type: String },
    date: { type: Date },
});
