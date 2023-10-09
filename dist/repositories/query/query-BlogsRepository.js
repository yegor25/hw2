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
exports.QueryBlogRepositiry = void 0;
const mongodb_1 = require("mongodb");
const db_1 = require("../../db");
const blog_helper_1 = require("../helpers/blog-helper");
const paginator_helper_1 = require("../helpers/paginator-helper");
const convertID = (id) => new mongodb_1.ObjectId(id);
exports.QueryBlogRepositiry = {
    findBlogs(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const parametres = paginator_helper_1.paginatorHelper.blogsParamsMapper(params);
            const skipCount = (parametres.pageNumber - 1) * parametres.pageSize;
            const blogs = yield db_1.blogCollection.find({
                name: { $regex: parametres.searchNameTerm, $options: "i" }
            })
                .sort({ [parametres.sortBy]: parametres.sortDirection })
                .skip(skipCount)
                .limit(parametres.pageSize)
                .toArray();
            // const blogs = await blogCollection.find({}).toArray()
            console.log("dsd", Math.ceil(blogs.length / parametres.pageSize));
            return {
                pagesCount: Math.ceil(blogs.length / parametres.pageSize),
                page: parametres.pageNumber,
                pageSize: parametres.pageSize,
                totalCount: blogs.length,
                items: blog_helper_1.blogHelper.convertArrayDTO(blogs)
            };
        });
    },
    findBlogById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const blog = yield db_1.blogCollection.findOne({ _id: convertID(id) });
            if (!blog) {
                return null;
            }
            return blog_helper_1.blogHelper.convertDTO(blog);
        });
    },
};
