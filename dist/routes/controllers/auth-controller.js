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
exports.AuthController = void 0;
const session_service_1 = require("../../domain/session-service");
const jwt_service_1 = require("../../application/jwt-service");
const query_UserRepository_1 = require("../../repositories/query/query-UserRepository");
class AuthController {
    constructor(authService, userService) {
        this.authService = authService;
        this.userService = userService;
    }
    loginUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield query_UserRepository_1.QueryUserRepository.checkUser(req.body);
            if (!user) {
                res.sendStatus(401);
                return;
            }
            const ip = req.ip;
            const title = req.headers["user-agent"] || "Chrome 105";
            const session = yield this.authService.saveSession({ ip, title, userId: user === null || user === void 0 ? void 0 : user._id.toString() });
            const token = yield jwt_service_1.jwtService.createAccesToken(user);
            const refresh = yield jwt_service_1.jwtService.createRefreshToken(user, session.deviceId);
            res.cookie("refreshToken", refresh, { httpOnly: true, secure: true });
            res.status(200).send({ accessToken: token });
        });
    }
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.authService.registerUser(req.body);
            res.sendStatus(204);
        });
    }
    registerConfirmation(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const code = req.body.code;
            yield this.authService.confirmUser(code);
            res.sendStatus(204);
        });
    }
    resendingEmail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.authService.resendingEmail(req.body.email);
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
                yield this.authService.saveOldToken(req.cookies.refreshToken, (_a = req.user) === null || _a === void 0 ? void 0 : _a._id.toString());
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
                yield this.authService.saveOldToken(req.cookies.refreshToken, (_a = req.user) === null || _a === void 0 ? void 0 : _a._id.toString());
            const refreshToken = yield jwt_service_1.jwtService.createRefreshToken(user, req.body.deviceId);
            const accessToken = yield jwt_service_1.jwtService.createAccesToken(user);
            yield session_service_1.sessionService.changectiveDate(req.body.deviceId);
            res.cookie("refreshToken", refreshToken, { httpOnly: true, secure: true });
            res.status(200).send({ accessToken });
        });
    }
    recoverPass(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.authService.recoverPassword(req.body.email);
            res.sendStatus(204);
        });
    }
    changePswd(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { newPassword, recoveryCode } = req.body;
            yield this.userService.recoverPassword(newPassword, recoveryCode);
            res.sendStatus(204);
        });
    }
}
exports.AuthController = AuthController;
//https://it-incubator.atlassian.net/wiki/spaces/STUD/pages/381911041/Google
