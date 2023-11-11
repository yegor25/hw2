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
exports.loginMiddleware = void 0;
const query_UserRepository_1 = require("../repositories/query/query-UserRepository");
const query_oldPass_1 = require("../repositories/query/query-oldPass");
const crypto_service_1 = require("../application/crypto-service");
const loginMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield query_UserRepository_1.QueryUserRepository.findUserByLoginOrEmail(req.body.loginOrEmail);
    if (!user) {
        res.sendStatus(401);
        return;
    }
    const checkOldPass = yield query_oldPass_1.queryOldPasswordRepo.getOldPassword(user._id.toString());
    if (checkOldPass) {
        const hash = yield crypto_service_1.cryptoService.genHash(req.body.password);
        if (checkOldPass.hashPassword === hash.hash) {
            res.sendStatus(401);
            return;
        }
        else {
            next();
            return;
        }
    }
    next();
});
exports.loginMiddleware = loginMiddleware;
