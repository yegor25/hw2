import { Router, Request, Response } from "express";
import { requestWithBody, requestWithParams, requestWithParamsAndBody, requestWithQuery } from "../types/root-type";
import { blogType, bodyBlogType } from "../types/blog-type";
import { checkAuth } from "../middlewares/auth-middleware";
import { blogValidate, validateBlogShema} from "../middlewares/blog-validation";
import { blogService } from "../domain/blog-service";
import { QueryBlogRepositiry } from "../repositories/query/query-BlogsRepository";
import { paramsPaginatorType } from "../types/paginator-type";
import { postBodyTypeForBlog } from "../types/post-type";
import { QueryPostRepository } from "../repositories/query/query-PostRepository";
import { postService } from "../domain/post-service";
import { postValidate, postValidator } from "../middlewares/post-validation";


export const blogRouter = Router({})

blogRouter.get("/", async (req: requestWithQuery<paramsPaginatorType>, res: Response) => {
    console.log("query",req.query)
    const blogs = await QueryBlogRepositiry.findBlogs(req.query)
    res.status(200).send(blogs)
})
blogRouter.post("/",checkAuth, validateBlogShema, blogValidate, async (req: requestWithBody<bodyBlogType>, res: Response<blogType>) => {
    const blogs =  await blogService.createBlog(req.body)
    res.status(201).send(blogs)
})
blogRouter.get("/:id", async (req: requestWithParams<{ id: string }>, res: Response) => {
    const blog = await QueryBlogRepositiry.findBlogById(req.params.id)
    if (!blog) {
        res.sendStatus(404)
        return
    }
    res.status(200).send(blog)
})
blogRouter.post("/:blogId/posts", checkAuth,postValidator,postValidate,async (req: requestWithParamsAndBody<{ blogId: string}, postBodyTypeForBlog >, res: Response) => {
    const blog = await postService.createPostForBlog(req.body,req.params.blogId)
    if (!blog) {
        res.sendStatus(404)
        return
    }
    res.status(201).send(blog)
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