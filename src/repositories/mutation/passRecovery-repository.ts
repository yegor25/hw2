import { PassRecoveryModel } from "../../types/db-schemas/PassRecovery"
import { passRecoveryDbType } from "../../types/user-type"



// export const passRecoveryRepository = {
//     async createPassRecoveryCode(data: passRecoveryDbType):Promise<string>{
//         const res = await PassRecoveryModel.create(data)
//         return res.recoveryCode
//     }
// }
class PassRecoveryRepository {
    async createPassRecoveryCode(data: passRecoveryDbType):Promise<string>{
        const res = await PassRecoveryModel.create(data)
        return res.recoveryCode
    }
}

export const passRecoveryRepository = new PassRecoveryRepository()