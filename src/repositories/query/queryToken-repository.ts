import { tokensCollection } from "../../db"
import { TokenDbType } from "../../types/tokens-type"



export const QueryTokenRepository = {
    async findToken (token: string): Promise<TokenDbType | null>{
        const data = await tokensCollection.findOne({token: token})
        return data
    }
}
