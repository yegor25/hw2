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
exports.authRouter.post("/registration", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
}));
