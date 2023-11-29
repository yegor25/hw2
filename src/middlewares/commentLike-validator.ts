import { body, param } from "express-validator";
import { QueryCommentsRepository } from "../repositories/query/query-commentsRepository";
import { LikeStatus } from "../types/like-type";

export const commentLikeValidator = [
    body("likeStatus").exists().notEmpty().withMessage("unknown value").custom( (val: string) => {
        if(!Object.values(LikeStatus).includes(val as unknown as LikeStatus))throw new Error("custom")
    }).withMessage("custom")

]


