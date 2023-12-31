import { ObjectId } from "mongodb";
import { configuration } from "../configuration";
import { userDbType } from "../types/user-type";
import jwt from "jsonwebtoken"


// export const jwtService = {
//     async createAccesToken(user: userDbType) {
//         const token = jwt.sign({ userId: user._id}, configuration.ACCESS_SECRET, { expiresIn: '10m' })
//         return token
//     },
//     async createRefreshToken(user: userDbType, deviceId: string){
//         const token = jwt.sign(
//             {userId: user._id, deviceId},
//             configuration.REFRESH_SECRET,
//             {expiresIn: "30m"}
//         )
//         return token
//     },
//     async checkRefreshToken(token: string){
//         try {
//             const isValid = jwt.verify(token, configuration.REFRESH_SECRET)
//             return isValid
//         } catch (error) {
//             return null
//         }
        

//     },
//     async getUserIdByToken(token: string) {
//         try {
//             const result: any = jwt.verify(token, configuration.ACCESS_SECRET)
//             return new ObjectId(result.userId)
//         } catch (error) {
//             return null
//         }

//     }
// }

class JWTservice {
    async createAccesToken(user: userDbType) {
        const token = jwt.sign({ userId: user._id}, configuration.ACCESS_SECRET, { expiresIn: '10m' })
        return token
    }
    async createRefreshToken(user: userDbType, deviceId: string){
        const token = jwt.sign(
            {userId: user._id, deviceId},
            configuration.REFRESH_SECRET,
            {expiresIn: "30m"}
        )
        return token
    }
    async checkRefreshToken(token: string){
        try {
            const isValid = jwt.verify(token, configuration.REFRESH_SECRET)
            return isValid
        } catch (error) {
            return null
        }
        

    }
    async getUserIdByToken(token: string) {
        try {
            const result: any = jwt.verify(token, configuration.ACCESS_SECRET)
            return new ObjectId(result.userId)
        } catch (error) {
            return null
        }

    }
}

export const jwtService = new JWTservice()