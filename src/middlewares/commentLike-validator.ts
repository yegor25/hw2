import { body, param } from "express-validator";
import { QueryCommentsRepository } from "../repositories/query/query-commentsRepository";
import { LikeStatus } from "../types/like-type";

export const commentLikeValidator = [
    body("likeStatus").custom((val: string) => {
        if( val !== LikeStatus.Like)  throw new Error("inv")

    }).withMessage("unknown value")

]


