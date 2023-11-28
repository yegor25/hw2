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
const post_helper_1 = require("../helpers/post-helper");
const paginator_helper_1 = require("../helpers/paginator-helper");
const query_BlogsRepository_1 = require("./query-BlogsRepository");
const db_1 = require("../../db");
const convertId = (id) => new mongodb_1.ObjectId(id);
// const fun = <T>(params:T): T[] => {}
exports.QueryPostRepository = {
    findPosts(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const parametres = paginator_helper_1.paginatorHelper.postParamsMapper(params);
            const skipcount = (parametres.pageNumber - 1) * parametres.pageSize;
            const res = yield db_1.PostModel.find({}).lean()
                .sort({ [parametres.sortBy]: parametres.sortDirection })
                .skip(skipcount)
                .limit(parametres.pageSize);
            const totalCount = yield db_1.PostModel.countDocuments({});
            return {
                pagesCount: Math.ceil(totalCount / +parametres.pageSize),
                page: +parametres.pageNumber,
                pageSize: +parametres.pageSize,
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
            const res = yield db_1.PostModel.find({ blogId: id }).lean()
                .sort({ [parametres.sortBy]: parametres.sortDirection })
                .skip(skipcount)
                .limit(parametres.pageSize);
            const totalCount = yield db_1.PostModel.countDocuments({ blogId: id });
            return {
                pagesCount: Math.ceil(totalCount / +parametres.pageSize),
                page: +parametres.pageNumber,
                pageSize: +parametres.pageSize,
                totalCount,
                items: post_helper_1.postHelper.convertArrayDTO(res)
            };
        });
    },
    findPostById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const post = yield db_1.PostModel.findOne({ _id: convertId(id) });
            if (!post)
                return null;
            return post_helper_1.postHelper.mapPostToView(post);
        });
    },
};
