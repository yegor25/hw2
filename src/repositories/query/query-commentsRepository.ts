import { ObjectId } from "mongodb"
import { CommentsModel } from "../../db"
import { CommentDbModelType, CommentViewModelType, viewAllCommentsType } from "../../types/comment-type"
import { commentHelper } from "../helpers/comments-helper"
import { paginatorType, paramsCommentsPaginatorType } from "../../types/paginator-type"
import { paginatorHelper } from "../helpers/paginator-helper"
import { LikeStatus } from "../../types/like-type"
import { HydratedDocument } from "mongoose"
import { commentMethodsType } from "../../types/db-schemas/Comments"


const convertId = (id: string) => new ObjectId(id)


// export const QueryCommentsRepository = {
//     async getCommentsById(id: string, userId: string | undefined):Promise<CommentViewModelType | null>{
//         const res:HydratedDocument<CommentDbModelType,commentMethodsType> | null = await CommentsModel.findOne({_id: convertId(id)})
//         if(!res) return null
//         const likeInfo = userId ? res.getLikesInfo(userId) : res.getLikesInfoForUnauth()
//         return commentHelper.commentsMapper(res, likeInfo)
//     },
//     async getCommentModelById(id: string){
//         return CommentsModel.findById(id)
//     },
    
//     async getComments(params: paramsCommentsPaginatorType,postId: string, userId: string | undefined):Promise<viewAllCommentsType>{
//         const parametres = paginatorHelper.commentsParamsMapper(params)
//         const filter  = {postId}
//         const skipCount = (parametres.pageNumber - 1) * parametres.pageSize
//         const data:HydratedDocument<CommentDbModelType, commentMethodsType>[] = await CommentsModel.find(filter)
//             .sort({[parametres.sortBy]: parametres.sortDirection})
//             .skip(skipCount)
//             .limit(parametres.pageSize)
            
            
            
//             const totalCount = await CommentsModel.countDocuments(filter)
//            console.log("user", userId)
//             return {
//                 pagesCount:Math.ceil(totalCount/+parametres.pageSize),
//                 page: +parametres.pageNumber,
//                 pageSize: +parametres.pageSize,
//                 totalCount,
//                 items: data.map(el => commentHelper.commentsMapper(el, userId ? el.getLikesInfo(userId) : el.getLikesInfoForUnauth()))
//             }
//     }
// }

class queryCommentsRepository {
    async getCommentsById(id: string, userId: string | undefined):Promise<CommentViewModelType | null>{
        const res:HydratedDocument<CommentDbModelType,commentMethodsType> | null = await CommentsModel.findOne({_id: convertId(id)})
        if(!res) return null
        const likeInfo = userId ? res.getLikesInfo(userId) : res.getLikesInfoForUnauth()
        return commentHelper.commentsMapper(res, likeInfo)
    }
    async getCommentModelById(id: string){
        return CommentsModel.findById(id)
    }
    
    async getComments(params: paramsCommentsPaginatorType,postId: string, userId: string | undefined):Promise<viewAllCommentsType>{
        const parametres = paginatorHelper.commentsParamsMapper(params)
        const filter  = {postId}
        const skipCount = (parametres.pageNumber - 1) * parametres.pageSize
        const data:HydratedDocument<CommentDbModelType, commentMethodsType>[] = await CommentsModel.find(filter)
            .sort({[parametres.sortBy]: parametres.sortDirection})
            .skip(skipCount)
            .limit(parametres.pageSize)
            
            
            
            const totalCount = await CommentsModel.countDocuments(filter)
           console.log("user", userId)
            return {
                pagesCount:Math.ceil(totalCount/+parametres.pageSize),
                page: +parametres.pageNumber,
                pageSize: +parametres.pageSize,
                totalCount,
                items: data.map(el => commentHelper.commentsMapper(el, userId ? el.getLikesInfo(userId) : el.getLikesInfoForUnauth()))
            }
    }
}

export const QueryCommentsRepository = new queryCommentsRepository()
