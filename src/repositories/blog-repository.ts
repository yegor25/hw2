import { ObjectId } from "mongodb";
import { blogCollection, db } from "../db";
import { blogDbType, blogType, bodyBlogType } from "../types/blog-type";

// let blogs: blogType[] = [
//     {
//         id: "1",
//         name: "string",
//         description: "string",
//         websiteUrl: "string"
//     }
// ]
const convertDTO = (data: blogDbType):blogType => {
    return {
        id: data._id.toString(),
        description: data.description,
        name: data.name,
        websiteUrl: data.websiteUrl,
        createdAt: data.createdAt,
        isMembership: data.isMembership
    }
} 
const convertArrayDTO = (data: blogDbType[]): blogType[] => {
    const res:blogType[] =  data.map((el: blogDbType) => ({
        id: el._id.toString(),
        description: el.description,
        name: el.name,
        websiteUrl: el.websiteUrl,
        isMembership: el.isMembership,
        createdAt: el.createdAt
    }))
    return res
}

export const blogsRepository = {
    async findBlogs():Promise<blogType[]> {
        const blogs = await blogCollection.find({}).toArray()
        return convertArrayDTO(blogs)
        
    },
   async createBlog(blog: bodyBlogType):Promise<blogType> {
        const newBlog: blogDbType = {
            name: blog.name,
            description: blog.description,
            websiteUrl: blog.description,
            _id: new ObjectId(),
            isMembership: false,
            createdAt: new Date().toISOString()
        }
        await blogCollection.insertOne(newBlog)
        return convertDTO(newBlog)
    },
    async findBlogById(id: string):Promise<blogType | null> {
       const blog: blogDbType | null = await blogCollection.findOne({_id: new ObjectId(id)})
       if (!blog){
        return null
       }
        return convertDTO(blog)
        

    },
    async changeBlog(id: string, payload: bodyBlogType):Promise<boolean> {
        const blog = await blogCollection.updateOne(
            {_id: new ObjectId(id)},
            {$set: {
                name: payload.name,
                websiteUrl: payload.websiteUrl,
                description: payload.description
            }}
        )
        return blog.matchedCount === 1
    },
   async deleteBlog(id: string):Promise<boolean> {
        const res = await blogCollection.deleteOne({_id: new ObjectId(id)})
        return res.deletedCount === 1
    },
    async deleteAll(): Promise<boolean>{
       const res = await blogCollection.deleteMany({})
       return res.deletedCount > 0
    }
}