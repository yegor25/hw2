

import {  Response, NextFunction } from "express"
import { requestWithBody } from "../types/root-type"
import {  body, param, validationResult } from "express-validator"
import { postBodyType } from "../types/post-type"
import { blogsRepository } from "../repositories/mutation/blog-repository"
import { ObjectId } from "mongodb"
import { blogService } from "../domain/blog-service"
import { QueryBlogRepositiry } from "../repositories/query/query-BlogsRepository"

export const postValidator =  [
    body("title").exists().isString().notEmpty().trim().isLength({min: 3,max: 30}).withMessage("invalid title"),
    body("shortDescription").trim().notEmpty().isString().isLength({min: 3,max: 100}).withMessage("invalid short description"),
    body("content").trim().notEmpty().isString().isLength({min: 3,max: 1000}).withMessage("invalid content"),
    // body("blogId").exists().trim().isString().notEmpty().custom( async (val) => await blogsRepository.findBlogById(val)).custom(val => ObjectId.isValid(val)).withMessage("required valid blogId"),
    body("blogId").exists().isString().custom(async(val) => {
        await QueryBlogRepositiry.findBlogById(val)
        .then((res) => {
            if(!res) throw new Error("blogid")
        })
    } ).withMessage("required valid blogId"),
    
]
export const postValidatorForBlog = [
    body("title").exists().isString().notEmpty().trim().isLength({min: 3,max: 30}).withMessage("invalid title"),
    body("shortDescription").trim().notEmpty().isString().isLength({min: 3,max: 100}).withMessage("invalid short description"),
    body("content").trim().notEmpty().isString().isLength({min: 3,max: 1000}).withMessage("invalid content"),
    param("blogId").exists().isString().custom(async(val) => {
        await QueryBlogRepositiry.findBlogById(val)
        .then((res) => {
            if(!res) throw new Error("blogid")
        })
    } ).withMessage("required valid blogId"),
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