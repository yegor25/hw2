import { Response, Router } from "express";
import { requestWithParams } from "../types/root-type";
import { QueryCommentsRepository } from "../repositories/query/query-commentsRepository";
import { CommentViewModelType } from "../types/comment-type";


export const commentRouter = Router({})


commentRouter.get("/:commentId", async(req:requestWithParams<{commentId: string}>, res:Response) => {
    const data = await QueryCommentsRepository.getCommentsById(req.params.commentId)
    if(!data) {
        res.sendStatus(404)
        return
    }
    res.status(200).send(data)
})