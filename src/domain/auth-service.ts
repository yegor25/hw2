import { mailManager } from "../managers/mail-manager"
import { userInputType } from "../types/user-type"



export const authService = {
    async registerUser(data: userInputType){
        const {email} = data
        const message = await mailManager.registerConfirmation(email)
        console.log("mes", message)
    }
}