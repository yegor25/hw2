import { PassRecoveryModel } from "../../types/db-schemas/PassRecovery"
import { passRecoveryDbType } from "../../types/user-type"


// export const queryRecoverPass = {
//     async checkCode(code: string):Promise<passRecoveryDbType | null>{
//         const query = await PassRecoveryModel.findOne({recoveryCode: code})
//         return query
//     }
// }

class QueryRecoverPass {
    async checkCode(code: string):Promise<passRecoveryDbType | null>{
        const query = await PassRecoveryModel.findOne({recoveryCode: code})
        return query
    }
}

export const queryRecoverPass = new QueryRecoverPass()