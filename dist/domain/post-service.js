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
const query_PostRepository_1 = require("../repositories/query/query-PostRepository");
const convertID = (id) => new mongodb_1.ObjectId(id);
// export const postService = {
//     async createPost(post:postBodyType){
//         const blog = await QueryBlogRepositiry.findBlogById(post.blogId)
//         if(!blog) return null
//         const newPost:PostDbType = {
//             _id: new ObjectId(),
//             blogName: blog.name ,
//             createdAt: new Date().toISOString(),
//             ...post
//         }
//         return await postRepository.createPost(newPost)
//     },
//     async createPostForBlog(post:postBodyTypeForBlog,id: string){
//         const blog = await QueryBlogRepositiry.findBlogById(id)
//         if(!blog) return null
//         const newPost:PostDbType = {
//             _id: new ObjectId(),
//             blogName: blog.name ,
//             blogId: id,
//             createdAt: new Date().toISOString(),
//             ...post
//         }
//         return await postRepository.createPost(newPost)
//     },
//     async changePost(id: string, payload:postBodyType){
//         return postRepository.changePost(convertID(id), payload)
//     },
//     async deletePost(id: string){
//         return await postRepository.deletePost(convertID(id))
//     },
//     async deleteAllPosts(){
//         return await postRepository.deleteAll()
//     }
// }
class PostService {
    createPost(post) {
        return __awaiter(this, void 0, void 0, function* () {
            const blog = yield query_BlogsRepository_1.QueryBlogRepositiry.findBlogById(post.blogId);
            if (!blog)
                return null;
            const newPost = Object.assign({ _id: new mongodb_1.ObjectId(), blogName: blog.name, createdAt: new Date().toISOString(), likesPost: [] }, post);
            return yield post_repository_1.postRepository.createPost(newPost);
        });
    }
    createPostForBlog(post, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const blog = yield query_BlogsRepository_1.QueryBlogRepositiry.findBlogById(id);
            if (!blog)
                return null;
            const newPost = Object.assign({ _id: new mongodb_1.ObjectId(), blogName: blog.name, blogId: id, createdAt: new Date().toISOString(), likesPost: [] }, post);
            return yield post_repository_1.postRepository.createPost(newPost);
        });
    }
    changePost(id, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            return post_repository_1.postRepository.changePost(convertID(id), payload);
        });
    }
    deletePost(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield post_repository_1.postRepository.deletePost(convertID(id));
        });
    }
    deleteAllPosts() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield post_repository_1.postRepository.deleteAll();
        });
    }
    updateLikeStatus(likeStatus, userId, postIdId) {
        return __awaiter(this, void 0, void 0, function* () {
            const post = yield query_PostRepository_1.QueryPostRepository.findModelPostById(postIdId);
            post === null || post === void 0 ? void 0 : post.changeLikeStatus(userId, likeStatus);
            yield (post === null || post === void 0 ? void 0 : post.save());
            return true;
        });
    }
}
exports.postService = new PostService();
