import { Router, Request, Response } from "express";
import { postRepository } from "../repositories/post-repository";
import { checkAuth } from "../middlewares/auth-middleware";
import { requestWithBody, requestWithParams, requestWithParamsAndBody } from "../types/root-type";
import { postBodyType, postType } from "../types/post-type";
import { postValidate, postValidator } from "../middlewares/post-validation";


export const postRouter = Router({})


postRouter.get("/", (req: Request, res: Response) => {
    const blogs = postRepository.findPosts()
    res.status(200).send(blogs)
})
postRouter.post("/",checkAuth,postValidator, postValidate, (req: requestWithBody<postBodyType>, res: Response<postType>) => {
    const posts = postRepository.createPost(req.body)
    if(!posts){
        res.sendStatus(400)
        return
    }
    res.status(201).send(posts)
})
postRouter.get("/:id", (req: requestWithParams<{ id: string }>, res: Response) => {
    const post = postRepository.findPostById(req.params.id)
    if (!post) {
        res.sendStatus(404)
        return
    }
    res.status(200).send(post)
})
postRouter.put("/:id", postValidator, postValidate,checkAuth ,(req: requestWithParamsAndBody<{ id: string }, postBodyType>, res: Response) => {
    const post = postRepository.changePost(req.params.id, req.body)
    if (!post) {
        res.sendStatus(404)
        return
    }
    res.sendStatus(204)
})
postRouter.delete("/:id",checkAuth, (req: requestWithParams<{ id: string }>, res: Response) => {
    const post = postRepository.deletePost(req.params.id)
    if (!post) {
        res.sendStatus(404)
        return
    }
    res.sendStatus(204)
})