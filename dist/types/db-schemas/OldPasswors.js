"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.oldPasswordSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
exports.oldPasswordSchema = new mongoose_1.default.Schema({
    hashPassword: { type: String },
    userId: { type: String }
});
