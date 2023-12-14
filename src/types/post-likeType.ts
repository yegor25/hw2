import { LikeStatus } from "./like-type"



export type postLikeDbType = {
        addedAt: Date,
        userId: string,
        login: string,
        status: LikeStatus  
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