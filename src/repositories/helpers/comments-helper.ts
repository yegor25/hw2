import { CommentDbModelType, CommentViewModelType } from "../../types/comment-type";



export const commentHelper = {
    commentsMapper(comment: CommentDbModelType): CommentViewModelType{
        return {
            id: comment._id.toString(),
            content: comment.content,
            commentatorInfo: comment.commentatorInfo,
            createdAt: comment.createdAt
        }
    }
}