import { body, param } from "express-validator";
import { QueryCommentsRepository } from "../repositories/query/query-commentsRepository";
import { LikeStatus } from "../types/like-type";

export const commentLikeValidator = [
    body("likeStatus").custom((val: any) => {
        const values = Object.values(LikeStatus)
        if(!values.some(val)) throw new Error("exist")
    }).withMessage("unknown value")

]

