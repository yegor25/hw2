import { loginType } from "../../types/auth-type";
import bcrypt from "bcrypt"
import { paramsUserPaginatorType } from "../../types/paginator-type";
import { userDbType, usersResponseType } from "../../types/user-type";
import { paginatorHelper } from "../helpers/paginator-helper";
import { userHelper } from "../helpers/user-helper";
import { ObjectId } from "mongodb";
import { UserModel } from "../../db";

// export const QueryUserRepository = {
//     async checkUser(data: loginType): Promise<userDbType | null> {
//         const user = await UserModel.findOne({ $or: [{ email: data.loginOrEmail }, { login: data.loginOrEmail }] })
//         if (!user) {
//             return null
//         }
//         const hashedPassword = await bcrypt.hash(data.password, user.passwordSalt)
//         if (hashedPassword !== user.hashPassword) {
//             return null
//         }
//         return user
//     },
//     async findUsers(params: paramsUserPaginatorType): Promise<usersResponseType> {
//         const parametres = paginatorHelper.usersParamsMapper(params)
//         const skipCount = (+parametres.pageNumber - 1) * Number(parametres.pageSize)
//         const users = await UserModel.find({
//             $or: [
//                 { email: { $regex: parametres.searchEmailTerm, $options: "i" } },
//                 { login: { $regex: parametres.searchLoginTerm, $options: "i" } }
//             ]
//         }
//         )
//         .sort({[parametres.sortBy]: parametres.sortDirection})
//         .skip(skipCount)
//         .limit(+parametres.pageSize)
//         .lean()

//         const totalCount = await UserModel.countDocuments({
//             $or: [
//                 { email: { $regex: parametres.searchEmailTerm, $options: "i" } },
//                 { login: { $regex: parametres.searchLoginTerm, $options: "i" } }
//             ]
//         })
//         return {
//             pagesCount: Math.ceil(totalCount/+parametres.pageSize),
//             page: +parametres.pageNumber,
//             pageSize: +parametres.pageSize,
//             totalCount,
//             items: userHelper.convertArrayUser(users)
//         }
//     },
//     async findUserById(id: ObjectId){
//         const user = await UserModel.findOne({_id: id})
//         return user
//     },
//     async findUserByLoginOrEmail(val: string):Promise<userDbType | null>{
//         const user = await UserModel.findOne({
//             $or: [
//                 {login: val},
//                 {email: val}
//             ]
//         })
//         if( user) return user
//         return null
//     },
    


    
// }



class queryUserRepository {
    async checkUser(data: loginType): Promise<userDbType | null> {
        const user = await UserModel.findOne({ $or: [{ email: data.loginOrEmail }, { login: data.loginOrEmail }] })
        if (!user) {
            return null
        }
        const hashedPassword = await bcrypt.hash(data.password, user.passwordSalt)
        if (hashedPassword !== user.hashPassword) {
            return null
        }
        return user
    }
    async findUsers(params: paramsUserPaginatorType): Promise<usersResponseType> {
        const parametres = paginatorHelper.usersParamsMapper(params)
        const skipCount = (+parametres.pageNumber - 1) * Number(parametres.pageSize)
        const users = await UserModel.find({
            $or: [
                { email: { $regex: parametres.searchEmailTerm, $options: "i" } },
                { login: { $regex: parametres.searchLoginTerm, $options: "i" } }
            ]
        }
        )
        .sort({[parametres.sortBy]: parametres.sortDirection})
        .skip(skipCount)
        .limit(+parametres.pageSize)
        .lean()

        const totalCount = await UserModel.countDocuments({
            $or: [
                { email: { $regex: parametres.searchEmailTerm, $options: "i" } },
                { login: { $regex: parametres.searchLoginTerm, $options: "i" } }
            ]
        })
        return {
            pagesCount: Math.ceil(totalCount/+parametres.pageSize),
            page: +parametres.pageNumber,
            pageSize: +parametres.pageSize,
            totalCount,
            items: userHelper.convertArrayUser(users)
        }
    }
    async findUserById(id: ObjectId){
        const user = await UserModel.findOne({_id: id})
        return user
    }
    async findUserByLoginOrEmail(val: string):Promise<userDbType | null>{
        const user = await UserModel.findOne({
            $or: [
                {login: val},
                {email: val}
            ]
        })
        if( user) return user
        return null
    }
    
}

export const QueryUserRepository = new queryUserRepository()