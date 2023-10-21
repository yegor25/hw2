import { mailAdapter } from "../adapters/mail-adapter"



export const mailManager = {
    async registerConfirmation(email: string, code: string){
        const subject = "Активация вашего аккаунта в системе"
        const message = `<h1>Thank for your registration</h1>
                        <p>To finish registration please follow the link below:
                        <b>${code}</b>
                    </p>`
        return mailAdapter.send(email,subject,message)
    }
}