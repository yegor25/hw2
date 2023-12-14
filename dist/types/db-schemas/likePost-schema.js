"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.likePostSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongodb_1 = require("mongodb");
const like_type_1 = require("../like-type");
exports.likePostSchema = new mongoose_1.default.Schema({
    _id: { type: mongodb_1.ObjectId },
    addedAt: { type: Date },
    userId: { type: String },
    login: { type: String },
    status: { type: String, enum: like_type_1.LikeStatus },
    postId: { type: String },
    isFirst: { type: Boolean }
});
exports.likePostSchema.methods.getNewstLikes = function () {
    const likes = this.likes.filter(el => el.status === like_type_1.LikeStatus.Like).sort((a, b) => a.addedAt > b.addedAt ? 1 : -1);
    return likes.splice(0, 3).map(el => ({ addedAt: el.addedAt.toISOString(), userId: el.userId, login: el.login }));
};
// likePostSchema.methods.addLike = function(userId: string,postId: string, status: LikeStatus, login: string):postLikeDbType[]{
//     const exists = this.likes.find(el => el.userId === userId && el.postId === postId)
//     if(exists){
//         const modifyLikes:postLikeDbType[] = this.likes.map(el => ({...el,addedAt: new Date(),isFirst: false, status: status}))
//         return modifyLikes
//     }
//      this.likes.push({userId:userId, postId: postId, addedAt: new Date(),status: status, _id: new ObjectId(),login: login, isFirst: true})
//     return this.likes
// }
