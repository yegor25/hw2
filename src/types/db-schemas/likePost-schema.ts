import mongoose from "mongoose";
import { extendedLikesInfo, postLikeDbType, postLikeType } from "../post-likeType";
import { ObjectId } from "mongodb";
import { LikeStatus } from "../like-type";



type methodsType = {
    getDefaultLikes: () => extendedLikesInfo,
    likes: postLikeDbType[],
    changeLikeStatus: (userId: string, status: LikeStatus) => postLikeDbType[]

}

export interface newLikeModelType extends mongoose.Model<postLikeDbType, {}, methodsType> {
    getNewstLikes: (postId: string, userId: string | null) => Promise<extendedLikesInfo>,
    getDefaultLikes: () => extendedLikesInfo

}
export const likePostSchema = new mongoose.Schema<postLikeDbType, newLikeModelType, methodsType>({
    _id: { type: ObjectId },
    addedAt: { type: Date },
    userId: { type: String },
    login: { type: String },
    status: { type: String, enum: LikeStatus },
    postId: { type: String },
    isFirst: { type: Boolean },
},
    {
        statics: {
            async getNewstLikes(postId: string, userId: string | null): Promise<extendedLikesInfo> {
                let likeCount = 0
                let disLikeCount = 0
                let userStatus: LikeStatus = LikeStatus.None
                const reactions = await this.find({ postId: postId }).lean()
                reactions.forEach(el => {
                    if (el.status === LikeStatus.Like) likeCount += 1
                    if (el.status === LikeStatus.Dislike) likeCount -= 1
                    if (userId && el.userId === userId) userStatus = el.status
                })
                const likes = reactions.filter(el => el.status === LikeStatus.Like && el.postId === postId && el.isFirst).sort((a, b) => a.addedAt > b.addedAt ? 1 : -1)
                const newest: postLikeType[] = likes.slice(0, 4).map(el => ({ addedAt: el.addedAt.toISOString(), userId: el.userId, login: el.login }))
                const result: extendedLikesInfo = {
                    likesCount: likeCount,
                    dislikesCount: disLikeCount,
                    myStatus: userStatus,
                    newestLikes: newest
                }
                return result
            },
            getDefaultLikes (): extendedLikesInfo {
                return {
                    likesCount: 0,
                    dislikesCount: 0,
                    myStatus: LikeStatus.None,
                    newestLikes: []
                }
            }


        },

    },



)



