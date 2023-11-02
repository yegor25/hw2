"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.passRecoveryValidation = void 0;
const express_validator_1 = require("express-validator");
exports.passRecoveryValidation = [
    (0, express_validator_1.body)("email").isEmail().withMessage("invalid email")
];
