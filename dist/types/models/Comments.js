"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentsSchema = exports.commentsLikesInfoSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongodb_1 = require("mongodb");
const commentatorInfoSchema = new mongoose_1.default.Schema({
    userId: { type: String },
    userLogin: { type: String }
});
exports.commentsLikesInfoSchema = new mongoose_1.default.Schema({
    status: {
        type: String,
        enum: ["None", "Like", "Dislike"]
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
