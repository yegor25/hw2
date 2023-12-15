import { LikePostsNewest } from "../db";
import { newestLikeRepo } from "../repositories/mutation/newestLike-repo";
import { queryLikePostNewestRepo } from "../repositories/query/query-postLikeNewest";
import { LikeStatus } from "../types/like-type";



export const postLikeService = {
    async addLikeToArray(userId: string, postId: string, status: LikeStatus) {
        return newestLikeRepo.changeExist(userId,postId,status)
    },
    async updateLikeStatus(likeStatus: LikeStatus, userId: string, postId: string){
       return newestLikeRepo.changeExist(userId,postId,likeStatus)
       
    },
   async changeLikeStatus (userId: string, postId: string,status:LikeStatus, login: string){
        const exist = await queryLikePostNewestRepo.getExistLike(userId,postId)
        if(!exist){
            return this.addLikeToArray(userId, postId,status)
        } else {
            return this.updateLikeStatus(status,userId,postId)
        }
   }
    
}