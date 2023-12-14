import { blogDbType } from "./types/blog-type";
import { userDbType } from "./types/user-type";
import { TokenDbType } from "./types/tokens-type";
import { securityDevicesDbType } from "./types/securityDevices-type";
import { requestUserDbType, requestUserType } from "./types/requestUserType";
import mongoose from "mongoose";
export declare const PostModel: mongoose.Model<import("./types/post-type").PostDbType, {}, {}, {}, mongoose.Document<unknown, {}, import("./types/post-type").PostDbType> & import("./types/post-type").PostDbType & Required<{
    _id: import("mongodb").ObjectId;
}>, mongoose.Schema<import("./types/post-type").PostDbType, mongoose.Model<import("./types/post-type").PostDbType, any, any, any, mongoose.Document<unknown, any, import("./types/post-type").PostDbType> & import("./types/post-type").PostDbType & Required<{
    _id: import("mongodb").ObjectId;
}>, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, import("./types/post-type").PostDbType, mongoose.Document<unknown, {}, mongoose.FlatRecord<import("./types/post-type").PostDbType>> & mongoose.FlatRecord<import("./types/post-type").PostDbType> & Required<{
    _id: import("mongodb").ObjectId;
}>>>;
export declare const OldPassword: mongoose.Model<import("./types/db-schemas/OldPasswors").oldPasswordType, {}, {}, {}, mongoose.Document<unknown, {}, import("./types/db-schemas/OldPasswors").oldPasswordType> & import("./types/db-schemas/OldPasswors").oldPasswordType & {
    _id: mongoose.Types.ObjectId;
}, mongoose.Schema<import("./types/db-schemas/OldPasswors").oldPasswordType, mongoose.Model<import("./types/db-schemas/OldPasswors").oldPasswordType, any, any, any, mongoose.Document<unknown, any, import("./types/db-schemas/OldPasswors").oldPasswordType> & import("./types/db-schemas/OldPasswors").oldPasswordType & {
    _id: mongoose.Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, import("./types/db-schemas/OldPasswors").oldPasswordType, mongoose.Document<unknown, {}, mongoose.FlatRecord<import("./types/db-schemas/OldPasswors").oldPasswordType>> & mongoose.FlatRecord<import("./types/db-schemas/OldPasswors").oldPasswordType> & {
    _id: mongoose.Types.ObjectId;
}>>;
export declare const BlogModel: mongoose.Model<blogDbType, {}, {}, {}, mongoose.Document<unknown, {}, blogDbType> & blogDbType & Required<{
    _id: import("mongodb").ObjectId;
}>, any>;
export declare const UserModel: mongoose.Model<userDbType, {}, {}, {}, mongoose.Document<unknown, {}, userDbType> & userDbType & Required<{
    _id: import("mongodb").ObjectId;
}>, any>;
export declare const CommentsModel: mongoose.Model<import("./types/comment-type").CommentDbModelType, {}, import("./types/db-schemas/Comments").commentMethodsType, {}, mongoose.Document<unknown, {}, import("./types/comment-type").CommentDbModelType> & Omit<import("./types/comment-type").CommentDbModelType & Required<{
    _id: import("mongodb").ObjectId;
}>, keyof import("./types/db-schemas/Comments").commentMethodsType> & import("./types/db-schemas/Comments").commentMethodsType, mongoose.Schema<import("./types/comment-type").CommentDbModelType, mongoose.Model<import("./types/like-type").commentsLikeType, {}, import("./types/db-schemas/Comments").commentMethodsType, {}, mongoose.Document<unknown, {}, import("./types/like-type").commentsLikeType> & Omit<import("./types/like-type").commentsLikeType & {
    _id: mongoose.Types.ObjectId;
}, keyof import("./types/db-schemas/Comments").commentMethodsType> & import("./types/db-schemas/Comments").commentMethodsType, any>, import("./types/db-schemas/Comments").commentMethodsType, {}, {}, {}, mongoose.DefaultSchemaOptions, import("./types/comment-type").CommentDbModelType, mongoose.Document<unknown, {}, mongoose.FlatRecord<import("./types/comment-type").CommentDbModelType>> & Omit<mongoose.FlatRecord<import("./types/comment-type").CommentDbModelType> & Required<{
    _id: import("mongodb").ObjectId;
}>, keyof import("./types/db-schemas/Comments").commentMethodsType> & import("./types/db-schemas/Comments").commentMethodsType>>;
export declare const TokenModel: mongoose.Model<TokenDbType, {}, {}, {}, mongoose.Document<unknown, {}, TokenDbType> & TokenDbType & Required<{
    _id: import("mongodb").ObjectId;
}>, any>;
export declare const SecurityDevicesModel: mongoose.Model<securityDevicesDbType, {}, {}, {}, mongoose.Document<unknown, {}, securityDevicesDbType> & securityDevicesDbType & Required<{
    _id: import("mongodb").ObjectId;
}>, any>;
export declare const ReqUserModel: mongoose.Model<requestUserDbType, {}, {}, {}, mongoose.Document<unknown, {}, requestUserDbType> & requestUserType & {
    _id: import("mongodb").ObjectId;
} & Required<{
    _id: import("mongodb").ObjectId;
}>, any>;
export declare const LikeCommentsModel: mongoose.Model<import("./types/like-type").commentsLikeType, {}, {}, {}, mongoose.Document<unknown, {}, import("./types/like-type").commentsLikeType> & import("./types/like-type").commentsLikeType & {
    _id: mongoose.Types.ObjectId;
}, mongoose.Schema<import("./types/like-type").commentsLikeType, mongoose.Model<import("./types/like-type").commentsLikeType, any, any, any, mongoose.Document<unknown, any, import("./types/like-type").commentsLikeType> & import("./types/like-type").commentsLikeType & {
    _id: mongoose.Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, import("./types/like-type").commentsLikeType, mongoose.Document<unknown, {}, mongoose.FlatRecord<import("./types/like-type").commentsLikeType>> & mongoose.FlatRecord<import("./types/like-type").commentsLikeType> & {
    _id: mongoose.Types.ObjectId;
}>>;
export declare const runDb: () => Promise<void>;
