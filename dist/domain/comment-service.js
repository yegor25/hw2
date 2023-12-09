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
const comments_repository_1 = require("../repositories/mutation/comments-repository");
const query_commentsRepository_1 = require("../repositories/query/query-commentsRepository");
const convertId = (id) => new mongodb_1.ObjectId(id);
// export const commentService = {
//     async createComment(postId: string, content: string, user: userDbType): Promise<CommentViewModelType | null> {
//         const post = await QueryPostRepository.findPostById(postId)
//         if (!post) {
//             return null
//         }
//         const newComment: CommentDbModelType = {
//             _id: new ObjectId(),
//             content,
//             postId,
//             commentatorInfo: {
//                 userId: user._id.toString(),
//                 userLogin: user.login
//             },
//             likeComments: [],
//             createdAt: new Date().toISOString()
//         }
//         return  commentsRepository.createComment(newComment)
//     },
//     async deleteComment(id: string, userId: string): Promise<boolean> {
//         return commentsRepository.deleteComments(convertId(id), userId)
//     },
//     async updateComment(id: string, userId: string, content: string): Promise<boolean> {
//         return commentsRepository.updateComment(convertId(id), userId, content)
//     },
//     async deleteAllComments():Promise<boolean>{
//         return commentsRepository.deleteAll()
//     },
//     async updateLikeStatus(likeStatus: LikeStatus, userId: string, commentId: string):Promise<boolean>{
//         const comment = await QueryCommentsRepository.getCommentModelById(commentId)
//         comment?.changeLikeStatus(userId, likeStatus)
//         await comment?.save()
//         return true
//     }
// }
class CommentService {
    createComment(postId, content, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const post = yield query_PostRepository_1.QueryPostRepository.findPostById(postId);
            if (!post) {
                return null;
            }
            const newComment = {
                _id: new mongodb_1.ObjectId(),
                content,
                postId,
                commentatorInfo: {
                    userId: user._id.toString(),
                    userLogin: user.login
                },
                likeComments: [],
                createdAt: new Date().toISOString()
            };
            return comments_repository_1.commentsRepository.createComment(newComment);
        });
    }
    deleteComment(id, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return comments_repository_1.commentsRepository.deleteComments(convertId(id), userId);
        });
    }
    updateComment(id, userId, content) {
        return __awaiter(this, void 0, void 0, function* () {
            return comments_repository_1.commentsRepository.updateComment(convertId(id), userId, content);
        });
    }
    deleteAllComments() {
        return __awaiter(this, void 0, void 0, function* () {
            return comments_repository_1.commentsRepository.deleteAll();
        });
    }
    updateLikeStatus(likeStatus, userId, commentId) {
        return __awaiter(this, void 0, void 0, function* () {
            const comment = yield query_commentsRepository_1.QueryCommentsRepository.getCommentModelById(commentId);
            comment === null || comment === void 0 ? void 0 : comment.changeLikeStatus(userId, likeStatus);
            yield (comment === null || comment === void 0 ? void 0 : comment.save());
            return true;
        });
    }
}
exports.commentService = new CommentService();
