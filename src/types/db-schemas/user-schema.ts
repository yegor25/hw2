import mongoose from "mongoose";
import { userDbType } from "../user-type";
import { ObjectId } from "mongodb";



export const userSchema = new mongoose.Schema<userDbType>({
    _id: ObjectId,
    login: {type: String, required: true},
    email: {type: String, required: true},
    createdAt: {type: String, required: true},
    hashPassword: {type: String, required: true},
    passwordSalt: {type: String, required: true},
    emailConfirmation: {
        code: {type: String},
        isConfirmed: {type: Boolean},
        expirationDate: {type: Date}
    }
})