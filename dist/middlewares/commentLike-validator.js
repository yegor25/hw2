"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentLikeValidator = void 0;
const express_validator_1 = require("express-validator");
const like_type_1 = require("../types/like-type");
exports.commentLikeValidator = [
    (0, express_validator_1.body)("likeStatus").exists().notEmpty().withMessage("unknown value")
        .isIn(Object.values(like_type_1.LikeStatus)).withMessage("like")
    // .custom( async(val: string) => {
    //     if(!Object.values(LikeStatus).includes(val.toString() as unknown as LikeStatus))throw new Error("custom")
    // }).withMessage("custom")
];
