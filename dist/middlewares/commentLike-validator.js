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
exports.commentLikeValidator = void 0;
const express_validator_1 = require("express-validator");
const query_commentsRepository_1 = require("../repositories/query/query-commentsRepository");
exports.commentLikeValidator = [
    (0, express_validator_1.param)("commentId").custom((val) => __awaiter(void 0, void 0, void 0, function* () {
        const comment = yield query_commentsRepository_1.QueryCommentsRepository.getCommentsById(val);
        if (!comment)
            throw new Error("invalid");
    })).withMessage("invalid content")
];
