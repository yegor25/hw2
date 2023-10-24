import { NextFunction, Request, Response } from "express";
import { jwtService } from "../application/jwt-service";
import { QueryUserRepository } from "../repositories/query/query-UserRepository";



export const checkRefreshToken = async(req:Request, res:Response, next: NextFunction) => {
    const token = req.cookies.refreshToken
    if(!token){
        res.sendStatus(401)
        return
    }
    const isValid = await jwtService.checkRefreshToken(token)
    if(!isValid){
        res.sendStatus(401)
        return
    }
    next()
}