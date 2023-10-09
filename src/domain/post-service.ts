import { ObjectId } from "mongodb"
import { postRepository } from "../repositories/mutation/post-repository"
import { PostDbType, postBodyType } from "../types/post-type"
import { QueryBlogRepositiry } from "../repositories/query/query-BlogsRepository"


const convertID = (id: string) => new ObjectId(id)

export const postService = {
    async findPosts () {
        return await postRepository.findPosts()
    },
    async createPost(post:postBodyType){
        const blog = await QueryBlogRepositiry.findBlogById(post.blogId)
        if(!blog) return null
        const newPost:PostDbType = {
            _id: new ObjectId(),
            blogName: blog.name ,
            createdAt: new Date().toISOString(),
            ...post
        }
        return await postRepository.createPost(newPost)
    },
    async changePost(id: string, payload:postBodyType){
        return postRepository.changePost(convertID(id), payload)
    },
    async findPostById(id: string){
        if(!ObjectId.isValid(convertID(id))) return null
        return postRepository.findPostById(convertID(id))
    },
    async deletePost(id: string){
        return await postRepository.deletePost(convertID(id))
    },
    async deleteAllPosts(){
        return await postRepository.deleteAll()
    }
}