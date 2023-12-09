"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.securityDeviceSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongodb_1 = require("mongodb");
exports.securityDeviceSchema = new mongoose_1.default.Schema({
    _id: mongodb_1.ObjectId,
    ip: { type: String, required: true },
    title: { type: String, required: true },
    lastActiveDate: { type: String, required: true },
    deviceId: { type: String, required: true },
    isActive: { type: Boolean, required: true },
    userId: { type: String, required: true },
});
