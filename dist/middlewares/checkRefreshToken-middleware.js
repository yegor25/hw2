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
const checkRefreshToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.cookies.refreshToken;
    if (!token) {
        res.sendStatus(401);
        return;
    }
    try {
        const isValid = yield jwt_service_1.jwtService.checkRefreshToken(token);
        if (isValid)
            next();
        res.sendStatus(401);
    }
    catch (error) {
        res.sendStatus(401);
        return;
    }
});
exports.checkRefreshToken = checkRefreshToken;
