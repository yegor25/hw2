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

export const blogsRepository = {
    async findBlogs():Promise<blogType[]> {
        const blogs = await blogCollection.find({}).toArray()
        return convertArrayDTO(blogs)
        
    },
   async createBlog(blog: blogDbType):Promise<blogType> {
        const res = await blogCollection.insertOne(blog)
        return convertDTO(blog)
    },
    async findBlogById(id: ObjectId):Promise<blogType | null> {
       const blog: blogDbType | null = await blogCollection.findOne({_id: id})
       if (!blog){
        return null
       }
        return convertDTO(blog)
        

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