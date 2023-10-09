import { userCollection } from "../../db";
import { loginType } from "../../types/auth-type";
import bcrypt from "bcrypt"
import { paramsUserPaginatorType } from "../../types/paginator-type";
import { usersResponseType } from "../../types/user-type";
import { paginatorHelper } from "../helpers/paginator-helper";
import { userHelper } from "../helpers/user-helper";

export const QueryUserRepository = {
    async checkUser(data: loginType): Promise<boolean> {
        const user = await userCollection.findOne({ $or: [{ email: data.loginOrEmail }, { login: data.loginOrEmail }] })
        if (!user) {
            return false
        }
        const passwordUser = bcrypt.compareSync(user.hashPassword, user.passwordSalt)
        if (!passwordUser) {
            return false
        }
        return true
    },
    async findUsers(params: paramsUserPaginatorType): Promise<usersResponseType> {
        const parametres = paginatorHelper.usersParamsMapper(params)
        const skipCount = (parametres.pageNumber - 1) * parametres.pageSize
        const users = await userCollection.find({
            $or: [
                { email: { $regex: parametres.searchEmailTerm, $options: "i" } },
                { login: { $regex: parametres.searchLoginTerm, $options: "i" } }
            ]
        }
        )
        .sort({[parametres.sortBy]: parametres.sortDirection})
        .skip(skipCount)
        .limit(parametres.pageSize)
        .toArray()

        const totalCount = await userCollection.countDocuments({
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
    
}