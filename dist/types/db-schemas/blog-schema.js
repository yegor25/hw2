"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongodb_1 = require("mongodb");
exports.blogSchema = new mongoose_1.default.Schema({
    _id: mongodb_1.ObjectId,
    name: { type: String, required: true },
    description: { type: String, required: true },
    createdAt: { type: String, required: true },
    websiteUrl: { type: String, required: true },
    isMembership: { type: Boolean }
});
