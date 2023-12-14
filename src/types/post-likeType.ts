import { ObjectId } from "mongodb"
import { LikeStatus } from "./like-type"



export type postLikeDbType = {
    _id: ObjectId,
    addedAt: Date,
    userId: string,
    login: string,
    status: LikeStatus,
    postId: string,
    isFirst: boolean
}
export type postLikeType = {
    addedAt: string,
    userId: string,
    login: string
}

export type extendedLikesInfo = {
    likesCount: number,
    dislikesCount: number,
    myStatus: LikeStatus,
    newestLikes: postLikeType[]
}