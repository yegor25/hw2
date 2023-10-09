import { ObjectId } from "mongodb"
import { blogCollection } from "../../db"
import { blogDbType, blogType, viewAllBlogsType } from "../../types/blog-type"
import { blogHelper } from "../helpers/blog-helper"
import { paramsPaginatorType } from "../../types/paginator-type"
import { paginatorHelper } from "../helpers/paginator-helper"


const convertID = (id: string) => new ObjectId(id)

export const QueryBlogRepositiry = {
    async findBlogs(params: paramsPaginatorType):Promise<viewAllBlogsType> {
        const parametres = paginatorHelper.blogsParamsMapper(params)
        const skipCount = (parametres.pageNumber -1 ) * parametres.pageSize
        const blogs = await blogCollection.find({
            name: {$regex: parametres.searchNameTerm, $options: "i"}
        })
        .sort({[parametres.sortBy] : parametres.sortDirection})
        .skip(skipCount)
        .limit(parametres.pageSize)
        .toArray()
        

        // const blogs = await blogCollection.find({}).toArray()
        console.log("dsd",Math.ceil(blogs.length/parametres.pageSize))
        return {
            pagesCount: Math.ceil(blogs.length/parametres.pageSize),
            page: parametres.pageNumber,
            pageSize: parametres.pageSize,
            totalCount: blogs.length,
            items: blogHelper.convertArrayDTO(blogs)
        }
       
        
    },
    async findBlogById(id: string):Promise<blogType | null> {
        const blog: blogDbType | null = await blogCollection.findOne({_id: convertID(id)})
        if (!blog){
         return null
        }
         return blogHelper.convertDTO(blog)
         
 
     },
}