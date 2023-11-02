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
exports.userValidate = exports.userValidator = void 0;
const express_validator_1 = require("express-validator");
exports.userValidator = [
    (0, express_validator_1.body)("email").isString().trim().notEmpty().isLength({ max: 20, min: 6 }).withMessage("invalid length").isEmail().matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/).withMessage("invalid email"),
    (0, express_validator_1.body)("login").isString().trim().notEmpty().isLength({ min: 3, max: 10 }).matches(/^[a-zA-Z0-9_-]*$/).withMessage("invalid login"),
    (0, express_validator_1.body)("password").isString().trim().notEmpty().isLength({ min: 6, max: 20 }).withMessage("invalid password")
];
const userValidate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const errorFormatter = ({ msg, path }) => {
        return {
            message: msg,
            field: path
        };
    };
    const errors = (0, express_validator_1.validationResult)(req).formatWith(errorFormatter);
    if (errors.isEmpty()) {
        return next();
    }
    else {
        res.status(400).send({ errorsMessages: errors.array({ onlyFirstError: true }) });
    }
});
exports.userValidate = userValidate;
