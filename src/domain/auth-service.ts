import { ObjectId } from "mongodb"
import { userCollection } from "../db"
import { mailManager } from "../managers/mail-manager"
import { userRepository } from "../repositories/mutation/user-repository"
import { TokenDbType } from "../types/tokens-type"
import { userInputType } from "../types/user-type"
import { helper } from "./helper"
import { tokenRepository } from "../repositories/mutation/token-repository"



export const authService = {
    async registerUser(data: userInputType):Promise<boolean>{
        const {email, login} = data
        const newUser = await helper.userDbViewMapper(data)
        const res = await userRepository.createUser(newUser)
        const message = await mailManager.registerConfirmation(email, newUser.emailConfirmation.code)
        return true
    },
    async confirmUser(code: string):Promise<boolean>{
        const res = await userRepository.checkCodeConfirmation(code)
        return res
    },
    async resendingEmail(email: string): Promise<string>{
        const code = await userRepository.changeConfirmationData(email, helper.confiramtionDataMapper())
        const message = await mailManager.registerConfirmation(email,code)
        return code
    },
    async saveOldToken(token: string, userId: string): Promise<TokenDbType>{
        const data: TokenDbType = {
            _id: new ObjectId(),
            token, 
            userId
        }
        return await tokenRepository.saveToken(data)
    }
}