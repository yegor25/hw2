import { body, validationResult } from "express-validator";
import { QueryUserRepository } from "../repositories/query/query-UserRepository";
import { NextFunction, Request, Response } from "express";
import { helperValidator } from "./helper/helper-validator";


export const resendingEmailValidator = [
    body("email").exists().isEmail()
    .custom(async(val: string) => {
       const user = await QueryUserRepository.findUserByLoginOrEmail(val)
       if(!user || user.emailConfirmation.isConfirmed) throw new Error("invalid email")
        
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