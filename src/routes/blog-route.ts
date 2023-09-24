import { Router, Request, Response } from "express";
import { blogsRepository } from "../repositories/blog-repository";
import { requestWithBody, requestWithParams, requestWithParamsAndBody } from "../types/root-type";
import { blogType, bodyBlogType } from "../types/blog-type";
import { checkAuth } from "../middlewares/auth-middleware";
import { blogValidate, validateBlogShema} from "../middlewares/blog-validation";


export const blogRouter = Router({})

blogRouter.get("/", (req: Request, res: Response) => {
    const blogs = blogsRepository.findBlogs()
    res.status(200).send(blogs)
})
blogRouter.post("/",checkAuth, validateBlogShema, blogValidate, (req: requestWithBody<bodyBlogType>, res: Response<blogType>) => {
    const blogs = blogsRepository.createBlog(req.body)
    res.status(201).send(blogs)
})
blogRouter.get("/:id", (req: requestWithParams<{ id: string }>, res: Response) => {
    const blog = blogsRepository.findBlogById(req.params.id)
    if (!blog) {
        res.sendStatus(404)
        return
    }
    res.status(200).send(blog)
})
blogRouter.put("/:id", checkAuth, blogValidate ,(req: requestWithParamsAndBody<{ id: string }, bodyBlogType>, res: Response) => {
    const blog = blogsRepository.changeBlog(req.params.id, req.body)
    if (!blog) {
        res.sendStatus(404)
        return
    }
    res.sendStatus(204)
})
blogRouter.delete("/:id",checkAuth, (req: requestWithParams<{ id: string }>, res: Response) => {
    const blog = blogsRepository.deleteBlog(req.params.id)
    if (!blog) {
        res.sendStatus(404)
        return
    }
    res.sendStatus(204)
})