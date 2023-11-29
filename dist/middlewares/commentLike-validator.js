"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentLikeValidator = void 0;
const express_validator_1 = require("express-validator");
exports.commentLikeValidator = [
    (0, express_validator_1.body)("likeStatus").exists().notEmpty().withMessage("unknown value")
];
