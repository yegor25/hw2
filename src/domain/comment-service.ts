import { ObjectId } from "mongodb"
import { QueryPostRepository } from "../repositories/query/query-PostRepository"
import { CommentDbModelType, CommentViewModelType } from "../types/comment-type"
import { userDbType } from "../types/user-type"
import { commentHelper } from "../repositories/helpers/comments-helper"
import { comentsRepository } from "../repositories/mutation/comments-repository"

const convertId = (id: string) => new ObjectId(id)
export const commentService = {
    async createComment(postId: string,content:string,user:userDbType):Promise<CommentViewModelType | null>{
        const post = await QueryPostRepository.findPostById(postId)
        if(!post){
            return null
        }
        
        const newComment:CommentDbModelType = {
            _id: new ObjectId(),
            content,
            commentatorInfo: {
                userId: user._id.toString(),
                userLogin: user.login
            },
            createdAt: new Date().toISOString()
        }
        return commentHelper.commentsMapper(newComment)
    },
    async deleteComment (id: string,userId: string):Promise<boolean>{
        return comentsRepository.deleteComments(convertId(id), userId)
    },
    async updateComment (id: string,userId: string, content: string):Promise<boolean>{
        return comentsRepository.updateComment(convertId(id), userId,content)
    },
}