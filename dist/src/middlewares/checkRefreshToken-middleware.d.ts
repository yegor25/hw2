import { NextFunction, Request, Response } from "express";
export declare const checkRefreshToken: (req: Request, res: Response, next: NextFunction) => Promise<void>;
