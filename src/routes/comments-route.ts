import { Response, Router } from "express";
import { requestWithParams } from "../types/root-type";
import { QueryCommentsRepository } from "../repositories/query/query-commentsRepository";
import { CommentViewModelType } from "../types/comment-type";
import { authMiddleware } from "../middlewares/auth-middleware";
import { commentService } from "../domain/comment-service";


export const commentRouter = Router({})


commentRouter.get("/:commentId", async(req:requestWithParams<{commentId: string}>, res:Response) => {
    const data = await QueryCommentsRepository.getCommentsById(req.params.commentId)
    if(!data) {
        res.sendStatus(404)
        return
    }
    res.status(200).send(data)
})
commentRouter.delete("/:commentId", authMiddleware,async(req:requestWithParams<{commentId: string}>, res:Response) => {
    const data = await QueryCommentsRepository.getCommentsById(req.params.commentId)
    if(!data) {
        res.sendStatus(404)
        return
    }
    const commentId = req.params.commentId
    const user = req.user
    const result = await commentService.deleteComment(commentId,user?._id.toString() as string)
    if(!result){
        res.sendStatus(403)
        return
    }
    res.sendStatus(204)
})