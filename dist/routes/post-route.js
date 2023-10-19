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
exports.postRouter = void 0;
const express_1 = require("express");
const auth_middleware_1 = require("../middlewares/auth-middleware");
const post_validation_1 = require("../middlewares/post-validation");
const post_service_1 = require("../domain/post-service");
const query_PostRepository_1 = require("../repositories/query/query-PostRepository");
const comment_service_1 = require("../domain/comment-service");
const comment_validator_1 = require("../middlewares/comment-validator");
const query_commentsRepository_1 = require("../repositories/query/query-commentsRepository");
exports.postRouter = (0, express_1.Router)({});
exports.postRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const blogs = yield query_PostRepository_1.QueryPostRepository.findPosts(req.query);
    res.status(200).send(blogs);
}));
exports.postRouter.post("/", auth_middleware_1.checkAuth, post_validation_1.postValidator, post_validation_1.postValidate, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const posts = yield post_service_1.postService.createPost(req.body);
    if (!posts) {
        res.sendStatus(400);
        return;
    }
    res.status(201).send(posts);
}));
exports.postRouter.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const post = yield query_PostRepository_1.QueryPostRepository.findPostById(req.params.id);
    if (!post) {
        res.sendStatus(404);
        return;
    }
    res.status(200).send(post);
}));
exports.postRouter.post("/:postId/comments", auth_middleware_1.authMiddleware, comment_validator_1.commentValidator, comment_validator_1.commentValidate, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const { content } = req.body;
    const postId = req.params.postId;
    if (!user) {
        res.sendStatus(401);
        return;
    }
    const comment = yield comment_service_1.commentService.createComment(postId, content, user);
    if (!comment) {
        res.sendStatus(404);
        return;
    }
    res.status(201).send(comment);
}));
exports.postRouter.get("/:postId/comments", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const postId = req.params.postId;
    const post = yield query_PostRepository_1.QueryPostRepository.findPostById(postId);
    if (!post) {
        res.sendStatus(404);
        return;
    }
    const comments = yield query_commentsRepository_1.QueryCommentsRepository.getComments(req.query);
    res.status(200).send(comments);
}));
exports.postRouter.put("/:id", auth_middleware_1.checkAuth, post_validation_1.postValidator, post_validation_1.postValidate, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const post = yield post_service_1.postService.changePost(req.params.id, req.body);
    if (!post) {
        res.sendStatus(404);
        return;
    }
    res.sendStatus(204);
}));
exports.postRouter.delete("/:id", auth_middleware_1.checkAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const post = yield post_service_1.postService.deletePost(req.params.id);
    if (!post) {
        res.sendStatus(404);
        return;
    }
    res.sendStatus(204);
}));
