import { NextFunction, Request, Response } from "express";
import { jwtService } from "../application/jwt-service";
import { QueryUserRepository } from "../repositories/query/query-UserRepository";
import { ObjectId } from "mongodb";
import { QueryTokenRepository } from "../repositories/query/queryToken-repository";



export const checkRefreshToken = async(req:Request, res:Response, next: NextFunction) => {
    const token = req.cookies.refreshToken
    if(!token){
        res.sendStatus(401)
        return
    }
    const isValid:any = await jwtService.checkRefreshToken(token)
    if(!isValid){
        res.sendStatus(401)
        return
    } else {
        // const tokenOfBlackList = await QueryTokenRepository.findToken(token)
        // if (tokenOfBlackList){
        //     res.sendStatus(401)
        //     return
        // }
        req.user = await  QueryUserRepository.findUserById(new ObjectId(isValid.userId))
        req.body.deviceId = isValid.deviceId
        next()
    }
    
}