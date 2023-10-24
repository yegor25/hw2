import { ObjectId } from "mongodb";
import { configuration } from "../configuration";
import { userDbType } from "../types/user-type";
import jwt from "jsonwebtoken"


export const jwtService = {
    async createAccesToken(user: userDbType) {
        const token = jwt.sign({ userId: user._id}, configuration.ACCESS_SECRET, { expiresIn: '10s' })
        return token
    },
    async createRefreshToken(user: userDbType){
        const token = jwt.sign(
            {userId: user._id},
            configuration.REFRESH_SECRET,
            {expiresIn: "20s"}
        )
        return token
    },
    async checkRefreshToken(token: string){
        try {
            const isValid = jwt.verify(token, configuration.REFRESH_SECRET)
        } catch (error) {
            return null
        }
        

    },
    async getUserIdByToken(token: string) {
        try {
            const result: any = jwt.verify(token, configuration.ACCESS_SECRET)
            return new ObjectId(result.userId)
        } catch (error) {
            return null
        }

    }
}