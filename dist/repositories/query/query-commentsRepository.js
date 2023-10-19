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
exports.QueryCommentsRepository = void 0;
const mongodb_1 = require("mongodb");
const db_1 = require("../../db");
const comments_helper_1 = require("../helpers/comments-helper");
const paginator_helper_1 = require("../helpers/paginator-helper");
const convertId = (id) => new mongodb_1.ObjectId(id);
exports.QueryCommentsRepository = {
    getCommentsById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield db_1.commentsCollection.findOne({ _id: convertId(id) });
            if (!res)
                return null;
            return comments_helper_1.commentHelper.commentsMapper(res);
        });
    },
    getComments(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const parametres = paginator_helper_1.paginatorHelper.commentsParamsMapper(params);
            const skipCount = (parametres.pageNumber - 1) * parametres.pageSize;
            const data = yield db_1.commentsCollection.find({})
                .sort({ [parametres.sortBy]: parametres.sortDirection })
                .skip(skipCount)
                .limit(parametres.pageSize)
                .toArray();
            const totalCount = yield db_1.commentsCollection.countDocuments({});
            return {
                pagesCount: Math.ceil(totalCount / +parametres.pageSize),
                page: +parametres.pageNumber,
                pageSize: +parametres.pageSize,
                totalCount,
                items: comments_helper_1.commentHelper.commentsArrayMapper(data)
            };
        });
    }
};
