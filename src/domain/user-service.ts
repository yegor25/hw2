import { ObjectId } from "mongodb";
import { userCollection } from "../db";
import { userRepository } from "../repositories/mutation/user-repository";
import { userDbType, userInputType, userViewType } from "../types/user-type";
import bcrypt from "bcrypt"


const convertId = (id: string) => new ObjectId(id)
export const userService = {
    async createUser(user: userInputType):Promise<userViewType | null>{
        const {password, login, email} = user
        const existUser = await userCollection.findOne({$or: [{email: email}, {login: login} ]})
        if(existUser) {
            return null
        }
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)
        const newUser:userDbType = {
            _id: new ObjectId(),
            login,
            email,
            createdAt: new Date().toISOString(),
            hashPassword,
            passwordSalt: salt
        }
        return userRepository.createUser(newUser)
    },
    async deleteUser (id: string):Promise<boolean> {
        return await userRepository.deleteUser(convertId(id))
    },
   async deleteAllUsers ():Promise<boolean> {
    return userRepository.deleteAllUsers()
   }
}