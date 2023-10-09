import { ObjectId } from "mongodb";
import { blogCollection, db } from "../../db";
import { blogDbType, blogType, bodyBlogType, viewAllBlogsType } from "../../types/blog-type";
import { blogHelper } from "../helpers/blog-helper";






export const blogsRepository = {
    
   async createBlog(blog: blogDbType):Promise<blogType> {
        const res = await blogCollection.insertOne(blog)
        return blogHelper.convertDTO(blog)
    },
    
    async changeBlog(id: ObjectId, payload: bodyBlogType):Promise<boolean> {
        const blog = await blogCollection.updateOne(
            {_id: id},
            {$set: {
                name: payload.name,
                websiteUrl: payload.websiteUrl,
                description: payload.description
            }}
        )
        return blog.matchedCount === 1
    },
   async deleteBlog(id: ObjectId):Promise<boolean> {
        const res = await blogCollection.deleteOne({_id: new ObjectId(id)})
        return res.deletedCount === 1
    },
    async deleteAll(): Promise<boolean>{
       const res = await blogCollection.deleteMany({})
       return res.deletedCount > 0
    }
}