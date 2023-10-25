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
exports.devicesRouter = void 0;
const express_1 = require("express");
const checkRefreshToken_middleware_1 = require("../middlewares/checkRefreshToken-middleware");
const query_Sessions_1 = require("../repositories/query/query-Sessions");
exports.devicesRouter = (0, express_1.Router)({});
exports.devicesRouter.get("/devices", checkRefreshToken_middleware_1.checkRefreshToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const result = yield query_Sessions_1.sessionsQuery.getAllSessions(user._id.toString());
    if (!result) {
        res.end();
        return;
    }
    res.status(200).send(result);
}));
