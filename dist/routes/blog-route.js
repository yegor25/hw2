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
const blog_repository_1 = require("../repositories/blog-repository");
const auth_middleware_1 = require("../middlewares/auth-middleware");
const blog_validation_1 = require("../middlewares/blog-validation");
exports.blogRouter = (0, express_1.Router)({});
exports.blogRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const blogs = yield blog_repository_1.blogsRepository.findBlogs();
    res.status(200).send(blogs);
}));
exports.blogRouter.post("/", auth_middleware_1.checkAuth, blog_validation_1.validateBlogShema, blog_validation_1.blogValidate, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const blogs = yield blog_repository_1.blogsRepository.createBlog(req.body);
    res.status(201).send(blogs);
}));
exports.blogRouter.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const blog = yield blog_repository_1.blogsRepository.findBlogById(req.params.id);
    if (!blog) {
        res.sendStatus(404);
        return;
    }
    res.status(200).send(blog);
}));
exports.blogRouter.put("/:id", auth_middleware_1.checkAuth, blog_validation_1.validateBlogShema, blog_validation_1.blogValidate, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const blog = yield blog_repository_1.blogsRepository.changeBlog(req.params.id, req.body);
    if (!blog) {
        res.sendStatus(404);
        return;
    }
    res.sendStatus(204);
}));
exports.blogRouter.delete("/:id", auth_middleware_1.checkAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const blog = yield blog_repository_1.blogsRepository.deleteBlog(req.params.id);
    if (!blog) {
        res.sendStatus(404);
        return;
    }
    res.sendStatus(204);
}));
