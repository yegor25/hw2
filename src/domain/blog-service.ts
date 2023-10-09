import { ObjectId } from "mongodb"
import { blogsRepository } from "../repositories/mutation/blog-repository"
import { blogDbType, blogType, bodyBlogType } from "../types/blog-type"



export const blogService = {
    
    async createBlog(blog:bodyBlogType):Promise<blogType>{
        const newBlog: blogDbType = {
            name: blog.name,
            description: blog.description,
            websiteUrl: blog.description,
            _id: new ObjectId(),
            isMembership: false,
            createdAt: new Date().toISOString()
        }
        return await blogsRepository.createBlog(newBlog)
    },
   
    async changeBlog(id:string, payload: bodyBlogType){
        const dbId = new ObjectId(id)
        return blogsRepository.changeBlog(dbId, payload)
    },
    async deleteBlog(id: string){
        const dbId = new ObjectId(id)
        return await blogsRepository.deleteBlog(dbId)
    },
    async deleteAllBlogs(){
        return await blogsRepository.deleteAll()
    }
}