import { ObjectId } from "mongodb"
import { QueryPostRepository } from "../repositories/query/query-PostRepository"
import { CommentDbModelType, CommentViewModelType } from "../types/comment-type"
import { userDbType } from "../types/user-type"
import { commentHelper } from "../repositories/helpers/comments-helper"
import { comentsRepository } from "../repositories/mutation/comments-repository"
import { LikeStatus } from "../types/like-type"
import { QueryCommentsRepository } from "../repositories/query/query-commentsRepository"

const convertId = (id: string) => new ObjectId(id)
export const commentService = {
    async createComment(postId: string, content: string, user: userDbType): Promise<CommentViewModelType | null> {
        const post = await QueryPostRepository.findPostById(postId)
        if (!post) {
            return null
        }

        const newComment: CommentDbModelType = {
            _id: new ObjectId(),
            content,
            postId,
            commentatorInfo: {
                userId: user._id.toString(),
                userLogin: user.login
            },
            likeComments: [],
            createdAt: new Date().toISOString()
        }
        return  comentsRepository.createComment(newComment)
    },
    async deleteComment(id: string, userId: string): Promise<boolean> {
        return comentsRepository.deleteComments(convertId(id), userId)
    },
    async updateComment(id: string, userId: string, content: string): Promise<boolean> {
        return comentsRepository.updateComment(convertId(id), userId, content)
    },
    async deleteAllComments():Promise<boolean>{
        return comentsRepository.deleteAll()
    },
    async updateLikeStatus(likeStatus: LikeStatus, userId: string, commentId: string):Promise<boolean>{
        const comment = await QueryCommentsRepository.getCommentModelById(commentId)
        comment?.changeLikeStatus(userId, likeStatus,comment.likeComments)
        return true
    }
}