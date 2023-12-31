"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
    isFirst: { type: Boolean },
}, {
    statics: {
        getNewstLikes(postId, userId) {
            return __awaiter(this, void 0, void 0, function* () {
                let likeCount = 0;
                let disLikeCount = 0;
                let userStatus = like_type_1.LikeStatus.None;
                const reactions = yield this.find({ postId: postId }).lean();
                reactions.forEach(el => {
                    if (el.status === like_type_1.LikeStatus.Like)
                        likeCount += 1;
                    if (el.status === like_type_1.LikeStatus.Dislike)
                        disLikeCount += 1;
                    if (userId && el.userId === userId)
                        userStatus = el.status;
                });
                const likes = reactions.filter(el => el.status === like_type_1.LikeStatus.Like).sort((a, b) => new Date(a.addedAt) < new Date(b.addedAt) ? 1 : -1);
                const newest = likes.splice(0, 3).map(el => ({ addedAt: el.addedAt.toISOString(), userId: el.userId, login: el.login }));
                const result = {
                    likesCount: likeCount,
                    dislikesCount: disLikeCount,
                    myStatus: userStatus,
                    newestLikes: newest
                };
                return result;
            });
        },
        getDefaultLikes() {
            return {
                likesCount: 0,
                dislikesCount: 0,
                myStatus: like_type_1.LikeStatus.None,
                newestLikes: []
            };
        }
    },
});
//  likePostSchema.methods.mapLikeForView = function(userId: string | null,likePost: postLikeDbType):extendedLikesInfo {}
