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
exports.commentRouter = void 0;
const express_1 = require("express");
const query_commentsRepository_1 = require("../repositories/query/query-commentsRepository");
exports.commentRouter = (0, express_1.Router)({});
exports.commentRouter.get("/:commentId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield query_commentsRepository_1.QueryCommentsRepository.getCommentsById(req.params.commentId);
    if (!data) {
        res.sendStatus(404);
        return;
    }
    res.status(200).send(data);
}));
