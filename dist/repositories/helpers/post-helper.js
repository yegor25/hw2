"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postHelper = void 0;
const like_type_1 = require("../../types/like-type");
exports.postHelper = {
    convertArrayDTO(posts) {
        const data = posts.map(el => ({
            id: el._id.toString(),
            title: el.title,
            shortDescription: el.shortDescription,
            content: el.content,
            blogId: el.blogId,
            blogName: el.blogName,
            createdAt: el.createdAt,
            extendedLikesInfo: {
                likesCount: 0,
                dislikesCount: 0,
                myStatus: like_type_1.LikeStatus.None,
                newestLikes: []
            }
        }));
        return data;
    },
    mapPostToView(post, likes) {
        return {
            id: post._id.toString(),
            title: post.title,
            shortDescription: post.shortDescription,
            content: post.content,
            blogId: post.blogId,
            blogName: post.blogName,
            createdAt: post.createdAt,
            extendedLikesInfo: likes
        };
    }
};
