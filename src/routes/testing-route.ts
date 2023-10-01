import { Router, Request, Response } from "express";
import { postRepository } from "../repositories/post-repository";
import { blogsRepository } from "../repositories/blog-repository";



export const testingRouter = Router({})

testingRouter.delete("/all-data", async (req, res) => {
const posts = await postRepository.deleteAll()
const blogs = await blogsRepository.deleteAll()
    if(posts && blogs){
        res.sendStatus(204)
    } 
    res.end()
    
})