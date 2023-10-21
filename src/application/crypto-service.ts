import bcrypt from "bcrypt"


export const cryptoService = {
    async genSalt(){
        const salt = await bcrypt.genSalt(10)
        return salt
    },
    async genHash(password: string){
        const salt = await this.genSalt()
        const hash = await bcrypt.hash(password, salt)
        return {
            salt,
            hash
        }
    }
}