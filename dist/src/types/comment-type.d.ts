import { ObjectId } from "mongodb";
import { paginatorType } from "./paginator-type";
import { LikeStatus, commentsLikeType } from "./like-type";
export type CommentInputModelType = {
    content: string;
};
export type commentatorInfoType = {
    userId: string;
    userLogin: string;
};
export type CommentViewModelType = {
    id: string;
    content: string;
    commentatorInfo: commentatorInfoType;
    createdAt: string;
    likesInfo: likeInfoType;
};
export type CommentDbModelType = {
    _id: ObjectId;
    content: string;
    commentatorInfo: commentatorInfoType;
    createdAt: string;
    postId: string;
    likeComments: commentsLikeType[];
};
export type viewAllCommentsType = paginatorType & {
    items: CommentViewModelType[];
};
export type likeInfoType = {
    likesCount: number;
    dislikesCount: number;
    myStatus: LikeStatus;
};
