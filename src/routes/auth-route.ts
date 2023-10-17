import { Router, Request, Response } from "express";
import { requestWithBody } from "../types/root-type";
import { loginType } from "../types/auth-type";
import { QueryUserRepository } from "../repositories/query/query-UserRepository";
import { authValidate, authValidator } from "../middlewares/auth-validator";
import { jwtService } from "../application/jwt-service";


export const authRouter = Router({})

authRouter.post("/login",authValidator, authValidate ,async (req:requestWithBody<loginType>, res: Response) => {
    const user = await QueryUserRepository.checkUser(req.body)
    if(!user){
        res.sendStatus(401)
        return
    }
    const token = await jwtService.createAccesToken(user)
    res.status(200).send("saxcsa")
})