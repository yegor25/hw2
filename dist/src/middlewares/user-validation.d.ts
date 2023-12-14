import { ValidationChain } from "express-validator";
import { NextFunction, Request, Response } from "express";
export declare const userValidator: ValidationChain[];
export declare const userValidate: (req: Request, res: Response, next: NextFunction) => Promise<void>;
