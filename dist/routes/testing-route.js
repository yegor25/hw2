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
const user_service_1 = require("../domain/user-service");
exports.testingRouter = (0, express_1.Router)({});
exports.testingRouter.delete("/all-data", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const posts = yield post_service_1.postService.deleteAllPosts();
    const blogs = yield blog_service_1.blogService.deleteAllBlogs();
    const users = yield user_service_1.userService.deleteAllUsers();
    return res.sendStatus(204);
}));
