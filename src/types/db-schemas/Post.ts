import mongoose  from "mongoose";
import { PostDbType } from "../post-type";
import { ObjectId } from "mongodb";
import { extendedLikesInfo, postLikeDbType } from "../post-likeType";
import { LikeStatus } from "../like-type";


const postLikeSchema = new mongoose.Schema<postLikeDbType>({
    addedAt: {type: Date},
    userId: {type: String},
    login: {type: String},
    status: {type: String, enum: LikeStatus}
})
type postMethodsType = {
    getDefaultLikes:() => extendedLikesInfo,
    likes: postLikeDbType[],
    changeLikeStatus:(userId: string, status: LikeStatus) => postLikeDbType[]

}

type postModelType = mongoose.Model<postLikeDbType,{},postMethodsType>

 export const postSchema = new mongoose.Schema<PostDbType,postModelType,postMethodsType>({
    _id: {type: ObjectId, default: new ObjectId()},
    title: {type: String, required: true},
    shortDescription: {type: String, required: true},
    content: {type: String, required: true},
    blogId: {type: String, required: true},
    blogName: {type: String, required: true},
    createdAt: {type: String, required: true},
    likesPost: {type: [postLikeSchema]}
})

postSchema.methods.getDefaultLikes = function():extendedLikesInfo{
    return {
        likesCount: 0,
        dislikesCount: 0,
        myStatus: LikeStatus.None,
        newestLikes: []
    }
}
postSchema.methods.changeLikeStatus = function(userId: string, status: LikeStatus):postLikeDbType[]{
    const userLike = this.likes.find(el => el.userId === userId)
    if(!userLike) {
       this.likeComments =  [...this.likeComments, {status: status, userId: userId}] 
        return this.likeComments
    }
    this.likeComments = this.likes.map(el => el.userId === userId ? {...el, status: status} : el)
    return this.likeComments
}

// 


