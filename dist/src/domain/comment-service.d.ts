import { CommentViewModelType } from "../types/comment-type";
import { userDbType } from "../types/user-type";
import { LikeStatus } from "../types/like-type";
declare class CommentService {
    createComment(postId: string, content: string, user: userDbType): Promise<CommentViewModelType | null>;
    deleteComment(id: string, userId: string): Promise<boolean>;
    updateComment(id: string, userId: string, content: string): Promise<boolean>;
    deleteAllComments(): Promise<boolean>;
    updateLikeStatus(likeStatus: LikeStatus, userId: string, commentId: string): Promise<boolean>;
}
export declare const commentService: CommentService;
export {};
