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
exports.testingRouter = void 0;
const express_1 = require("express");
const post_service_1 = require("../domain/post-service");
const blog_service_1 = require("../domain/blog-service");
const comment_service_1 = require("../domain/comment-service");
const session_service_1 = require("../domain/session-service");
const user_service_1 = require("../domain/user-service");
const user_repository_1 = require("../repositories/mutation/user-repository");
exports.testingRouter = (0, express_1.Router)({});
const userService = new user_service_1.UserService(new user_repository_1.UserRepository());
exports.testingRouter.delete("/all-data", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield post_service_1.postService.deleteAllPosts();
        const blogs = yield blog_service_1.blogService.deleteAllBlogs();
        const users = yield userService.deleteAllUsers();
        const comments = yield comment_service_1.commentService.deleteAllComments();
        const sessions = yield session_service_1.sessionService.deleteAllsessions();
        return res.sendStatus(204);
    }
    catch (error) {
        res.send("error");
        return;
    }
}));
