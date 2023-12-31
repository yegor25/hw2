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
const mongodb_1 = require("mongodb");
const post_helper_1 = require("../helpers/post-helper");
const db_1 = require("../../db");
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
// export const postRepository = {
//     async createPost(post: PostDbType): Promise<postType> {
//         await PostModel.create(post)
//         return postHelper.mapPostToView(post)
//     },
//     async createPostForBlog(post: PostDbType): Promise<postType | null> {
//         try {
//             await PostModel.create(post)
//         return postHelper.mapPostToView(post)
//         } catch (error) {
//             console.log("post error", error)
//             return null
//         }
//     },
//     async changePost(id: ObjectId, payload: postBodyType):Promise<boolean> {
//         const post = await PostModel.updateOne(
//             {_id: id},
//             {$set: {
//                 title: payload.title,
//                 shortDescription: payload.shortDescription,
//                 blogId: payload.blogId,
//                 content: payload.content
//             }}
//             )
//             return post.matchedCount === 1
//     },
//     async deletePost(id: ObjectId):Promise<boolean> {
//        const res = await PostModel.deleteOne({_id: new ObjectId(id)})
//        return res.deletedCount === 1
//     },
//     async deleteAll():Promise<void> {
//         try {
//             const res = await PostModel.deleteMany({})
//         return
//         } catch (error) {
//         }
//     }
// }
class PostRepository {
    createPost(post) {
        return __awaiter(this, void 0, void 0, function* () {
            const newPost = yield db_1.PostModel.create(post);
            const likeInfo = db_1.LikePostsNewest.getDefaultLikes();
            return post_helper_1.postHelper.mapPostToView(post, likeInfo);
        });
    }
    createPostForBlog(post) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newPost = yield db_1.PostModel.create(post);
                const likeInfo = db_1.LikePostsNewest.getDefaultLikes();
                return post_helper_1.postHelper.mapPostToView(post, likeInfo);
            }
            catch (error) {
                return null;
            }
        });
    }
    changePost(id, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const post = yield db_1.PostModel.updateOne({ _id: id }, {
                $set: {
                    title: payload.title,
                    shortDescription: payload.shortDescription,
                    blogId: payload.blogId,
                    content: payload.content
                }
            });
            return post.matchedCount === 1;
        });
    }
    deletePost(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield db_1.PostModel.deleteOne({ _id: new mongodb_1.ObjectId(id) });
            return res.deletedCount === 1;
        });
    }
    deleteAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const res = yield db_1.PostModel.deleteMany({});
                return;
            }
            catch (error) {
            }
        });
    }
}
exports.postRepository = new PostRepository();
