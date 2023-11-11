import { NextFunction, Request, Response } from "express";
import { requestWithBody } from "../types/root-type";
import { loginType } from "../types/auth-type";
import { QueryUserRepository } from "../repositories/query/query-UserRepository";
import { queryOldPasswordRepo } from "../repositories/query/query-oldPass";
import { cryptoService } from "../application/crypto-service";



export const loginMiddleware = async(req:requestWithBody<loginType>, res:Response, next:NextFunction) => {
    const user = await QueryUserRepository.checkUser(req.body)
    if(!user) {
        res.sendStatus(401)
        return
    }
    const checkOldPass = await queryOldPasswordRepo.getOldPassword(user._id.toString())
    if(checkOldPass){
        const hash = await cryptoService.genHash(req.body.password)
        if(checkOldPass.hashPassword === hash.hash){
            res.sendStatus(401)
            return
        } else {
            next()
        }
    }
    next()
}