import { ValidationChain, body, validationResult } from "express-validator";
import {NextFunction, Request, Response} from "express"

export const userValidator:ValidationChain[] = [
    body("email").isString().trim().notEmpty().isLength({max: 20, min: 6}).withMessage("invalid length").isEmail().matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/).withMessage("invalid email"),
    body("login").isString().trim().notEmpty().isLength({min: 3, max: 10}).matches(/^[a-zA-Z0-9_-]*$/).withMessage("invalid login"),
    body("password").isString().trim().notEmpty().isLength({min: 6, max: 20}).withMessage("invalid password")

]

export const userValidate = async (req:Request, res:Response, next: NextFunction) => {
    const errorFormatter = ({msg,path}:any): {message: string, field: string} => {
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