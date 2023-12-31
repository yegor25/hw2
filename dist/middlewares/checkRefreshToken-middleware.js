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
exports.checkRefreshToken = void 0;
const jwt_service_1 = require("../application/jwt-service");
const query_UserRepository_1 = require("../repositories/query/query-UserRepository");
const mongodb_1 = require("mongodb");
const checkRefreshToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.cookies.refreshToken;
    if (!token) {
        res.sendStatus(401);
        return;
    }
    const isValid = yield jwt_service_1.jwtService.checkRefreshToken(token);
    if (!isValid) {
        res.sendStatus(401);
        return;
    }
    else {
        // const tokenOfBlackList = await QueryTokenRepository.findToken(token)
        // if (tokenOfBlackList){
        //     res.sendStatus(401)
        //     return
        // }
        req.user = yield query_UserRepository_1.QueryUserRepository.findUserById(new mongodb_1.ObjectId(isValid.userId));
        req.body.deviceId = isValid.deviceId;
        next();
    }
});
exports.checkRefreshToken = checkRefreshToken;
