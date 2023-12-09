import { OldPassword } from "../../db"
import { oldPasswordType } from "../../types/db-schemas/OldPasswors"


// export const queryOldPasswordRepo = {
//     async getOldPassword(userId: string):Promise<oldPasswordType | null> {
//         const pass = await OldPassword.findOne({userId: userId})
//         return pass
//     }
// }


class QueryOldPasswordRepo {
    async getOldPassword(userId: string):Promise<oldPasswordType | null> {
        const pass = await OldPassword.findOne({userId: userId})
        return pass
    }
}

export const queryOldPasswordRepo = new QueryOldPasswordRepo()