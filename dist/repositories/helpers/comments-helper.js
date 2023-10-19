"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentHelper = void 0;
exports.commentHelper = {
    commentsMapper(comment) {
        return {
            id: comment._id.toString(),
            content: comment.content,
            commentatorInfo: comment.commentatorInfo,
            createdAt: comment.createdAt
        };
    },
    commentsArrayMapper(comments) {
        const res = comments.map(el => ({
            id: el._id.toString(),
            content: el.content,
            commentatorInfo: {
                userId: el.commentatorInfo.userId,
                userLogin: el.commentatorInfo.userLogin
            },
            createdAt: el.createdAt
        }));
        return res;
    }
};
