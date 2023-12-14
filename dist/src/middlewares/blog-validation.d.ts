import { Response, NextFunction } from "express";
import { requestWithBody } from "../types/root-type";
import { bodyBlogType } from "../types/blog-type";
export declare const validateBlogShema: import("express-validator").ValidationChain[];
export declare const blogValidate: (req: requestWithBody<bodyBlogType>, res: Response, next: NextFunction) => void;
