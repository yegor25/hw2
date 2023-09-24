"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogsRepository = void 0;
let blogs = [
    {
        id: "1",
        name: "string",
        description: "string",
        websiteUrl: "string"
    }
];
exports.blogsRepository = {
    findBlogs() {
        return blogs;
    },
    createBlog(blog) {
        const newBlog = Object.assign({ id: (+new Date()).toString() }, blog);
        blogs.push(newBlog);
        return newBlog;
    },
    findBlogById(id) {
        const blog = blogs.find(el => el.id === id);
        return blog;
    },
    changeBlog(id, payload) {
        const blogIdx = blogs.findIndex(el => el.id === id);
        if (blogIdx < 0) {
            return null;
        }
        blogs[blogIdx] = Object.assign(Object.assign({}, blogs[blogIdx]), { name: payload.name, description: payload.description, websiteUrl: payload.websiteUrl });
        return (blogs[blogIdx]);
    },
    deleteBlog(id) {
        const blogIdx = blogs.findIndex(el => el.id === id);
        if (blogIdx < 0) {
            return null;
        }
        blogs.splice(blogIdx, 1);
        return blogs;
    },
    deleteAll() {
        blogs.length = 0;
        return blogs;
    }
};
