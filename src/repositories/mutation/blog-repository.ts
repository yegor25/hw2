import { ObjectId } from "mongodb";
import { blogDbType, blogType, bodyBlogType, viewAllBlogsType } from "../../types/blog-type";
import { blogHelper } from "../helpers/blog-helper";
import { BlogModel } from "../../db";






// export const blogsRepository = {
    
//    async createBlog(blog: blogDbType):Promise<blogType> {
//         await BlogModel.create(blog)
//         return blogHelper.convertDTO(blog)
//     },
    
//     async changeBlog(id: ObjectId, payload: bodyBlogType):Promise<boolean> {
//         const blog = await BlogModel.updateOne(
//             {_id: id},
//             {$set: {
//                 name: payload.name,
//                 websiteUrl: payload.websiteUrl,
//                 description: payload.description
//             }}
//         )
//         return blog.matchedCount === 1
//     },
//    async deleteBlog(id: ObjectId):Promise<boolean> {
//         const res = await BlogModel.deleteOne({_id: new ObjectId(id)})
//         return res.deletedCount === 1
//     },
//     async deleteAll(): Promise<boolean>{
//        const res = await BlogModel.deleteMany({})
//        return res.deletedCount > 0
//     }
// }

class BlogRepository {
    async createBlog(blog: blogDbType):Promise<blogType> {
        await BlogModel.create(blog)
        return blogHelper.convertDTO(blog)
    }
    
    async changeBlog(id: ObjectId, payload: bodyBlogType):Promise<boolean> {
        const blog = await BlogModel.updateOne(
            {_id: id},
            {$set: {
                name: payload.name,
                websiteUrl: payload.websiteUrl,
                description: payload.description
            }}
        )
        return blog.matchedCount === 1
    }
   async deleteBlog(id: ObjectId):Promise<boolean> {
        const res = await BlogModel.deleteOne({_id: new ObjectId(id)})
        return res.deletedCount === 1
    }
    async deleteAll(): Promise<boolean>{
       const res = await BlogModel.deleteMany({})
       return res.deletedCount > 0
    }
}


export const blogsRepository = new BlogRepository()