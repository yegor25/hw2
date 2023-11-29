import { body, param } from "express-validator";
import { QueryCommentsRepository } from "../repositories/query/query-commentsRepository";

export const commentLikeValidator = [
    param("commentId").custom(async(val: string) => {
        const comment = await QueryCommentsRepository.getCommentsById(val)
        if(!comment) throw new Error("invalid")
    }).withMessage("invalid content")

]


