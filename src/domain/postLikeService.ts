import { LikePostsNewest } from "../db";
import { newestLikeRepo } from "../repositories/mutation/newestLike-repo";
import { queryLikePostNewestRepo } from "../repositories/query/query-postLikeNewest";
import { LikeStatus } from "../types/like-type";



export const postLikeService = {
    async addLikeToArray(userId: string, postId: string, status: LikeStatus,login: string) {
        console.log("add new")
        return newestLikeRepo.addLikeToArray(userId,postId,status,login)
    },
    async updateLikeStatus(likeStatus: LikeStatus, userId: string, postId: string){
        console.log("update")
       return newestLikeRepo.changeExist(userId,postId,likeStatus)
       
    },
   async changeLikeStatus (userId: string, postId: string,status:LikeStatus, login: string){
        const exist = await queryLikePostNewestRepo.getExistLike(userId,postId)
        if(!exist){
            console.log("no")
            return this.addLikeToArray(userId, postId,status,login)
        } else {
            console.log("yes")
            return this.updateLikeStatus(status,userId,postId)
        }
   }
    
}