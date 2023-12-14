import mongoose from "mongoose";
import { PostDbType } from "../post-type";
import { ObjectId } from "mongodb";
export declare const postSchema: mongoose.Schema<PostDbType, mongoose.Model<PostDbType, any, any, any, mongoose.Document<unknown, any, PostDbType> & PostDbType & Required<{
    _id: ObjectId;
}>, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, PostDbType, mongoose.Document<unknown, {}, mongoose.FlatRecord<PostDbType>> & mongoose.FlatRecord<PostDbType> & Required<{
    _id: ObjectId;
}>>;
