import { TokenModel } from "../../db"
import { TokenDbType } from "../../types/tokens-type"



// export const QueryTokenRepository = {
//     async findToken (token: string): Promise<TokenDbType | null>{
//         const data = await TokenModel.findOne({token: token})
//         return data
//     }
// }


class queryTokenRepository {
    async findToken (token: string): Promise<TokenDbType | null>{
        const data = await TokenModel.findOne({token: token})
        return data
    }
}

export const QueryTokenRepository = new queryTokenRepository()
