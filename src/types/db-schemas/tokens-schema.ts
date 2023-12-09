import mongoose from "mongoose";
import { TokenDbType } from "../tokens-type";
import { ObjectId } from "mongodb";



export const tokenSchema = new mongoose.Schema<TokenDbType>({
    _id: ObjectId,
    token: {type: String, required: true},
    userId: {type: String, required: true},
    
})