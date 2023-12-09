import { ReqUserModel } from "../../db";
import { requestUserDbType } from "../../types/requestUserType";



// export const requestUserRepository = {
//     async saveRequest(data: requestUserDbType):Promise<requestUserDbType>{
//         const res = await ReqUserModel.create(data)
//         return data
//     }
// }


class RequestUserRepository {
    async saveRequest(data: requestUserDbType):Promise<requestUserDbType>{
        const res = await ReqUserModel.create(data)
        return data
    }
}

export const requestUserRepository = new RequestUserRepository()