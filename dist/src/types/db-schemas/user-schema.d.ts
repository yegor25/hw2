import mongoose from "mongoose";
import { userDbType } from "../user-type";
import { ObjectId } from "mongodb";
export declare const userSchema: mongoose.Schema<userDbType, mongoose.Model<userDbType, any, any, any, mongoose.Document<unknown, any, userDbType> & userDbType & Required<{
    _id: ObjectId;
}>, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, userDbType, mongoose.Document<unknown, {}, mongoose.FlatRecord<userDbType>> & mongoose.FlatRecord<userDbType> & Required<{
    _id: ObjectId;
}>>;
