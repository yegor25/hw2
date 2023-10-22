import { body, validationResult } from "express-validator";
import { QueryUserRepository } from "../repositories/query/query-UserRepository";
import { NextFunction, Request, Response } from "express";
import { helperValidator } from "./helper/helper-validator";


export const resendingEmailValidator = [
    body("email").exists().trim().isEmail()
    .custom(async(val: string) => {
       const user = await QueryUserRepository.findUserByLoginOrEmail(val)
       if(!user )  throw new Error("invalid email")
        if( user.emailConfirmation.isConfirmed) throw new Error("already confirmed")
        if(user.emailConfirmation.expirationDate > new Date) throw new Error("email")
    })
    .withMessage("invalid email")
]


export const validateResendingEmail = async (req:Request, res:Response, next:NextFunction) => {
    const errors = validationResult(req).formatWith(helperValidator.errorFomatter)
    if(!errors.isEmpty()){
        res.status(400).send({errorsMessages: errors.array()})
        return
    }
    next()
}