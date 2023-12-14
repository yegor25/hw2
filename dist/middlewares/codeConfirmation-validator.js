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
exports.validateCodeConfirmation = exports.codeConfiramtionValidator = void 0;
const express_validator_1 = require("express-validator");
const helper_validator_1 = require("./helper/helper-validator");
const auth_service_1 = require("../domain/auth-service");
const user_repository_1 = require("../repositories/mutation/user-repository");
const userRepository = new user_repository_1.UserRepository();
const authService = new auth_service_1.AuthService(userRepository);
exports.codeConfiramtionValidator = [
    (0, express_validator_1.body)("code").exists().isString().custom((val) => __awaiter(void 0, void 0, void 0, function* () {
        const validCode = yield authService.confirmUser(val);
        if (!validCode)
            throw new Error();
    }))
        .withMessage("invalid code")
];
const validateCodeConfirmation = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const error = (0, express_validator_1.validationResult)(req).formatWith(helper_validator_1.helperValidator.errorFomatter);
    if (!error.isEmpty()) {
        res.status(400).send({ errorsMessages: error.array({ onlyFirstError: true }) });
        return;
    }
    next();
});
exports.validateCodeConfirmation = validateCodeConfirmation;
