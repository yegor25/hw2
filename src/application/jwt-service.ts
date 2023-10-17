import { ObjectId } from "mongodb";
import { configuration } from "../configuration";
import { userDbType } from "../types/user-type";
import jwt from "jsonwebtoken"


export const jwtService = {
    async createAccesToken(user: userDbType) {
        const token = jwt.sign({ userId: user._id.toString() }, configuration.ACCESS_SECRET, { expiresIn: '1h' })
        return token
    },
    async getUserIdByToken(token: string) {
        try {
            const result: any = jwt.verify(token, configuration.ACCESS_SECRET)
            console.log("result", result)
            return new ObjectId(result.userId)
        } catch (error) {
            return null
        }

    }
}