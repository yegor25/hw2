import { body, query, validationResult } from "express-validator";
import { NextFunction, Request, Response } from "express";
import { helperValidator } from "./helper/helper-validator";
import { AuthService } from "../domain/auth-service";
import { UserRepository } from "../repositories/mutation/user-repository";

const userRepository = new UserRepository()
const authService = new AuthService(userRepository)

export const codeConfiramtionValidator = [
    body("code").exists().isString().custom(async(val: string) => {
        const validCode = await authService.confirmUser(val)
        if(!validCode) throw new Error()
    })
.withMessage("invalid code")
]

export const validateCodeConfirmation = async(req:Request, res:Response, next:NextFunction) => {
    const error = validationResult(req).formatWith(helperValidator.errorFomatter)
    if(!error.isEmpty()){
        res.status(400).send({errorsMessages: error.array({onlyFirstError: true})})
        return
    }
    next()
}