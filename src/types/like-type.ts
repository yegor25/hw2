

export enum LikeStatus {
     None = "None", 
     Like = "Like", 
     Dislike = "Dislike" 
}

export type commentsLikeType = {
    status: LikeStatus,
    userId: string,
    // commentId: string
}