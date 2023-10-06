import { Router, Request, Response } from "express";
import { blogsRepository } from "../repositories/blog-repository";
import { requestWithBody, requestWithParams, requestWithParamsAndBody } from "../types/root-type";
import { blogType, bodyBlogType } from "../types/blog-type";
import { checkAuth } from "../middlewares/auth-middleware";
import { blogValidate, validateBlogShema} from "../middlewares/blog-validation";
import { blogService } from "../domain/blog-service";


export const blogRouter = Router({})

blogRouter.get("/", async (req: Request, res: Response) => {
    const blogs = await blogService.getAllBlogs()
    res.status(200).send(blogs)
})
blogRouter.post("/",checkAuth, validateBlogShema, blogValidate, async (req: requestWithBody<bodyBlogType>, res: Response<blogType>) => {
    const blogs =  await blogService.createBlog(req.body)
    res.status(201).send(blogs)
})
blogRouter.get("/:id", async (req: requestWithParams<{ id: string }>, res: Response) => {
    const blog = await blogService.findBlogById(req.params.id)
    if (!blog) {
        res.sendStatus(404)
        return
    }
    res.status(200).send(blog)
})
blogRouter.put("/:id", checkAuth, validateBlogShema,blogValidate ,async (req: requestWithParamsAndBody<{ id: string }, bodyBlogType>, res: Response) => {
    const blog = await blogService.changeBlog(req.params.id, req.body)
    if (!blog) {
        res.sendStatus(404)
        return
    }
    res.sendStatus(204)
})
blogRouter.delete("/:id",checkAuth, async (req: requestWithParams<{ id: string }>, res: Response) => {
    const blog = await blogService.deleteBlog(req.params.id)
    if (!blog) {
        res.sendStatus(404)
        return
    }
    res.sendStatus(204)
})