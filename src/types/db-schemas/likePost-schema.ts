import mongoose from "mongoose";
import { postLikeDbType, postLikeType } from "../post-likeType";
import { ObjectId } from "mongodb";
import { LikeStatus } from "../like-type";



type methodsType = {
    getNewstLikes:() => postLikeType[],
    addLike:(userId: string, postId: string, status: LikeStatus, login: string) => postLikeDbType[],
    likes:postLikeDbType[],
}
type newLikeModelType = mongoose.Model<postLikeDbType,{},methodsType>
export const likePostSchema = new mongoose.Schema<postLikeDbType,newLikeModelType, methodsType>({
    _id: {type: ObjectId},
    addedAt: {type: Date},
    userId: {type: String},
    login: {type: String},
    status: {type: String, enum: LikeStatus},
    postId: {type: String},
    isFirst: {type: Boolean}
})

likePostSchema.methods.getNewstLikes = function():postLikeType[]{
     const likes:postLikeDbType[] = this.likes.filter(el => el.status === LikeStatus.Like).sort((a,b) => a.addedAt > b.addedAt ? 1 : -1)
     return likes.splice(0,3).map(el => ({addedAt: el.addedAt.toISOString(), userId: el.userId, login: el.login}))
}

// likePostSchema.methods.addLike = function(userId: string,postId: string, status: LikeStatus, login: string):postLikeDbType[]{
//     const exists = this.likes.find(el => el.userId === userId && el.postId === postId)
//     if(exists){
//         const modifyLikes:postLikeDbType[] = this.likes.map(el => ({...el,addedAt: new Date(),isFirst: false, status: status}))
//         return modifyLikes
//     }
//      this.likes.push({userId:userId, postId: postId, addedAt: new Date(),status: status, _id: new ObjectId(),login: login, isFirst: true})
//     return this.likes
// }