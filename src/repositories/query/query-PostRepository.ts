import { ObjectId } from "mongodb"
import { blogCollection, postsCollection } from "../../db"
import { PostDbType, postType } from "../../types/post-type"
import { postHelper } from "../helpers/post-helper"
import { paramsPostPaginatorType } from "../../types/paginator-type"
import { paginatorHelper } from "../helpers/paginator-helper"
import { QueryBlogRepositiry } from "./query-BlogsRepository"


const convertId = (id: string) => new ObjectId(id)

export const QueryPostRepository = {
   
    async findPosts(params: paramsPostPaginatorType):Promise<postType[]> {
        const parametres = paginatorHelper.postParamsMapper(params)
        const skipcount = (parametres.pageNumber - 1) * parametres.pageSize
        const res = await postsCollection.find({})
        .sort({[parametres.sortBy] : parametres.sortDirection})
        .skip(skipcount)
        .limit(parametres.pageSize)
        .toArray()
        return postHelper.convertArrayDTO(res)
     },
    async findPostsByBlogId(id: string, params: paramsPostPaginatorType):Promise<postType[] | null> {
        const blog = await QueryBlogRepositiry.findBlogById(id)
        if(!blog){
            return null
        }
        const parametres = paginatorHelper.postParamsMapper(params)
        const skipcount = (parametres.pageNumber - 1) * parametres.pageSize
        const res = await postsCollection.find({blogId: id})
        .sort({[parametres.sortBy] : parametres.sortDirection})
        .skip(skipcount)
        .limit(parametres.pageSize)
        .toArray()
        return postHelper.convertArrayDTO(res)
     },
     async findPostById(id: string): Promise<postType | null>  {
        
        const post = await postsCollection.findOne({_id: convertId(id)})
        if(!post) return null
        return postHelper.mapPostToView(post)
    },
}