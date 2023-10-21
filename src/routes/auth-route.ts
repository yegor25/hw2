import { Router, Request, Response } from "express";
import { requestWithBody, requestWithQuery } from "../types/root-type";
import { loginType } from "../types/auth-type";
import { QueryUserRepository } from "../repositories/query/query-UserRepository";
import { authValidate, authValidator } from "../middlewares/auth-validator";
import { jwtService } from "../application/jwt-service";
import { userInputType } from "../types/user-type";
import { authService } from "../domain/auth-service";
import { registerValidate, registerValidator } from "../middlewares/register-validator";
import { codeConfiramtionValidator, validateCodeConfirmation } from "../middlewares/codeConfirmation-validator";


export const authRouter = Router({})

authRouter.post("/login",authValidator, authValidate ,async (req:requestWithBody<loginType>, res: Response) => {
    const user = await QueryUserRepository.checkUser(req.body)
    if(!user){
        res.sendStatus(401)
        return
    }
    const token = await jwtService.createAccesToken(user)
    res.status(200).send({accessToken: token})
})
authRouter.post("/registration",registerValidator, registerValidate ,async (req:requestWithBody<userInputType>, res: Response) => {
    const user = await authService.registerUser(req.body) 
    res.sendStatus(204)
})
authRouter.post("/registration-confirmation", codeConfiramtionValidator, validateCodeConfirmation,async (req:requestWithBody<{code: string}>,res:Response) => {
    
    const code = req.body.code
    console.log("code", code)
    if(!code){
        res.sendStatus(400)
        return
    }
    const confirmedUser = await authService.confirmUser(code)
    if(!confirmedUser){
        res.sendStatus(400)
        return
    }
    res.status(204)
})