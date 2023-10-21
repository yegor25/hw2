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
exports.validateUser = exports.userValidator = void 0;
const express_validator_1 = require("express-validator");
const validator_helper_1 = require("./helpers/validator-helper");
exports.userValidator = [
    (0, express_validator_1.body)("email").trim().exists().isEmail().isLength({ min: 5, max: 30 }).withMessage("Проверьте правильность вводимого"),
    (0, express_validator_1.body)("password").isLength({ min: 8, max: 20 }).withMessage("Пароль должен быть не менее 8 исмволов, и не более 30")
];
const validateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty) {
        res.status(400).send({ errorMessages: errors.formatWith(validator_helper_1.validatorHelper.errorFormatter).array() });
        return;
    }
    next();
});
exports.validateUser = validateUser;
