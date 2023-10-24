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
const resendingEmail_validator_1 = require("../middlewares/resendingEmail-validator");
const auth_middleware_1 = require("../middlewares/auth-middleware");
const checkRefreshToken_middleware_1 = require("../middlewares/checkRefreshToken-middleware");
exports.authRouter = (0, express_1.Router)({});
exports.authRouter.post("/login", auth_validator_1.authValidator, auth_validator_1.authValidate, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield query_UserRepository_1.QueryUserRepository.checkUser(req.body);
    if (!user) {
        res.sendStatus(401);
        return;
    }
    const token = yield jwt_service_1.jwtService.createAccesToken(user);
    const refresh = yield jwt_service_1.jwtService.createRefreshToken(user);
    res.cookie("refreshToken", refresh, { httpOnly: true, secure: true });
    res.status(200).send({ accessToken: token });
}));
exports.authRouter.post("/registration", register_validator_1.registerValidator, register_validator_1.registerValidate, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield auth_service_1.authService.registerUser(req.body);
    res.sendStatus(204);
}));
exports.authRouter.post("/registration-confirmation", codeConfirmation_validator_1.codeConfiramtionValidator, codeConfirmation_validator_1.validateCodeConfirmation, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const code = req.body.code;
    // console.log("code", code)
    // if(!code){
    //     res.sendStatus(400)
    //     return
    // }
    const confirmedUser = yield auth_service_1.authService.confirmUser(code);
    // if(!confirmedUser){
    //     res.sendStatus(400)
    //     return
    // }
    res.sendStatus(204);
}));
exports.authRouter.post("/registration-email-resending", resendingEmail_validator_1.resendingEmailValidator, resendingEmail_validator_1.validateResendingEmail, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const resending = yield auth_service_1.authService.resendingEmail(req.body.email);
    res.sendStatus(204);
}));
exports.authRouter.get("/me", auth_middleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // if(req.user){
    //     const {email,login,_id} = req.user
    //     const userId = _id.toString()
    //     res.status(200).send({email, login, userId})
    // }
    res.sendStatus(200);
}));
exports.authRouter.post("/logout", checkRefreshToken_middleware_1.checkRefreshToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (req.user)
        yield auth_service_1.authService.saveOldToken(req.cookies.refreshToken, (_a = req.user) === null || _a === void 0 ? void 0 : _a._id.toString());
    res.clearCookie("refreshToken");
    res.sendStatus(204);
}));
exports.authRouter.post("/refresh-token", checkRefreshToken_middleware_1.checkRefreshToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const user = req.user;
    if (user)
        yield auth_service_1.authService.saveOldToken(req.cookies.refreshToken, (_b = req.user) === null || _b === void 0 ? void 0 : _b._id.toString());
    const refreshToken = yield jwt_service_1.jwtService.createRefreshToken(user);
    const accessToken = yield jwt_service_1.jwtService.createAccesToken(user);
    res.cookie("refreshToken", refreshToken, { httpOnly: true, secure: true });
    res.status(200).send({ accessToken });
}));
