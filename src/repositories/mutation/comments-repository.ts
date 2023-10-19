import { ObjectId } from "mongodb";
import { CommentDbModelType, CommentViewModelType } from "../../types/comment-type";
import { userDbType } from "../../types/user-type";
import { commentsCollection } from "../../db";
import { commentHelper } from "../helpers/comments-helper";


export const comentsRepository = {
    async createComment(comment: CommentDbModelType):Promise<CommentViewModelType> {
        const res = await commentsCollection.insertOne(comment)
        return commentHelper.commentsMapper(comment)
    },
    async deleteComments(id: ObjectId, userId: string):Promise<boolean>{
        const comment = await commentsCollection.findOne({_id: id})
        if(comment?.commentatorInfo.userId !== userId){
            return false
        }
        const res = await commentsCollection.deleteOne({_id: id})
        return res.deletedCount === 1
    },   
    async updateComment(id: ObjectId, userId: string,content: string):Promise<boolean>{
        const comment = await commentsCollection.findOne({_id: id})
        if(comment?.commentatorInfo.userId !== userId){
            return false
        }
        const res = await commentsCollection.updateOne({_id: id}, {$set: {content:content}})
        return res.matchedCount === 1
    }   
}