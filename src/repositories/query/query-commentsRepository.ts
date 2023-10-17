import { ObjectId } from "mongodb"
import { commentsCollection } from "../../db"
import { CommentViewModelType } from "../../types/comment-type"
import { commentHelper } from "../helpers/comments-helper"


const convertId = (id: string) => new ObjectId(id)


export const QueryCommentsRepository = {
    async getCommentsById(id: string):Promise<CommentViewModelType | null>{
        const res = await commentsCollection.findOne({_id: convertId(id)})
        if(!res) return null
        return commentHelper.commentsMapper(res)
    }
}
