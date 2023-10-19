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
exports.comentsRepository = void 0;
const db_1 = require("../../db");
const comments_helper_1 = require("../helpers/comments-helper");
exports.comentsRepository = {
    createComment(comment) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield db_1.commentsCollection.insertOne(comment);
            return comments_helper_1.commentHelper.commentsMapper(comment);
        });
    },
    deleteComments(id, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const comment = yield db_1.commentsCollection.findOne({ _id: id });
            if ((comment === null || comment === void 0 ? void 0 : comment.commentatorInfo.userId) !== userId) {
                return false;
            }
            const res = yield db_1.commentsCollection.deleteOne({ _id: id });
            return res.deletedCount === 1;
        });
    },
    updateComment(id, userId, content) {
        return __awaiter(this, void 0, void 0, function* () {
            const comment = yield db_1.commentsCollection.findOne({ _id: id });
            if ((comment === null || comment === void 0 ? void 0 : comment.commentatorInfo.userId) !== userId) {
                return false;
            }
            const res = yield db_1.commentsCollection.updateOne({ _id: id }, { $set: { content: content } });
            return res.matchedCount === 1;
        });
    }
};
