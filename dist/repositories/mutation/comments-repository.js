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
exports.commentsRepository = void 0;
const db_1 = require("../../db");
const comments_helper_1 = require("../helpers/comments-helper");
// export const comentsRepository = {
//     async createComment(comment: CommentDbModelType): Promise<CommentViewModelType> {
//         const res = await CommentsModel.create(comment)
//         const likeInfo = res.getDefaultLikeInfo()
//         return commentHelper.commentsMapper(comment, likeInfo)
//     },
//     async deleteComments(id: ObjectId, userId: string): Promise<boolean> {
//         const comment = await CommentsModel.findOne({ _id: id })
//         if (comment?.commentatorInfo.userId !== userId) {
//             return false
//         }
//         const res = await CommentsModel.deleteOne({ _id: id })
//         return res.deletedCount === 1
//     },
//     async updateComment(id: ObjectId, userId: string, content: string): Promise<boolean> {
//         const comment = await CommentsModel.findOne({ _id: id })
//         if (comment?.commentatorInfo.userId !== userId) {
//             return false
//         }
//         const res = await CommentsModel.updateOne({ _id: id }, { $set: { content: content } })
//         return res.matchedCount === 1
//     },
//     async deleteAll(): Promise<boolean> {
//         const res = await CommentsModel.deleteMany({})
//         return res.deletedCount > 0
//     }
// }
class CommentsRepository {
    createComment(comment) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield db_1.CommentsModel.create(comment);
            const likeInfo = res.getDefaultLikeInfo();
            return comments_helper_1.commentHelper.commentsMapper(comment, likeInfo);
        });
    }
    deleteComments(id, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const comment = yield db_1.CommentsModel.findOne({ _id: id });
            if ((comment === null || comment === void 0 ? void 0 : comment.commentatorInfo.userId) !== userId) {
                return false;
            }
            const res = yield db_1.CommentsModel.deleteOne({ _id: id });
            return res.deletedCount === 1;
        });
    }
    updateComment(id, userId, content) {
        return __awaiter(this, void 0, void 0, function* () {
            const comment = yield db_1.CommentsModel.findOne({ _id: id });
            if ((comment === null || comment === void 0 ? void 0 : comment.commentatorInfo.userId) !== userId) {
                return false;
            }
            const res = yield db_1.CommentsModel.updateOne({ _id: id }, { $set: { content: content } });
            return res.matchedCount === 1;
        });
    }
    deleteAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield db_1.CommentsModel.deleteMany({});
            return res.deletedCount > 0;
        });
    }
}
exports.commentsRepository = new CommentsRepository();
