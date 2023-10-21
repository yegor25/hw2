import { ObjectId } from "mongodb"
import { userDbType, userInputType } from "../types/user-type"
import { cryptoService } from "../application/crypto-service"
import uuid, { v4 } from "uuid"
import { addDays } from "date-fns"

export const helper = {
    async userDbViewMapper(user: userInputType):Promise<userDbType> {
        const passwordData = await cryptoService.genHash(user.password)
        const res:userDbType = {
            _id: new ObjectId(),
            email: user.email,
            login: user.login,
            createdAt: new Date().toISOString(),
            emailConfirmation: {
                code: v4(),
                expirationDate: addDays(new Date,3),
                isConfirmed: false
            },
            hashPassword: passwordData.hash,
            passwordSalt: passwordData.salt
        }
        return res
    }
}