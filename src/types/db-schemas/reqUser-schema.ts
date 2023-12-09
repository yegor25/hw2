import mongoose from "mongoose";
import { requestUserDbType } from "../requestUserType";
import { ObjectId } from "mongodb";



export const reqUserSchema = new mongoose.Schema<requestUserDbType>({
    _id: {type: ObjectId},
    IP: {type: String},
    URL: {type: String},
    date: {type: Date},

})

