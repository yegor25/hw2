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
exports.authRouter = void 0;
const express_1 = require("express");
const query_UserRepository_1 = require("../repositories/query/query-UserRepository");
const auth_validator_1 = require("../middlewares/auth-validator");
const jwt_service_1 = require("../application/jwt-service");
const auth_service_1 = require("../domain/auth-service");
const register_validator_1 = require("../middlewares/register-validator");
const codeConfirmation_validator_1 = require("../middlewares/codeConfirmation-validator");
exports.authRouter = (0, express_1.Router)({});
exports.authRouter.post("/login", auth_validator_1.authValidator, auth_validator_1.authValidate, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield query_UserRepository_1.QueryUserRepository.checkUser(req.body);
    if (!user) {
        res.sendStatus(401);
        return;
    }
    const token = yield jwt_service_1.jwtService.createAccesToken(user);
    res.status(200).send({ accessToken: token });
}));
exports.authRouter.post("/registration", register_validator_1.registerValidator, register_validator_1.registerValidate, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield auth_service_1.authService.registerUser(req.body);
    res.sendStatus(204);
}));
exports.authRouter.post("/registration-confirmation", codeConfirmation_validator_1.codeConfiramtionValidator, codeConfirmation_validator_1.validateCodeConfirmation, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const code = req.body.code;
    console.log("code", code);
    if (!code) {
        res.sendStatus(400);
        return;
    }
    const confirmedUser = yield auth_service_1.authService.confirmUser(code);
    if (!confirmedUser) {
        res.sendStatus(400);
        return;
    }
    res.status(204);
}));
