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
Object.defineProperty(exports, "__esModule", { value: true });
exports.recoveryCodeValidator = void 0;
const express_validator_1 = require("express-validator");
const query_recoveryPass_1 = require("../repositories/query/query-recoveryPass");
exports.recoveryCodeValidator = [
    (0, express_validator_1.body)("recoveryCode").exists().custom((val) => __awaiter(void 0, void 0, void 0, function* () {
        const validCode = yield query_recoveryPass_1.queryRecoverPass.checkCode(val);
        if (!validCode)
            throw new Error("invalid");
        if (validCode.expirationDate < new Date())
            throw new Error("expire");
    })).withMessage("invalid code"),
    (0, express_validator_1.body)("newPassword").isString().trim().notEmpty().isLength({ min: 6, max: 20 }).withMessage("invalid password")
];
