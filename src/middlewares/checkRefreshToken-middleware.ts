import { NextFunction, Request, Response } from "express";
import { jwtService } from "../application/jwt-service";



export const checkRefreshToken = async(req:Request, res:Response, next: NextFunction) => {
    const token = req.cookies.refreshToken
    if(!token){
        res.sendStatus(401)
        return
    }
    try {
        const isValid = await jwtService.checkRefreshToken(token)
        if(isValid) next()
        res.sendStatus(401)
    } catch (error) {
        res.sendStatus(401)
        return
    }
}