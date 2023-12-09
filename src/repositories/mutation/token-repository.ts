import { TokenModel } from "../../db";
import { TokenDbType } from "../../types/tokens-type";



// export const tokenRepository = {
//     async saveToken(data: TokenDbType):Promise<TokenDbType>{
//         const newToken = await TokenModel.create(data)
//         return data
//     }
// }


class TokenRepository {
    async saveToken(data: TokenDbType):Promise<TokenDbType>{
        const newToken = await TokenModel.create(data)
        return data
    }
}

export const tokenRepository = new TokenRepository()