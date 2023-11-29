import { ObjectId } from "mongodb";
import { CommentDbModelType, CommentViewModelType } from "../../types/comment-type";
import { userDbType } from "../../types/user-type";
import { CommentsModel } from "../../db";
import { commentHelper } from "../helpers/comments-helper";


export const comentsRepository = {
    async createComment(comment: CommentDbModelType): Promise<CommentViewModelType> {
        const res = await CommentsModel.create(comment)
        const likeInfo = res.getDefaultLikeInfo()
        return commentHelper.commentsMapper(comment, likeInfo)
    },
    async deleteComments(id: ObjectId, userId: string): Promise<boolean> {
        const comment = await CommentsModel.findOne({ _id: id })
        if (comment?.commentatorInfo.userId !== userId) {
            return false
        }
        const res = await CommentsModel.deleteOne({ _id: id })
        return res.deletedCount === 1
    },
    async updateComment(id: ObjectId, userId: string, content: string): Promise<boolean> {
        const comment = await CommentsModel.findOne({ _id: id })
        if (comment?.commentatorInfo.userId !== userId) {
            return false
        }
        const res = await CommentsModel.updateOne({ _id: id }, { $set: { content: content } })
        return res.matchedCount === 1
    },
    async deleteAll(): Promise<boolean> {

        const res = await CommentsModel.deleteMany({})
        return res.deletedCount > 0
    }
}