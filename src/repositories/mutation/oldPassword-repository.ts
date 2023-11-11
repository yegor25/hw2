import { OldPassword } from "../../db"



export const oldPasswordRepo = {
    async savePassword(userId: string, hash: string){
        const pass = await OldPassword.create({
            hashPassword: hash,
            userId
        })
        return pass
    }
    
} 