import { requestUserCollections } from "../../db";
import { requestUserDbType } from "../../types/requestUserType";



export const requestUserRepository = {
    async saveRequest(data: requestUserDbType):Promise<requestUserDbType>{
        const res = await requestUserCollections.insertOne(data)
        return data
    }
}