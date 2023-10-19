import { CommentDbModelType, CommentViewModelType } from "../../types/comment-type";



export const commentHelper = {
    commentsMapper(comment: CommentDbModelType): CommentViewModelType{
        return {
            id: comment._id.toString(),
            content: comment.content,
            commentatorInfo: comment.commentatorInfo,
            createdAt: comment.createdAt
        }
    },
    commentsArrayMapper(comments: CommentDbModelType[]): CommentViewModelType[]  {
        const res:CommentViewModelType[] = comments.map(el => ({
            id: el._id.toString(),
            content: el.content,
            commentatorInfo: {
                userId: el.commentatorInfo.userId,
                userLogin: el.commentatorInfo.userLogin
            },
            createdAt: el.createdAt
        }))
        return res
    }
}