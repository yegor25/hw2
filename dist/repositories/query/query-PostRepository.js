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
exports.QueryPostRepository = void 0;
const mongodb_1 = require("mongodb");
const db_1 = require("../../db");
const post_helper_1 = require("../helpers/post-helper");
const paginator_helper_1 = require("../helpers/paginator-helper");
const query_BlogsRepository_1 = require("./query-BlogsRepository");
const convertId = (id) => new mongodb_1.ObjectId(id);
exports.QueryPostRepository = {
    findPosts(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const parametres = paginator_helper_1.paginatorHelper.postParamsMapper(params);
            const skipcount = (parametres.pageNumber - 1) * parametres.pageSize;
            const res = yield db_1.postsCollection.find({})
                .sort({ [parametres.sortBy]: parametres.sortDirection })
                .skip(skipcount)
                .limit(parametres.pageSize)
                .toArray();
            const totalCount = yield db_1.postsCollection.countDocuments({});
            return {
                pagesCount: Math.ceil(totalCount / +parametres.pageSize),
                page: parametres.pageNumber,
                pageSize: parametres.pageSize,
                totalCount,
                items: post_helper_1.postHelper.convertArrayDTO(res)
            };
        });
    },
    findPostsByBlogId(id, params) {
        return __awaiter(this, void 0, void 0, function* () {
            const blog = yield query_BlogsRepository_1.QueryBlogRepositiry.findBlogById(id);
            if (!blog) {
                return null;
            }
            const parametres = paginator_helper_1.paginatorHelper.postParamsMapper(params);
            const skipcount = (parametres.pageNumber - 1) * parametres.pageSize;
            const res = yield db_1.postsCollection.find({ blogId: id })
                .sort({ [parametres.sortBy]: parametres.sortDirection })
                .skip(skipcount)
                .limit(parametres.pageSize)
                .toArray();
            return post_helper_1.postHelper.convertArrayDTO(res);
        });
    },
    findPostById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const post = yield db_1.postsCollection.findOne({ _id: convertId(id) });
            if (!post)
                return null;
            return post_helper_1.postHelper.mapPostToView(post);
        });
    },
};
