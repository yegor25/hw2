import { ValidationError } from "express-validator";
import { errorFormatterType } from "../../types/root-type";
export declare const helperValidator: {
    errorFomatter(error: ValidationError): errorFormatterType;
};
