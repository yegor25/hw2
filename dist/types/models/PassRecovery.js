"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PassRecoveryModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const passRecoverySchema = new mongoose_1.default.Schema({
    _id: { type: String },
    userId: { type: String },
    recoveryCode: { type: String },
    expirationDate: { type: Date },
});
exports.PassRecoveryModel = mongoose_1.default.model("passRecovery", passRecoverySchema);
