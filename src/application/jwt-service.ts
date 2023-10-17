import { configuration } from "../configuration";
import { userDbType } from "../types/user-type";
import jwt from "jsonwebtoken"


export const jwtService = {
    async createAccesToken(user:userDbType){
        const token = jwt.sign({userId: user._id}, configuration.ACCESS_SECRET,{expiresIn:'1h'})
        return token
    }
}