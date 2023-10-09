import { body, validationResult } from "express-validator";
import {NextFunction, Request, Response} from "express"
import { requestWithBody } from "../types/root-type";
import { loginType } from "../types/auth-type";

export const authValidator = [
    body("loginOrEmail").isString().trim().notEmpty().withMessage("invalid login"),
    body("password").isString().trim().notEmpty().isLength({min: 6, max: 20}).withMessage("invalid password")
]

export const authValidate = async (req:requestWithBody<loginType>, res:Response, next: NextFunction) => {
    const errorFormatter = ({msg, path}: any): {message: string, field: string} => {
        return {
            message: msg,
            field: path
        }
       
    }
    const errors = validationResult(req).formatWith(errorFormatter)
    if(errors.isEmpty()){
        return next()
    } else {
        res.status(400).send({errorsMessages: errors.array({onlyFirstError: true})})
    }
}