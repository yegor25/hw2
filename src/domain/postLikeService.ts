import { LikePostsNewest } from "../db";
import { newestLikeRepo } from "../repositories/mutation/newestLike-repo";
import { queryLikePostNewestRepo } from "../repositories/query/query-postLikeNewest";
import { LikeStatus } from "../types/like-type";



export const postLikeService = {
    async addLikeToArray(userId: string, postId: string, status: LikeStatus, login: string) {
        const exist = await queryLikePostNewestRepo.getExistLike(userId, postId)
        if(!exist){
            await newestLikeRepo.addLikeToArray(userId,postId,status,login)
            return
        } 
        await newestLikeRepo.changeExist(userId,postId,status)
        return
    },
    async updateLikeStatus(likeStatus: LikeStatus, userId: string, postId: string):Promise<boolean>{
       await newestLikeRepo.changeExist(userId,postId,likeStatus)
        return true
    }
    
}