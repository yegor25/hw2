import {  postsCollection } from "../../db";
import { PostDbType,  postBodyType, postType } from "../../types/post-type";
import { ObjectId } from "mongodb";
import { blogService } from "../../domain/blog-service";
import { postHelper } from "../helpers/post-helper";

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



export const postRepository = {
    
    async createPost(post: PostDbType): Promise<postType> {
        await postsCollection.insertOne(post)
        return postHelper.mapPostToView(post)
    },
    async createPostForBlog(post: PostDbType): Promise<postType> {
        await postsCollection.insertOne(post)
        return postHelper.mapPostToView(post)
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

