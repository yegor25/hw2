import { ObjectId } from "mongodb";
import { userDbType, userInputType, userViewType } from "../types/user-type";
import bcrypt from "bcrypt"
import { cryptoService } from "../application/crypto-service";
import { queryRecoverPass } from "../repositories/query/query-recoveryPass";
import { QueryUserRepository } from "../repositories/query/query-UserRepository";
import { oldPasswordRepo } from "../repositories/mutation/oldPassword-repository";
import { UserModel } from "../db";
import { UserRepository } from "../repositories/mutation/user-repository";


const convertId = (id: string) => new ObjectId(id)
 export class UserService {
    constructor(protected userRepository: UserRepository){}
    async createUser(user: userInputType):Promise<userViewType | null>{
        const {password, login, email} = user
        const existUser = await UserModel.findOne({$or: [{email: email}, {login: login} ]})
        if(existUser) {
            return null
        }
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)
        const newUser:userDbType = new userDbType(new ObjectId,login,email,new Date().toISOString(),hashPassword,salt,{code: "none",isConfirmed: true,expirationDate: new Date()})
        return this.userRepository.createUser(newUser)
    }
    async deleteUser (id: string):Promise<boolean> {
        return await this.userRepository.deleteUser(convertId(id))
    }
   async deleteAllUsers ():Promise<boolean> {
    return this.userRepository.deleteAllUsers()
   }
   async recoverPassword(newPassword: string, code: string):Promise<boolean>{
    const hash = await cryptoService.genHash(newPassword)
    const userCode = await queryRecoverPass.checkCode(code)
    if(!userCode) return false
    const user = await QueryUserRepository.findUserById(convertId(userCode.userId))
    if(!user) return false
     await oldPasswordRepo.savePassword(userCode.userId, user.hashPassword)
    const res = await this.userRepository.changePassword(hash.hash, convertId(userCode.userId), hash.salt)
    if(!res) return false
    return true
   }
}

