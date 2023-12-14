import { NextFunction, Request, Response } from "express";
export declare const codeConfiramtionValidator: import("express-validator").ValidationChain[];
export declare const validateCodeConfirmation: (req: Request, res: Response, next: NextFunction) => Promise<void>;
