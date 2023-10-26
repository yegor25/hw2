import { NextFunction, Request, Response } from "express";
import { requestUserService } from "../domain/requestUser-service";
import { QueryRequestUser } from "../repositories/query/query-requestUser";


export const rateLimiting = async (req:Request, res:Response, next:NextFunction) => {
    const URL = req.originalUrl
    const IP = req.ip
    const date = new Date()
    await requestUserService.saveRequestData({URL, IP, date})
    const count = await QueryRequestUser.countLastRequet(URL, IP)
    if(count > 5){
        res.sendStatus(429)
        return
    } else {
        next()
    }

}