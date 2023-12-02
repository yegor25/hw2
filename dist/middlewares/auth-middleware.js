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
exports.checkGuess = exports.authMiddleware = exports.checkAuth = void 0;
const jwt_service_1 = require("../application/jwt-service");
const query_UserRepository_1 = require("../repositories/query/query-UserRepository");
const checkAuth = (req, res, next) => {
    const user = req.headers["authorization"];
    const base64regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
    const isBase64 = base64regex.test(user === null || user === void 0 ? void 0 : user.split(" ").splice(1, 1).join(""));
    if (!user) {
        res.sendStatus(401);
        return;
    }
    const isBasic = user.includes("Basic");
    if (isBase64 && isBasic) {
        const encode = atob(user === null || user === void 0 ? void 0 : user.split(" ").splice(1, 1).join(" "));
        const encodeArray = encode.split(":");
        if (encodeArray.length !== 2) {
            res.sendStatus(401);
            return;
        }
        if (encodeArray[0] === "admin" && encodeArray[1] === "qwerty") {
            return next();
        }
        else {
            res.sendStatus(401);
            return;
        }
    }
    else {
        res.sendStatus(401);
    }
};
exports.checkAuth = checkAuth;
const authMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.headers.authorization) {
        res.send(401);
        return;
    }
    const token = req.headers.authorization.split(" ")[1];
    const userId = yield jwt_service_1.jwtService.getUserIdByToken(token);
    if (!userId) {
        res.sendStatus(401);
        return;
    }
    req.user = yield query_UserRepository_1.QueryUserRepository.findUserById(userId);
    if (req.user) {
        next();
    }
    else {
        res.sendStatus(401);
        return;
    }
});
exports.authMiddleware = authMiddleware;
const checkGuess = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const tokenData = req.headers.authorization;
    if (!tokenData) {
        req.user = null;
        return next();
    }
    const token = tokenData.split(" ")[1];
    const userId = yield jwt_service_1.jwtService.getUserIdByToken(token);
    if (!userId) {
        req.user = null;
        return next();
    }
    req.user = yield query_UserRepository_1.QueryUserRepository.findUserById(userId);
    next();
});
exports.checkGuess = checkGuess;
/*

import { NextFunction, Request, Response } from "express"

export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
    const user = req.headers["authorization"]

    if (!user) {
        res.sendStatus(401)
        return
    }
    const base64regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/
    const isBase64 = base64regex.test(user)
    if (isBase64) {
        const encode = atob(user?.split(" ").splice(1, 1).join(" ") as string)
        const encodeArray = encode.split(":")
        if (encodeArray.length !== 2) {
            res.sendStatus(401)
            return
        }
        if (encodeArray[0] === "admin" && encodeArray[1] === "qwerty") {
            return next()
        } else {
            res.sendStatus(401)
            return
        }
    } else {
        const data = user?.split(" ").splice(1, 1)
        if (data[0] === "admin" && data[1] === "qwerty") {
            return next()
        } else {
            res.sendStatus(401)
            return
        }
    }


}
*/
// export const checkAuth2 = (req: Request, res: Response, next: NextFunction) => {
//     const auth = req.headers.authorization
//     if(!auth) return res.sendStatus(401)
//     const [authType, authValue] = auth.split(' ')
//     if(authType !== 'Basic') return res.sendStatus(401)
//     if(atob(authValue) !== 'admin:qwerty') return res.sendStatus(401)
//     return next()
// }
