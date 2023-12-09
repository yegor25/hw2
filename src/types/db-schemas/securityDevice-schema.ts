

import mongoose from "mongoose";
import { ObjectId } from "mongodb";
import { securityDevicesDbType } from "../securityDevices-type";



export const securityDeviceSchema = new mongoose.Schema<securityDevicesDbType>({
    _id: ObjectId,
    ip: {type: String, required: true},
    title: {type: String, required: true},
    lastActiveDate: {type: String, required: true},
    deviceId: {type: String, required: true},
    isActive: {type: Boolean, required: true},
    userId: {type: String, required: true},
    
})