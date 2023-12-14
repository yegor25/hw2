import { NextFunction, Request, Response } from "express";
export declare const resendingEmailValidator: import("express-validator").ValidationChain[];
export declare const validateResendingEmail: (req: Request, res: Response, next: NextFunction) => Promise<void>;
