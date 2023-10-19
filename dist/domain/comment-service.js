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
exports.commentService = void 0;
const mongodb_1 = require("mongodb");
const query_PostRepository_1 = require("../repositories/query/query-PostRepository");
const comments_helper_1 = require("../repositories/helpers/comments-helper");
exports.commentService = {
    createComment(postId, content, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const post = yield query_PostRepository_1.QueryPostRepository.findPostById(postId);
            if (!post) {
                return null;
            }
            const newComment = {
                _id: new mongodb_1.ObjectId(),
                content,
                commentatorInfo: {
                    userId: user._id.toString(),
                    userLogin: user.login
                },
                createdAt: new Date().toISOString()
            };
            return comments_helper_1.commentHelper.commentsMapper(newComment);
        });
    }
};