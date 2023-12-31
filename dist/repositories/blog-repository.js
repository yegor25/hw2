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
const db_1 = require("../db");
// let blogs: blogType[] = [
//     {
//         id: "1",
//         name: "string",
//         description: "string",
//         websiteUrl: "string"
//     }
// ]
const convertArrayDTO = (data) => {
    const res = data.map((el) => ({
        id: el._id.toString(),
        description: el.description,
        name: el.name,
        websiteUrl: el.websiteUrl,
        isMembership: el.isMembership,
        createdAt: el.createdAt
    }));
    return res;
};
const convertDTO = (data) => {
    return {
        id: data._id.toString(),
        description: data.description,
        name: data.name,
        websiteUrl: data.websiteUrl,
        createdAt: data.createdAt,
        isMembership: data.isMembership
    };
};
exports.blogsRepository = {
    findBlogs() {
        return __awaiter(this, void 0, void 0, function* () {
            const blogs = yield db_1.blogCollection.find({}).toArray();
            return {
                pagesCount: 10,
                page: 1,
                pageSize: 10,
                totalCount: 20,
                items: convertArrayDTO(blogs)
            };
        });
    },
    createBlog(blog) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield db_1.blogCollection.insertOne(blog);
            return convertDTO(blog);
        });
    },
    findBlogById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const blog = yield db_1.blogCollection.findOne({ _id: id });
            if (!blog) {
                return null;
            }
            return convertDTO(blog);
        });
    },
    changeBlog(id, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const blog = yield db_1.blogCollection.updateOne({ _id: id }, { $set: {
                    name: payload.name,
                    websiteUrl: payload.websiteUrl,
                    description: payload.description
                } });
            return blog.matchedCount === 1;
        });
    },
    deleteBlog(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield db_1.blogCollection.deleteOne({ _id: new mongodb_1.ObjectId(id) });
            return res.deletedCount === 1;
        });
    },
    deleteAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield db_1.blogCollection.deleteMany({});
            return res.deletedCount > 0;
        });
    }
};
