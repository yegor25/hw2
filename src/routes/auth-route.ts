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
import { resendingEmailValidator, validateResendingEmail } from "../middlewares/resendingEmail-validator";
import { authMiddleware } from "../middlewares/auth-middleware";
import { checkRefreshToken } from "../middlewares/checkRefreshToken-middleware";


export const authRouter = Router({})

authRouter.post("/login",authValidator, authValidate ,async (req:requestWithBody<loginType>, res: Response) => {
    const user = await QueryUserRepository.checkUser(req.body)
    if(!user){
        res.sendStatus(401)
        return
    }
    const token = await jwtService.createAccesToken(user)
    const refresh = await jwtService.createRefreshToken(user)
    res.cookie("refreshToken", refresh, {httpOnly: true, secure: true})
    res.status(200).send({accessToken: token})
})
authRouter.post("/registration",registerValidator, registerValidate ,async (req:requestWithBody<userInputType>, res: Response) => {
    const user = await authService.registerUser(req.body) 
    res.sendStatus(204)
})
authRouter.post("/registration-confirmation", codeConfiramtionValidator, validateCodeConfirmation,async (req:requestWithBody<{code: string}>,res:Response) => {
    
    const code = req.body.code
    // console.log("code", code)
    // if(!code){
    //     res.sendStatus(400)
    //     return
    // }
    const confirmedUser = await authService.confirmUser(code)
    // if(!confirmedUser){
    //     res.sendStatus(400)
    //     return
    // }
    res.sendStatus(204)
})
authRouter.post("/registration-email-resending", resendingEmailValidator, validateResendingEmail,async (req:requestWithBody<{email: string}>,res:Response) => {
    const resending = await authService.resendingEmail(req.body.email)
    
    res.sendStatus(204)
})
authRouter.get("/me", authMiddleware,async(req:Request, res: Response) => {
    if(req.user){
        const {email,login,_id} = req.user
        const userId = _id.toString()
        res.status(200).send({email, login, userId})

    }
    res.sendStatus(401)
})
authRouter.post("/logout", checkRefreshToken,async(req:Request, res:Response) => {
    res.clearCookie("refreshToken")
    res.sendStatus(204)
})
authRouter.post("/refresh-token", checkRefreshToken,async(req:Request, res:Response) => {
    
    
    // const refreshToken = await jwtService.createRefreshToken(user)
    // const accessToken = await jwtService.createAccesToken(user)
    // res.cookie("refreshToken", refreshToken,{httpOnly: true, secure: true})
    res.status(200).send({accessToken:"qwdqw"})
})