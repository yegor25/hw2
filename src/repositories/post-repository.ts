import { log } from "console";
import { postsCollection } from "../db";
import { PostDbType,  postBodyType, postType } from "../types/post-type";
import { blogsRepository } from "./blog-repository";
import { ObjectId } from "mongodb";

// let posts: postType[] = [
//     {
//         id: "string",
//         title: "string",
//         shortDescription: "string",
//         content: "string",
//         blogId: "string",
//         blogName: "string"
//     }

// ]

const mapPostToView = (post: PostDbType): postType => {
    return {
        id: post._id.toString(),
        title: post.title,
        shortDescription: post.shortDescription,
        content: post.content,
        blogId: post.blogId,
        blogName: post.blogName,
        createdAt: post.createdAt
    }
}
const convertArrayDTO = (posts: PostDbType[]): postType[] => {
    const data:postType[] = posts.map(el =>  (
        {
            id: el._id.toString(),
            title: el.title,
            shortDescription: el.shortDescription,
            content: el.content,
            blogId: el.blogId,
            blogName: el.blogName,
             createdAt: el.createdAt
        }
    ))
    return data
}
export const postRepository = {
    async findPosts():Promise<postType[]> {
       const res = await postsCollection.find({}).toArray()
       return convertArrayDTO(res)
    },
    async createPost(post: postBodyType): Promise<postType | null> {
        const blog = await blogsRepository.findBlogById(post.blogId)
        if(!blog){
            return null
        }
        const newPost: PostDbType = {
            _id: new ObjectId(),
            blogName: blog.name ,
            createdAt: new Date().toISOString(),
            ...post
        }
        
        await postsCollection.insertOne(newPost)
        return mapPostToView(newPost)
    },
    async findPostById(id: string): Promise<postType | null>  {
        // const post = posts.find(el => el.id === id)
        // return post
        if(!ObjectId.isValid(id)) return null
        const post = await postsCollection.findOne({_id: new ObjectId(id)})
        if(!post) return null
        return mapPostToView(post)
    },

    async changePost(id: string, payload: postBodyType):Promise<boolean> {
        const post = await postsCollection.updateOne(
            {_id: new ObjectId(id)},
            {$set: {
                title: payload.title,
                shortDescription: payload.shortDescription,
                blogId: payload.blogId,
                content: payload.content
            }}
            )
            return post.matchedCount === 1
        
    },
    async deletePost(id: string):Promise<boolean> {
       const res = await postsCollection.deleteOne({_id: new ObjectId(id)})
       return res.deletedCount === 1
    },
    async deleteAll():Promise<boolean> {
        const res = await postsCollection.deleteMany({})
        return res.deletedCount > 0
    }
}

