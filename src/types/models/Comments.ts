

import mongoose from "mongoose"
import { LikeStatus, commentsLikeType } from "../like-type"
import { CommentDbModelType, commentatorInfoType, likeInfoType } from "../comment-type"
import { ObjectId } from "mongodb"

export type commentMethodsType = {
    getLikesInfo:(userId: string) => likeInfoType,
    getDefaultLikeInfo:()=> likeInfoType,
    changeLikeStatus:(userId: string, status: LikeStatus, items: commentsLikeType[]) => commentsLikeType[]
}
type commentModel = mongoose.Model<commentsLikeType,{},commentMethodsType>
const commentatorInfoSchema = new mongoose.Schema<commentatorInfoType>({
    userId: { type: String },
    userLogin: { type: String }
})

export const commentsLikesInfoSchema = new mongoose.Schema<commentsLikeType>({
    status: {
        type: String,
        enum: LikeStatus,
        required: true
    },
    userId: { type: String },
})


export const commentsSchema = new mongoose.Schema<CommentDbModelType,commentModel,commentMethodsType>({
    _id: { type: ObjectId },
    content: { type: String },
    commentatorInfo: commentatorInfoSchema,
    createdAt: { type: String },
    postId: { type: String },
    likeComments: [commentsLikesInfoSchema]
})

commentsSchema.methods.getLikesInfo = function (userId: string): likeInfoType {
    const myReaction: commentsLikeType | undefined = this.likeComments.find((el: commentsLikeType) => el.userId === userId)
    const likeCount: commentsLikeType[] = this.likeComments.filter((el: commentsLikeType) => el.status === LikeStatus.Like)
    const disLikeCount: commentsLikeType[] = this.likeComments.filter((el: commentsLikeType) => el.status === LikeStatus.Dislike)
    const result: likeInfoType = {
        likesCount: likeCount.length,
        dislikesCount: disLikeCount.length,
        myStatus: myReaction ? myReaction.status : LikeStatus.None
    }
    return result
}
commentsSchema.methods.getDefaultLikeInfo = function():likeInfoType{
    return {
        likesCount: 0,
        dislikesCount: 0,
        myStatus: LikeStatus.None
    }
}
commentsSchema.methods.changeLikeStatus = function(userId: string, status: LikeStatus, items: commentsLikeType[]):commentsLikeType[]{
    const userLike = items.find(el => el.userId === userId)
    if(!userLike) {
        items.push({status: status, userId: userId, createdAt: new Date().toISOString()})
        return items
    }
    const idx = items.findIndex(el => el.userId === userLike.userId)
    items[idx] = {...items[idx], status: status, createdAt: new Date().toISOString()}
    return items
}

