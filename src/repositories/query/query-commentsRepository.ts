import { ObjectId } from "mongodb"
import { CommentsModel } from "../../db"
import { CommentViewModelType, viewAllCommentsType } from "../../types/comment-type"
import { commentHelper } from "../helpers/comments-helper"
import { paginatorType, paramsCommentsPaginatorType } from "../../types/paginator-type"
import { paginatorHelper } from "../helpers/paginator-helper"
import { LikeStatus } from "../../types/like-type"


const convertId = (id: string) => new ObjectId(id)


export const QueryCommentsRepository = {
    async getCommentsById(id: string):Promise<CommentViewModelType | null>{
        const res = await CommentsModel.findOne({_id: convertId(id)})
        if(!res) return null
        const likeInfo = res.getLikesInfo(res.commentatorInfo.userId)
        return commentHelper.commentsMapper(res, likeInfo)
    },
    async getCommentModelById(id: string){
        return CommentsModel.findById(id)
    },
    
    async getComments(params: paramsCommentsPaginatorType,postId: string):Promise<viewAllCommentsType>{
        const parametres = paginatorHelper.commentsParamsMapper(params)
        const filter  = {postId}
        const skipCount = (parametres.pageNumber - 1) * parametres.pageSize
        const data = await CommentsModel.find(filter)
            .sort({[parametres.sortBy]: parametres.sortDirection})
            .skip(skipCount)
            .limit(parametres.pageSize)
            .lean()
            
            
            const totalCount = await CommentsModel.countDocuments(filter)

            return {
                pagesCount:Math.ceil(totalCount/+parametres.pageSize),
                page: +parametres.pageNumber,
                pageSize: +parametres.pageSize,
                totalCount,
                items: data.map(el => commentHelper.commentsMapper(el, {likesCount: 0, dislikesCount: 0,myStatus: LikeStatus.None}))
            }
    }
}
