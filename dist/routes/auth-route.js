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
const session_service_1 = require("../domain/session-service");
const rateLimiting_middleware_1 = require("../middlewares/rateLimiting-middleware");
const passRecovery_validation_1 = require("../middlewares/passRecovery-validation");
const user_validation_1 = require("../middlewares/user-validation");
const recoveryCode_validator_1 = require("../middlewares/recoveryCode-validator");
const user_service_1 = require("../domain/user-service");
const login_middleware_1 = require("../middlewares/login-middleware");
exports.authRouter = (0, express_1.Router)({});
class AuthController {
    loginUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield query_UserRepository_1.QueryUserRepository.checkUser(req.body);
            if (!user) {
                res.sendStatus(401);
                return;
            }
            const ip = req.ip;
            const title = req.headers["user-agent"] || "Chrome 105";
            const session = yield auth_service_1.authService.saveSession({ ip, title, userId: user === null || user === void 0 ? void 0 : user._id.toString() });
            const token = yield jwt_service_1.jwtService.createAccesToken(user);
            const refresh = yield jwt_service_1.jwtService.createRefreshToken(user, session.deviceId);
            res.cookie("refreshToken", refresh, { httpOnly: true, secure: true });
            res.status(200).send({ accessToken: token });
        });
    }
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield auth_service_1.authService.registerUser(req.body);
            res.sendStatus(204);
        });
    }
    registerConfirmation(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const code = req.body.code;
            yield auth_service_1.authService.confirmUser(code);
            res.sendStatus(204);
        });
    }
    resendingEmail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield auth_service_1.authService.resendingEmail(req.body.email);
            res.sendStatus(204);
        });
    }
    authMe(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.user) {
                const { email, login, _id } = req.user;
                const userId = _id.toString();
                res.status(200).send({ email, login, userId });
                return;
            }
            res.sendStatus(401);
        });
    }
    logout(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if (req.user)
                yield auth_service_1.authService.saveOldToken(req.cookies.refreshToken, (_a = req.user) === null || _a === void 0 ? void 0 : _a._id.toString());
            yield session_service_1.sessionService.deactivateSession(req.body.deviceId);
            res.clearCookie("refreshToken");
            res.sendStatus(204);
        });
    }
    refreshToken(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const user = req.user;
            if (user)
                yield auth_service_1.authService.saveOldToken(req.cookies.refreshToken, (_a = req.user) === null || _a === void 0 ? void 0 : _a._id.toString());
            const refreshToken = yield jwt_service_1.jwtService.createRefreshToken(user, req.body.deviceId);
            const accessToken = yield jwt_service_1.jwtService.createAccesToken(user);
            yield session_service_1.sessionService.changectiveDate(req.body.deviceId);
            res.cookie("refreshToken", refreshToken, { httpOnly: true, secure: true });
            res.status(200).send({ accessToken });
        });
    }
    recoverPass(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield auth_service_1.authService.recoverPassword(req.body.email);
            res.sendStatus(204);
        });
    }
    changePswd(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { newPassword, recoveryCode } = req.body;
            yield user_service_1.userService.recoverPassword(newPassword, recoveryCode);
            res.sendStatus(204);
        });
    }
}
const authController = new AuthController();
exports.authRouter.post("/login", auth_validator_1.authValidator, auth_validator_1.authValidate, rateLimiting_middleware_1.rateLimiting, login_middleware_1.loginMiddleware, authController.loginUser);
exports.authRouter.post("/registration", rateLimiting_middleware_1.rateLimiting, register_validator_1.registerValidator, register_validator_1.registerValidate, authController.register);
exports.authRouter.post("/registration-confirmation", rateLimiting_middleware_1.rateLimiting, codeConfirmation_validator_1.codeConfiramtionValidator, codeConfirmation_validator_1.validateCodeConfirmation, authController.registerConfirmation);
exports.authRouter.post("/registration-email-resending", rateLimiting_middleware_1.rateLimiting, resendingEmail_validator_1.resendingEmailValidator, resendingEmail_validator_1.validateResendingEmail, authController.resendingEmail);
exports.authRouter.get("/me", auth_middleware_1.authMiddleware, authController.authMe);
exports.authRouter.post("/logout", checkRefreshToken_middleware_1.checkRefreshToken, authController.logout);
exports.authRouter.post("/refresh-token", checkRefreshToken_middleware_1.checkRefreshToken, authController.refreshToken);
exports.authRouter.post("/password-recovery", rateLimiting_middleware_1.rateLimiting, passRecovery_validation_1.passRecoveryValidation, user_validation_1.userValidate, authController.recoverPass);
exports.authRouter.post("/new-password", rateLimiting_middleware_1.rateLimiting, recoveryCode_validator_1.recoveryCodeValidator, user_validation_1.userValidate, authController.changePswd);
//https://it-incubator.atlassian.net/wiki/spaces/STUD/pages/381911041/Google
