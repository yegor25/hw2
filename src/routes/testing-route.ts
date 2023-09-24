import { Router, Request, Response } from "express";
import { postRepository } from "../repositories/post-repository";
import { blogsRepository } from "../repositories/blog-repository";



export const testingRouter = Router({})

testingRouter.delete("/all-data", (req, res) => {
const posts = postRepository.deleteAll()
const blogs = blogsRepository.deleteAll()
    if(!posts.length && !blogs.length){
        res.sendStatus(204)
    } 
    res.end()
    
})