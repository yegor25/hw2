import { ObjectId } from "mongodb"
import { userCollection } from "../db"
import { mailManager } from "../managers/mail-manager"
import { userRepository } from "../repositories/mutation/user-repository"
import { TokenDbType } from "../types/tokens-type"
import { userInputType } from "../types/user-type"
import { helper } from "./helper"
import { tokenRepository } from "../repositories/mutation/token-repository"
import { securityDevicesInputType, securityDevicesViewType } from "../types/securityDevices-type"
import { securityDevicesRepository } from "../repositories/mutation/secirityDevices-repository"
import { sessionsHelper } from "../repositories/helpers/sessions-helper"
import { QueryUserRepository } from "../repositories/query/query-UserRepository"
import { passRecoveryRepository } from "../repositories/mutation/passRecovery-repository"



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
    },
    async saveSession(data: securityDevicesInputType):Promise<securityDevicesViewType>{
        const res = await securityDevicesRepository.saveSessions(sessionsHelper.sessionMapperForDb(data))
        return sessionsHelper.sessionViewMapper(res)
    },
    async recoverPassword(email: string):Promise<boolean>{
        const user = await QueryUserRepository.findUserByLoginOrEmail(email)
        if(!user) return true
        const data = helper.recoverPassDataMapper(user._id.toString())
        const dataForRecovery = await passRecoveryRepository.createPassRecoveryCode(data)
        await mailManager.passRecovery(email, dataForRecovery)
        return true
    }
    
}