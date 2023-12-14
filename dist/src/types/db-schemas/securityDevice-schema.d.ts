import mongoose from "mongoose";
import { ObjectId } from "mongodb";
import { securityDevicesDbType } from "../securityDevices-type";
export declare const securityDeviceSchema: mongoose.Schema<securityDevicesDbType, mongoose.Model<securityDevicesDbType, any, any, any, mongoose.Document<unknown, any, securityDevicesDbType> & securityDevicesDbType & Required<{
    _id: ObjectId;
}>, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, securityDevicesDbType, mongoose.Document<unknown, {}, mongoose.FlatRecord<securityDevicesDbType>> & mongoose.FlatRecord<securityDevicesDbType> & Required<{
    _id: ObjectId;
}>>;
