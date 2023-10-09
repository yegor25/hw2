import {  postsCollection } from "../../db";
import { PostDbType,  postBodyType, postType } from "../../types/post-type";
import { ObjectId } from "mongodb";
import { blogService } from "../../domain/blog-service";

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
    async createPost(post: PostDbType): Promise<postType> {
        await postsCollection.insertOne(post)
        return mapPostToView(post)
    },
    async findPostById(id: ObjectId): Promise<postType | null>  {
        const post = await postsCollection.findOne({_id: id})
        if(!post) return null
        return mapPostToView(post)
    },

    async changePost(id: ObjectId, payload: postBodyType):Promise<boolean> {
        const post = await postsCollection.updateOne(
            {_id: id},
            {$set: {
                title: payload.title,
                shortDescription: payload.shortDescription,
                blogId: payload.blogId,
                content: payload.content
            }}
            )
            return post.matchedCount === 1
        
    },
    async deletePost(id: ObjectId):Promise<boolean> {
       const res = await postsCollection.deleteOne({_id: new ObjectId(id)})
       return res.deletedCount === 1
    },
    async deleteAll():Promise<boolean> {
        
        const res = await postsCollection.deleteMany({})
        return res.deletedCount > 0
    }
}

