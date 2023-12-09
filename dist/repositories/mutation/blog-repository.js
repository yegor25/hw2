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
exports.blogsRepository = void 0;
const mongodb_1 = require("mongodb");
const blog_helper_1 = require("../helpers/blog-helper");
const db_1 = require("../../db");
// export const blogsRepository = {
//    async createBlog(blog: blogDbType):Promise<blogType> {
//         await BlogModel.create(blog)
//         return blogHelper.convertDTO(blog)
//     },
//     async changeBlog(id: ObjectId, payload: bodyBlogType):Promise<boolean> {
//         const blog = await BlogModel.updateOne(
//             {_id: id},
//             {$set: {
//                 name: payload.name,
//                 websiteUrl: payload.websiteUrl,
//                 description: payload.description
//             }}
//         )
//         return blog.matchedCount === 1
//     },
//    async deleteBlog(id: ObjectId):Promise<boolean> {
//         const res = await BlogModel.deleteOne({_id: new ObjectId(id)})
//         return res.deletedCount === 1
//     },
//     async deleteAll(): Promise<boolean>{
//        const res = await BlogModel.deleteMany({})
//        return res.deletedCount > 0
//     }
// }
class BlogRepository {
    createBlog(blog) {
        return __awaiter(this, void 0, void 0, function* () {
            yield db_1.BlogModel.create(blog);
            return blog_helper_1.blogHelper.convertDTO(blog);
        });
    }
    changeBlog(id, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const blog = yield db_1.BlogModel.updateOne({ _id: id }, { $set: {
                    name: payload.name,
                    websiteUrl: payload.websiteUrl,
                    description: payload.description
                } });
            return blog.matchedCount === 1;
        });
    }
    deleteBlog(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield db_1.BlogModel.deleteOne({ _id: new mongodb_1.ObjectId(id) });
            return res.deletedCount === 1;
        });
    }
    deleteAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield db_1.BlogModel.deleteMany({});
            return res.deletedCount > 0;
        });
    }
}
exports.blogsRepository = new BlogRepository();
