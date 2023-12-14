import { NextFunction, Response } from "express";
import { requestWithBody } from "../types/root-type";
import { loginType } from "../types/auth-type";
export declare const loginMiddleware: (req: requestWithBody<loginType>, res: Response, next: NextFunction) => Promise<void>;
