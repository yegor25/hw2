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
exports.blogService = void 0;
const mongodb_1 = require("mongodb");
const blog_repository_1 = require("../repositories/mutation/blog-repository");
exports.blogService = {
    createBlog(blog) {
        return __awaiter(this, void 0, void 0, function* () {
            const newBlog = {
                name: blog.name,
                description: blog.description,
                websiteUrl: blog.description,
                _id: new mongodb_1.ObjectId(),
                isMembership: false,
                createdAt: new Date().toISOString()
            };
            return yield blog_repository_1.blogsRepository.createBlog(newBlog);
        });
    },
    changeBlog(id, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const dbId = new mongodb_1.ObjectId(id);
            return blog_repository_1.blogsRepository.changeBlog(dbId, payload);
        });
    },
    deleteBlog(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const dbId = new mongodb_1.ObjectId(id);
            return yield blog_repository_1.blogsRepository.deleteBlog(dbId);
        });
    },
    deleteAllBlogs() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield blog_repository_1.blogsRepository.deleteAll();
        });
    }
};
