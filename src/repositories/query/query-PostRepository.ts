import { ObjectId } from "mongodb"
import { PostDbType, postType, viewAllPostsType } from "../../types/post-type"
import { postHelper } from "../helpers/post-helper"
import { paramsPostPaginatorType } from "../../types/paginator-type"
import { paginatorHelper } from "../helpers/paginator-helper"
import { QueryBlogRepositiry } from "./query-BlogsRepository"
import { PostModel } from "../../db"


const convertId = (id: string) => new ObjectId(id)

// export const QueryPostRepository = {
   
//     async findPosts(params: paramsPostPaginatorType):Promise<viewAllPostsType> {
//         const parametres = paginatorHelper.postParamsMapper(params)
//         const skipcount = (parametres.pageNumber - 1) * parametres.pageSize
//         const res = await PostModel.find({}).lean()
//         .sort({[parametres.sortBy] : parametres.sortDirection})
//         .skip(skipcount)
//         .limit(parametres.pageSize)
        
//         const totalCount = await PostModel.countDocuments({})

//         return {
//             pagesCount: Math.ceil(totalCount/+parametres.pageSize),
//             page: +parametres.pageNumber,
//             pageSize: +parametres.pageSize,
//             totalCount,
//             items: postHelper.convertArrayDTO(res)
//         } 
//      },
//     async findPostsByBlogId(id: string, params: paramsPostPaginatorType):Promise<viewAllPostsType | null> {
//         const blog = await QueryBlogRepositiry.findBlogById(id)
//         if(!blog){
//             return null
//         }
//         const parametres = paginatorHelper.postParamsMapper(params)
//         const skipcount = (parametres.pageNumber - 1) * parametres.pageSize
//         const res = await PostModel.find({blogId: id}).lean()
//         .sort({[parametres.sortBy] : parametres.sortDirection})
//         .skip(skipcount)
//         .limit(parametres.pageSize)
//         const totalCount = await PostModel.countDocuments({blogId: id})
//         return {
//             pagesCount: Math.ceil(totalCount/+parametres.pageSize),
//             page: +parametres.pageNumber,
//             pageSize: +parametres.pageSize,
//             totalCount,
//             items: postHelper.convertArrayDTO(res)
//         } 
//      },
//      async findPostById(id: string): Promise<postType | null>  {
        
//         const post = await PostModel.findOne({_id: convertId(id)})
//         if(!post) return null
//         return postHelper.mapPostToView(post)
//     },
// }

class queryPostRepository {
    async findPosts(params: paramsPostPaginatorType):Promise<viewAllPostsType> {
        const parametres = paginatorHelper.postParamsMapper(params)
        const skipcount = (parametres.pageNumber - 1) * parametres.pageSize
        const res = await PostModel.find({}).lean()
        .sort({[parametres.sortBy] : parametres.sortDirection})
        .skip(skipcount)
        .limit(parametres.pageSize)
        
        const totalCount = await PostModel.countDocuments()

        return {
            pagesCount: Math.ceil(totalCount/+parametres.pageSize),
            page: +parametres.pageNumber,
            pageSize: +parametres.pageSize,
            totalCount,
            items: postHelper.convertArrayDTO(res)
        } 
     }
    async findPostsByBlogId(id: string, params: paramsPostPaginatorType):Promise<viewAllPostsType | null> {
        const blog = await QueryBlogRepositiry.findBlogById(id)
        if(!blog){
            return null
        }
        const parametres = paginatorHelper.postParamsMapper(params)
        const skipcount = (parametres.pageNumber - 1) * parametres.pageSize
        const res = await PostModel.find({blogId: id}).lean()
        .sort({[parametres.sortBy] : parametres.sortDirection})
        .skip(skipcount)
        .limit(parametres.pageSize)
        const totalCount = await PostModel.countDocuments({blogId: id})
        return {
            pagesCount: Math.ceil(totalCount/+parametres.pageSize),
            page: +parametres.pageNumber,
            pageSize: +parametres.pageSize,
            totalCount,
            items: postHelper.convertArrayDTO(res)
        } 
     }
     async findPostById(id: string): Promise<postType | null>  {
        const post = await PostModel.findOne({_id: convertId(id)})
        if(!post) return null
        return postHelper.mapPostToView(post)
    }
}


export const QueryPostRepository = new queryPostRepository()