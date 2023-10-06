import { Router, Request, Response } from "express";
import { postService } from "../domain/post-service";
import { blogService } from "../domain/blog-service";



export const testingRouter = Router({})

testingRouter.delete("/all-data", async (req, res) => {
const posts = await postService.deleteAllPosts()
const blogs = await blogService.deleteAllBlogs()
    if(posts && blogs){
        res.sendStatus(204)
    } 
    res.sendStatus(204)
    
})