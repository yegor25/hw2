import { ObjectId } from "mongodb";
import { requestUserRepository } from "../repositories/mutation/requestUser-repository";
import { requestUserType } from "../types/requestUserType";



// export const requestUserService = {
//     async saveRequestData(data: requestUserType):Promise<requestUserType>{
//         const res = await requestUserRepository.saveRequest({_id: new ObjectId(),...data})
//         return data
//     }
// }


class RequestUserService {
    async saveRequestData(data: requestUserType):Promise<requestUserType>{
        const res = await requestUserRepository.saveRequest({_id: new ObjectId(),...data})
        return data
    }
}

export const requestUserService = new RequestUserService()