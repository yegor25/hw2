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
exports.postService = void 0;
const mongodb_1 = require("mongodb");
const post_repository_1 = require("../repositories/mutation/post-repository");
const query_BlogsRepository_1 = require("../repositories/query/query-BlogsRepository");
const convertID = (id) => new mongodb_1.ObjectId(id);
exports.postService = {
    createPost(post) {
        return __awaiter(this, void 0, void 0, function* () {
            const blog = yield query_BlogsRepository_1.QueryBlogRepositiry.findBlogById(post.blogId);
            if (!blog)
                return null;
            const newPost = Object.assign({ _id: new mongodb_1.ObjectId(), blogName: blog.name, createdAt: new Date().toISOString() }, post);
            return yield post_repository_1.postRepository.createPost(newPost);
        });
    },
    createPostForBlog(post, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const blog = yield query_BlogsRepository_1.QueryBlogRepositiry.findBlogById(id);
            if (!blog)
                return null;
            const newPost = Object.assign({ _id: new mongodb_1.ObjectId(), blogName: blog.name, blogId: id, createdAt: new Date().toISOString() }, post);
            return yield post_repository_1.postRepository.createPost(newPost);
        });
    },
    changePost(id, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            return post_repository_1.postRepository.changePost(convertID(id), payload);
        });
    },
    deletePost(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield post_repository_1.postRepository.deletePost(convertID(id));
        });
    },
    deleteAllPosts() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield post_repository_1.postRepository.deleteAll();
        });
    }
};