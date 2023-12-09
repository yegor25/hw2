import { PostDbType,  postBodyType, postType } from "../../types/post-type";
import { ObjectId } from "mongodb";
import { blogService } from "../../domain/blog-service";
import { postHelper } from "../helpers/post-helper";
import { PostModel } from "../../db";

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



// export const postRepository = {
    
//     async createPost(post: PostDbType): Promise<postType> {
//         await PostModel.create(post)
//         return postHelper.mapPostToView(post)
//     },
//     async createPostForBlog(post: PostDbType): Promise<postType | null> {
//         try {
//             await PostModel.create(post)
//         return postHelper.mapPostToView(post)
//         } catch (error) {
//             console.log("post error", error)
//             return null
//         }
      
//     },
//     async changePost(id: ObjectId, payload: postBodyType):Promise<boolean> {
//         const post = await PostModel.updateOne(
//             {_id: id},
//             {$set: {
//                 title: payload.title,
//                 shortDescription: payload.shortDescription,
//                 blogId: payload.blogId,
//                 content: payload.content
//             }}
//             )
//             return post.matchedCount === 1
        
//     },
//     async deletePost(id: ObjectId):Promise<boolean> {
//        const res = await PostModel.deleteOne({_id: new ObjectId(id)})
//        return res.deletedCount === 1
//     },
//     async deleteAll():Promise<void> {
//         try {
//             const res = await PostModel.deleteMany({})
//         return
//         } catch (error) {
            
//         }
        
//     }
// }


class PostRepository {
    async createPost(post: PostDbType): Promise<postType> {
        await PostModel.create(post)
        return postHelper.mapPostToView(post)
    }
    async createPostForBlog(post: PostDbType): Promise<postType | null> {
        try {
            await PostModel.create(post)
        return postHelper.mapPostToView(post)
        } catch (error) {
            console.log("post error", error)
            return null
        }
      
    }
    async changePost(id: ObjectId, payload: postBodyType):Promise<boolean> {
        const post = await PostModel.updateOne(
            {_id: id},
            {$set: {
                title: payload.title,
                shortDescription: payload.shortDescription,
                blogId: payload.blogId,
                content: payload.content
            }}
            )
            return post.matchedCount === 1
        
    }
    async deletePost(id: ObjectId):Promise<boolean> {
       const res = await PostModel.deleteOne({_id: new ObjectId(id)})
       return res.deletedCount === 1
    }
    async deleteAll():Promise<void> {
        try {
            const res = await PostModel.deleteMany({})
        return
        } catch (error) {
            
        }
        
    }
}

export const postRepository = new PostRepository()
