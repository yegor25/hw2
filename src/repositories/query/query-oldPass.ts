import { OldPassword } from "../../db"
import { oldPasswordType } from "../../types/models/OldPasswors"


export const queryOldPasswordRepo = {
    async getOldPassword(userId: string):Promise<oldPasswordType | null> {
        const pass = await OldPassword.findOne({userId: userId})
        return pass
    }
}