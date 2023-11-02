import { Router, Request, Response } from "express";
import { requestWithBody } from "../types/root-type";
import { loginType } from "../types/auth-type";
import { QueryUserRepository } from "../repositories/query/query-UserRepository";
import { authValidate, authValidator } from "../middlewares/auth-validator";
import { jwtService } from "../application/jwt-service";
import { userDbType, userInputType } from "../types/user-type";
import { authService } from "../domain/auth-service";
import { registerValidate, registerValidator } from "../middlewares/register-validator";
import { codeConfiramtionValidator, validateCodeConfirmation } from "../middlewares/codeConfirmation-validator";
import { resendingEmailValidator, validateResendingEmail } from "../middlewares/resendingEmail-validator";
import { authMiddleware } from "../middlewares/auth-middleware";
import { checkRefreshToken } from "../middlewares/checkRefreshToken-middleware";
import { sessionService } from "../domain/session-service";
import { rateLimiting } from "../middlewares/rateLimiting-middleware";
import { passRecoveryValidation } from "../middlewares/passRecovery-validation";
import { userValidate } from "../middlewares/user-validation";
import { recoveryCodeValidator } from "../middlewares/recoveryCode-validator";
import { userService } from "../domain/user-service";


export const authRouter = Router({})

authRouter.post("/login",authValidator,authValidate ,rateLimiting,async (req:requestWithBody<loginType>, res: Response) => {
    
    const user = await QueryUserRepository.checkUser(req.body)
    if(!user){
        res.sendStatus(401)
        return
    }
    
    const ip = req.ip
    const title = req.headers["user-agent"] || "Chrome 105"
    const session = await authService.saveSession({ip, title,userId: user?._id.toString()})
   
console.log(session)
    const token = await jwtService.createAccesToken(user)
    const refresh = await jwtService.createRefreshToken(user, session.deviceId)
    res.cookie("refreshToken", refresh, {httpOnly: true, secure: true})
    res.status(200).send({accessToken: token})
})
authRouter.post("/registration",rateLimiting,registerValidator, registerValidate ,async (req:requestWithBody<userInputType>, res: Response) => {
    await authService.registerUser(req.body) 
    res.sendStatus(204)
})
authRouter.post("/registration-confirmation", rateLimiting,codeConfiramtionValidator, validateCodeConfirmation,async (req:requestWithBody<{code: string}>,res:Response) => {
    
    const code = req.body.code
    
     await authService.confirmUser(code)
   
    res.sendStatus(204)
})
authRouter.post("/registration-email-resending", rateLimiting,resendingEmailValidator, validateResendingEmail,async (req:requestWithBody<{email: string}>,res:Response) => {
     await authService.resendingEmail(req.body.email)
    
    res.sendStatus(204)
})
authRouter.get("/me",authMiddleware,async(req:Request, res: Response) => {
    if(req.user){
        const {email,login,_id} = req.user
        const userId = _id.toString()
        res.status(200).send({email, login, userId})
        return
    }
    res.sendStatus(401)
})
authRouter.post("/logout", checkRefreshToken,async(req:Request, res:Response) => {
    if(req.user) await authService.saveOldToken(req.cookies.refreshToken, req.user?._id.toString() as string)
    await sessionService.deactivateSession(req.body.deviceId)
    res.clearCookie("refreshToken")
    res.sendStatus(204)
})
authRouter.post("/refresh-token", checkRefreshToken,async(req:Request, res:Response) => {
    
    const user = req.user as userDbType
    if(user) await authService.saveOldToken(req.cookies.refreshToken, req.user?._id.toString() as string)
    const refreshToken = await jwtService.createRefreshToken(user, req.body.deviceId)
    const accessToken = await jwtService.createAccesToken(user)
    await sessionService.changectiveDate(req.body.deviceId)
    res.cookie("refreshToken", refreshToken,{httpOnly: true, secure: true})
    res.status(200).send({accessToken})
})
authRouter.post("/password-recovery", rateLimiting,passRecoveryValidation, userValidate,async (req:requestWithBody<{email: string}>, res:Response) => {
    await authService.recoverPassword(req.body.email)
    res.sendStatus(204)
})
authRouter.post("/new-password", rateLimiting,recoveryCodeValidator, userValidate,async (req:requestWithBody<{newPassword: string,recoveryCode: string}>, res: Response) => {
    const {newPassword, recoveryCode} = req.body
    await userService.recoverPassword(newPassword, recoveryCode)
    res.sendStatus(204)
})