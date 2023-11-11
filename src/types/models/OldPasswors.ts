import mongoose from "mongoose";


export type oldPasswordType = {
    hashPassword: string,
    userId: string
}

export const oldPasswordSchema = new mongoose.Schema<oldPasswordType>({
    hashPassword: { type: String},
    userId: {type: String}
})