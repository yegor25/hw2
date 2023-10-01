

import {  Response, NextFunction } from "express"
import { requestWithBody } from "../types/root-type"
import {  body, validationResult } from "express-validator"
import { postBodyType } from "../types/post-type"
import { blogsRepository } from "../repositories/blog-repository"

export const postValidator =  [
    body("title").exists().isString().notEmpty().trim().isLength({min: 3,max: 30}).withMessage("invalid title"),
    body("shortDescription").trim().notEmpty().isString().isLength({min: 3,max: 100}).withMessage("invalid short description"),
    body("content").trim().notEmpty().isString().isLength({min: 3,max: 1000}).withMessage("invalid content"),
    body("blogId").exists().trim().isString().notEmpty().withMessage("required valid blogId"),
    body("blogId").custom( async (val) => await blogsRepository.findBlogById(val))
    
]

export const postValidate = (req:requestWithBody<postBodyType>, res:Response, next:NextFunction) => {
   
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