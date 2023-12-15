import { ObjectId } from "mongodb"
import { postRepository } from "../repositories/mutation/post-repository"
import { PostDbType, postBodyType, postBodyTypeForBlog, postType } from "../types/post-type"
import { QueryBlogRepositiry } from "../repositories/query/query-BlogsRepository"
import { LikeStatus } from "../types/like-type"
import { QueryPostRepository } from "../repositories/query/query-PostRepository"
import { HydratedDocument } from "mongoose"


const convertID = (id: string) => new ObjectId(id)

// export const postService = {
    
//     async createPost(post:postBodyType){
//         const blog = await QueryBlogRepositiry.findBlogById(post.blogId)
//         if(!blog) return null
//         const newPost:PostDbType = {
//             _id: new ObjectId(),
//             blogName: blog.name ,
//             createdAt: new Date().toISOString(),
//             ...post
//         }
//         return await postRepository.createPost(newPost)
//     },
//     async createPostForBlog(post:postBodyTypeForBlog,id: string){
//         const blog = await QueryBlogRepositiry.findBlogById(id)
//         if(!blog) return null
//         const newPost:PostDbType = {
//             _id: new ObjectId(),
//             blogName: blog.name ,
//             blogId: id,
//             createdAt: new Date().toISOString(),
//             ...post
//         }
//         return await postRepository.createPost(newPost)
//     },
//     async changePost(id: string, payload:postBodyType){
//         return postRepository.changePost(convertID(id), payload)
//     },
   
//     async deletePost(id: string){
//         return await postRepository.deletePost(convertID(id))
//     },
//     async deleteAllPosts(){
//         return await postRepository.deleteAll()
//     }
// }


class PostService {
    async createPost(post:postBodyType):Promise<postType | null>{
        const blog = await QueryBlogRepositiry.findBlogById(post.blogId)
        if(!blog) return null
        const newPost:PostDbType = {
            _id: new ObjectId(),
            blogName: blog.name ,
            createdAt: new Date().toISOString(),
            likesPost: [],
            ...post
        }
        return await postRepository.createPost(newPost)
    }
    async createPostForBlog(post:postBodyTypeForBlog,id: string){
        const blog = await QueryBlogRepositiry.findBlogById(id)
        if(!blog) return null
        const newPost:PostDbType = {
            _id: new ObjectId(),
            blogName: blog.name ,
            blogId: id,
            createdAt: new Date().toISOString(),
            likesPost: [],
            ...post
        }
        return await postRepository.createPost(newPost)
    }
    async changePost(id: string, payload:postBodyType){
        return postRepository.changePost(convertID(id), payload)
    }
   
    async deletePost(id: string){
        return await postRepository.deletePost(convertID(id))
    }
    async deleteAllPosts(){
        return await postRepository.deleteAll()
    }
    
}

export const postService = new PostService()