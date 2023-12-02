"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentsSchema = exports.commentsLikesInfoSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const like_type_1 = require("../like-type");
const mongodb_1 = require("mongodb");
const commentatorInfoSchema = new mongoose_1.default.Schema({
    userId: { type: String },
    userLogin: { type: String }
});
exports.commentsLikesInfoSchema = new mongoose_1.default.Schema({
    status: {
        type: String,
        enum: like_type_1.LikeStatus,
        required: true
    },
    userId: { type: String },
});
exports.commentsSchema = new mongoose_1.default.Schema({
    _id: { type: mongodb_1.ObjectId },
    content: { type: String },
    commentatorInfo: commentatorInfoSchema,
    createdAt: { type: String },
    postId: { type: String },
    likeComments: [exports.commentsLikesInfoSchema]
});
exports.commentsSchema.methods.getLikesInfo = function (userId) {
    const myReaction = this.likeComments.find(el => el.userId === userId);
    const likeCount = this.likeComments.filter(el => el.status === like_type_1.LikeStatus.Like);
    const disLikeCount = this.likeComments.filter((el) => el.status === like_type_1.LikeStatus.Dislike);
    const result = {
        likesCount: likeCount.length,
        dislikesCount: disLikeCount.length,
        myStatus: myReaction ? myReaction.status : like_type_1.LikeStatus.None
    };
    return result;
};
exports.commentsSchema.methods.getDefaultLikeInfo = function () {
    return {
        likesCount: 0,
        dislikesCount: 0,
        myStatus: like_type_1.LikeStatus.None
    };
};
exports.commentsSchema.methods.changeLikeStatus = function (userId, status) {
    const userLike = this.likeComments.find(el => el.userId === userId);
    if (!userLike) {
        this.likeComments = [...this.likeComments, { status: status, userId: userId }];
        return this.likeComments;
    }
    this.likeComments = this.likeComments.map(el => el.userId === userId ? Object.assign(Object.assign({}, el), { status: status }) : el);
    return this.likeComments;
};
exports.commentsSchema.methods.getLikesInfoForUnauth = function () {
    const likeCount = this.likeComments.filter((el) => el.status === like_type_1.LikeStatus.Like);
    const disLikeCount = this.likeComments.filter((el) => el.status === like_type_1.LikeStatus.Dislike);
    const result = {
        likesCount: likeCount.length,
        dislikesCount: disLikeCount.length,
        myStatus: like_type_1.LikeStatus.None
    };
    return result;
};
