import { NextFunction, Request, Response } from "express";
export declare const rateLimiting: (req: Request, res: Response, next: NextFunction) => Promise<void>;
