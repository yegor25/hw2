import { Router, Request, Response } from "express";
import { authMiddleware, checkAuth, checkGuess } from "../middlewares/auth-middleware";
import { requestWithBody, requestWithParams, requestWithParamsAndBody, requestWithQuery, requestWithQueryAndParams } from "../types/root-type";
import { postBodyType, postType } from "../types/post-type";
import { postValidate, postValidator } from "../middlewares/post-validation";
import { postService } from "../domain/post-service";
import { QueryPostRepository } from "../repositories/query/query-PostRepository";
import { paramsCommentsPaginatorType, paramsPostPaginatorType } from "../types/paginator-type";
import { commentService } from "../domain/comment-service";
import { commentValidate, commentValidator } from "../middlewares/comment-validator";
import { QueryCommentsRepository } from "../repositories/query/query-commentsRepository";
import { LikeStatus } from "../types/like-type";
import { commentLikeValidator } from "../middlewares/commentLike-validator";
import { userDbType } from "../types/user-type";
import { postLikeService } from "../domain/postLikeService";


export const postRouter = Router({})


postRouter.get("/",checkGuess, async (req: requestWithQuery<paramsPostPaginatorType>, res: Response) => {
    const user = req.user
    const blogs =  await QueryPostRepository.findPosts(req.query, user?._id.toString())
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
postRouter.get("/:id", checkGuess ,async (req: requestWithParams<{ id: string }>, res: Response) => {
    const user = req.user
    const post = await QueryPostRepository.findPostById(req.params.id, user?._id.toString())
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
postRouter.get("/:postId/comments" ,checkGuess,async(req:requestWithQueryAndParams<{postId:string}, paramsCommentsPaginatorType>,res:Response) => {
    const postId = req.params.postId
    const post = await QueryPostRepository.findPostById(postId)
    if(!post){
        res.sendStatus(404)
        return
    }
    const comments = await QueryCommentsRepository.getComments(req.query, postId, req.user?._id.toString())
    res.status(200).send(comments)
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
postRouter.put("/:postId/like-status",authMiddleware ,commentLikeValidator,commentValidate,async (req:requestWithParamsAndBody<{postId: string},{likeStatus: LikeStatus}>, res:Response) => {
    const user = req.user as userDbType
    const status = req.body.likeStatus
    const post = await QueryPostRepository.findPostById(req.params.postId)
    if(!post){
        res.sendStatus(404)
        return
    }
    await postLikeService.changeLikeStatus(user._id.toString(),req.params.postId,status,user.login)
    res.sendStatus(204)
})