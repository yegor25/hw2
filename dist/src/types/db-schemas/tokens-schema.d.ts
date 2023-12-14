import mongoose from "mongoose";
import { TokenDbType } from "../tokens-type";
import { ObjectId } from "mongodb";
export declare const tokenSchema: mongoose.Schema<TokenDbType, mongoose.Model<TokenDbType, any, any, any, mongoose.Document<unknown, any, TokenDbType> & TokenDbType & Required<{
    _id: ObjectId;
}>, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, TokenDbType, mongoose.Document<unknown, {}, mongoose.FlatRecord<TokenDbType>> & mongoose.FlatRecord<TokenDbType> & Required<{
    _id: ObjectId;
}>>;
