"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongodb_1 = require("mongodb");
exports.userSchema = new mongoose_1.default.Schema({
    _id: mongodb_1.ObjectId,
    login: { type: String, required: true },
    email: { type: String, required: true },
    createdAt: { type: String, required: true },
    hashPassword: { type: String, required: true },
    passwordSalt: { type: String, required: true },
    emailConfirmation: {
        code: { type: String },
        isConfirmed: { type: Boolean },
        expirationDate: { type: Date }
    }
});
