import { mailAdapter } from "../adapters/mail-adapter"



export const mailManager = {
    async registerConfirmation(email: string){
        const subject = "Активация вашего аккаунта в системе"
        const message = `<a href="http://ipluse.ru">Перейдите по ссылке для активации</a>`
        return mailAdapter.send(email,subject,message)
    }
}