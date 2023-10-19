import { ObjectId } from "mongodb"
import { commentsCollection } from "../../db"
import { CommentViewModelType, viewAllCommentsType } from "../../types/comment-type"
import { commentHelper } from "../helpers/comments-helper"
import { paginatorType, paramsCommentsPaginatorType } from "../../types/paginator-type"
import { paginatorHelper } from "../helpers/paginator-helper"


const convertId = (id: string) => new ObjectId(id)


export const QueryCommentsRepository = {
    async getCommentsById(id: string):Promise<CommentViewModelType | null>{
        const res = await commentsCollection.findOne({_id: convertId(id)})
        if(!res) return null
        return commentHelper.commentsMapper(res)
    },
    async getComments(params: paramsCommentsPaginatorType):Promise<viewAllCommentsType>{
        const parametres = paginatorHelper.commentsParamsMapper(params)
        console.log("params", parametres)
        const skipCount = (parametres.pageNumber - 1) * parametres.pageSize
        const data = await commentsCollection.find({})
            .sort({[parametres.sortBy]: parametres.sortDirection})
            .skip(skipCount)
            .limit(parametres.pageSize)
            .toArray()
            const totalCount = await commentsCollection.countDocuments({})
            return {
                pagesCount:Math.ceil(totalCount/+parametres.pageSize),
                page: +parametres.pageNumber,
                pageSize: +parametres.pageSize,
                totalCount,
                items: commentHelper.commentsArrayMapper(data)
            }
    }
}
