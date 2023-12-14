import mongoose from "mongoose";
import { passRecoveryDbType } from "../user-type";
export declare const PassRecoveryModel: mongoose.Model<passRecoveryDbType, {}, {}, {}, mongoose.Document<unknown, {}, passRecoveryDbType> & passRecoveryDbType & Required<{
    _id: import("mongodb").ObjectId;
}>, any>;
