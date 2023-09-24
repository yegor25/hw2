import {  Response, NextFunction } from "express"
import { requestWithBody } from "../types/root-type"
import { bodyBlogType } from "../types/blog-type"
import {  body, validationResult } from "express-validator"

export const validateBlogShema =  [
    body("name").exists().isString().notEmpty().trim().isLength({min: 3,max: 15}).withMessage("invalid name"),
    body("description").trim().notEmpty().isString().isLength({min: 3,max: 500}).withMessage("invalid description"),
    body("websiteUrl").trim().isString().notEmpty().matches(/^https:\/\/([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$/, "g").withMessage("invalid url")
    
]

export const blogValidate = (req:requestWithBody<bodyBlogType>, res:Response, next:NextFunction) => {
   
    const errorFormatter = ({msg,path}: any): {message: string, field: string} => {
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
        return
    }
}