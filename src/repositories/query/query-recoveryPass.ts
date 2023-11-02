import { PassRecoveryModel } from "../../types/models/PassRecovery"
import { passRecoveryDbType } from "../../types/user-type"


export const queryRecoverPass = {
    async checkCode(code: string):Promise<passRecoveryDbType | null>{
        const query = await PassRecoveryModel.findOne({recoveryCode: code})
        return query
    }
}