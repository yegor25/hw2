import { body } from "express-validator";



export const passRecoveryValidation = [
    body("email").isEmail().withMessage("invalid email")
]