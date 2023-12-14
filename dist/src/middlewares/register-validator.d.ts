import { NextFunction, Request, Response } from "express";
export declare const registerValidator: import("express-validator").ValidationChain[];
export declare const registerValidate: (req: Request, res: Response, next: NextFunction) => Promise<void>;
