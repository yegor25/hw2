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
exports.postRepository = void 0;
const db_1 = require("../../db");
const mongodb_1 = require("mongodb");
const post_helper_1 = require("../helpers/post-helper");
// let posts: postType[] = [
//     {
//         id: "string",
//         title: "string",
//         shortDescription: "string",
//         content: "string",
//         blogId: "string",
//         blogName: "string"
//     }
// ]
exports.postRepository = {
    createPost(post) {
        return __awaiter(this, void 0, void 0, function* () {
            yield db_1.postsCollection.insertOne(post);
            return post_helper_1.postHelper.mapPostToView(post);
        });
    },
    createPostForBlog(post) {
        return __awaiter(this, void 0, void 0, function* () {
            yield db_1.postsCollection.insertOne(post);
            return post_helper_1.postHelper.mapPostToView(post);
        });
    },
    changePost(id, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const post = yield db_1.postsCollection.updateOne({ _id: id }, { $set: {
                    title: payload.title,
                    shortDescription: payload.shortDescription,
                    blogId: payload.blogId,
                    content: payload.content
                } });
            return post.matchedCount === 1;
        });
    },
    deletePost(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield db_1.postsCollection.deleteOne({ _id: new mongodb_1.ObjectId(id) });
            return res.deletedCount === 1;
        });
    },
    deleteAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield db_1.postsCollection.deleteMany({});
            return res.deletedCount > 0;
        });
    }
};
