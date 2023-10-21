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
exports.registerValidate = exports.registerValidator = void 0;
const express_validator_1 = require("express-validator");
const query_UserRepository_1 = require("../repositories/query/query-UserRepository");
const helper_validator_1 = require("./helper/helper-validator");
exports.registerValidator = [
    (0, express_validator_1.body)("login").isString().trim().notEmpty()
        .custom((val) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield query_UserRepository_1.QueryUserRepository.findUserByLoginOrEmail(val);
        if (user)
            throw new Error();
    }))
        .withMessage("invalid login"),
    (0, express_validator_1.body)("email").isString().trim().notEmpty().isEmail().custom((val) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield query_UserRepository_1.QueryUserRepository.findUserByLoginOrEmail(val);
        if (user)
            throw new Error();
    })).withMessage("invalid login"),
    (0, express_validator_1.body)("password").isString().trim().notEmpty().isLength({ min: 6, max: 20 }).withMessage("invalid password")
];
const registerValidate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const error = (0, express_validator_1.validationResult)(req).formatWith(helper_validator_1.helperValidator.errorFomatter);
    if (!error.isEmpty()) {
        res.status(400).send({ errorsMessages: error.array({ onlyFirstError: true }) });
        return;
    }
    next();
});
exports.registerValidate = registerValidate;
