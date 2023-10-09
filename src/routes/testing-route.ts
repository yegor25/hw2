import { Router, Request, Response } from "express";
import { postService } from "../domain/post-service";
import { blogService } from "../domain/blog-service";
import { userService } from "../domain/user-service";



export const testingRouter = Router({})

testingRouter.delete("/all-data", async (req, res) => {
const posts = await postService.deleteAllPosts()
const blogs = await blogService.deleteAllBlogs()
const users = await userService.deleteAllUsers()

   return res.sendStatus(204)
    
})