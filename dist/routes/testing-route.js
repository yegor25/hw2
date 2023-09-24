"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testingRouter = void 0;
const express_1 = require("express");
const post_repository_1 = require("../repositories/post-repository");
const blog_repository_1 = require("../repositories/blog-repository");
exports.testingRouter = (0, express_1.Router)({});
exports.testingRouter.delete("/all-data", (req, res) => {
    const posts = post_repository_1.postRepository.deleteAll();
    const blogs = blog_repository_1.blogsRepository.deleteAll();
    if (!posts.length && !blogs.length) {
        res.sendStatus(204);
    }
    res.end();
});
