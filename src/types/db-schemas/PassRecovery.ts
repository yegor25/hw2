import mongoose from "mongoose";
import { passRecoveryDbType } from "../user-type";



const passRecoverySchema = new mongoose.Schema<passRecoveryDbType>({
    _id: {type: String},
    userId: {type: String},
    recoveryCode: {type: String},
    expirationDate: {type: Date},

})

export const PassRecoveryModel = mongoose.model<passRecoveryDbType>("passRecovery", passRecoverySchema)