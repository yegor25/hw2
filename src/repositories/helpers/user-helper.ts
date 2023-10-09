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
    }
}