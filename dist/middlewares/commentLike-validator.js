"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentLikeValidator = void 0;
const express_validator_1 = require("express-validator");
const like_type_1 = require("../types/like-type");
exports.commentLikeValidator = [
    (0, express_validator_1.body)("likeStatus").custom((val) => {
        if (val in like_type_1.LikeStatus)
            return;
        throw new Error("inv");
    }).withMessage("unknown value")
];
