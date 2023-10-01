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
const db_1 = require("../db");
const blog_repository_1 = require("./blog-repository");
const mongodb_1 = require("mongodb");
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
const mapPostToView = (post) => {
    return {
        id: post._id.toString(),
        title: post.title,
        shortDescription: post.shortDescription,
        content: post.content,
        blogId: post.blogId,
        blogName: post.blogName,
    };
};
const convertArrayDTO = (posts) => {
    const data = posts.map(el => ({
        id: el._id.toString(),
        title: el.title,
        shortDescription: el.shortDescription,
        content: el.content,
        blogId: el.blogId,
        blogName: el.blogName
    }));
    return data;
};
exports.postRepository = {
    findPosts() {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield db_1.postsCollection.find({}).toArray();
            return convertArrayDTO(res);
        });
    },
    createPost(post) {
        return __awaiter(this, void 0, void 0, function* () {
            const blog = yield blog_repository_1.blogsRepository.findBlogById(post.blogId);
            if (!blog) {
                return null;
            }
            const newPost = Object.assign({ _id: new mongodb_1.ObjectId(), blogName: blog.name }, post);
            yield db_1.postsCollection.insertOne(newPost);
            return mapPostToView(newPost);
        });
    },
    findPostById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            // const post = posts.find(el => el.id === id)
            // return post
            if (!mongodb_1.ObjectId.isValid(id))
                return null;
            const post = yield db_1.postsCollection.findOne({ _id: new mongodb_1.ObjectId(id) });
            if (!post)
                return null;
            return mapPostToView(post);
        });
    },
    changePost(id, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const post = yield db_1.postsCollection.updateOne({ _id: new mongodb_1.ObjectId(id) }, { $set: {
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
