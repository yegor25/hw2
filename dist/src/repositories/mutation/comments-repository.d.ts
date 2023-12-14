import { ObjectId } from "mongodb";
import { CommentDbModelType, CommentViewModelType } from "../../types/comment-type";
declare class CommentsRepository {
    createComment(comment: CommentDbModelType): Promise<CommentViewModelType>;
    deleteComments(id: ObjectId, userId: string): Promise<boolean>;
    updateComment(id: ObjectId, userId: string, content: string): Promise<boolean>;
    deleteAll(): Promise<boolean>;
}
export declare const commentsRepository: CommentsRepository;
export {};
