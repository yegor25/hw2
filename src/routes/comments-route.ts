import { Response, Router } from "express";
import { requestWithParams, requestWithParamsAndBody } from "../types/root-type";
import { QueryCommentsRepository } from "../repositories/query/query-commentsRepository";
import { CommentViewModelType } from "../types/comment-type";
import { authMiddleware } from "../middlewares/auth-middleware";
import { commentService } from "../domain/comment-service";
import { commentValidate, commentValidator } from "../middlewares/comment-validator";
import { LikeStatus } from "../types/like-type";
import { commentLikeValidator } from "../middlewares/commentLike-validator";


export const commentRouter = Router({})


commentRouter.get("/:id", async(req:requestWithParams<{id: string}>, res:Response) => {
    const data = await QueryCommentsRepository.getCommentsById(req.params.id)
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
commentRouter.put("/:commentId", authMiddleware,commentValidator,commentValidate,async(req:requestWithParamsAndBody<{commentId: string},{content: string}>, res:Response) => {
    const content = req.body.content
    const data = await QueryCommentsRepository.getCommentsById(req.params.commentId)
    if(!data) {
        res.sendStatus(404)
        return
    }
    const commentId = req.params.commentId
    const user = req.user
    const result = await commentService.updateComment(commentId,user?._id.toString() as string,content)
    if(!result){
        res.sendStatus(403)
        return
    }
    res.sendStatus(204)
})
commentRouter.put("/:commentId/like-status", authMiddleware,async(req:requestWithParamsAndBody<{commentId: string},{likeStatus: LikeStatus}>, res:Response) => {
    const status = req.body.likeStatus
    const data = await QueryCommentsRepository.getCommentsById(req.params.commentId)
    if(!data) {
        res.sendStatus(404)
        return
    }
    const commentId = req.params.commentId
    const user = req.user
    const result = await commentService.updateLikeStatus(status,user?._id.toString() as string,commentId)
    if(!result){
        res.sendStatus(403)
        return
    }
    res.sendStatus(204)
})