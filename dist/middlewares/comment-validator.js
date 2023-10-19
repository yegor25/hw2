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
exports.commentValidate = exports.commentValidator = void 0;
const express_validator_1 = require("express-validator");
const helper_validator_1 = require("./helper/helper-validator");
exports.commentValidator = [
    (0, express_validator_1.body)("content").trim().isLength({ min: 20, max: 300 }).withMessage("invalid content")
];
const commentValidate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const errorFormatter = helper_validator_1.helperValidator.errorFomatter;
    const errors = (0, express_validator_1.validationResult)(req).formatWith(errorFormatter);
    if (!errors.isEmpty()) {
        res.status(400).send({ errorsMessages: errors.array({ onlyFirstError: true }) });
    }
    next();
});
exports.commentValidate = commentValidate;
