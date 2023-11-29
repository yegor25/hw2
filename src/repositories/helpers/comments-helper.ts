import { CommentDbModelType, CommentViewModelType, likeInfoType } from "../../types/comment-type";
import { LikeStatus } from "../../types/like-type";



export const commentHelper = {
    commentsMapper(comment: CommentDbModelType, likeInfo: likeInfoType): CommentViewModelType{
        
        return {
            id: comment._id.toString(),
            content: comment.content,
            commentatorInfo: comment.commentatorInfo,
            createdAt: comment.createdAt,
            likesInfo: likeInfo
            
        }
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
}