"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongodb_1 = require("mongodb");
const like_type_1 = require("../like-type");
const postLikeSchema = new mongoose_1.default.Schema({
    addedAt: { type: Date },
    userId: { type: String },
    login: { type: String },
    status: { type: String, enum: like_type_1.LikeStatus }
});
exports.postSchema = new mongoose_1.default.Schema({
    _id: { type: mongodb_1.ObjectId, default: new mongodb_1.ObjectId() },
    title: { type: String, required: true },
    shortDescription: { type: String, required: true },
    content: { type: String, required: true },
    blogId: { type: String, required: true },
    blogName: { type: String, required: true },
    createdAt: { type: String, required: true },
    likesPost: { type: [postLikeSchema] }
});
exports.postSchema.methods.getDefaultLikes = function () {
    return {
        likesCount: 0,
        dislikesCount: 0,
        myStatus: like_type_1.LikeStatus.None,
        newestLikes: []
    };
};
exports.postSchema.methods.changeLikeStatus = function (userId, status) {
    const userLike = this.likes.find(el => el.userId === userId);
    if (!userLike) {
        this.likeComments = [...this.likeComments, { status: status, userId: userId }];
        return this.likeComments;
    }
    this.likeComments = this.likes.map(el => el.userId === userId ? Object.assign(Object.assign({}, el), { status: status }) : el);
    return this.likeComments;
};
// 
