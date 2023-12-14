import { LikePostsNewest } from "../../db"



export const queryLikePostNewestRepo = {
   async getLikes(){
    return LikePostsNewest.find()
   },
   async getExistLike(userId: string, postId: string):Promise<boolean>{
    const like = await LikePostsNewest.findOne({userId:userId,postId:postId})
    if(like) return true
    return false
   }
}