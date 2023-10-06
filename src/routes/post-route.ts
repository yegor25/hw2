import { Router, Request, Response } from "express";
import { checkAuth } from "../middlewares/auth-middleware";
import { requestWithBody, requestWithParams, requestWithParamsAndBody } from "../types/root-type";
import { postBodyType, postType } from "../types/post-type";
import { postValidate, postValidator } from "../middlewares/post-validation";
import { postService } from "../domain/post-service";


export const postRouter = Router({})


postRouter.get("/", async (req: Request, res: Response) => {
    const blogs =  await postService.findPosts()
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
    const post = await postService.findPostById(req.params.id)
    if (!post) {
        res.sendStatus(404)
        return
    }
    res.status(200).send(post)
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