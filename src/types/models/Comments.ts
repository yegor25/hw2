

import mongoose from "mongoose"
import { commentsLikeType } from "../like-type"
import { CommentDbModelType, commentatorInfoType } from "../comment-type"
import { ObjectId } from "mongodb"


const commentatorInfoSchema = new mongoose.Schema<commentatorInfoType>({
    userId: {type: String},
    userLogin: {type: String}
})

export const commentsLikesInfoSchema = new mongoose.Schema<commentsLikeType>({
    status: {
        type: String,
        enum: ["None", "Like", "Dislike"]
    },
    userId: { type: String },
})


export const commentsSchema = new mongoose.Schema<CommentDbModelType>({
    _id: {type: ObjectId},
    content: {type: String},
    commentatorInfo: commentatorInfoSchema,
    createdAt: {type: String},
    postId: {type:String},
    likeComments: [commentsLikesInfoSchema]
})


