import { Response, NextFunction } from "express";
import { requestWithBody } from "../types/root-type";
import { postBodyType } from "../types/post-type";
export declare const postValidator: import("express-validator").ValidationChain[];
export declare const postValidatorForBlog: import("express-validator").ValidationChain[];
export declare const postValidate: (req: requestWithBody<postBodyType>, res: Response, next: NextFunction) => void;
