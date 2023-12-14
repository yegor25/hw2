import mongoose from "mongoose";
import { blogDbType } from "../blog-type";
import { ObjectId } from "mongodb";
export declare const blogSchema: mongoose.Schema<blogDbType, mongoose.Model<blogDbType, any, any, any, mongoose.Document<unknown, any, blogDbType> & blogDbType & Required<{
    _id: ObjectId;
}>, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, blogDbType, mongoose.Document<unknown, {}, mongoose.FlatRecord<blogDbType>> & mongoose.FlatRecord<blogDbType> & Required<{
    _id: ObjectId;
}>>;
