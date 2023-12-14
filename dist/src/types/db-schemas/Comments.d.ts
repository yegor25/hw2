import mongoose from "mongoose";
import { LikeStatus, commentsLikeType } from "../like-type";
import { CommentDbModelType, likeInfoType } from "../comment-type";
import { ObjectId } from "mongodb";
export type commentMethodsType = {
    getLikesInfo: (userId: string) => likeInfoType;
    getDefaultLikeInfo: () => likeInfoType;
    changeLikeStatus: (userId: string, status: LikeStatus) => commentsLikeType[];
    getLikesInfoForUnauth: () => likeInfoType;
    likeComments: commentsLikeType[];
};
type commentModel = mongoose.Model<commentsLikeType, {}, commentMethodsType>;
export declare const commentsLikesInfoSchema: mongoose.Schema<commentsLikeType, mongoose.Model<commentsLikeType, any, any, any, mongoose.Document<unknown, any, commentsLikeType> & commentsLikeType & {
    _id: mongoose.Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, commentsLikeType, mongoose.Document<unknown, {}, mongoose.FlatRecord<commentsLikeType>> & mongoose.FlatRecord<commentsLikeType> & {
    _id: mongoose.Types.ObjectId;
}>;
export declare const commentsSchema: mongoose.Schema<CommentDbModelType, commentModel, commentMethodsType, {}, {}, {}, mongoose.DefaultSchemaOptions, CommentDbModelType, mongoose.Document<unknown, {}, mongoose.FlatRecord<CommentDbModelType>> & Omit<mongoose.FlatRecord<CommentDbModelType> & Required<{
    _id: ObjectId;
}>, keyof commentMethodsType> & commentMethodsType>;
export {};
