import { Response, Router } from "express";
import { requestWithParams } from "../types/root-type";
import { QueryCommentsRepository } from "../repositories/query/query-commentsRepository";
import { CommentViewModelType } from "../types/comment-type";


export const commentRouter = Router({})


commentRouter.get("/:id", async(req:requestWithParams<{id: string}>, res:Response) => {
    const data = await QueryCommentsRepository.getCommentsById(req.params.id)
    if(!data) {
        res.sendStatus(404)
        return
    }
    res.status(200).send(data)
})