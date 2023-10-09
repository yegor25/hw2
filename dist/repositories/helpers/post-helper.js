"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postHelper = void 0;
exports.postHelper = {
    convertArrayDTO(posts) {
        const data = posts.map(el => ({
            id: el._id.toString(),
            title: el.title,
            shortDescription: el.shortDescription,
            content: el.content,
            blogId: el.blogId,
            blogName: el.blogName,
            createdAt: el.createdAt
        }));
        return data;
    },
    mapPostToView(post) {
        return {
            id: post._id.toString(),
            title: post.title,
            shortDescription: post.shortDescription,
            content: post.content,
            blogId: post.blogId,
            blogName: post.blogName,
            createdAt: post.createdAt
        };
    }
};
