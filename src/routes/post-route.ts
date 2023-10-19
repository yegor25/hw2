import { Router, Request, Response } from "express";
import { authMiddleware, checkAuth } from "../middlewares/auth-middleware";
import { requestWithBody, requestWithParams, requestWithParamsAndBody, requestWithQuery, requestWithQueryAndParams } from "../types/root-type";
import { postBodyType, postType } from "../types/post-type";
import { postValidate, postValidator } from "../middlewares/post-validation";
import { postService } from "../domain/post-service";
import { QueryPostRepository } from "../repositories/query/query-PostRepository";
import { paramsCommentsPaginatorType, paramsPostPaginatorType } from "../types/paginator-type";
import { commentService } from "../domain/comment-service";
import { commentValidate, commentValidator } from "../middlewares/comment-validator";
import { QueryCommentsRepository } from "../repositories/query/query-commentsRepository";


export const postRouter = Router({})


postRouter.get("/", async (req: requestWithQuery<paramsPostPaginatorType>, res: Response) => {
    const blogs =  await QueryPostRepository.findPosts(req.query)
    res.status(200).send(blogs)
})
postRouter.post("/",checkAuth,postValidator, postValidate, async(req: requestWithBody<postBodyType>, res: Response<postType>) => {
    const posts = await postService.createPost(req.body)
    if(!posts){
        res.sendStatus(400)
        return
    }
    res.status(201).send(posts)
})
postRouter.get("/:id", async (req: requestWithParams<{ id: string }>, res: Response) => {
    const post = await QueryPostRepository.findPostById(req.params.id)
    if (!post) {
        res.sendStatus(404)
        return
    }
    res.status(200).send(post)
})
postRouter.post("/:postId/comments", authMiddleware,commentValidator,commentValidate,async(req:requestWithParamsAndBody<{postId:string},{content: string}>,res:Response) => {
    const user = req.user
    const {content} = req.body
    const postId = req.params.postId
    if(!user){
        res.sendStatus(401)
        return
    }
    const comment = await commentService.createComment(postId,content,user)
    if(!comment){
        res.sendStatus(404)
        return
    }
    res.status(201).send(comment)
})
postRouter.get("/:postId/comments",async(req:requestWithQueryAndParams<{postId:string}, paramsCommentsPaginatorType>,res:Response) => {
    const postId = req.params.postId
    const post = await QueryPostRepository.findPostById(postId)
    if(!post){
        res.sendStatus(404)
        return
    }
    const comments = await QueryCommentsRepository.getComments(req.query)
    res.status(201).send(comments)
})
postRouter.put("/:id",checkAuth, postValidator, postValidate ,async (req: requestWithParamsAndBody<{ id: string }, postBodyType>, res: Response) => {
    const post = await postService.changePost(req.params.id, req.body)
    if (!post) {
        res.sendStatus(404)
        return
    }
    res.sendStatus(204)
})
postRouter.delete("/:id",checkAuth, async (req: requestWithParams<{ id: string }>, res: Response) => {
    const post = await postService.deletePost(req.params.id)
    if (!post) {
        res.sendStatus(404)
        return
    }
    res.sendStatus(204)
})