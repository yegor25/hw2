import { NextFunction, Request, Response } from "express";
import { jwtService } from "../application/jwt-service";
import { QueryUserRepository } from "../repositories/query/query-UserRepository";



export const checkRefreshToken = async(req:Request, res:Response, next: NextFunction) => {
    const token = req.cookies.refreshToken
    if(!token){
        res.sendStatus(401)
        return
    }
    try {
        const isValid:any = await jwtService.checkRefreshToken(token)
        req.user = await QueryUserRepository.findUserById(isValid.userId)
        if(isValid) next()
        res.sendStatus(401)
    } catch (error) {
        res.sendStatus(401)
        return
    }
}