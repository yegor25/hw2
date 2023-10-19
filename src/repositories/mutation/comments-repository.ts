import { ObjectId } from "mongodb";
import { CommentDbModelType, CommentViewModelType } from "../../types/comment-type";
import { userDbType } from "../../types/user-type";
import { commentsCollection } from "../../db";
import { commentHelper } from "../helpers/comments-helper";


export const comentsRepository = {
    async createComment(comment: CommentDbModelType):Promise<CommentViewModelType> {
        
       
        const res = await commentsCollection.insertOne(comment)
        return commentHelper.commentsMapper(comment)
    }
}