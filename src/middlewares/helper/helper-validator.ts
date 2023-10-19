import { ValidationError } from "express-validator";
import { errorFormatterType } from "../../types/root-type";



export const helperValidator = {
    errorFomatter(error:ValidationError):errorFormatterType{
        switch(error.type){
            case "field":
                return {
                    message: error.msg,
                    field: error.path
                }
            default: 
                return {
                    message: error.msg,
                    field: "none"
                }
        }
    }
}