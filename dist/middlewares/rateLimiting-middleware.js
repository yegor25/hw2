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
exports.rateLimiting = void 0;
const requestUser_service_1 = require("../domain/requestUser-service");
const query_requestUser_1 = require("../repositories/query/query-requestUser");
const rateLimiting = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const URL = req.originalUrl;
    const IP = req.ip;
    const date = new Date();
    yield requestUser_service_1.requestUserService.saveRequestData({ URL, IP, date });
    const count = yield query_requestUser_1.QueryRequestUser.countLastRequet(URL, IP);
    if (count > 5) {
        res.sendStatus(429);
        return;
    }
    else {
        next();
    }
});
exports.rateLimiting = rateLimiting;
