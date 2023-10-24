import { tokensCollection } from "../../db";
import { TokenDbType } from "../../types/tokens-type";



export const tokenRepository = {
    async saveToken(data: TokenDbType):Promise<TokenDbType>{
        const newToken = await tokensCollection.insertOne(data)
        return data
    }
}