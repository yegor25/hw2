import { body } from "express-validator";
import { queryRecoverPass } from "../repositories/query/query-recoveryPass";



export const recoveryCodeValidator = [
    body("recoveryCode").exists().custom( async(val: string) => {
        const validCode = await queryRecoverPass.checkCode(val)
        if(!validCode) throw new Error("invalid")
        if( validCode.expirationDate < new Date()) throw new Error("expire")
        
    }).withMessage("invalid code"),
    body("newPassword").isString().trim().notEmpty().isLength({min: 6, max: 20}).withMessage("invalid password")
]