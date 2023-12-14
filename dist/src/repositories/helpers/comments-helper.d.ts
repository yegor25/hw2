import { CommentDbModelType, CommentViewModelType, likeInfoType } from "../../types/comment-type";
export declare const commentHelper: {
    commentsMapper(comment: CommentDbModelType, likeInfo: likeInfoType): CommentViewModelType;
};
