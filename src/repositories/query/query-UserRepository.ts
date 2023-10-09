import { userCollection } from "../../db";
import { loginType } from "../../types/auth-type";
import bcrypt from "bcrypt"

export const QueryUserRepository = {
    async checkUser(data: loginType): Promise<boolean>{
        const user = await userCollection.findOne({$or: [ {email: data.loginOrEmail}, {login: data.loginOrEmail}]})
        if(!user){
            return false
        }
        const passwordUser =  bcrypt.compareSync(user.hashPassword,user.passwordSalt)
        if(!passwordUser){
            return false
        }
        return true
    }
}