"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentLikeValidator = void 0;
const express_validator_1 = require("express-validator");
const like_type_1 = require("../types/like-type");
exports.commentLikeValidator = [
    (0, express_validator_1.body)("likeStatus").exists().notEmpty().withMessage("unknown value").custom((val) => {
        if (!Object.values(like_type_1.LikeStatus).includes(val))
            throw new Error("custom");
    }).withMessage("custom")
];
