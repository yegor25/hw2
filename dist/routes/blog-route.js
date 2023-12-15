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
exports.blogRouter = void 0;
const express_1 = require("express");
const auth_middleware_1 = require("../middlewares/auth-middleware");
const blog_validation_1 = require("../middlewares/blog-validation");
const blog_service_1 = require("../domain/blog-service");
const query_BlogsRepository_1 = require("../repositories/query/query-BlogsRepository");
const query_PostRepository_1 = require("../repositories/query/query-PostRepository");
const post_service_1 = require("../domain/post-service");
const post_validation_1 = require("../middlewares/post-validation");
exports.blogRouter = (0, express_1.Router)({});
exports.blogRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("query", req.query);
    const blogs = yield query_BlogsRepository_1.QueryBlogRepositiry.findBlogs(req.query);
    res.status(200).send(blogs);
}));
exports.blogRouter.post("/", auth_middleware_1.checkAuth, blog_validation_1.validateBlogShema, blog_validation_1.blogValidate, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const blogs = yield blog_service_1.blogService.createBlog(req.body);
    res.status(201).send(blogs);
}));
exports.blogRouter.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const blog = yield query_BlogsRepository_1.QueryBlogRepositiry.findBlogById(req.params.id);
    if (!blog) {
        res.sendStatus(404);
        return;
    }
    res.status(200).send(blog);
}));
exports.blogRouter.post("/:blogId/posts", auth_middleware_1.checkAuth, post_validation_1.postValidatorForBlog, post_validation_1.postValidate, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const blog = yield post_service_1.postService.createPostForBlog(req.body, req.params.blogId);
    if (!blog) {
        res.sendStatus(404);
        return;
    }
    res.status(201).send(blog);
}));
exports.blogRouter.get("/:blogId/posts", auth_middleware_1.checkGuess, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const blogs = yield query_PostRepository_1.QueryPostRepository.findPostsByBlogId(req.params.blogId, req.query);
    if (!blogs) {
        res.sendStatus(404);
        return;
    }
    res.status(200).send(blogs);
}));
exports.blogRouter.put("/:id", auth_middleware_1.checkAuth, blog_validation_1.validateBlogShema, blog_validation_1.blogValidate, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const blog = yield blog_service_1.blogService.changeBlog(req.params.id, req.body);
    if (!blog) {
        res.sendStatus(404);
        return;
    }
    res.sendStatus(204);
}));
exports.blogRouter.delete("/:id", auth_middleware_1.checkAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const blog = yield blog_service_1.blogService.deleteBlog(req.params.id);
    if (!blog) {
        res.sendStatus(404);
        return;
    }
    res.sendStatus(204);
}));
