import { PassRecoveryModel } from "../../types/models/PassRecovery"
import { passRecoveryDbType } from "../../types/user-type"



export const passRecoveryRepository = {
    async createPassRecoveryCode(data: passRecoveryDbType):Promise<string>{
        const res = await PassRecoveryModel.create(data)
        return res.recoveryCode
    }
}