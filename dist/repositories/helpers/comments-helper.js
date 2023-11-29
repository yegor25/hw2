"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentHelper = void 0;
exports.commentHelper = {
    commentsMapper(comment, likeInfo) {
        return {
            id: comment._id.toString(),
            content: comment.content,
            commentatorInfo: comment.commentatorInfo,
            createdAt: comment.createdAt,
            likesInfo: likeInfo
        };
    },
    // commentsArrayMapper(comments: CommentDbModelType[]): CommentViewModelType[]  {
    //     const res:CommentViewModelType[] = comments.map(el => ({
    //         id: el._id.toString(),
    //         content: el.content,
    //         commentatorInfo: el.commentatorInfo,
    //         createdAt: el.createdAt,
    //     }))
    //     return res
    // }
};
