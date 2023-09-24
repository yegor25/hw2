import { postBodyType, postType } from "../types/post-type";
import { blogsRepository } from "./blog-repository";

let posts: postType[] = [
    {
        id: "string",
        title: "string",
        shortDescription: "string",
        content: "string",
        blogId: "string",
        blogName: "string"
    }

]

export const postRepository = {
    findPosts() {
        return posts
    },
    createPost(post: postBodyType) {
        const blog = blogsRepository.findBlogById(post.blogId)
        if(!blog){
            return null
        }
        const newPost:postType = {
            id: (+new Date()).toString(),
            blogName: blog ? blog?.name : "",
            ...post
        }
        posts.push(newPost)
        return newPost
    },
    findPostById(id: string) {
        const post = posts.find(el => el.id === id)
        return post
    },
    changePost(id: string, payload: postBodyType) {
        const idx = posts.findIndex(el => el.id === id)
        if (idx < 0) {
            return null
        }
        posts[idx] = {
            ...posts[idx],
            title: payload.title,
            shortDescription: payload.shortDescription,
            blogId: payload.blogId,
            content: payload.content
        }

        return (posts[idx])
    },
    deletePost(id: string) {
        const idx = posts.findIndex(el => el.id === id)
        if (idx < 0) {
            return null
        }
         posts.splice(idx, 1)
        return posts
    },
    deleteAll() {
        posts.length = 0
        return posts
    }
}

