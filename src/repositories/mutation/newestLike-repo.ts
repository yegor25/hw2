import { ObjectId } from "mongodb";
import { LikePostsNewest } from "../../db";
import { LikeStatus } from "../../types/like-type";
import { postLikeDbType } from "../../types/post-likeType";



export const newestLikeRepo = {
    async addLikeToArray(userId: string,postId: string, status: LikeStatus, login: string){
        const newPost = new LikePostsNewest({userId:userId, postId: postId, addedAt: new Date(),status: status, _id: new ObjectId(),login: login, isFirst: true})
        await newPost.save()
        return newPost
     },
     async changeExist(userId: string,postId: string, status: LikeStatus) {
         const postLike = await LikePostsNewest.findOneAndUpdate(
             {userId: userId, postId: postId},
             {$set: {addedAt: new Date(),isFirst: false, status:status}}
 
         )
         return 
     }
}