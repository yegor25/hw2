import { body, validationResult } from "express-validator";
import { QueryUserRepository } from "../repositories/query/query-UserRepository";
import { NextFunction, Request, Response } from "express";
import { helperValidator } from "./helper/helper-validator";


export const registerValidator = [
    body("login").isString().trim().notEmpty()
        .custom(async (val) => {
            const user = await QueryUserRepository.findUserByLoginOrEmail(val)
            if(user) throw new Error()
               
        })
        .withMessage("invalid login"),
    body("email").isString().trim().notEmpty().isEmail().custom(async (val) => {
        const user = await QueryUserRepository.findUserByLoginOrEmail(val)
            if(user) throw new Error()
    }).withMessage("invalid login"),
    body("password").isString().trim().notEmpty().isLength({ min: 6, max: 20 }).withMessage("invalid password")
]

export const registerValidate = async (req: Request, res: Response, next: NextFunction) => {
    const error = validationResult(req).formatWith(helperValidator.errorFomatter)
    if (!error.isEmpty()) {
        res.status(400).send({ errorsMessages: error.array() })
        return
    }
    next()
}