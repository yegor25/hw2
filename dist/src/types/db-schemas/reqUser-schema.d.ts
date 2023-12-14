import mongoose from "mongoose";
import { requestUserDbType } from "../requestUserType";
import { ObjectId } from "mongodb";
export declare const reqUserSchema: mongoose.Schema<requestUserDbType, mongoose.Model<requestUserDbType, any, any, any, mongoose.Document<unknown, any, requestUserDbType> & import("../requestUserType").requestUserType & {
    _id: ObjectId;
} & Required<{
    _id: ObjectId;
}>, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, requestUserDbType, mongoose.Document<unknown, {}, mongoose.FlatRecord<requestUserDbType>> & mongoose.FlatRecord<requestUserDbType> & Required<{
    _id: ObjectId;
}>>;
