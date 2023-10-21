import { userCollection } from "../db"
import { mailManager } from "../managers/mail-manager"
import { userHelper } from "../repositories/helpers/user-helper"
import { userRepository } from "../repositories/mutation/user-repository"
import { userInputType } from "../types/user-type"
import { helper } from "./helper"



export const authService = {
    async registerUser(data: userInputType):Promise<boolean>{
        const {email, login} = data
        // const existUser = await userCollection.findOne({$or: [{email: email}, {login: login} ]})
        // if(existUser) {
        //     return false
        // }
        const newUser = await helper.userDbViewMapper(data)
        const res = await userRepository.createUser(newUser)
        const message = await mailManager.registerConfirmation(email, newUser.emailConfirmation.code)
        return true
    }
}