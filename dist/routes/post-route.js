"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRouter = void 0;
const express_1 = require("express");
const post_repository_1 = require("../repositories/post-repository");
const auth_middleware_1 = require("../middlewares/auth-middleware");
const post_validation_1 = require("../middlewares/post-validation");
exports.postRouter = (0, express_1.Router)({});
exports.postRouter.get("/", (req, res) => {
    const blogs = post_repository_1.postRepository.findPosts();
    res.status(200).send(blogs);
});
exports.postRouter.post("/", auth_middleware_1.checkAuth, post_validation_1.postValidator, post_validation_1.postValidate, (req, res) => {
    const posts = post_repository_1.postRepository.createPost(req.body);
    if (!posts) {
        res.sendStatus(400);
        return;
    }
    res.status(201).send(posts);
});
exports.postRouter.get("/:id", (req, res) => {
    const post = post_repository_1.postRepository.findPostById(req.params.id);
    if (!post) {
        res.sendStatus(404);
        return;
    }
    res.status(200).send(post);
});
exports.postRouter.put("/:id", auth_middleware_1.checkAuth, post_validation_1.postValidator, post_validation_1.postValidate, (req, res) => {
    const post = post_repository_1.postRepository.changePost(req.params.id, req.body);
    if (!post) {
        res.sendStatus(404);
        return;
    }
    res.sendStatus(204);
});
exports.postRouter.delete("/:id", auth_middleware_1.checkAuth, (req, res) => {
    const post = post_repository_1.postRepository.deletePost(req.params.id);
    if (!post) {
        res.sendStatus(404);
        return;
    }
    res.sendStatus(204);
});
