import { Router, Request, Response } from "express";
import { requestWithBody } from "../types/root-type";
import { loginType } from "../types/auth-type";
import { QueryUserRepository } from "../repositories/query/query-UserRepository";
import { authValidate, authValidator } from "../middlewares/auth-validator";
import { jwtService } from "../application/jwt-service";
import { userDbType, userInputType } from "../types/user-type";
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
import { loginMiddleware } from "../middlewares/login-middleware";
import { AuthService } from "../domain/auth-service";
import { UserService } from "../domain/user-service";
import { UserRepository } from "../repositories/mutation/user-repository";
import { authControllerInstance } from "../composition-root";


export const authRouter = Router({})



//
// const authControllerInstance = new AuthController(new AuthService(new UserRepository()), new UserService(new UserRepository()))
authRouter.post("/login", authValidator, authValidate, rateLimiting, loginMiddleware, authControllerInstance.loginUser.bind(authControllerInstance))
authRouter.post("/registration", rateLimiting, registerValidator, registerValidate, authControllerInstance.register.bind(authControllerInstance))
authRouter.post("/registration-confirmation", rateLimiting, codeConfiramtionValidator, validateCodeConfirmation, authControllerInstance.registerConfirmation.bind(authControllerInstance))
authRouter.post("/registration-email-resending", rateLimiting, resendingEmailValidator, validateResendingEmail, authControllerInstance.resendingEmail.bind(authControllerInstance))
authRouter.get("/me", authMiddleware, authControllerInstance.authMe.bind(authControllerInstance))
authRouter.post("/logout", checkRefreshToken, authControllerInstance.logout.bind(authControllerInstance))
authRouter.post("/refresh-token", checkRefreshToken, authControllerInstance.refreshToken.bind(authControllerInstance))
authRouter.post("/password-recovery", rateLimiting, passRecoveryValidation, userValidate, authControllerInstance.recoverPass.bind(authControllerInstance))
authRouter.post("/new-password", rateLimiting, recoveryCodeValidator, userValidate, authControllerInstance.changePswd.bind(authControllerInstance))



//https://it-incubator.atlassian.net/wiki/spaces/STUD/pages/381911041/Google