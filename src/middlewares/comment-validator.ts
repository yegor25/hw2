import { Result, ValidationError, body, validationResult } from "express-validator";
import {  Request,Response, NextFunction } from "express"
import { errorFormatterType } from "../types/root-type";
import { helperValidator } from "./helper/helper-validator";


export const commentValidator = [
    body("content").trim().isLength({min:20, max: 300}).withMessage("invalid content")

]


export const commentValidate = async(req:Request,res:Response, next:NextFunction) => {
   const errorFormatter = helperValidator.errorFomatter
    const errors= validationResult(req).formatWith(errorFormatter)
    if(!errors.isEmpty()){ 
        res.status(400).send({errorsMessages: errors.array({onlyFirstError: true})})
        return
    }
    return next()
}