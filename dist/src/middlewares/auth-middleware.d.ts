import { NextFunction, Request, Response } from "express";
import { paramsCommentsPaginatorType } from "../types/paginator-type";
import { requestWithQueryAndParams } from "../types/root-type";
export declare const checkAuth: (req: Request, res: Response, next: NextFunction) => void;
export declare const authMiddleware: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const checkGuess: (req: Request | requestWithQueryAndParams<{
    postId: string;
}, paramsCommentsPaginatorType | requestWithQueryAndParams<{
    postId: string;
}, paramsCommentsPaginatorType>>, res: Response, next: NextFunction) => Promise<void>;
