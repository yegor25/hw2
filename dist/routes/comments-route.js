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
const auth_middleware_1 = require("../middlewares/auth-middleware");
const comment_service_1 = require("../domain/comment-service");
const comment_validator_1 = require("../middlewares/comment-validator");
const commentLike_validator_1 = require("../middlewares/commentLike-validator");
exports.commentRouter = (0, express_1.Router)({});
exports.commentRouter.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield query_commentsRepository_1.QueryCommentsRepository.getCommentsById(req.params.id);
    if (!data) {
        res.sendStatus(404);
        return;
    }
    res.status(200).send(data);
}));
exports.commentRouter.delete("/:commentId", auth_middleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield query_commentsRepository_1.QueryCommentsRepository.getCommentsById(req.params.commentId);
    if (!data) {
        res.sendStatus(404);
        return;
    }
    const commentId = req.params.commentId;
    const user = req.user;
    const result = yield comment_service_1.commentService.deleteComment(commentId, user === null || user === void 0 ? void 0 : user._id.toString());
    if (!result) {
        res.sendStatus(403);
        return;
    }
    res.sendStatus(204);
}));
exports.commentRouter.put("/:commentId", auth_middleware_1.authMiddleware, comment_validator_1.commentValidator, comment_validator_1.commentValidate, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const content = req.body.content;
    const data = yield query_commentsRepository_1.QueryCommentsRepository.getCommentsById(req.params.commentId);
    if (!data) {
        res.sendStatus(404);
        return;
    }
    const commentId = req.params.commentId;
    const user = req.user;
    const result = yield comment_service_1.commentService.updateComment(commentId, user === null || user === void 0 ? void 0 : user._id.toString(), content);
    if (!result) {
        res.sendStatus(403);
        return;
    }
    res.sendStatus(204);
}));
exports.commentRouter.put("/:commentId/like-status", auth_middleware_1.authMiddleware, commentLike_validator_1.commentLikeValidator, comment_validator_1.commentValidate, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const status = req.body.likeStatus;
    const data = yield query_commentsRepository_1.QueryCommentsRepository.getCommentsById(req.params.commentId);
    if (!data) {
        res.sendStatus(404);
        return;
    }
    const commentId = req.params.commentId;
    const user = req.user;
    const result = yield comment_service_1.commentService.updateLikeStatus(status, user === null || user === void 0 ? void 0 : user._id.toString());
    if (!result) {
        res.sendStatus(403);
        return;
    }
    res.sendStatus(204);
}));
