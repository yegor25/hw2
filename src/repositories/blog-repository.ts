import { blogType, bodyBlogType } from "../types/blog-type";

let blogs: blogType[] = [
    {
        id: "1",
        name: "string",
        description: "string",
        websiteUrl: "string"
    }
]

export const blogsRepository = {
    findBlogs() {
        return blogs
    },
    createBlog(blog: bodyBlogType) {
        const newBlog = {id: (+new Date()).toString(),...blog}
        blogs.push(newBlog)
        return newBlog
    },
    findBlogById(id: string){
        const blog = blogs.find(el => el.id === id)
        return blog
    },
    changeBlog(id: string, payload: bodyBlogType){
        const blogIdx = blogs.findIndex(el => el.id === id)
        if(blogIdx < 0){
            return null
        }
         blogs[blogIdx] = {
            ...blogs[blogIdx],
            name: payload.name,
            description: payload.description,
            websiteUrl: payload.websiteUrl
        }
        
        return (blogs[blogIdx])
    },
    deleteBlog(id: string){
        const blogIdx = blogs.findIndex(el => el.id === id)
        if (blogIdx < 0){
            return null
        }
        blogs.splice(blogIdx,1)
        return blogs
    },
    deleteAll(){
        blogs.length = 0
        return blogs
    }
}