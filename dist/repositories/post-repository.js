"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRepository = void 0;
const blog_repository_1 = require("./blog-repository");
let posts = [
    {
        id: "string",
        title: "string",
        shortDescription: "string",
        content: "string",
        blogId: "string",
        blogName: "string"
    }
];
exports.postRepository = {
    findPosts() {
        return posts;
    },
    createPost(post) {
        const blog = blog_repository_1.blogsRepository.findBlogById(post.blogId);
        if (!blog) {
            return null;
        }
        const newPost = Object.assign({ id: (+new Date()).toString(), blogName: blog ? blog === null || blog === void 0 ? void 0 : blog.name : "" }, post);
        posts.push(newPost);
        return newPost;
    },
    findPostById(id) {
        const post = posts.find(el => el.id === id);
        return post;
    },
    changePost(id, payload) {
        const idx = posts.findIndex(el => el.id === id);
        if (idx < 0) {
            return null;
        }
        posts[idx] = Object.assign(Object.assign({}, posts[idx]), { title: payload.title, shortDescription: payload.shortDescription, blogId: payload.blogId, content: payload.content });
        return (posts[idx]);
    },
    deletePost(id) {
        const idx = posts.findIndex(el => el.id === id);
        if (idx < 0) {
            return null;
        }
        posts.splice(idx, 1);
        return posts;
    },
    deleteAll() {
        posts.length = 0;
        return posts;
    }
};
