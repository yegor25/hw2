import { Request, Response, NextFunction } from "express";
export declare const commentValidator: import("express-validator").ValidationChain[];
export declare const commentValidate: (req: Request, res: Response, next: NextFunction) => Promise<void>;
