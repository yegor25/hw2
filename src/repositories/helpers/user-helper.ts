import { userDbType, userViewType } from "../../types/user-type";



export const userHelper = {
    convertUserDTO(user: userDbType):userViewType {
        const res:userViewType = {
            id: user._id.toString(),
            login: user.login,
            email: user.email,
            createdAt: user.createdAt
        }
        return res
    },
    convertArrayUser(users: userDbType[]):userViewType[] {
        const res:userViewType[] = users.map(el => ({
            id: el._id.toString(),
            login: el.login,
            email: el.email,
            createdAt: el.createdAt
        }))
        return res
    }
}